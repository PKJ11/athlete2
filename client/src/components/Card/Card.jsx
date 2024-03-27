// Card.js

import React from 'react';
import { FaIndustry, FaMapMarkerAlt, FaUsers, FaBullseye, FaChartLine, FaMoneyBillAlt } from 'react-icons/fa';
import './Card.css';

const Card = ({ sponsor }) => {
    return (
        <div className="card">
            <div className="card-header">
                <h3>{sponsor["Company Name"]}</h3>
            </div>
            <div className="card-body">
                <p>
                    <FaIndustry /> Industry: {sponsor.Industry}
                </p>
                <p>
                    <FaMoneyBillAlt /> Budget Range: {sponsor["Budget Range"]}
                </p>
                <p>
                    <FaMapMarkerAlt /> Location: {sponsor.Location}
                </p>
                <p>
                    <FaBullseye /> Target Audience: {sponsor["Target Audience"]}
                </p>
                <p>
                    <FaChartLine /> Marketing Goals: {sponsor["Marketing Goals"]}
                </p>
            </div>
        </div>
    );
}

export default Card;
