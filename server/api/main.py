from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File, Form, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import timedelta, datetime
import os
import sys
import shutil
from pathlib import Path
import json
from itsdangerous import URLSafeTimedSerializer

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import get_db, engine, Base
from models import Product, Order, CustomRequest, PageContent, Admin, User
import schemas
from auth import (
    authenticate_admin,
    authenticate_user,
    create_access_token, 
    get_current_admin,
    get_current_user,
    init_admin,
    get_password_hash
)
from config import get_settings
from email_service import (
    send_verification_code, 
    send_password_reset_email,
    send_template_order_email,
    send_custom_request_email
)
import random
from datetime import timedelta as td

settings = get_settings()

# Token serializer for email verification
serializer = URLSafeTimedSerializer(settings.secret_key)

def generate_verification_code():
    """Generate a 6-digit verification code"""
    return str(random.randint(100000, 999999))

# Create database tables
Base.metadata.create_all(bind=engine)

# Create uploads directory (use /tmp for Vercel)
upload_path = Path("/tmp") / settings.upload_dir if os.environ.get("VERCEL") else Path(settings.upload_dir)
upload_path.mkdir(exist_ok=True, parents=True)

app = FastAPI(title="Portfolio & Marketplace API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://devbyzain.vercel.app",  # Production frontend
        "http://localhost:3000",  # Local development
        "http://localhost:8000",  # Local backend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files (uploads) - disabled for Vercel (use /tmp or cloud storage)
# app.mount("/uploads", StaticFiles(directory=settings.upload_dir), name="uploads")


# Initialize admin on startup
@app.on_event("startup")
async def startup_event():
    db = next(get_db())
    init_admin(db)
    db.close()


# ==================== AUTH ENDPOINTS ====================

@app.post("/api/auth/register")
async def register(
    user_data: schemas.UserRegister, 
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Register a new user - sends verification code"""
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check if email matches admin email from .env
    is_admin = user_data.email == settings.admin_email
    
    # Generate verification code
    verification_code = generate_verification_code()
    code_expires_at = datetime.utcnow() + td(minutes=10)
    
    # Create new user
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        hashed_password=get_password_hash(user_data.password),
        is_admin=is_admin,
        is_verified=is_admin,  # Auto-verify admin
        verification_code=verification_code if not is_admin else None,
        code_expires_at=code_expires_at if not is_admin else None
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Send verification code in background (skip for admin)
    if not is_admin:
        try:
            background_tasks.add_task(send_verification_code, new_user.email, verification_code)
        except Exception as e:
            print(f"Failed to send verification code: {e}")
    
    return {
        "message": "Registration successful. Please check your email for verification code." if not is_admin else "Admin registered successfully.",
        "email": new_user.email,
        "is_admin": is_admin,
        "requires_verification": not is_admin
    }


@app.post("/api/auth/login")
async def login(
    credentials: schemas.UserLogin,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Login for both users and admins - sends verification code if not verified"""
    user = authenticate_user(db, credentials.email, credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Check if it's a User (not Admin) and needs verification
    if isinstance(user, User):
        # If user is not verified and not admin, send verification code
        if not user.is_verified and not user.is_admin:
            verification_code = generate_verification_code()
            code_expires_at = datetime.utcnow() + td(minutes=10)
            
            user.verification_code = verification_code
            user.code_expires_at = code_expires_at
            db.commit()
            
            # Send verification code in background
            try:
                background_tasks.add_task(send_verification_code, user.email, verification_code)
            except Exception as e:
                print(f"Failed to send verification code: {e}")
            
            return {
                "message": "Please verify your email. Verification code sent to your email.",
                "email": user.email,
                "requires_verification": True
            }
        
        # User is verified or admin
        access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
        access_token = create_access_token(
            data={"sub": user.email}, expires_delta=access_token_expires
        )
        
        user_data = {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "is_admin": user.is_admin or user.email == settings.admin_email,
            "is_verified": user.is_verified
        }
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": user_data
        }
    
    # Admin login
    elif isinstance(user, Admin):
        access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
        access_token = create_access_token(
            data={"sub": user.email}, expires_delta=access_token_expires
        )
        
        user_data = {
            "id": user.id,
            "name": "Admin",
            "email": user.email,
            "is_admin": True
        }
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": user_data
        }


@app.get("/api/auth/me")
async def get_me(current_user = Depends(get_current_user)):
    """Get current user information"""
    if isinstance(current_user, User):
        return {
            "id": current_user.id,
            "name": current_user.name,
            "email": current_user.email,
            "is_admin": current_user.is_admin or current_user.email == settings.admin_email
        }
    elif isinstance(current_user, Admin):
        return {
            "id": current_user.id,
            "name": "Admin",
            "email": current_user.email,
            "is_admin": True
        }


@app.post("/api/auth/admin-login", response_model=schemas.Token)
async def admin_login(credentials: schemas.AdminLogin, db: Session = Depends(get_db)):
    """Admin-only login endpoint (backward compatibility)"""
    admin = authenticate_admin(db, credentials.email, credentials.password)
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": admin.email}, expires_delta=access_token_expires
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": admin.id,
            "name": "Admin",
            "email": admin.email,
            "is_admin": True
        }
    }


@app.post("/api/auth/verify-code")
async def verify_code(email: str, code: str, db: Session = Depends(get_db)):
    """Verify user email with code"""
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.is_verified:
        # Already verified - generate token
        access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
        access_token = create_access_token(
            data={"sub": user.email}, expires_delta=access_token_expires
        )
        return {
            "message": "Email already verified",
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "is_admin": user.is_admin,
                "is_verified": user.is_verified
            }
        }
    
    # Check if code matches and is not expired
    if user.verification_code != code:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid verification code"
        )
    
    if user.code_expires_at < datetime.utcnow():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Verification code has expired"
        )
    
    # Mark as verified
    user.is_verified = True
    user.verification_code = None
    user.code_expires_at = None
    db.commit()
    
    # Generate access token
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return {
        "message": "Email verified successfully",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "is_admin": user.is_admin,
            "is_verified": user.is_verified
        }
    }


@app.post("/api/auth/resend-code")
async def resend_verification_code(
    email: str,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Resend verification code"""
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.is_verified:
        return {"message": "Email already verified"}
    
    # Generate new code
    verification_code = generate_verification_code()
    code_expires_at = datetime.utcnow() + td(minutes=10)
    
    user.verification_code = verification_code
    user.code_expires_at = code_expires_at
    db.commit()
    
    # Send email in background
    try:
        background_tasks.add_task(send_verification_code, email, verification_code)
        return {"message": "Verification code sent"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send verification code"
        )


# ==================== FILE UPLOAD ENDPOINTS ====================

@app.post("/api/upload")
async def upload_file(
    file: UploadFile = File(...),
    current_admin: Admin = Depends(get_current_admin)
):
    """Upload a file to the server"""
    if file.size and file.size > settings.max_upload_size:
        raise HTTPException(status_code=400, detail="File too large")
    
    # Create a unique filename
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{int(datetime.now().timestamp())}_{file.filename}"
    file_path = upload_path / unique_filename
    
    # Save file
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # For Vercel, return backend API URL to serve files
    # For local, return static file URL
    backend_url = os.environ.get("BACKEND_URL", "http://localhost:8000")
    
    return {
        "filename": unique_filename,
        "url": f"{backend_url}/api/files/{unique_filename}" if os.environ.get("VERCEL") else f"/uploads/{unique_filename}",
        "size": file.size
    }


@app.delete("/api/upload/{filename}")
async def delete_file(
    filename: str,
    current_admin: Admin = Depends(get_current_admin)
):
    """Delete an uploaded file"""
    file_path = upload_path / filename
    if file_path.exists():
        file_path.unlink()
        return {"message": "File deleted successfully"}
    raise HTTPException(status_code=404, detail="File not found")


# ==================== PRODUCT ENDPOINTS ====================

@app.get("/api/products", response_model=List[schemas.Product])
async def get_products(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    featured: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Product)
    if category:
        query = query.filter(Product.category == category)
    if featured is not None:
        query = query.filter(Product.is_featured == featured)
    products = query.offset(skip).limit(limit).all()
    return products


@app.get("/api/products/{product_id}", response_model=schemas.Product)
async def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@app.post("/api/products", response_model=schemas.Product)
async def create_product(
    product: schemas.ProductCreate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    db_product = Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


@app.put("/api/products/{product_id}", response_model=schemas.Product)
async def update_product(
    product_id: int,
    product: schemas.ProductUpdate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    for key, value in product.dict(exclude_unset=True).items():
        setattr(db_product, key, value)
    
    db.commit()
    db.refresh(db_product)
    return db_product


@app.delete("/api/products/{product_id}")
async def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(db_product)
    db.commit()
    return {"message": "Product deleted successfully"}


# ==================== ORDER ENDPOINTS ====================

@app.get("/api/orders", response_model=List[schemas.Order])
async def get_orders(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    orders = db.query(Order).offset(skip).limit(limit).all()
    return orders


@app.get("/api/orders/{order_id}", response_model=schemas.Order)
async def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@app.post("/api/orders", response_model=schemas.Order)
async def create_order(
    order: schemas.OrderCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    db_order = Order(**order.dict())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    
    # Get product details if exists
    if db_order.product_id:
        product = db.query(Product).filter(Product.id == db_order.product_id).first()
        if product:
            # Send order confirmation email
            try:
                background_tasks.add_task(
                    send_template_order_email,
                    db_order.customer_email,
                    db_order.customer_name,
                    product.title,
                    db_order.id
                )
            except Exception as e:
                print(f"Failed to send order email: {e}")
    
    return db_order


@app.put("/api/orders/{order_id}", response_model=schemas.Order)
async def update_order(
    order_id: int,
    order: schemas.OrderUpdate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    db_order = db.query(Order).filter(Order.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    for key, value in order.dict(exclude_unset=True).items():
        setattr(db_order, key, value)
    
    db.commit()
    db.refresh(db_order)
    return db_order


# ==================== CUSTOM REQUEST ENDPOINTS ====================

@app.get("/api/custom-requests", response_model=List[schemas.CustomRequest])
async def get_custom_requests(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    requests = db.query(CustomRequest).offset(skip).limit(limit).all()
    return requests


@app.post("/api/custom-requests", response_model=schemas.CustomRequest)
async def create_custom_request(
    request: schemas.CustomRequestCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    db_request = CustomRequest(**request.dict())
    db.add(db_request)
    db.commit()
    db.refresh(db_request)
    
    # Send custom request confirmation email
    try:
        background_tasks.add_task(
            send_custom_request_email,
            db_request.customer_email,
            db_request.customer_name,
            db_request.project_title,
            db_request.id
        )
    except Exception as e:
        print(f"Failed to send custom request email: {e}")
    
    return db_request


@app.put("/api/custom-requests/{request_id}", response_model=schemas.CustomRequest)
async def update_custom_request(
    request_id: int,
    request: schemas.CustomRequestUpdate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    db_request = db.query(CustomRequest).filter(CustomRequest.id == request_id).first()
    if not db_request:
        raise HTTPException(status_code=404, detail="Custom request not found")
    
    for key, value in request.dict(exclude_unset=True).items():
        setattr(db_request, key, value)
    
    db.commit()
    db.refresh(db_request)
    return db_request


# ==================== PAGE CONTENT ENDPOINTS ====================

@app.get("/api/content/{page_key}", response_model=schemas.PageContent)
async def get_page_content(page_key: str, db: Session = Depends(get_db)):
    content = db.query(PageContent).filter(PageContent.page_key == page_key).first()
    if not content:
        raise HTTPException(status_code=404, detail="Page content not found")
    return content


@app.get("/api/content", response_model=List[schemas.PageContent])
async def get_all_page_contents(db: Session = Depends(get_db)):
    contents = db.query(PageContent).all()
    return contents


@app.post("/api/content", response_model=schemas.PageContent)
async def create_page_content(
    content: schemas.PageContentCreate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    # Check if already exists
    existing = db.query(PageContent).filter(PageContent.page_key == content.page_key).first()
    if existing:
        raise HTTPException(status_code=400, detail="Page content already exists")
    
    db_content = PageContent(**content.dict())
    db.add(db_content)
    db.commit()
    db.refresh(db_content)
    return db_content


@app.put("/api/content/{page_key}", response_model=schemas.PageContent)
async def update_page_content(
    page_key: str,
    content: schemas.PageContentUpdate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    db_content = db.query(PageContent).filter(PageContent.page_key == page_key).first()
    if not db_content:
        raise HTTPException(status_code=404, detail="Page content not found")
    
    db_content.content = content.content
    db.commit()
    db.refresh(db_content)
    return db_content


# ==================== HEALTH CHECK ====================

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "Portfolio & Marketplace API is running"}


@app.get("/")
async def root():
    return {
        "message": "Portfolio & Marketplace API",
        "status": "online",
        "docs": "/docs",
        "health": "/api/health"
    }


@app.get("/api/files/{filename}")
async def get_file(filename: str):
    """Serve uploaded files from /tmp directory (Vercel compatible)"""
    from fastapi.responses import FileResponse
    
    file_path = upload_path / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    # Determine content type based on extension
    content_types = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml',
        '.pdf': 'application/pdf',
        '.zip': 'application/zip',
    }
    
    ext = os.path.splitext(filename)[1].lower()
    media_type = content_types.get(ext, 'application/octet-stream')
    
    return FileResponse(file_path, media_type=media_type)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
