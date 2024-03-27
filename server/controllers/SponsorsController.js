import Sponsor from '../models/sponsorModel.js';

export const createSponsor = async (req, res) => {
  const sponsor = new Sponsor({
    "Company Name": req.body["Company Name"],
    "Industry": req.body.Industry,
    "Budget Range": req.body["Budget Range"],
    "Location": req.body.Location,
    "Target Audience": req.body["Target Audience"],
    "Marketing Goals": req.body["Marketing Goals"],
    "Commitment Level Years": req.body["Commitment Level Years"],
    "Preferred Sport": req.body["Preferred Sport"],
    "userId" :req.body.userId
  });

  try {
    const newSponsor = await sponsor.save();
    console.log(newSponsor)
    res.status(201).json(newSponsor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSponsor = async (req, res) => {
    const id = req.params.id;
  
    try {
      const sponsor = await Sponsor.findById(id);
      if (!sponsor) {
        return res.status(404).json({ message: 'Sponsor not found' });
      }
  
      // Update sponsor fields based on the request body
      sponsor["Company Name"] = req.body["Company Name"];
      sponsor["Industry"] = req.body["Industry"];
      sponsor["Budget Range"] = req.body["Budget Range"];
      sponsor["Location"] = req.body["Location"];
      sponsor["Target Audience"] = req.body["Target Audience"];
      sponsor["Marketing Goals"] = req.body["Marketing Goals"];
      sponsor["Commitment Level Years"] = req.body["Commitment Level Years"];
      sponsor["Preferred Sport"] = req.body["Preferred Sport"];
  
      // Save the updated sponsor
      const updatedSponsor = await sponsor.save();
      res.status(200).json(updatedSponsor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// Controller function to get all sponsors
export const getSponsors = async (req, res) => {
    try {
        const sponsors = await Sponsor.find();
        return res.status(200).json(sponsors);
    } catch (error) {
        return res.status(500).json({ message: "Failed to get sponsors", error: error.message });
    }
};