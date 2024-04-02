import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_selection import SelectFromModel
from sklearn.metrics import accuracy_score


print("running with accuracy")
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

# Evaluate model performance
accuracy = accuracy_score(y_test, y_pred)
print("Test Accuracy:", accuracy) ; 

# Generate recommendations for a new athlete
def generate_recommendations(new_athlete_data):
    # Convert new athlete data to DataFrame
    new_athlete_df = pd.DataFrame(new_athlete_data, index=[0])

    # Perform one-hot encoding
    new_athlete_encoded = pd.get_dummies(new_athlete_df)

    # Select relevant features
    new_athlete_selected = feature_selector.transform(new_athlete_encoded)

    # Predict potential sponsors for the new athlete
    potential_sponsors = rf_model_selected.predict(new_athlete_selected)
    return potential_sponsors

# Example usage:
new_athlete_data = {
    'name': ['Tanvi Sen'],
    'gender': ['Male'],
    'age': [25],
    'height': [180],
    'weight': [75],
    'education Level': ['Bachelor'],
    'trainingHistoryYears': [10],
    'level': ['Professional'],
    'sport': ['Tennis'],
    'achievements': ['Regional'],
    'Location': ['Mumbai'],
    'desiredSponsorshipTypeType': ['Apparel'],
    'socialMediaFollowers': [50000],
    'annualIncome': ['300k-400k']
}

recommendations = generate_recommendations(new_athlete_data)
print("Potential sponsors:", recommendations)
