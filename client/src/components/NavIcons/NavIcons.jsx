import React from "react";
import { FaHome, FaStar, FaComment, FaUser,FaNewspaper  } from 'react-icons/fa'; // Import icons from react-icons
import { AiOutlineSetting } from 'react-icons/ai'; // Import the AiOutlineSetting icon
import { Link } from "react-router-dom";
import LogoSearch from "../LogoSearch/LogoSearch";
import { useDispatch, useSelector } from "react-redux";
 

const NavIcons = () => {
  const { user } = useSelector((state) => state.authReducer.authData);

  return (
    <div className="navIcons">
      <LogoSearch />
      <div className="Icons">
        <div className="iconContainer">
          <Link to="../home">
            <FaHome className="icon black" />
          </Link>
          <span className="iconName">Home</span>
        </div>
        <div className="iconContainer">
          <Link to="/currentNews"> {/* Updated link to currentNews */}
            <FaNewspaper className="icon black" /> {/* Replaced with FaNewspaper for news */}
          </Link>
          <span className="iconName">News</span> {/* Updated icon name */}
        </div>
        <div className="iconContainer">
          <Link to={`../recommend/${user._id}`}>
            <FaStar className="icon black" />
          </Link>
          <span className="iconName">Recommendation</span>
        </div>
        <div className="iconContainer">
          <Link to="../chat">
            <FaComment className="icon black" />
          </Link>
          <span className="iconName">Chat</span>
        </div>
        <div className="iconContainer">
          <Link to={`../profile/${user._id}`}>
            <FaUser className="icon black" />
          </Link>
          <span className="iconName">Profile</span>
        </div>
      </div>
    </div>
  );
};

export default NavIcons;
