from flask import Flask, request, jsonify
import joblib

app = Flask("sponsor_recommendation_model")

# Load the trained model
model = joblib.load('sponsor_recommendation_model.pkl')

@app.route('/recommend-sponsors', methods=['POST'])
def recommend_sponsors():
    data = request.json  # Assuming the request contains athlete data in JSON format

    # Preprocess the data (handle missing values, encode categorical variables, etc.)
    # For simplicity, let's assume the features are already preprocessed
    
    # Use the model to make predictions
    predictions = model.predict(data)

    # Return the recommended sponsors
    return jsonify({'recommended_sponsors': predictions.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
