def preprocess_data(input_data):
    required_columns = ['Glucose', 'BMI', 'Age', 'BloodPressure', 'SkinThickness', 'Insulin']
    for col in required_columns:
        if col not in input_data.columns:
            raise ValueError(f"Missing column: {col}")

    # Perform preprocessing steps
    input_data = input_data.fillna(0)  
    return input_data