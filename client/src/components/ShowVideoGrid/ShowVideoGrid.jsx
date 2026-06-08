import React from "react";
import "./ShowVideoGrid.css";
import Showvideo from "../ShowVideo/ShowVideo";

const ShowVideoGrid = ({ vid }) => {
  return (
    <div className="Container_ShowVideoGrid">
      {vid?.reverse().map((vi) => {
        return (
          <div key={vi._id} className="video_box_app">
            <Showvideo vid={vi} />
          </div>
        );
      })}
    </div>
  );
};

export default ShowVideoGrid;