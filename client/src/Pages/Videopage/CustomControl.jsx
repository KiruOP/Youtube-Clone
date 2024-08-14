import React from "react";
import "./CustomControl.css";

const CustomControls = ({ onPlayPause, onForward, onBackward, isPlaying }) => {
  return (
    <div className="controls-container">
      <button onClick={onBackward} className="control-button">
        -10s
      </button>
      <button onClick={onPlayPause} className="control-button">
        {isPlaying ? "Pause" : "Play"}
      </button>
      <button onClick={onForward} className="control-button">
        +10s
      </button>
    </div>
  );
};

export default CustomControls;
