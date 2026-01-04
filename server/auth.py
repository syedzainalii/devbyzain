from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
import bcrypt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database import get_db
from models import Admin, User
from schemas import TokenData
from config import get_settings

settings = get_settings()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against a hashed password."""
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))


def get_password_hash(password: str) -> str:
    """Hash a password using bcrypt."""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt


def authenticate_user(db: Session, email: str, password: str):
    """Authenticate a user (checks both User and Admin tables)"""
    # First check if user exists in User table
    user = db.query(User).filter(User.email == email).first()
    if user:
        if not verify_password(password, user.hashed_password):
            return False
        return user
    
    # If not in User table, check Admin table for backward compatibility
    admin = db.query(Admin).filter(Admin.email == email).first()
    if admin:
        if not verify_password(password, admin.hashed_password):
            return False
        # Return admin as user with is_admin flag
        return admin
    
    return False


def authenticate_admin(db: Session, email: str, password: str):
    admin = db.query(Admin).filter(Admin.email == email).first()
    if not admin:
        return False
    if not verify_password(password, admin.hashed_password):
        return False
    return admin


async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """Get current authenticated user"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    
    # Check User table first
    user = db.query(User).filter(User.email == token_data.email).first()
    if user:
        return user
    
    # Check Admin table for backward compatibility
    admin = db.query(Admin).filter(Admin.email == token_data.email).first()
    if admin:
        return admin
    
    raise credentials_exception


async def get_current_admin(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """Get current user and verify they are admin"""
    user = await get_current_user(token, db)
    
    # Check if user is admin by email or is_admin flag
    if isinstance(user, Admin):
        return user
    
    if isinstance(user, User):
        # Check if user email matches admin email from .env
        if user.email == settings.admin_email or user.is_admin:
            return user
    
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Not authorized. Admin access required."
    )


def init_admin(db: Session):
    """Initialize admin user if not exists"""
    admin = db.query(Admin).filter(Admin.email == settings.admin_email).first()
    if not admin:
        admin = Admin(
            email=settings.admin_email,
            hashed_password=get_password_hash(settings.admin_password)
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)
    return admin
