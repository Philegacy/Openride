from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    payment_id = Column(String, unique=True, index=True)  # Pi payment identifier
    user_id = Column(Integer, ForeignKey("users.id"))
    ride_id = Column(Integer, ForeignKey("rides.id"))
    amount = Column(Float)
    memo = Column(String)
    metadata = Column(JSON)  # Store additional payment metadata
    status = Column(String)  # pending, approved, completed, failed, cancelled
    txid = Column(String, nullable=True)  # blockchain transaction ID
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="payments")
    ride = relationship("Ride", back_populates="payments") 