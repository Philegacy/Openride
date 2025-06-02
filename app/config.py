from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database settings
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/openride"
    
    # JWT settings
    SECRET_KEY: str = "your-secret-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Application settings
    APP_NAME: str = "OpenRide API"
    DEBUG: bool = False
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings() 