import React, { useEffect, useState, useRef } from "react";
import "./Videopage.css";
import moment from "moment";
import Likewatchlatersavebtns from "./Likewatchlatersavebtns";
import { useParams, Link } from "react-router-dom";
import Comment from "../../Component/Comment/Comment";
// import vidd from "../../Component/Video/vid.mp4"
import { viewvideo } from "../../action/video";
import { addtohistory } from "../../action/history";
import { useSelector, useDispatch } from "react-redux";
import {
  updatePoints,
  getUserProfile,
} from "../../action/userPointsActions.js";
import CustomControls from "./CustomControl";
import VideoPlayer from "../../Component/VideoPlayer/Videoplayer.jsx";

const Videopage = () => {
  const { vid } = useParams();
  const dispatch = useDispatch();
  const vids = useSelector((state) => state.videoreducer);
  const vv = vids?.data?.filter((q) => q._id === vid)[0];

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

  // Task 2: Custom Video Controller Logic Starts Here

  // const videoRef = useRef(null);
  // const [tapCount, setTapCount] = useState(0);
  // const [gestureStart, setGestureStart] = useState({ x: 0, y: 0 });
  // const [gestureEnd, setGestureEnd] = useState({ x: 0, y: 0 });
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [isHolding, setIsHolding] = useState(false);
  // const [holdSide, setHoldSide] = useState("");
  // const [currentVideo, setCurrentVideo] = useState(
  //   `http://localhost:5353/${vv?.filepath}`
  // );

  // useEffect(() => {
  //   let timer;
  //   if (tapCount > 0) {
  //     timer = setTimeout(() => {
  //       handleTap(tapCount, gestureStart, gestureEnd);
  //       setTapCount(0);
  //     }, 300);
  //   }
  //   return () => clearTimeout(timer);
  // }, [tapCount, gestureStart, gestureEnd]);

  // const handleTap = (tapCount, gestureStart, gestureEnd) => {
  //   const video = videoRef.current;
  //   const width = window.innerWidth;
  //   const height = window.innerHeight;

  //   if (tapCount === 1) {
  //     if (gestureStart.x > 0.8 * width && gestureStart.y < 0.2 * height) {
  //       showLocationAndTemperature();
  //     } else if (gestureStart.x > 0.4 * width && gestureStart.x < 0.6 * width) {
  //       video.paused ? video.play() : video.pause();
  //       setIsPlaying(!video.paused);
  //     }
  //   } else if (tapCount === 2) {
  //     if (gestureStart.x > 0.6 * width) {
  //       video.currentTime += 10;
  //     } else if (gestureStart.x < 0.4 * width) {
  //       video.currentTime -= 10;
  //     }
  //   } else if (tapCount === 3) {
  //     if (gestureStart.x > 0.6 * width) {
  //       window.close();
  //     } else if (gestureStart.x < 0.4 * width) {
  //       alert("Show comment section");
  //     } else if (gestureStart.x > 0.4 * width && gestureStart.x < 0.6 * width) {
  //       // Logic to handle video change can be added here if needed
  //     }
  //   }
  // };

  // const handleTouchStart = (e) => {
  //   const touch = e.touches[0];
  //   setGestureStart({ x: touch.clientX, y: touch.clientY });
  //   setIsHolding(true);

  //   if (touch.clientX > window.innerWidth * 0.6) {
  //     setHoldSide("right");
  //   } else if (touch.clientX < window.innerWidth * 0.4) {
  //     setHoldSide("left");
  //   }
  // };

  // const handleTouchEnd = (e) => {
  //   setIsHolding(false);
  //   const video = videoRef.current;
  //   video.playbackRate = 1;
  //   setGestureEnd({
  //     x: e.changedTouches[0].clientX,
  //     y: e.changedTouches[0].clientY,
  //   });
  //   setTapCount(tapCount + 1);
  // };

  // const handleTouchMove = (e) => {
  //   if (isHolding) {
  //     const video = videoRef.current;
  //     if (holdSide === "right") {
  //       video.playbackRate = 2;
  //     } else if (holdSide === "left") {
  //       video.playbackRate = 0.5;
  //     }
  //   }
  // };

  // const handlePlayPause = () => {
  //   const video = videoRef.current;
  //   if (video.paused) {
  //     video.play();
  //     setIsPlaying(true);
  //   } else {
  //     video.pause();
  //     setIsPlaying(false);
  //   }
  // };

  // const handleForward = () => {
  //   const video = videoRef.current;
  //   video.currentTime += 10;
  // };

  // const handleBackward = () => {
  //   const video = videoRef.current;
  //   video.currentTime -= 10;
  // };

  // const showLocationAndTemperature = () => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         fetch(
  //           `https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${latitude},${longitude}`
  //         )
  //           .then((response) => response.json())
  //           .then((data) => {
  //             alert(
  //               `Location: ${data.location.name}, Temperature: ${data.current.temp_c}°C`
  //             );
  //           })
  //           .catch((error) => {
  //             console.error("Error fetching weather data:", error);
  //           });
  //       },
  //       (error) => {
  //         console.error("Error getting geolocation:", error);
  //       }
  //     );
  //   } else {
  //     alert("Geolocation is not available in your browser.");
  //   }
  // };

  // Task 2: Custom Video Controller Logic Ends Here

  // Task 1: logic starts Here
  // const [userPoint, setuserPoint] = useState({ points: 0, videosWatched: 0 });

  // const addPoints = () => {
  //   setuserPoint(prevUser => ({
  //     ...prevUser,
  //     videosWatched: prevUser.videosWatched + 1,
  //     points: prevUser.points + 5
  //   }));
  // };

  const userId = useSelector((state) => state.userPointsReducer.user?.userId);
  const userPoints = useSelector(
    (state) => state.userPointsReducer.user?.points
  );

  useEffect(() => {
    // Fetch the current user's profile when the component mounts
    if (userId) {
      dispatch(getUserProfile(userId));
    }
  }, [dispatch, userId]);

  const handleVideoWatched = () => {
    // Dispatch action to update points and videos watched
    if (userId) {
      dispatch(updatePoints({ userId: userId, points: 5, videosWatched: 1 })); // Adds 5 points and increments videosWatched by 1
    }
  };

  // Task 1: logic Ends Here

  //Task 2: Functions Starts Here
  const [currentVideo, setCurrentVideo] = useState(
      `http://localhost:5353/${vv?.filepath}`
    );
  
  const nextVideo = () => {
    // Logic to switch to the next video
    console.log('Next video');
  };

  const showComments = () => {
    // Logic to show comments section
    console.log('Show comments');
  };

  const showLocation = () => {
    // Logic to show location and temperature
    console.log('Show location');
  };

  //Task 2: Functions Ends Here

  

  return (
    <>
      <div className="container_videoPage">
        <div className="container2_videoPage">
          <div className="video_display_screen_videoPage">
            {/* <div
              className="video-container"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchMove={handleTouchMove}
            >
              <video
                ref={videoRef}
                src={`http://localhost:5353/${vv?.filepath}`}
                controls
                // onEnded={handleVideoWatched}
              />
              <CustomControls
                onPlayPause={handlePlayPause}
                onForward={handleForward}
                onBackward={handleBackward}
                isPlaying={isPlaying}
              />
            </div> */}

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
