import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { viewvideo } from "../../action/video";
import { addtohistory } from "../../action/history";
import { isWithinAllowedTime } from "../../Component/utils/timeUtils.js";
import VideoPlayer from "../../Component/VideoPlayer/Videoplayer.jsx";
import Likewatchlatersavebtns from "./Likewatchlatersavebtns";
import Comment from "../../Component/Comment/Comment";
import "./Videopage.css";

const Videopage = () => {
  const { vid } = useParams();
  const dispatch = useDispatch();
  const vids = useSelector((state) => state.videoreducer);
  const vv = vids?.data?.filter((q) => q._id === vid)[0];
  const canMakeCall = isWithinAllowedTime();

  const currentuser = useSelector((state) => state.currentuserreducer);

  const handleviews = () => {
    dispatch(viewvideo({ id: vid }));
  };

  const handlehistory = () => {
    dispatch(
      addtohistory({
        videoid: vid,
        viewer: currentuser?.result._id,
      })
    );
  };

  useEffect(() => {
    if (currentuser) {
      handlehistory();
    }
    handleviews();
  }, []);

  const [currentVideo, setCurrentVideo] = useState(
    `http://localhost:5353/${vv?.filepath}`
  );

  const nextVideo = () => {
    console.log("next video");
    // Logic to switch to the next video
  };

  const showComments = () => {
    console.log("showComments");
    // Logic to show comments section
  };

  const showLocation = () => {
    console.log("showLocation");
    // Logic to show location and temperature
  };

  return (
    <>
      <div className="container_videoPage">
        <div className="container2_videoPage">
          <div className="video_display_screen_videoPage">
            <VideoPlayer
              videoSrc={`http://localhost:5353/${vv?.filepath}`}
              nextVideo={nextVideo}
              showComments={showComments}
              showLocation={showLocation}
            />
            <div className="video_details_videoPage">
              <div className="video_btns_title_VideoPage_cont">
                <p className="video_title_VideoPage">{vv?.videotitle}</p>
                <div className="views_date_btns_VideoPage">
                  <div className="views_videoPage">
                    {vv?.views} views <div className="dot"></div>{" "}
                    {moment(vv?.createdat).fromNow()}
                  </div>
                  <Likewatchlatersavebtns vv={vv} vid={vid} />
                </div>
              </div>
              <div>
                <h1>Welcome to VoIP App</h1>
                {canMakeCall ? (
                  <Link to="/call">Start Video Call</Link>
                ) : (
                  <p>Video calls are only available between 6 PM and 12 AM.</p>
                )}
              </div>
              <Link to={"/"} className="chanel_details_videoPage">
                <b className="chanel_logo_videoPage">
                  <p>{vv?.uploader.charAt(0).toUpperCase()}</p>
                </b>
                <p className="chanel_name_videoPage">{vv?.uploader}</p>
              </Link>
              <div className="comments_VideoPage">
                <h2>
                  <u>Comments</u>
                </h2>
                <Comment videoid={vv?._id} />
              </div>
            </div>
          </div>
          <div className="moreVideoBar">More videos</div>
        </div>
      </div>
    </>
  );
};

export default Videopage;