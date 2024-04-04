import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaDollarSign, FaCalendarAlt, FaBuilding, FaIndustry, FaMapMarkerAlt, FaBullseye, FaRunning, FaUsers } from 'react-icons/fa';
import BackgroundImage from "../../img/s.jpg"; // Import your background image

//7eff93514de941098f7e202fa3a74a7c
const SponsorProfile = () => {
  const [sponsor, setSponsor] = useState(null);
  const { id } = useParams();
  
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchSponsor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/sponsor`);
        const allSponsors = response.data;
        const foundSponsor = allSponsors.find((sponsor) => sponsor._id === id);
        if (foundSponsor) {
          setSponsor(foundSponsor);
        } else {
          console.log("Sponsor not found");
        }
      } catch (error) {
        console.error("Error fetching sponsor data:", error);
      }
    };

    fetchSponsor();
  }, [id]);

  return (
    <div style={{ 
      backgroundImage: `url(${BackgroundImage})`, // Set background image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: "1rem 1rem ",
    }}>
      <div className="ProfileCard" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)"}}>
        <div className="ProfileImages">
          <div>
            <img style={{ width: '150px' }}
              src={serverPublic + "defaultProfile.png"}
              alt="ProfileImage"
            />
          </div>
          <div className="ProfileName" style={{backgroundColor:"whitesmoke" ,padding:'1rem',borderRadius:'5px'}}>
            <span style={{color:"black"}}>
              {sponsor && sponsor["Company Name"]}
            </span>
          </div>
        </div>
        {sponsor && (
          <div className="grid-container">
            <div className="cell">
              <FaDollarSign />
              <p><strong>Budget Range:</strong> {sponsor["Budget Range"]}</p>
            </div>
            <div className="cell">
              <FaCalendarAlt />
              <p><strong>Commitment Level Years:</strong> {sponsor["Commitment Level Years"]}</p>
            </div>
            <div className="cell">
              <FaBuilding />
              <p><strong>Company Name:</strong> {sponsor["Company Name"]}</p>
            </div>
            <div className="cell">
              <FaIndustry />
              <p><strong>Industry:</strong> {sponsor["Industry"]}</p>
            </div>
            <div className="cell">
              <FaMapMarkerAlt />
              <p><strong>Location:</strong> {sponsor["Location"]}</p>
            </div>
            <div className="cell">
              <FaBullseye />
              <p><strong>Marketing Goals:</strong> {sponsor["Marketing Goals"]}</p>
            </div>
            <div className="cell">
              <FaRunning />
              <p><strong>Preferred Sport:</strong> {sponsor["Preferred Sport"]}</p>
            </div>
            <div className="cell">
              <FaUsers />
              <p><strong>Target Audience:</strong> {sponsor["Target Audience"]}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SponsorProfile;
