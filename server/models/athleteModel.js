import mongoose from "mongoose";

// Define the schema for the athlete
const athleteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number },
    height: { type: Number },
    weight: { type: Number },
    educationLevel: { type: String },
    trainingHistoryYears: { type: Number },
    level: { type: String },
    sport: { type: String },
    achievements: { type: String },
    location: { type: String },
    desiredSponsorshipType: { type: String },
    socialMediaFollowers: { type: Number },
    annualIncome: { type: String },
    userId : {type:String }
});

// Create a model based on the schema
const Athlete = mongoose.model('Athlete', athleteSchema);

export default Athlete;