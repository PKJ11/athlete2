import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./DashBoard.css";
import athleteImage from "../../img/athlete2.webp";
import footBall from "../../img/football.webp";
import cricket from "../../img/cricket.jpg";
import vooly from "../../img/vooly.webp";
import tennis from "../../img/tennis.jpg";

const DashboardAthlete = () => {
  const [allAthleteData, setAllAthleteData] = useState([]);
  const [visibleAthleteData, setVisibleAthleteData] = useState([]);
  const [initialDataCount, setInitialDataCount] = useState(20);
  const [showMoreDataCount, setShowMoreDataCount] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState(null);

  useEffect(() => {
    const fetchAthleteData = async () => {
      try {
        const response = await fetch("http://localhost:5000/athlete");
        const data = await response.json();
        setAllAthleteData(data);
        setVisibleAthleteData(data.slice(0, initialDataCount));
      } catch (error) {
        console.error("Error fetching athlete data:", error);
      }
    };

    fetchAthleteData();
  }, [initialDataCount]);

  useEffect(() => {
    // Implementing debouncing technique
    const delaySearch = setTimeout(() => {
      filterVisibleAthletes();
    }, 300); // Adjust the delay time as needed (e.g., 300 milliseconds)

    // Cleanup function to clear timeout
    return () => clearTimeout(delaySearch);
  }, [searchTerm, selectedSport, allAthleteData]);

  const filterVisibleAthletes = () => {
    let filteredData = allAthleteData;

    // Filter by search term
    if (searchTerm) {
      filteredData = filteredData.filter((athlete) =>
        athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected sport
    if (selectedSport) {
      filteredData = filteredData.filter(
        (athlete) => athlete.sport === selectedSport.value
      );
    }

    setVisibleAthleteData(filteredData.slice(0, initialDataCount));
  };

  const handleShowMoreData = () => {
    setVisibleAthleteData(
      allAthleteData.slice(0, initialDataCount + showMoreDataCount)
    );
    setInitialDataCount((prevCount) => prevCount + showMoreDataCount);
  };

  const handleShowLessData = () => {
    setVisibleAthleteData(
      allAthleteData.slice(0, initialDataCount - showMoreDataCount)
    );
    setInitialDataCount((prevCount) => prevCount - showMoreDataCount);
  };

  const extractSportsOptions = (data) => {
    const sportsSet = new Set();
    data.forEach((athlete) => {
      sportsSet.add(athlete.sport);
    });
    return Array.from(sportsSet).map((sport) => ({ label: sport, value: sport }));
  };

  const sportsOptions = extractSportsOptions(allAthleteData);

  return (
    <div className="dashboard-container">
      <h2>Athletes Data</h2>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-input"
        />
        <Select
          options={sportsOptions}
          value={selectedSport}
          onChange={(selectedOption) => setSelectedSport(selectedOption)}
          placeholder="Select sport..."
          className="filter-select"
        />
      </div>

      <div className="athlete-cards-container">
        {visibleAthleteData.map((athlete) => (
          <div key={athlete._id} className="athlete-card">
            {/* Conditionally render athlete image based on sport */}
            {athlete.sport === "Football" && (
              <img src={footBall} alt="Football" className="athlete-image" />
            )}
            {athlete.sport === "Cricket" && (
              <img src={cricket} alt="Cricket" className="athlete-image" />
            )}
            {athlete.sport === "Volleyball" && (
              <img src={vooly} alt="Volleyball" className="athlete-image" />
            )}
            {athlete.sport === "Tennis" && (
              <img src={tennis} alt="Tennis" className="athlete-image" />
            )}
            {/* If the sport is none of the above, show default athlete image */}
            {!["Football", "Cricket", "Volleyball", "Tennis"].includes(
              athlete.sport
            ) && (
              <img
                src={athleteImage}
                alt="Athlete"
                className="athlete-image"
              />
            )}
            <div className="athlete-details">
              <h3>{athlete.name}</h3>
              <p>
                <strong>Gender:</strong> {athlete.gender}
              </p>
              <p>
                <strong>Age:</strong> {athlete.age}
              </p>
              <p>
                <strong>Height:</strong> {athlete["height "]}
              </p>
              <p>
                <strong>Weight:</strong> {athlete.weight}
              </p>
              <p>
                <strong>Education Level:</strong> {athlete["education Level"]}
              </p>
              <p>
                <strong>Training History (Years):</strong>{" "}
                {athlete.trainingHistoryYears}
              </p>
              <p>
                <strong>Level:</strong> {athlete.level}
              </p>
              <p>
                <strong>Sport:</strong> {athlete.sport}
              </p>
              <p>
                <strong>Achievements:</strong> {athlete.achievements}
              </p>
              <p>
                <strong>Location:</strong> {athlete.Location}
              </p>
              <p>
                <strong>Desired Sponsorship Type:</strong>{" "}
                {athlete.desiredSponsorshipTypeType}
              </p>
              <p>
                <strong>Social Media Followers:</strong>{" "}
                {athlete.socialMediaFollowers}
              </p>
              <p>
                <strong>Annual Income:</strong> {athlete.annualIncome}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="button-container">
        {allAthleteData.length > initialDataCount && (
          <button className="show-more-button" onClick={handleShowMoreData}>
            Show More
          </button>
        )}
        {initialDataCount > 20 && (
          <button className="show-less-button" onClick={handleShowLessData}>
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default DashboardAthlete;
