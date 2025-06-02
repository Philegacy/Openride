from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Dict
from datetime import datetime
import uuid

from ..database import get_db
from ..models.payment import Payment
from ..models.user import User
from ..models.ride import Ride
from ..routes.auth import oauth2_scheme, get_current_user
from ..schemas.payment import PaymentCreate, PaymentApprove, PaymentComplete, PaymentResponse

router = APIRouter()

@router.post("/initiate", response_model=PaymentResponse)
async def initiate_payment(
    payment_data: PaymentCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Extract ride_id from metadata if present
    ride_id = payment_data.metadata.get("rideId")
    
    # Verify ride exists if ride_id is provided
    ride = None
    if ride_id:
        ride = db.query(Ride).filter(Ride.id == ride_id).first()
        if not ride:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Ride not found"
            )

    # Create new payment record
    payment = Payment(
        payment_id=str(uuid.uuid4()),  # Generate a unique payment ID
        user_id=current_user.id,
        ride_id=ride_id if ride else None,
        amount=payment_data.amount,
        memo=payment_data.memo,
        metadata=payment_data.metadata,
        status="pending"
    )
    
    db.add(payment)
    db.commit()
    db.refresh(payment)

    return PaymentResponse(
        status="pending",
        payment_id=payment.payment_id,
        amount=payment.amount,
        memo=payment.memo,
        metadata=payment.metadata
    )

@router.post("/approve", response_model=PaymentResponse)
async def approve_payment(
    data: PaymentApprove,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Check if payment exists
    payment = db.query(Payment).filter(Payment.payment_id == data.payment_id).first()
    if not payment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found"
        )

    # Verify payment belongs to current user
    if payment.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to approve this payment"
        )

    # TODO: Call Pi API to approve payment
    # For now, just update the status
    payment.status = "approved"
    db.commit()
    db.refresh(payment)

    return PaymentResponse(
        status="approved",
        payment_id=payment.payment_id,
        amount=payment.amount,
        memo=payment.memo,
        metadata=payment.metadata
    )

@router.post("/complete", response_model=PaymentResponse)
async def complete_payment(
    data: PaymentComplete,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Check if payment exists and is approved
    payment = db.query(Payment).filter(Payment.payment_id == data.payment_id).first()
    if not payment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found"
        )

    if payment.status != "approved":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Payment must be approved first"
        )

    # TODO: Validate transaction on Pi Blockchain if needed
    # Update payment status and transaction ID
    payment.status = "completed"
    payment.txid = data.txid
    db.commit()
    db.refresh(payment)

    # Update ride status if needed
    if payment.ride:
        payment.ride.status = "paid"
        db.commit()

    return PaymentResponse(
        status="completed",
        payment_id=payment.payment_id,
        amount=payment.amount,
        memo=payment.memo,
        metadata=payment.metadata
    ) 