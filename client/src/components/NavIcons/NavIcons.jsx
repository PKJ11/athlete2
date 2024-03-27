import React from "react";
import { FaHome, FaStar, FaComment, FaUser } from 'react-icons/fa'; // Import icons from react-icons
import { AiOutlineSetting } from 'react-icons/ai'; // Import the AiOutlineSetting icon
import { Link } from "react-router-dom";
import LogoSearch from "../LogoSearch/LogoSearch";
import { useDispatch, useSelector } from "react-redux";
 

const NavIcons = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  // console.log(user);

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
          <AiOutlineSetting className="icon black" /> 
          <span className="iconName">Settings</span>
        </div>
        <div className="iconContainer">
          <Link to={`../recommend/${user._id}`}> {/* Updated link to recommendation page */}
            <FaStar className="icon black" /> {/* Replaced with FaStar for recommendation */}
          </Link>
          <span className="iconName">Recommendation</span> {/* Updated icon name */}
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
