from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from pipeline import preprocess_data
import joblib
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Load the trained model
model = joblib.load("diabetes_model.pkl")

@app.route("/", methods=["GET"])
def home():
    """
    Home endpoint to verify the app is running.
    """
    return "Welcome to the Diabetes Prediction API! Use the /api/predict endpoint to make predictions."

@app.route("/api/predict", methods=["POST"])
def predict():
    """
    Endpoint to predict diabetes risk based on input data.
    """
    try:
        # Get the input data from the request
        data = request.json
        print("Incoming data:", data)  # Log the incoming data

        # Convert the input data into a DataFrame
        input_data = pd.DataFrame([data])

        # Log the input data columns
        print("Input data columns:", input_data.columns.tolist())

        # Preprocess the input data
        input_data = preprocess_data(input_data)

        # Make a prediction using the loaded model
        prediction = model.predict(input_data)[0]

        # Return the prediction as a JSON response
        return jsonify({"prediction": int(prediction)})
    except Exception as e:
        # Handle errors and return a 500 status code
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Use the PORT environment variable provided by Cloud Run, or default to 5000
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)