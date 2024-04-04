import React from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import RightSide from "../../components/RightSide/RightSide";

import NavIcons from "../../components/NavIcons/NavIcons";
const SponsorProfile = () => {
  return (
    <div>
      <div className="Profile" style={{ padding: "1rem 1rem " }}>
        <ProfileLeft />
        <div className="Profile-center">
          <ProfileCard location="profilePage" />
          <PostSide />
        </div>
        <RightSide />
      </div>
    </div>
  );
};

export default SponsorProfile;
