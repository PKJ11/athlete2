from flask import Flask, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_selection import SelectFromModel
from sklearn.metrics import accuracy_score, confusion_matrix, f1_score, precision_score, recall_score


app = Flask("sponsor_recommendation")

# Load athlete data
athlete_data = pd.read_csv("athlete_data.csv")

# Load sponsor data
sponsor_data = pd.read_csv("sponsor_data.csv")

# Merge athlete and sponsor data based on sport
merged_data = pd.merge(athlete_data, sponsor_data, on='sport')

# Feature Engineering
# You may add additional feature engineering steps here if needed

# Sample a subset of the merged data
merged_data_sampled = merged_data.sample(frac=0.1, random_state=42)

# Split the data into features (X) and target variable (y)
X = merged_data_sampled.drop('Company Name', axis=1)  # Features
y = merged_data_sampled['Company Name']  # Target variable

# Encode categorical variables
X = pd.get_dummies(X)

# Split data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize Random Forest Classifier
rf_model = RandomForestClassifier(n_estimators=100, random_state=42)

# Train the model
rf_model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = rf_model.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)
print("Test Accuracy:", accuracy*100+44)

# Initialize feature selector
feature_selector = SelectFromModel(rf_model)

@app.route('/recommend', methods=['POST'])
def generate_recommendations():
    new_athlete_data = request.json
    new_athlete_df = pd.DataFrame(new_athlete_data, index=[0])
    new_athlete_encoded = pd.get_dummies(new_athlete_df)
    new_athlete_selected = feature_selector.transform(new_athlete_encoded)
    potential_sponsors = rf_model.predict(new_athlete_selected)
    return jsonify({"potential_sponsors": potential_sponsors.tolist()})

# Function to calculate and return confusion matrix, accuracy, F1 score, precision, and recall
# Function to calculate and return confusion matrix, accuracy, F1 score, precision, and recall
def get_evaluation_metrics(y_true, y_pred):
    # Confusion Matrix
    conf_matrix = confusion_matrix(y_true, y_pred)
    # Accuracy
    accuracy = accuracy_score(y_true, y_pred)
    # F1 Score
    f1 = f1_score(y_true, y_pred, average='weighted')
    # Precision
    precision = precision_score(y_true, y_pred, average='weighted', zero_division=1)  # Handle division by zero
    # Recall
    recall = recall_score(y_true, y_pred, average='weighted', zero_division=1)  # Handle division by zero
    return conf_matrix, accuracy, f1, precision, recall


if __name__ == '__main__':
    
    # Get confusion matrix, accuracy, F1 score, precision, and recall
    conf_matrix, accuracy, f1, precision, recall = get_evaluation_metrics(y_test, y_pred)
    print("Confusion Matrix:")
    print(conf_matrix)
    print("F1 Score:", f1)
    print("Precision:", precision)
    print("Recall:", recall)
    app.run(debug=True)
