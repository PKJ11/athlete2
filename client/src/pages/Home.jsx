import React from "react";
import PostSide from "../components/PostSide/PostSide";
import ProfileSide from "../components/profileSide/ProfileSide";
import RightSide from "../components/RightSide/RightSide";
import "./Home.css";

const Home = () => {
  return (
    <div className="Home" style={{ padding: "1rem 1rem",background:'#001f3f' }}>
      
      <div className="HomeConatiner">
        <ProfileSide />
        <PostSide />
        <RightSide />
      </div>
    </div>
  );
};

export default Home;
