# OpenRide Backend

A FastAPI-based backend for the OpenRide ride-sharing application.

## Features

- User authentication and authorization
- Ride management (create, read, update)
- PostgreSQL database integration
- JWT-based authentication
- RESTful API design

## Project Structure

```
openride-backend/
│
├── app/
│   ├── main.py           # FastAPI application instance and configuration
│   ├── models/           # SQLAlchemy models
│   │   ├── user.py      # User model
│   │   └── ride.py      # Ride model
│   ├── routes/          # API routes
│   │   ├── auth.py     # Authentication routes
│   │   └── ride.py     # Ride management routes
│   ├── database.py      # Database configuration
│   └── config.py        # Application configuration
│
├── .env                 # Environment variables
├── requirements.txt     # Project dependencies
└── README.md           # Project documentation
```

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up your PostgreSQL database and update the `.env` file with your configuration.

4. Run the application:
   ```bash
   uvicorn app.main:app --reload
   ```

## API Documentation

Once the application is running, you can access:
- Interactive API documentation: http://localhost:8000/docs
- Alternative API documentation: http://localhost:8000/redoc

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL=postgresql://user:password@localhost:5432/openride
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
APP_NAME=OpenRide API
DEBUG=True
```

## Authentication

The API uses JWT tokens for authentication. To access protected endpoints:

1. Register a new user at `/api/register`
2. Get a token at `/api/token`
3. Include the token in the Authorization header: `Bearer <token>`

## License

MIT 