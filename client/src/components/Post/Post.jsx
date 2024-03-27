import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost } from "../../api/PostsRequests";
import { createChat, findChat } from "../../api/ChatRequests";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [userData, setUserData] = useState(null); // State to hold user data
  const navigate = useNavigate();
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${data.userId}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [data.userId]);
  console.log(data.userId);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const handleComment = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/chat/${user._id}`
      );
      const existingChat = response.data.find((chat) =>
        chat.members.includes(data.userId)
      );

      if (!existingChat && user._id !== data.userId) {
        const chatData = {
          senderId: user._id,
          receiverId: data.userId,
        };
        await axios.post("http://localhost:5000/chat/", chatData);
      }

      navigate("/chat");
    } catch (error) {
      console.error("Error checking or creating chat:", error);
    }
  };

  return (
    <div className="Post">
      {userData && (
        <div style={{ display: "flex" }}>
          {/* Wrap profile picture inside Link */}
          <Link to={`/profile/${data.userId}`}>
            <img
              src={
                publicFolder + userData.profilePicture
                  ? publicFolder + userData.profilePicture
                  : publicFolder + "defaultProfile.png"
              }
              alt="profile"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
          </Link>
          {/* Second div for user's name */}
          <div>
            <div>
              <span style={{ fontWeight: "bold" }}>
                {userData.firstname} {userData.lastname}
              </span>
            </div>
            <div>
              <span>{userData.worksAt}</span>
            </div>
          </div>
        </div>
      )}

      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img
          src={Comment}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleComment}
        />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
