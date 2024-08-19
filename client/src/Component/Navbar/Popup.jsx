import React from "react";
import "./Popup.css"; // Add your popup styles here

const Popup = ({ points, videosWatched, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>User Points</h2>
        <p>Points: {points}</p>
        <p>Videos Watched: {videosWatched}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
