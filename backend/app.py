from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from pipeline import preprocess_data
import joblib

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load the trained model
model = joblib.load("diabetes_model.pkl")

@app.route("/", methods=["GET"])
def home():
    return "Welcome to the Diabetes Prediction API! Use the /api/predict endpoint to make predictions."

@app.route("/api/predict", methods=["POST"])
def predict():
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
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)