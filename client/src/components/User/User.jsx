import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const User = ({ person }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  
  const [following, setFollowing] = useState(person.followers.includes(user._id));

  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };

  return (
    <div className="follower">
      <div>
        {/* Wrap the image inside a Link component */}
        <Link to={`/profile/${person._id}`}>
          <img
            src={
              publicFolder + (person.profilePicture ? person.profilePicture : "defaultProfile.png")
            }
            alt="profile"
            className="followerImage"
          />
        </Link>
        <div className="name">
          <span>{person.firstname}</span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button
        className={following ? "button fc-button UnfollowButton" : "button fc-button"}
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
