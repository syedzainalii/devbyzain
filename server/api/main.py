from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File, Form
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

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import get_db, engine, Base
from models import Product, Order, CustomRequest, PageContent, Admin
import schemas
from auth import (
    authenticate_admin, 
    create_access_token, 
    get_current_admin, 
    init_admin,
    get_password_hash
)
from config import get_settings

settings = get_settings()

# Create database tables
Base.metadata.create_all(bind=engine)

# Create uploads directory
upload_path = Path(settings.upload_dir)
upload_path.mkdir(exist_ok=True)

app = FastAPI(title="Portfolio & Marketplace API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files (uploads)
app.mount("/uploads", StaticFiles(directory=settings.upload_dir), name="uploads")


# Initialize admin on startup
@app.on_event("startup")
async def startup_event():
    db = next(get_db())
    init_admin(db)
    db.close()


# ==================== AUTH ENDPOINTS ====================

@app.post("/api/auth/login", response_model=schemas.Token)
async def login(credentials: schemas.AdminLogin, db: Session = Depends(get_db)):
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
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/api/auth/me", response_model=schemas.AdminResponse)
async def get_current_user(current_admin: Admin = Depends(get_current_admin)):
    return current_admin


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
    
    return {
        "filename": unique_filename,
        "url": f"/uploads/{unique_filename}",
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
async def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    db_order = Order(**order.dict())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
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
    db: Session = Depends(get_db)
):
    db_request = CustomRequest(**request.dict())
    db.add(db_request)
    db.commit()
    db.refresh(db_request)
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


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
