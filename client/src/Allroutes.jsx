import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import VideoPage from "./pages/VideoPage/VideoPage";
import Channel from "./pages/Channel/Channel";
import Library from "./pages/Library/Library";
import LikedVideo from "./pages/LikedVideo/LikedVideo";
import WatchHistory from "./pages/WatchHistory/WatchHistory";
import WatchLater from "./pages/WatchLater/WatchLater";
import YourVideos from "./pages/YourVideos/YourVideos";
import VideoCall from "./components/VideoCall/videoCall";

const Allroutes = ({ seteditcreatechanelbtn, setvideouploadpage }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search/:Searchquery" element={<Search />} />
      <Route path="/videopage/:vid" element={<VideoPage />} />
      <Route path="/Library" element={<Library />} />
      <Route path="/Likedvideo" element={<LikedVideo />} />
      <Route path="/Watchhistory" element={<WatchHistory />} />
      <Route path="/Watchlater" element={<WatchLater />} />
      <Route path="/Yourvideo" element={<YourVideos />} />
      <Route
        path="/channel/:cid"
        element={
          <Channel
            seteditcreatechanelbtn={seteditcreatechanelbtn}
            setvideouploadpage={setvideouploadpage}
          />
        }
      />
      <Route path="/call" element={<VideoCall />} />

    </Routes>
  );
};

export default Allroutes;