import Athlete from "../models/athleteModel.js";

// Get all athletes
export const getAllAthletes = async (req, res) => {
  try {
    const athletes = await Athlete.find();
    res.status(200).json(athletes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new athlete
export const createAthlete = async (req, res) => {
  const athlete = new Athlete({
    name: req.body.name,
    gender: req.body.gender,
    age: req.body.age,
    height: req.body.height,
    weight: req.body.weight,
    educationLevel: req.body.educationLevel,
    trainingHistoryYears: req.body.trainingHistoryYears,
    level: req.body.level,
    sport: req.body.sport,
    achievements: req.body.achievements,
    location: req.body.location,
    desiredSponsorshipType: req.body.desiredSponsorshipType,
    socialMediaFollowers: req.body.socialMediaFollowers,
    annualIncome: req.body.annualIncome,
    userId : req.body.userId
  });

  try {
    const newAthlete = await athlete.save();
    res.status(201).json(newAthlete);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an athlete
export const updateAthlete = async (req, res) => {
    const id = req.params.id;
  
    try {
      const athlete = await Athlete.findById(id);
      if (!athlete) {
        return res.status(404).json({ message: 'Athlete not found' });
      }
  
      athlete.name = req.body.name;
      athlete.gender = req.body.gender;
      athlete.age = req.body.age;
      athlete.height = req.body.height;
      athlete.weight = req.body.weight;
      athlete.educationLevel = req.body.educationLevel;
      athlete.trainingHistoryYears = req.body.trainingHistoryYears;
      athlete.level = req.body.level;
      athlete.sport = req.body.sport;
      athlete.achievements = req.body.achievements;
      athlete.location = req.body.location;
      athlete.desiredSponsorshipType = req.body.desiredSponsorshipType;
      athlete.socialMediaFollowers = req.body.socialMediaFollowers;
      athlete.annualIncome = req.body.annualIncome;
  
      const updatedAthlete = await athlete.save();
      res.status(200).json(updatedAthlete);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  