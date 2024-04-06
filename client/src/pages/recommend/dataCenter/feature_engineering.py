import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder

# Read the athlete and sponsor data
athlete_data_path = 'D:\\athlete 2\\athlete_data.csv'
sponsor_data_path = 'D:\\athlete 2\\sponsor_data (1).csv'

athlete_data = pd.read_csv(athlete_data_path, nrows=1000)
sponsor_data = pd.read_csv(sponsor_data_path, nrows=1000)

# Clean data: Remove unnecessary columns and handle missing values
athlete_data = athlete_data.drop(columns=['Unnamed: 14'], errors='ignore').dropna(subset=['Sport', 'Location'])
sponsor_data = sponsor_data.dropna(subset=['Preferred Sport', 'Location'])

# Rename 'Preferred Sport' in sponsor_data to 'Sport' for consistent encoding
sponsor_data.rename(columns={'Preferred Sport': 'Sport'}, inplace=True)

# Combine 'Sport' and 'Location' into a single DataFrame for each dataset to prepare for encoding
athlete_sport_location = athlete_data[['Sport', 'Location']]
sponsor_sport_location = sponsor_data[['Sport', 'Location']]

# Initialize the OneHotEncoder
ohe = OneHotEncoder(sparse=False)

# Fit the encoder on the combined data from both datasets to ensure all categories are covered
combined_sport_location = pd.concat([athlete_sport_location, sponsor_sport_location], ignore_index=True)
ohe.fit(combined_sport_location)

# Transform the sport and location data for both datasets
athlete_encoded = ohe.transform(athlete_sport_location)
sponsor_encoded = ohe.transform(sponsor_sport_location)

# Convert the encoded arrays back into DataFrames with appropriate column names
encoded_columns = ohe.get_feature_names_out(['Sport', 'Location'])
athlete_encoded_df = pd.DataFrame(athlete_encoded, columns=encoded_columns)
sponsor_encoded_df = pd.DataFrame(sponsor_encoded, columns=encoded_columns)

# Reset index on original data to ensure concatenation aligns rows correctly
athlete_data.reset_index(drop=True, inplace=True)
sponsor_data.reset_index(drop=True, inplace=True)

# Concatenate the encoded columns back to the original datasets
athlete_data_final = pd.concat([athlete_data, athlete_encoded_df], axis=1)
sponsor_data_final = pd.concat([sponsor_data, sponsor_encoded_df], axis=1)

# Merge athlete and sponsor datasets based on 'Sport' and 'Location'
combined_dataset = pd.merge(athlete_data_final, sponsor_data_final, on=['Sport', 'Location'], suffixes=('_athlete', '_sponsor'), how='outer')

# Create 'is_match' column based on whether both 'Name_athlete' and 'Company Name_sponsor' are not NaN
combined_dataset['is_match'] = combined_dataset.apply(lambda x: 1 if not pd.isna(x['Name']) and not pd.isna(x['Company Name']) else 0, axis=1)

# Preview the combined dataset
print(combined_dataset[['Name', 'Company Name', 'is_match']].head())
combined_dataset.to_csv('eecombined.csv', index=False)