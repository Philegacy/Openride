from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth, ride
from app.database import engine
from app.models import user, ride as ride_model

# Create database tables
user.Base.metadata.create_all(bind=engine)
ride_model.Base.metadata.create_all(bind=engine)

app = FastAPI(title="OpenRide API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(ride.router, prefix="/api/ride", tags=["Ride"])

@app.get("/")
def read_root():
    return {"message": "OpenRide backend is running!"} 