import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib
from pipeline import preprocess_data

def train_model():
    """
    Train a Random Forest Classifier and save the model.
    """
    # Load the dataset
    df = pd.read_csv("diabetes.csv")

    # Preprocess the data
    df = preprocess_data(df)

    # Split the data into features (X) and target (y)
    X = df.drop("Outcome", axis=1)
    y = df["Outcome"]

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train a Random Forest Classifier
    model = RandomForestClassifier(random_state=42)
    model.fit(X_train, y_train)

    # Evaluate the model
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model Accuracy: {accuracy * 100:.2f}%")

    # Save the trained model
    joblib.dump(model, "diabetes_model.pkl")

if __name__ == "__main__":
    train_model()