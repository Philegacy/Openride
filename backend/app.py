from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import uuid
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Database setup
DATABASE = 'openride.db'

def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            pi_username TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            role TEXT NOT NULL,
            pi_balance REAL DEFAULT 0.0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Rides table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS rides (
            id TEXT PRIMARY KEY,
            rider_id TEXT NOT NULL,
            driver_id TEXT,
            pickup TEXT NOT NULL,
            destination TEXT NOT NULL,
            status TEXT DEFAULT 'pending',
            fare REAL NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (rider_id) REFERENCES users (id),
            FOREIGN KEY (driver_id) REFERENCES users (id)
        )
    ''')
    
    conn.commit()
    conn.close()

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# Initialize database
init_db()

@app.route('/api/login', methods=['POST'])
def login():
    """Simulate Pi Network login"""
    data = request.get_json()
    pi_username = data.get('pi_username', f'pi_user_{uuid.uuid4().hex[:8]}')
    name = data.get('name', 'Pi User')
    role = data.get('role', 'rider')
    
    conn = get_db_connection()
    
    # Check if user exists
    user = conn.execute(
        'SELECT * FROM users WHERE pi_username = ?', (pi_username,)
    ).fetchone()
    
    if user:
        user_data = dict(user)
    else:
        # Create new user
        user_id = str(uuid.uuid4())
        conn.execute(
            'INSERT INTO users (id, pi_username, name, role, pi_balance) VALUES (?, ?, ?, ?, ?)',
            (user_id, pi_username, name, role, 1000.0)
        )
        conn.commit()
        
        user_data = {
            'id': user_id,
            'pi_username': pi_username,
            'name': name,
            'role': role,
            'pi_balance': 1000.0
        }
    
    conn.close()
    
    return jsonify({
        'success': True,
        'user': user_data
    })

@app.route('/api/rides/request', methods=['POST'])
def request_ride():
    """Create a new ride request"""
    data = request.get_json()
    rider_id = data.get('rider_id')
    pickup = data.get('pickup')
    destination = data.get('destination')
    
    if not all([rider_id, pickup, destination]):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Calculate fare (simple random for demo)
    import random
    fare = round(random.uniform(10, 30), 2)
    
    ride_id = str(uuid.uuid4())
    
    conn = get_db_connection()
    conn.execute(
        'INSERT INTO rides (id, rider_id, pickup, destination, fare) VALUES (?, ?, ?, ?, ?)',
        (ride_id, rider_id, pickup, destination, fare)
    )
    conn.commit()
    conn.close()
    
    return jsonify({
        'success': True,
        'ride_id': ride_id,
        'fare': fare
    })

@app.route('/api/rides/available', methods=['GET'])
def get_available_rides():
    """Get available rides for drivers"""
    conn = get_db_connection()
    rides = conn.execute('''
        SELECT r.*, u.name as rider_name 
        FROM rides r 
        JOIN users u ON r.rider_id = u.id 
        WHERE r.status = 'pending'
        ORDER BY r.created_at DESC
    ''').fetchall()
    conn.close()
    
    return jsonify({
        'rides': [dict(ride) for ride in rides]
    })

@app.route('/api/rides/accept', methods=['POST'])
def accept_ride():
    """Driver accepts a ride"""
    data = request.get_json()
    ride_id = data.get('ride_id')
    driver_id = data.get('driver_id')
    
    if not all([ride_id, driver_id]):
        return jsonify({'error': 'Missing required fields'}), 400
    
    conn = get_db_connection()
    conn.execute(
        'UPDATE rides SET driver_id = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        (driver_id, 'accepted', ride_id)
    )
    conn.commit()
    conn.close()
    
    return jsonify({'success': True})

@app.route('/api/rides/status', methods=['POST'])
def update_ride_status():
    """Update ride status"""
    data = request.get_json()
    ride_id = data.get('ride_id')
    status = data.get('status')
    
    if not all([ride_id, status]):
        return jsonify({'error': 'Missing required fields'}), 400
    
    conn = get_db_connection()
    conn.execute(
        'UPDATE rides SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        (status, ride_id)
    )
    conn.commit()
    conn.close()
    
    return jsonify({'success': True})

@app.route('/api/rides/my', methods=['GET'])
def get_my_rides():
    """Get user's rides"""
    user_id = request.args.get('user_id')
    role = request.args.get('role', 'rider')
    
    if not user_id:
        return jsonify({'error': 'Missing user_id'}), 400
    
    conn = get_db_connection()
    
    if role == 'rider':
        rides = conn.execute('''
            SELECT r.*, d.name as driver_name 
            FROM rides r 
            LEFT JOIN users d ON r.driver_id = d.id 
            WHERE r.rider_id = ?
            ORDER BY r.created_at DESC
        ''', (user_id,)).fetchall()
    else:
        rides = conn.execute('''
            SELECT r.*, u.name as rider_name 
            FROM rides r 
            JOIN users u ON r.rider_id = u.id 
            WHERE r.driver_id = ?
            ORDER BY r.created_at DESC
        ''', (user_id,)).fetchall()
    
    conn.close()
    
    return jsonify({
        'rides': [dict(ride) for ride in rides]
    })

@app.route('/api/rides/updates', methods=['GET'])
def get_ride_updates():
    """Get ride updates for polling"""
    user_id = request.args.get('user_id')
    role = request.args.get('role', 'rider')
    
    if not user_id:
        return jsonify({'error': 'Missing user_id'}), 400
    
    conn = get_db_connection()
    
    if role == 'rider':
        rides = conn.execute('''
            SELECT r.*, d.name as driver_name 
            FROM rides r 
            LEFT JOIN users d ON r.driver_id = d.id 
            WHERE r.rider_id = ? AND r.status IN ('pending', 'accepted', 'in_progress')
            ORDER BY r.updated_at DESC
        ''', (user_id,)).fetchall()
    else:
        rides = conn.execute('''
            SELECT r.*, u.name as rider_name 
            FROM rides r 
            JOIN users u ON r.rider_id = u.id 
            WHERE r.driver_id = ? AND r.status IN ('accepted', 'in_progress')
            ORDER BY r.updated_at DESC
        ''', (user_id,)).fetchall()
    
    conn.close()
    
    return jsonify({
        'rides': [dict(ride) for ride in rides]
    })

@app.route('/api/rides/cancel', methods=['POST'])
def cancel_ride():
    """Cancel a ride"""
    data = request.get_json()
    ride_id = data.get('ride_id')
    user_id = data.get('user_id')
    
    if not all([ride_id, user_id]):
        return jsonify({'error': 'Missing required fields'}), 400
    
    conn = get_db_connection()
    conn.execute(
        'UPDATE rides SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND rider_id = ?',
        ('cancelled', ride_id, user_id)
    )
    conn.commit()
    conn.close()
    
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
