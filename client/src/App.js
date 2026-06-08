import "./App.css";
import Allroutes from "./Allroutes";
import Navbar from "./components/Navbar/Navbar";

import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import VideoUpload from "./pages/VideoUpload/VideoUpload";
import Createeditchannel from "./pages/Channel/Createeditchannel";
import DrawerSidebar from "./components/LeftSidebar/DrawerSidebar";

import { getallvideo } from "./actions/video";
import { getallcomment } from "./actions/comment";
import { getallhistory } from "./actions/history";
import { fetchallchannel } from "./actions/channeluser";
import { getalllikedvideo } from "./actions/likedvideo";
import { getallwatchlater } from "./actions/watchlater";

function App() {
  const [toggledrawersidebar, settogledrawersidebar] = useState({
    display: "none",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchallchannel());
    dispatch(getallvideo());
    dispatch(getallcomment());
    dispatch(getallhistory());
    dispatch(getalllikedvideo());
    dispatch(getallwatchlater());
  }, [dispatch]);

  const toggledrawer = () => {
    if (toggledrawersidebar.display === "none") {
      settogledrawersidebar({
        display: "flex",
      });
    } else {
      settogledrawersidebar({
        display: "none",
      });
    }
  };
  const [editcreatechanelbtn, seteditcreatechanelbtn] = useState(false);
  const [videouploadpage, setvideouploadpage] = useState(false);
  return (
    <Router>
      {videouploadpage && (
        <VideoUpload setvideouploadpage={setvideouploadpage} />
      )}
      {editcreatechanelbtn && (
        <Createeditchannel seteditcreatechanelbtn={seteditcreatechanelbtn} />
      )}
      <Navbar
        seteditcreatechanelbtn={seteditcreatechanelbtn}
        toggledrawer={toggledrawer}
      />
      <DrawerSidebar
        toggledraw={toggledrawer}
        toggledrawersidebar={toggledrawersidebar}
      />
      <Allroutes
        seteditcreatechanelbtn={seteditcreatechanelbtn}
        setvideouploadpage={setvideouploadpage}
      />
    </Router>
  );
}

export default App;
