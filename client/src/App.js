import "./App.css";
import Allroutes from "../src/Allroutes";
import Navbar from "./Component/Navbar/Navbar";

import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Videoupload from "./Pages/Videoupload/Videoupload";
import Createeditchannel from "./Pages/Channel/Createeditchannel";
import Drawersliderbar from "../src/Component/Leftsidebar/Drawersliderbar";

import { getallvideo } from "./action/video";
import { getallcomment } from "./action/comment";
import { getallhistory } from "./action/history";
import { fetchallchannel } from "./action/channeluser";
import { getalllikedvideo } from "./action/likedvideo";
import { getallwatchlater } from "./action/watchlater";

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
        <Videoupload setvideouploadpage={setvideouploadpage} />
      )}
      {editcreatechanelbtn && (
        <Createeditchannel seteditcreatechanelbtn={seteditcreatechanelbtn} />
      )}
      <Navbar
        seteditcreatechanelbtn={seteditcreatechanelbtn}
        toggledrawer={toggledrawer}
      />
      <Drawersliderbar
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
