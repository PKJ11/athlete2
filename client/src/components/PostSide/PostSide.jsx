import React from "react";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import "./PostSide.css";
import NavIcons from "../NavIcons/NavIcons";

const PostSide = () => {
  return (
    <div className="PostSide">
    
      <PostShare/>
      <Posts/>
    </div>
  );
};

export default PostSide;
