import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { MdPlaylistAddCheck } from "react-icons/md";
import {
  RiHeartAddFill,
  RiPlayListAddFill,
  RiShareForwardLine,
} from "react-icons/ri";
import "./VideoActionButtons.css";
import useAuth from "../../components/hooks/useAuth";
import useVideos from "../../components/hooks/useVideos";
import usePlaylists from "../../components/hooks/usePlaylists";
import useUserPoints from "../../components/Navbar/useUserPoints";

const VideoActionButtons = ({ vv, vid }) => {
  const { currentuser } = useAuth();
  const { toggleLikeVideo } = useVideos();
  const {
    likedVideos,
    watchLater,
    logLikedVideo,
    clearLikedVideo,
    logWatchLater,
    clearWatchLater,
  } = usePlaylists();

  const currentUserId = currentuser?.result?._id;
  const { addPoints } = useUserPoints(currentUserId);

  const [savevideo, setsavevideo] = useState(false);
  const [dislikebtn, setdislikebtn] = useState(false);
  const [likebtn, setlikebtn] = useState(false);

  const [toastMessage, setToastMessage] = useState("");
  const [thanksModalOpen, setThanksModalOpen] = useState(false);
  const [thanksMessage, setThanksMessage] = useState("");

  useEffect(() => {
    if (currentuser?.result) {
      const isLiked = likedVideos.some(
        (q) => q.videoid === vid && q.viewer === currentuser.result._id
      );
      setlikebtn(isLiked);

      const isSaved = watchLater.some(
        (q) => q.videoid === vid && q.viewer === currentuser.result._id
      );
      setsavevideo(isSaved);
    }
  }, [likedVideos, watchLater, vid, currentuser]);

  const togglesavedvideo = () => {
    if (currentuser) {
      if (savevideo) {
        setsavevideo(false);
        clearWatchLater({ videoid: vid, viewer: currentuser?.result?._id });
        showToast("Removed from Watch Later 📁");
      } else {
        setsavevideo(true);
        logWatchLater({ videoid: vid, viewer: currentuser?.result?._id });
        showToast("Added to Watch Later 📁");
      }
    } else {
      alert("please login to save video");
    }
  };

  const togglelikevideo = (e, lk) => {
    if (currentuser) {
      if (likebtn) {
        setlikebtn(false);
        toggleLikeVideo(vid, lk - 1);
        clearLikedVideo({ videoid: vid, viewer: currentuser?.result?._id });
      } else {
        setlikebtn(true);
        toggleLikeVideo(vid, lk + 1);
        logLikedVideo({ videoid: vid, viewer: currentuser?.result?._id });
        setdislikebtn(false);
        showToast("Added to Liked Videos 👍");
      }
    } else {
      alert("please login to like video");
    }
  };

  const toggledislikevideo = (e, lk) => {
    if (currentuser) {
      if (dislikebtn) {
        setdislikebtn(false);
      } else {
        setdislikebtn(true);
        if (likebtn) {
          toggleLikeVideo(vid, lk - 1);
          clearLikedVideo({ videoid: vid, viewer: currentuser?.result?._id });
        }
        setlikebtn(false);
        showToast("Video Disliked 👎");
      }
    } else {
      alert("please login to dislike video");
    }
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Link copied to clipboard! 📋");
  };

  const handleThanksSubmit = () => {
    if (currentuser) {
      addPoints(10);
      setThanksModalOpen(false);
      setThanksMessage("");
      showToast("Thank you for your support! +10 Points awarded 💖");
    } else {
      alert("Please sign in to send support!");
    }
  };

  return (
    <div className="btns_cont_videoPage">
      <div className="btn_VideoPage">
        <BsThreeDots />
      </div>
      <div className="btn_VideoPage">
        <div
          className="like_videoPage"
          onClick={(e) => togglelikevideo(e, vv?.Like || 0)}
        >
          {likebtn ? (
            <AiFillLike size={22} className="btns_videoPage" />
          ) : (
            <AiOutlineLike size={22} className="btns_videoPage" />
          )}
          <b>{vv?.Like || 0}</b>
        </div>
        <div
          className="like_videoPage"
          onClick={(e) => toggledislikevideo(e, vv?.Like || 0)}
        >
          {dislikebtn ? (
            <AiFillDislike size={22} className="btns_videoPage" />
          ) : (
            <AiOutlineDislike size={22} className="btns_videoPage" />
          )}
          <b>DISLIKE</b>
        </div>
        <div className="like_videoPage" onClick={() => togglesavedvideo()}>
          {savevideo ? (
            <>
              <MdPlaylistAddCheck size={22} className="btns_videoPage" />
              <b>Saved</b>
            </>
          ) : (
            <>
              <RiPlayListAddFill size={22} className="btns_videoPage" />
              <b>Save</b>
            </>
          )}
        </div>
        <div className="like_videoPage" onClick={() => setThanksModalOpen(true)}>
          <>
            <RiHeartAddFill size={22} className="btns_videoPage" style={{ color: "var(--yt-red)" }} />
            <b>Thanks</b>
          </>
        </div>
        <div className="like_videoPage" onClick={handleShare}>
          <>
            <RiShareForwardLine size={22} className="btns_videoPage" />
            <b>Share</b>
          </>
        </div>
      </div>

      {toastMessage && (
        <div className="custom_toast">
          <span>✨</span> {toastMessage}
        </div>
      )}

      {thanksModalOpen && (
        <div className="modal_backdrop" onClick={() => setThanksModalOpen(false)}>
          <div className="thanks_modal" onClick={(e) => e.stopPropagation()}>
            <h3>Support the Creator! 💖</h3>
            <p>
              Show your appreciation for this video by leaving a supportive message. Sending thanks awards you <b>10 K-Tube Points</b>!
            </p>
            <textarea
              className="thanks_textarea"
              placeholder="Write a message to the creator..."
              value={thanksMessage}
              onChange={(e) => setThanksMessage(e.target.value)}
            />
            <div className="thanks_modal_actions">
              <button
                className="btn_thanks_cancel"
                onClick={() => setThanksModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn_thanks_submit" onClick={handleThanksSubmit}>
                Send Thanks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoActionButtons;