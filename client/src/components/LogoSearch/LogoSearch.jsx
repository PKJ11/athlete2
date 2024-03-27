import React, { useState } from "react";
import Logo from "../../img/ac.jpeg";
import { UilSearch } from '@iconscout/react-unicons';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useNavigate } from 'react-router-dom';

const LogoSearch = () => {
  // Options for the dropdown menu
  const options = [
    { value: 'sponsor', label: 'Sponsor' },
    { value: 'athlete', label: 'Athlete' }
  ];

  // State to manage the selected option
  const [selectedOption, setSelectedOption] = useState(options[0]);
  
  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if(option.value === "sponsor") {
      navigate("/sponsorDashboard");
    } else if(option.value === "athlete") {
      navigate("/athleteDashboard");
    }
  };

  return (
    <div className="LogoSearch" style={{ display: "flex", alignItems: "center" }}>
      <img src={Logo} alt="" style={{ width: "50px", height: "50px", marginRight: "20px" }} />
      {/* Dropdown component */}
      <Dropdown options={options} value={selectedOption} onChange={handleOptionSelect} placeholder="Select Option" style={{ width: "150px", height: "50px", marginRight: "20px" }}  />
    </div>
  );
};

export default LogoSearch;
