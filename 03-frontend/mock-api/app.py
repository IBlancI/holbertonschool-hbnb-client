from uuid import uuid4
from flask import Flask, request, jsonify, send_from_directory, render_template
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
import json
import os


# Initialize the Flask application with static and template folders
app = Flask(__name__, static_folder='../base_files', template_folder='../base_files')
app.config.from_object('config.Config') # Load configuration from the config file

# Initialize JWT manager for handling JSON Web Tokens
jwt = JWTManager(app)
CORS(app) # Enable CORS for all routes

# Load users and places data from JSON files
with open('data/users.json') as f:
    users = json.load(f)

with open('data/places.json') as f:
    places = json.load(f)

# In-memory storage for new reviews
new_reviews = []

# Route for user login
@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email') # Get email from the request
    password = request.json.get('password') # Get password from the request

    # Find the user with the matching email and password
    user = next((u for u in users if u['email'] == email and u['password'] == password), None)

    if not user:
        print(f"User not found or invalid password for: {email}")
        return jsonify({"msg": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user['id']) # Create access token for the user
    return jsonify(access_token=access_token) # Return the access token

# Route to get all places
@app.route('/places', methods=['GET'])
def get_places():
    response = [
        {
            "id": place['id'],
            "host_id": place['host_id'],
            "host_name": place['host_name'],
            "description": place['description'],
            "price_per_night": place['price_per_night'],
            "city_id": place['city_id'],
            "city_name": place['city_name'],
            "country_code": place['country_code'],
            "country_name": place['country_name']
        }
        for place in places
    ]
    return jsonify(response) # Return the list of places as JSON

# Route to get a specific place by its ID
@app.route('/places/<place_id>', methods=['GET'])
def get_place(place_id):
    place = next((p for p in places if p['id'] == place_id), None)

    if not place:
        return jsonify({"msg": "Place not found"}), 404

    response = {
        "id": place['id'],
        "host_id": place['host_id'],
        "host_name": place['host_name'],
        "description": place['description'],
        "number_of_rooms": place['number_of_rooms'],
        "number_of_bathrooms": place['number_of_bathrooms'],
        "max_guests": place['max_guests'],
        "price_per_night": place['price_per_night'],
        "latitude": place['latitude'],
        "longitude": place['longitude'],
        "city_id": place['city_id'],
        "city_name": place['city_name'],
        "country_code": place['country_code'],
        "country_name": place['country_name'],
        "amenities": place['amenities'],
        "reviews": place['reviews'] + [r for r in new_reviews if r['place_id'] == place_id]
    }
    return jsonify(response) # Return the place details as JSON

# Route to add a review to a specific place
@app.route('/places/<place_id>/reviews', methods=['POST'])
@jwt_required() # Require JWT for authentication
def add_review(place_id):
    current_user_id = get_jwt_identity() # Get the current user ID from the JWT
    user = next((u for u in users if u['id'] == current_user_id), None)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    review_text = request.json.get('review') # Get the review text from the request
    new_review = {
        "user_name": user['name'],
        "rating": request.json.get('rating'), # Get the rating from the request
        "comment": review_text,
        "place_id": place_id
    }

    new_reviews.append(new_review) # Add the new review to the in-memory storage
    return jsonify({"msg": "Review added"}), 201

# Route to render the index page
@app.route('/')
def index():
    return render_template('index.html') # Render the index.html template

# Route to serve static files
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename) # Serve the requested static file

# Main entry point of the application
if __name__ == '__main__':
    app.run(debug=True) # Run the app in debug mode