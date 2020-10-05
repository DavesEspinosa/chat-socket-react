import React from "react";
import "./InfoBar.css";
import closeIcon from "../icons/closeIcon.png";
import onlineIcon from "../icons/onlineIcon.png";

function InfoBar({ room }) {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online" />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        {/* full refresh because, we have to change the query for the direction bar */}
        <a href="/">
          <img src={closeIcon} alt="close" />{" "}
        </a>
      </div>
    </div>
  );
}

export default InfoBar;
