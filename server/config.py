from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # Database
    database_url: str = "postgresql://localhost/devbyzain"
    
    # Admin
    admin_email: str = "admin@example.com"
    admin_password: str = "admin123"
    
    # JWT
    secret_key: str = "your-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440  # 24 hours
    
    # Upload (legacy - keeping for backwards compatibility)
    upload_dir: str = "uploads"
    max_upload_size: int = 10485760  # 10MB
    
    # Cloudinary Configuration
    cloudinary_cloud_name: str = ""
    cloudinary_api_key: str = ""
    cloudinary_api_secret: str = ""
    cloudinary_url: str = ""
    use_cloud_storage: bool = True
    
    # Email Configuration
    mail_username: str = ""
    mail_password: str = ""
    mail_from: str = ""
    mail_from_name: str = "Portfolio"
    mail_port: int = 587
    mail_server: str = "smtp.gmail.com"
    frontend_url: str = "http://localhost:3000"
    backend_url: str = "http://localhost:8000"
    
    class Config:
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()
