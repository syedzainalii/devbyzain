from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime


# Product Schemas
class ProductBase(BaseModel):
    title: str
    description: Optional[str] = None
    price: float
    category: Optional[str] = None
    image_url: Optional[str] = None
    additional_images: Optional[str] = None
    features: Optional[str] = None
    is_featured: bool = False
    is_available: bool = True


class ProductCreate(ProductBase):
    pass


class ProductUpdate(ProductBase):
    title: Optional[str] = None
    price: Optional[float] = None


class Product(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Order Schemas
class OrderBase(BaseModel):
    product_id: Optional[int] = None
    customer_name: str
    customer_email: EmailStr
    customer_phone: Optional[str] = None
    order_type: str  # 'purchase' or 'customization'
    customization_details: Optional[str] = None
    total_amount: Optional[float] = None


class OrderCreate(OrderBase):
    pass


class OrderUpdate(BaseModel):
    status: Optional[str] = None
    customization_details: Optional[str] = None


class Order(OrderBase):
    id: int
    status: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Custom Request Schemas
class CustomRequestBase(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_phone: Optional[str] = None
    project_title: str
    project_scope: str
    budget_range: Optional[str] = None
    timeline: Optional[str] = None
    additional_details: Optional[str] = None


class CustomRequestCreate(CustomRequestBase):
    pass


class CustomRequestUpdate(BaseModel):
    status: Optional[str] = None


class CustomRequest(CustomRequestBase):
    id: int
    status: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Page Content Schemas
class PageContentBase(BaseModel):
    page_key: str
    content_type: str
    content: str


class PageContentCreate(PageContentBase):
    pass


class PageContentUpdate(BaseModel):
    content: str


class PageContent(PageContentBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


class AdminLogin(BaseModel):
    email: EmailStr
    password: str


class AdminResponse(BaseModel):
    id: int
    email: str
    created_at: datetime
    
    class Config:
        from_attributes = True
