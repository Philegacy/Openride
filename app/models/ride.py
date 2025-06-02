from sqlalchemy import Boolean, Column, Integer, String, DateTime, Float, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base

class Ride(Base):
    __tablename__ = "rides"

    id = Column(Integer, primary_key=True, index=True)
    driver_id = Column(Integer, ForeignKey("users.id"))
    pickup_location = Column(String)
    dropoff_location = Column(String)
    pickup_latitude = Column(Float)
    pickup_longitude = Column(Float)
    dropoff_latitude = Column(Float)
    dropoff_longitude = Column(Float)
    status = Column(String)  # "pending", "active", "completed", "cancelled"
    price = Column(Float)
    seats_available = Column(Integer)
    departure_time = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    driver = relationship("User", back_populates="rides") 