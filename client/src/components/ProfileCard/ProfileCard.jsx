import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  FaUser,
  FaBirthdayCake,
  FaDollarSign,
  FaGraduationCap,
  FaVenusMars,
  FaRulerVertical,
  FaTrophy,
  FaMapMarkerAlt,
  FaUsers,
  FaRunning,
  FaClock,
  FaIdBadge,
  FaWeightHanging,
} from "react-icons/fa";
import {  FaBuilding, FaIndustry, FaBullseye, FaCalendarAlt } from 'react-icons/fa';


const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sponsorData, setSponsorData] = useState(null);
  const [currentUserSponsorData, setCurrentUserSponsorData] = useState(null);
  const [athleteData, setAthleteData] = useState(null);
  const [currentUserAthleteData, setCurrentUserAthleteData] = useState(null);

  useEffect(() => {
    const fetchSponsorsData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/sponsor`);
        setSponsorData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchSponsorsData();

    const fetchAthleteData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/athlete");
        setAthleteData(response.data);
      } catch (error) {
        console.error("Error fetching athlete data:", error);
      }
    };
    fetchAthleteData();
  }, [id]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${id}`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  useEffect(() => {
    if (sponsorData && sponsorData.length > 0) {
      let currentUserSponsorData = null;
      for (let i = 0; i < sponsorData.length; i++) {
        if (sponsorData[i].userId != null && sponsorData[i].userId === id) {
          currentUserSponsorData = sponsorData[i];
          setCurrentUserSponsorData(currentUserSponsorData);
          break;
        }
      }
    }
  }, [sponsorData, id]);

  useEffect(() => {
    if (athleteData && athleteData.length > 0) {
      let currentUserAthleteData = null;
      for (let i = 0; i < athleteData.length; i++) {
        if (athleteData[i].userId != null && athleteData[i].userId === id) {
          currentUserAthleteData = athleteData[i];
          setCurrentUserAthleteData(currentUserAthleteData);
          break;
        }
      }
    }
  }, [athleteData, id]);

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        {userData ? (
          <>
            <img
              src={
                userData.profilePicture
                  ? serverPublic + userData.profilePicture
                  : serverPublic + "defaultProfile.png"
              }
              alt="ProfileImage"
              style={{ width: "100px", height: "100px" }}
            />
          </>
        ) : (
          <>
            <img
              src={
                user.coverPicture
                  ? serverPublic + user.coverPicture
                  : serverPublic + "defaultCover.jpg"
              }
              alt="CoverImage"
            />
            <img
              src={
                user.profilePicture
                  ? serverPublic + user.profilePicture
                  : serverPublic + "defaultProfile.png"
              }
              alt="ProfileImage"
            />
          </>
        )}
      </div>
      <div className="ProfileName">
        <span>
          {userData ? userData.firstname : user.firstname}{" "}
          {userData ? userData.lastname : user.lastname}
        </span>
        <span>
          {userData
            ? userData.worksAt || "Write about yourself"
            : user.worksAt || "Write about yourself"}
        </span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>
              {userData ? userData.followers.length : user.followers.length}
            </span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>
              {userData ? userData.following.length : user.following.length}
            </span>
            <span>Following</span>
          </div>
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {currentUserAthleteData && (
  <div className="grid-container">
    <div className="cell ">
    <span></span>
        <span></span>
        <span></span>
        <span></span>
      <FaUser />
      <p><strong>Name:</strong> {currentUserAthleteData.name}</p>
    </div>
    <div className="cell">
      <FaVenusMars />
      <p><strong>Gender:</strong> {currentUserAthleteData.gender}</p>
    </div>
    <div className="cell">
      <FaBirthdayCake />
      <p><strong>Age:</strong> {currentUserAthleteData.age}</p>
    </div>
    <div className="cell">
      <FaRulerVertical />
      <p><strong>Height:</strong> {currentUserAthleteData.height}</p>
    </div>
    <div className="cell">
      <FaWeightHanging />
      <p><strong>Weight:</strong> {currentUserAthleteData.weight}</p>
    </div>
    <div className="cell">
      <FaGraduationCap />
      <p><strong>Education Level:</strong> {currentUserAthleteData.educationLevel}</p>
    </div>
    <div className="cell">
      <FaClock />
      <p><strong>Training History Years:</strong> {currentUserAthleteData.trainingHistoryYears}</p>
    </div>
    <div className="cell">
      <FaTrophy />
      <p><strong>Level:</strong> {currentUserAthleteData.level}</p>
    </div>
    <div className="cell">
      <FaRunning />
      <p><strong>Sport:</strong> {currentUserAthleteData.sport}</p>
    </div>
    <div className="cell">
      <FaMapMarkerAlt />
      <p><strong>Location:</strong> {currentUserAthleteData.location}</p>
    </div>
    <div className="cell">
      <FaIdBadge />
      <p><strong>Desired Sponsorship Type:</strong> {currentUserAthleteData.desiredSponsorshipType}</p>
    </div>
    <div className="cell">
      <FaUsers />
      <p><strong>Social Media Followers:</strong> {currentUserAthleteData.socialMediaFollowers}</p>
    </div>
    <div className="cell">
      <FaDollarSign />
      <p><strong>Annual Income:</strong> {currentUserAthleteData.annualIncome}</p>
    </div>
  </div>
)} 
{currentUserSponsorData && (
  <div className="grid-container">
    <div className="cell">
      <FaDollarSign />
      <p><strong>Budget Range:</strong> {currentUserSponsorData["Budget Range"]}</p>
    </div>
    <div className="cell">
      <FaCalendarAlt />
      <p><strong>Commitment Level Years:</strong> {currentUserSponsorData["Commitment Level Years"]}</p>
    </div>
    <div className="cell">
      <FaBuilding />
      <p><strong>Company Name:</strong> {currentUserSponsorData["Company Name"]}</p>
    </div>
    <div className="cell">
      <FaIndustry />
      <p><strong>Industry:</strong> {currentUserSponsorData["Industry"]}</p>
    </div>
    <div className="cell">
      <FaMapMarkerAlt />
      <p><strong>Location:</strong> {currentUserSponsorData["Location"]}</p>
    </div>
    <div className="cell">
      <FaBullseye />
      <p><strong>Marketing Goals:</strong> {currentUserSponsorData["Marketing Goals"]}</p>
    </div>
    <div className="cell">
      <FaRunning />
      <p><strong>Preferred Sport:</strong> {currentUserSponsorData["Preferred Sport"]}</p>
    </div>
    <div className="cell">
      <FaUsers />
      <p><strong>Target Audience:</strong> {currentUserSponsorData["Target Audience"]}</p>
    </div>
  </div>
)}


      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            to={`/profile/${user._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
