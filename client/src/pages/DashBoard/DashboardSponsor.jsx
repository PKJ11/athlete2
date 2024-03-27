import Select from "react-select";
import React, { useState, useEffect } from "react";
import "./DashBoard.css";

const DashboardSponsor = () => {
  const [allSponsorData, setAllSponsorData] = useState([]);
  const [visibleSponsorData, setVisibleSponsorData] = useState([]);
  const [initialDataCount, setInitialDataCount] = useState(20);
  const [showMoreDataCount, setShowMoreDataCount] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  useEffect(() => {
    const fetchSponsorData = async () => {
      try {
        const response = await fetch("http://localhost:5000/sponsor");
        const data = await response.json();
        setAllSponsorData(data);
        setVisibleSponsorData(data.slice(0, initialDataCount));
      } catch (error) {
        console.error("Error fetching sponsor data:", error);
      }
    };

    fetchSponsorData();
  }, [initialDataCount]);

  useEffect(() => {
    // Implementing debouncing technique
    const delaySearch = setTimeout(() => {
      filterVisibleSponsors();
    }, 300); // Adjust the delay time as needed (e.g., 300 milliseconds)

    // Cleanup function to clear timeout
    return () => clearTimeout(delaySearch);
  }, [searchTerm, selectedIndustry, allSponsorData]);

  const filterVisibleSponsors = () => {
    let filteredData = allSponsorData;

    // Filter by search term
    if (searchTerm) {
      filteredData = filteredData.filter((sponsor) =>
        sponsor.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected industry
    if (selectedIndustry) {
      filteredData = filteredData.filter(
        (sponsor) => sponsor.industry === selectedIndustry.value
      );
    }

    setVisibleSponsorData(filteredData.slice(0, initialDataCount));
  };

  const handleShowMoreData = () => {
    setVisibleSponsorData(
      allSponsorData.slice(0, initialDataCount + showMoreDataCount)
    );
    setInitialDataCount((prevCount) => prevCount + showMoreDataCount);
  };

  const handleShowLessData = () => {
    setVisibleSponsorData(
      allSponsorData.slice(0, initialDataCount - showMoreDataCount)
    );
    setInitialDataCount((prevCount) => prevCount - showMoreDataCount);
  };

  const extractIndustryOptions = (data) => {
    const industrySet = new Set();
    data.forEach((sponsor) => {
      industrySet.add(sponsor.industry);
    });
    return Array.from(industrySet).map((industry) => ({
      label: industry,
      value: industry,
    }));
  };

  const industryOptions = extractIndustryOptions(allSponsorData);

  return (
    <div className="dashboard-container">
      <h2>All Sponsor Data</h2>
      <div className="filter-container">
        {/* <input
          type="text"
          placeholder="Search by company name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-input"
        />
        <Select
          options={industryOptions}
          value={selectedIndustry}
          onChange={(selectedOption) => setSelectedIndustry(selectedOption)}
          placeholder="Select industry..."
          className="filter-select"
        /> */}
      </div>

      <div className="athlete-cards-container">
        {console.log(visibleSponsorData)}
        {visibleSponsorData.map((sponsor) => (
          <div key={sponsor._id} className="athlete-card">
            <div className="athlete-details ">
              <h3>{sponsor["Company Name"]}</h3>
              <p>
                <strong>Industry:</strong> {sponsor.Industry}
              </p>
              <p>
                <strong>Budget Range:</strong> {sponsor["Budget Range"]}
              </p>
              <p>
                <strong>Location:</strong> {sponsor.Location}
              </p>
              <p>
                <strong>Target Audience:</strong> {sponsor["Target Audience"]}
              </p>
              <p>
                <strong>Marketing Goals:</strong> {sponsor["Marketing Goals"]}
              </p>
              <p>
                <strong>Commitment Level Years:</strong>{" "}
                {sponsor["Commitment Level Years"]}
              </p>
              <p>
                <strong>Preferred Sport:</strong> {sponsor["Preferred Sport"]}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="button-container">
        {allSponsorData.length > initialDataCount && (
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

export default DashboardSponsor;