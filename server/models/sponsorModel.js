import mongoose from 'mongoose';

const sponsorSchema = new mongoose.Schema({
    "Company Name": { type: String, required: true },
    "Industry": { type: String },
    "Budget Range": { type: String },
    "Location": { type: String },
    "Target Audience": { type: String },
    "Marketing Goals": { type: String },
    "Commitment Level Years": { type: Number },
    "Preferred Sport": { type: String },
    userId : {type:String}
});

const Sponsor = mongoose.model('Sponsor', sponsorSchema);

export default Sponsor;
