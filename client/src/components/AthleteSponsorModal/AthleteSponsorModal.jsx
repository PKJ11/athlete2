import React, { useState, useEffect } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import Axios

const AthleteSponsorModal = ({ modalOpened, setModalOpened }) => {
  const theme = useMantineTheme();
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({});
  const [formData2, setFormData2] = useState({});
  const [athleteData, setAthleteData] = useState(null);
  const [sponsorData, setSponsorData] = useState(null);
  const param = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${param.id}`
        ); // Use axios.get
        setUserData(response.data); // Use response.data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();

    const fetchAthleteData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/athlete"); // Use axios.get
        setAthleteData(response.data); // Use response.data
      } catch (error) {
        console.error("Error fetching athlete data:", error);
      }
    };
    fetchAthleteData();

    const fetchSponsorsData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/sponsor"); // Use axios.get
        setSponsorData(response.data); // Use response.data
      } catch (error) {
        console.error("Error fetching athlete data:", error);
      }
    };
    fetchSponsorsData();
  }, [param.id]);

  useEffect(() => {
    if (athleteData && athleteData.length > 0) {
      let currentUserAthleteData = null;
      for (let i = 0; i < athleteData.length; i++) {
        if (athleteData[i].userId != null && athleteData[i].userId === param.id) {
          currentUserAthleteData = athleteData[i];
          console.log("currentUserAthleteData insife ",currentUserAthleteData)
          break; // Exit the loop once the user is found
        }
      }

  
      if (currentUserAthleteData) {
        setFormData(currentUserAthleteData);
      }
    }
  }, [athleteData, param.id]);

  useEffect(() => {
    
    if (sponsorData && sponsorData.length > 0) {
      let currentUserSponsorData = null;
      for (let i = 0; i < sponsorData.length; i++) {
        if (sponsorData[i].userId != null && sponsorData[i].userId === param.id) {
          currentUserSponsorData = sponsorData[i];
          console.log("currentUserSponsorData insife ",currentUserSponsorData)
          break; // Exit the loop once the user is found
        }
      }

  
      if (currentUserSponsorData) {
        setFormData2(currentUserSponsorData);
      }
    }
  }, [sponsorData, param.id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChange2 = (e) => {
    setFormData2({ ...formData2, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      

      const currentUserAthleteData = athleteData.find(
        (athlete) => athlete.userId === param.id
      );

      console.log("currentAthlete : ", currentUserAthleteData);
      console.log(currentUserAthleteData === undefined);
      if (currentUserAthleteData !== undefined) {
        response = await axios.put(
          `http://localhost:5000/athlete/${currentUserAthleteData._id}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        let updateAthlete = { ...formData, userId: param.id };
        console.log("updateAthlete", formData);
        response = await axios.post(
          "http://localhost:5000/athlete",
          updateAthlete,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
      }
    } catch (err) {
      console.error("Error updating/creating athlete profile:", err);
    }
    setModalOpened(false);
  };


  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      let response;
      console.log("sponsorData: ",sponsorData) ;
      let currentUserSponsorData ; 
      // Check if the user is a sponsor based on some criteria
      for (let i = 0; i < sponsorData.length; i++) {
        if (sponsorData[i].userId != null && sponsorData[i].userId === param.id) {
          currentUserSponsorData = sponsorData[i];
          console.log("currentUserAthleteData insife ",currentUserSponsorData)
          break; // Exit the loop once the user is found
        }
      }
  
      console.log("currentSponsor : ", currentUserSponsorData);
      console.log(currentUserSponsorData === undefined);
  
      if (currentUserSponsorData !== undefined) {
        // If sponsor data exists for the current user, update it
        response = await axios.put(
          `http://localhost:5000/sponsor/${currentUserSponsorData._id}`,
          formData2,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        // If no sponsor data exists for the current user, create new sponsor data
        let newSponsor = { ...formData2, userId: param.id };
        console.log("newSponsor", newSponsor);
        response = await axios.post(
          "http://localhost:5000/sponsor",
          newSponsor,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
      }
    } catch (err) {
      console.error("Error updating/creating sponsor profile:", err);
    }
    setModalOpened(false);
  };
  
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm" onSubmit={handleSubmit}>
        {!userData.isSponsor && (
          <>
            <h3>Athlete Profile</h3>
            <div>
              <input
                value={formData.name || ""}
                onChange={handleChange}
                type="text"
                placeholder="Name"
                name="name"
                className="infoInput"
                required
              />
              <input
                value={formData.gender || ""}
                onChange={handleChange}
                type="text"
                placeholder="Gender"
                name="gender"
                className="infoInput"
                required
              />
            </div>
            <div>
              <input
                value={formData.age || ""}
                onChange={handleChange}
                type="number"
                placeholder="Age"
                name="age"
                className="infoInput"
              />
              
              <input
                value={formData.height || ""}
                onChange={handleChange}
                type="number"
                placeholder="Height"
                name="height"
                className="infoInput"
              />
              <input
                value={formData.weight || ""}
                onChange={handleChange}
                type="number"
                placeholder="Weight"
                name="weight"
                className="infoInput"
              />
            </div>
            <div>
              <input
                value={formData.educationLevel || ""}
                onChange={handleChange}
                type="text"
                placeholder="Education Level"
                name="educationLevel"
                className="infoInput"
              />
              <input
                value={formData.trainingHistoryYears || ""}
                onChange={handleChange}
                type="number"
                placeholder="Training History Years"
                name="trainingHistoryYears"
                className="infoInput"
              />
            </div>
            <div>
              <input
                value={formData.level || ""}
                onChange={handleChange}
                type="text"
                placeholder="Level"
                name="level"
                className="infoInput"
              />
              <input
                value={formData.sport || ""}
                onChange={handleChange}
                type="text"
                placeholder="Sport"
                name="sport"
                className="infoInput"
              />
            </div>
            <div>
              <input
                value={formData.achievements || ""}
                onChange={handleChange}
                type="text"
                placeholder="Achievements"
                name="achievements"
                className="infoInput"
              />
              <input
                value={formData.location || ""}
                onChange={handleChange}
                type="text"
                placeholder="Location"
                name="location"
                className="infoInput"
              />
            </div>
            <div>
              <input
                value={formData.desiredSponsorshipType}
                onChange={handleChange}
                type="text"
                placeholder="Desired Sponsorship Type"
                name="desiredSponsorshipType"
                className="infoInput"
              />
              <input
                value={formData.socialMediaFollowers}
                onChange={handleChange}
                type="number"
                placeholder="Social Media Followers"
                name="socialMediaFollowers"
                className="infoInput"
              />
              <input
                value={formData.annualIncome}
                onChange={handleChange}
                type="text"
                placeholder="Annual Income"
                name="annualIncome"
                className="infoInput"
              />
            </div>
            <button
              type="button" // Set type as button to prevent form submission
              className="button infoButton" // Apply button styles
              onClick={handleSubmit} // Call handlePrint function on click
            >
              Submit
            </button>
          </>
        )}
        {userData.isSponsor && (
          <>
            <h3>Sponsor Profile</h3>
            <div>
              <input
                value={formData2["Company Name"] || ""}
                onChange={handleChange2}
                type="text"
                placeholder="Company Name"
                name="Company Name"
                className="infoInput"
                required
              />
              <input
                value={formData2["Industry"] || ""}
                onChange={handleChange2}
                type="text"
                placeholder="Industry"
                name="Industry"
                className="infoInput"
              />
            </div>
            <div>
              <input
                value={formData2["Budget Range"] || ""}
                onChange={handleChange2}
                type="text"
                placeholder="Budget Range"
                name="Budget Range"
                className="infoInput"
              />
              <input
                value={formData2["Location"] || ""}
                onChange={handleChange2}
                type="text"
                placeholder="Location"
                name="Location"
                className="infoInput"
              />
            </div>
            <div>
              <input
                value={formData2["Target Audience"] || ""}
                onChange={handleChange2}
                type="text"
                placeholder="Target Audience"
                name="Target Audience"
                className="infoInput"
              />
              <input
                value={formData2["Marketing Goals"] || ""}
                onChange={handleChange2}
                type="text"
                placeholder="Marketing Goals"
                name="Marketing Goals"
                className="infoInput"
              />
            </div>
            <div>
              <input
                value={formData2["Commitment Level Years"] || ""}
                onChange={handleChange2}
                type="number"
                placeholder="Commitment Level Years"
                name="Commitment Level Years"
                className="infoInput"
              />
              <input
                value={formData2["Preferred Sport"] || ""}
                onChange={handleChange2}
                type="text"
                placeholder="Preferred Sport"
                name="Preferred Sport"
                className="infoInput"
              />
            </div>
            <button
              type="button" // Set type as button to prevent form submission
              className="button infoButton" // Apply button styles
              onClick={handleSubmit2} // Call handlePrint function on click
            >
              Submit
            </button>
          </>
        )}
      </form>
    </Modal>
  );
};

export default AthleteSponsorModal;
