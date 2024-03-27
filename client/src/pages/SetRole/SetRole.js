import React from "react";
import { FaUser,FaRunning } from "react-icons/fa";
import "./SetRole.css";

const SetRole = () => {
  return (
    <div
      style={{
        backgroundColor: "#001f3f",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="myButton" style={{marginRight:'20px'}}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div style={{ display: "flex" }}>
          <FaRunning className="icon" style={{marginRight:'10px'}}/>
          <div>Registered as Athlete</div>
        </div>
      </div>
      <div className="myButton">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div style={{ display: "flex" }}>
          <FaUser className="icon" style={{marginRight:'10px'}}/>
          <div>Registered as Sponsors</div>
        </div>
      </div>
    </div>
  );
};

export default SetRole;
