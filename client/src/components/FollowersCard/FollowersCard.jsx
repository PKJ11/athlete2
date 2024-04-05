import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import FollowersModal from "../FollowersModal/FollowersModal";
import { getAllUser } from "../../api/UserRequests";
import User from "../User/User";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { FaSearch } from "react-icons/fa"; // Import search icon

const FollowersCard = ({ location }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
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
    navigate(`/profile/${userId}`);
  };

  // Filter persons based on search term
  const filteredPersons = persons.filter((person) =>
    person.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="FollowersCard">
      <h3>Recommended Users:</h3>

      {/* Search input */}
      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="search-icon">
          <FaSearch />
        </div>
      </div>

      {filteredPersons.map((person, id) => {
        if (person._id !== user._id) {
          return (
            <User
              style={{ cursor: "pointer" }}
              person={person}
              key={id}
              onClick={() => handleProfileClick(person._id)}
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
