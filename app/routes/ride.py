from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from ..database import get_db
from ..models.ride import Ride
from ..models.user import User
from ..routes.auth import oauth2_scheme

router = APIRouter()

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    # Implement user authentication logic here
    # This is a placeholder - you should implement proper JWT token verification
    return db.query(User).first()

@router.post("/rides/")
async def create_ride(
    pickup_location: str,
    dropoff_location: str,
    pickup_latitude: float,
    pickup_longitude: float,
    dropoff_latitude: float,
    dropoff_longitude: float,
    price: float,
    seats_available: int,
    departure_time: datetime,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    ride = Ride(
        driver_id=current_user.id,
        pickup_location=pickup_location,
        dropoff_location=dropoff_location,
        pickup_latitude=pickup_latitude,
        pickup_longitude=pickup_longitude,
        dropoff_latitude=dropoff_latitude,
        dropoff_longitude=dropoff_longitude,
        price=price,
        seats_available=seats_available,
        departure_time=departure_time,
        status="pending"
    )
    db.add(ride)
    db.commit()
    db.refresh(ride)
    return ride

@router.get("/rides/")
async def list_rides(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 10
):
    rides = db.query(Ride).offset(skip).limit(limit).all()
    return rides

@router.get("/rides/{ride_id}")
async def get_ride(
    ride_id: int,
    db: Session = Depends(get_db)
):
    ride = db.query(Ride).filter(Ride.id == ride_id).first()
    if not ride:
        raise HTTPException(status_code=404, detail="Ride not found")
    return ride

@router.put("/rides/{ride_id}/status")
async def update_ride_status(
    ride_id: int,
    status: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    ride = db.query(Ride).filter(Ride.id == ride_id).first()
    if not ride:
        raise HTTPException(status_code=404, detail="Ride not found")
    if ride.driver_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this ride")
    
    ride.status = status
    db.commit()
    db.refresh(ride)
    return ride 