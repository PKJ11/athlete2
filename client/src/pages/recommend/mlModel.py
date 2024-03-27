# Import necessary libraries
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Load the athlete data (assuming it's in CSV format)
athlete_data = pd.read_csv('athlete_data.csv')

# Preprocess the data (handle missing values, encode categorical variables, etc.)
# For simplicity, let's assume the features are already preprocessed

# Split the data into features (X) and target (y)
X = athlete_data.drop('RecommendedSponsor', axis=1)
y = athlete_data['RecommendedSponsor']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Random Forest classifier
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f'Model Accuracy: {accuracy}')

# Save the model
joblib.dump(model, 'sponsor_recommendation_model.pkl')
