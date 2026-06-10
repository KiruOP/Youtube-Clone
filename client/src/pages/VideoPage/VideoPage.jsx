import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { isWithinAllowedTime } from "../../components/utils/timeUtils.js";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer.jsx";
import VideoActionButtons from "./VideoActionButtons";
import Comment from "../../components/Comment/Comment";
import useVideos from "../../components/hooks/useVideos";
import usePlaylists from "../../components/hooks/usePlaylists";
import useAuth from "../../components/hooks/useAuth";
import { API_BASE_URL } from "../../config";
import "./VideoPage.css";

const VideoPage = () => {
  const { vid } = useParams();
  const navigate = useNavigate();
  const commentsRef = useRef(null);

  const { videos, incrementViews } = useVideos();
  const { logHistory } = usePlaylists();
  const { currentuser } = useAuth();

  const [locationOverlay, setLocationOverlay] = useState(false);

  const vv = videos.find((q) => q._id === vid);
  const canMakeCall = isWithinAllowedTime();

  // Recommendations: exclude the current video
  const recommendations = React.useMemo(() => {
    return videos.filter((v) => v._id !== vid);
  }, [videos, vid]);

  useEffect(() => {
    if (vid) {
      if (currentuser?.result?._id) {
        logHistory({
          videoid: vid,
          viewer: currentuser.result._id,
        });
      }
      incrementViews(vid);
    }
  }, [vid, currentuser?.result?._id]);

  const nextVideo = () => {
    if (recommendations.length > 0) {
      navigate(`/videopage/${recommendations[0]._id}`);
    }
  };

  const showComments = () => {
    commentsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const showLocation = () => {
    setLocationOverlay((prev) => !prev);
  };

  if (!vv) {
    return (
      <div className="container_videoPage" style={{ padding: "40px", textAlign: "center" }}>
        <h2>Loading video details...</h2>
      </div>
    );
  }

  return (
    <>
      <div className="container_videoPage">
        <div className="container2_videoPage">
          <div className="video_display_screen_videoPage">
            <VideoPlayer
              videoSrc={vv?.filepath?.startsWith("http") ? vv.filepath : `${API_BASE_URL}/${vv?.filepath}`}
              nextVideo={nextVideo}
              showComments={showComments}
              showLocation={showLocation}
            />

            {locationOverlay && (
              <div className="location_overlay_widget">
                <span className="location_icon">📍</span>
                <span className="location_text">
                  Mumbai, Maharashtra | ⛅ 31°C | Sunny
                </span>
              </div>
            )}

            <div className="video_details_videoPage">
              <div className="video_btns_title_VideoPage_cont">
                <p className="video_title_VideoPage">{vv?.videotitle}</p>
                <div className="views_date_btns_VideoPage">
                  <div className="views_videoPage">
                    {vv?.views} views <div className="dot"></div>{" "}
                    {moment(vv?.createdAt).fromNow()}
                  </div>
                  <VideoActionButtons vv={vv} vid={vid} />
                </div>
              </div>
              <div className="voip_call_banner">
                <div>
                  <h3>VoIP Video Calling Service</h3>
                  {canMakeCall ? (
                    <p>Instantly start a conference call or screen sharing session.</p>
                  ) : (
                    <p>Calling features are active daily from 6:00 PM to 12:00 AM.</p>
                  )}
                </div>
                {canMakeCall ? (
                  <Link to="/call" className="voip_call_link">Start Call</Link>
                ) : (
                  <span
                    className="voip_call_link"
                    style={{
                      background: "var(--yt-border)",
                      color: "var(--yt-text-secondary)",
                      cursor: "not-allowed",
                    }}
                  >
                    Offline
                  </span>
                )}
              </div>
              <Link to={`/channel/${vv?.videochanel}`} className="chanel_details_videoPage">
                <b className="chanel_logo_videoPage">
                  <p>{vv?.uploader?.charAt(0).toUpperCase()}</p>
                </b>
                <p className="chanel_name_videoPage">{vv?.uploader}</p>
              </Link>
              <div className="comments_VideoPage" ref={commentsRef}>
                <h2>
                  <u>Comments</u>
                </h2>
                <Comment videoid={vv?._id} />
              </div>
            </div>
          </div>

          <div className="moreVideoBar">
            <h3 className="recommendations_title">Recommended Videos</h3>
            {recommendations.length > 0 ? (
              recommendations.map((rec) => (
                <Link
                  to={`/videopage/${rec._id}`}
                  className="recommendation_card"
                  key={rec._id}
                >
                  <div className="recommendation_thumbnail_wrapper">
                    <video
                      src={rec.filepath?.startsWith("http") ? rec.filepath : `${API_BASE_URL}/${rec.filepath}`}
                      className="recommendation_thumbnail"
                      muted
                      preload="metadata"
                    />
                  </div>
                  <div className="recommendation_info">
                    <h4 className="recommendation_title">{rec.videotitle}</h4>
                    <p className="recommendation_channel">{rec.uploader}</p>
                    <p className="recommendation_meta">
                      {rec.views} views • {moment(rec.createdAt).fromNow()}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p style={{ fontSize: "14px", color: "var(--yt-text-secondary)" }}>
                No recommended videos found.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPage;