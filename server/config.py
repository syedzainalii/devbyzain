from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # Database
    database_url: str = "sqlite:///./portfolio.db"
    
    # Admin
    admin_email: str = "admin@example.com"
    admin_password: str = "admin123"
    
    # JWT
    secret_key: str = "your-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440  # 24 hours
    
    # Upload
    upload_dir: str = "uploads"
    max_upload_size: int = 10485760  # 10MB
    
    class Config:
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()
