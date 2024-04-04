import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import FollowersModal from "../FollowersModal/FollowersModal";
import { getAllUser } from "../../api/UserRequests";
import User from "../User/User";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const FollowersCard = ({ location }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);

  const handleProfileClick = (userId) => {
    console.log("hi")
    navigate(`/profile/${userId}`); // Use navigate to navigate to user profile
  };

  return (
    <div className="FollowersCard">
      <h3>Recommended Users:</h3>

      {persons.map((person, id) => {
        console.log("hi") ; 
        if (person._id !== user._id) {
          console.log(person._id)
          return (
            
            <User
              style={{ cursor: "pointer" }} // Apply cursor pointer style
              person={person}
              key={id}

              onClick={() => handleProfileClick(person._id)} // Add onClick event
            />
          );
        }
        return null;
      })}
      {!location ? (
        <span onClick={() => setModalOpened(true)}>Show more</span>
      ) : (
        ""
      )}

      <FollowersModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />
    </div>
  );
};

export default FollowersCard;
