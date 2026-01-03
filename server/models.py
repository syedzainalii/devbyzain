from sqlalchemy import Column, Integer, String, Text, Float, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base


class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    category = Column(String(100))
    image_url = Column(String(500))
    additional_images = Column(Text)  # JSON string of image URLs
    features = Column(Text)  # JSON string of features
    is_featured = Column(Boolean, default=False)
    is_available = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    orders = relationship("Order", back_populates="product")


class Order(Base):
    __tablename__ = "orders"
    
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=True)
    customer_name = Column(String(255), nullable=False)
    customer_email = Column(String(255), nullable=False)
    customer_phone = Column(String(50))
    order_type = Column(String(50))  # 'purchase' or 'customization'
    customization_details = Column(Text)
    status = Column(String(50), default="pending")  # pending, processing, completed, cancelled
    total_amount = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    product = relationship("Product", back_populates="orders")


class CustomRequest(Base):
    __tablename__ = "custom_requests"
    
    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(255), nullable=False)
    customer_email = Column(String(255), nullable=False)
    customer_phone = Column(String(50))
    project_title = Column(String(255), nullable=False)
    project_scope = Column(Text, nullable=False)
    budget_range = Column(String(100))
    timeline = Column(String(100))
    additional_details = Column(Text)
    status = Column(String(50), default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class PageContent(Base):
    __tablename__ = "page_contents"
    
    id = Column(Integer, primary_key=True, index=True)
    page_key = Column(String(100), unique=True, nullable=False)  # 'home_hero', 'about_bio', etc.
    content_type = Column(String(50))  # 'text', 'html', 'json'
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Admin(Base):
    __tablename__ = "admins"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
