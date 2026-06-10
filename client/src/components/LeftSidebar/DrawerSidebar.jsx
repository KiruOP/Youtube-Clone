import React, { useState, useEffect } from "react";
import "./LeftSidebar.css";
import { AiFillPlaySquare, AiOutlineHome, AiFillLike } from "react-icons/ai";
import {
  MdOutlineExplore,
  MdOutlineVideoLibrary,
  MdSubscriptions,
  MdOutlineWatchLater,
  MdOutlineSubscriptions,
} from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import shorts from "./shorts.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const DrawerSidebar = ({ toggledraw, toggledrawersidebar }) => {
  const { currentuser, loginUser } = useAuth();
  const chanelList = useSelector((state) => state.chanelreducer);
  
  const [user, setuser] = useState(null);
  const [profile, setprofile] = useState(null);

  const google_login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setuser(tokenResponse);
    },
    onError: (error) => console.log('Login Failed', error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          }
        )
        .then((res) => {
          setprofile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  useEffect(() => {
    if (profile?.email) {
      loginUser({ email: profile.email });
    }
  }, [profile]);

  return (
    <div className="container_DrawaerLeftSidebar" style={toggledrawersidebar}>
      <div className="container2_DrawaerLeftSidebar">
        {!currentuser ? (
          <>
            <div className="Drawer_leftsidebar">
              <NavLink to={"/"} className="icon_sidebar_div" onClick={() => toggledraw()}>
                <div>
                  <AiOutlineHome size={22} className="icon_sidebar" />
                  <div className="text_sidebar_icon">Home</div>
                </div>
              </NavLink>
              <div className="icon_sidebar_div">
                <div>
                  <img src={shorts} width={22} className="icon_sidebar" alt="shorts" />
                  <div className="text_sidebar_icon">Shorts</div>
                </div>
              </div>
              <div className="icon_sidebar_div">
                <div>
                  <MdOutlineSubscriptions size={22} className="icon_sidebar" />
                  <div className="text_sidebar_icon">Subscriptions</div>
                </div>
              </div>
            </div>
            
            <div className="libraryBtn_Drawerleftsidebar">
              <NavLink to={"/Library"} className="icon_sidebar_div" onClick={() => toggledraw()}>
                <div>
                  <BiUserCircle size={22} className="icon_sidebar" />
                  <div className="text_sidebar_icon">You</div>
                </div>
              </NavLink>
              <NavLink to={"/Watchhistory"} className="icon_sidebar_div" onClick={() => toggledraw()}>
                <div>
                  <FaHistory size={22} className="icon_sidebar" />
                  <div className="text_sidebar_icon">History</div>
                </div>
              </NavLink>
            </div>

            <div className="sidebar_signin_card" style={{ padding: '16px 12px', borderBottom: '1px solid var(--yt-border)' }}>
              <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '20px', color: 'var(--yt-text-primary)' }}>
                Sign in to like videos, comment and subscribe.
              </p>
              <button className="Auth_Btn" onClick={() => google_login()}>
                <BiUserCircle size={22} />
                <b>Sign in</b>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="Drawer_leftsidebar">
              <NavLink to={"/"} className="icon_sidebar_div" onClick={() => toggledraw()}>
                <div>
                  <AiOutlineHome size={22} className="icon_sidebar" />
                  <div className="text_sidebar_icon">Home</div>
                </div>
              </NavLink>
              <div className="icon_sidebar_div">
                <div>
                  <MdOutlineExplore size={22} className="icon_sidebar" />
                  <div className="text_sidebar_icon">Explore</div>
                </div>
              </div>
              <div className="icon_sidebar_div">
                <div>
                  <img src={shorts} width={22} className="icon_sidebar" alt="shorts" />
                  <div className="text_sidebar_icon">Shorts</div>
                </div>
              </div>
              <div className="icon_sidebar_div">
                <div>
                  <MdSubscriptions size={22} className="icon_sidebar" />
                  <div className="text_sidebar_icon">Subscriptions</div>
                </div>
              </div>
            </div>

            <div className="libraryBtn_Drawerleftsidebar">
              <NavLink to={"/Library"} className="icon_sidebar_div" onClick={() => toggledraw()}>
                <div>
                  <MdOutlineVideoLibrary size={22} className="icon_sidebar" />
                  <div className="text_sidebar_icon">Library</div>
                </div>
              </NavLink>
              <NavLink to={"/Watchhistory"} className="icon_sidebar_div" onClick={() => toggledraw()}>
                <div>
                  <FaHistory size={22} className="icon_sidebar" />
                  <div className="text_sidebar_icon">History</div>
                </div>
              </NavLink>
              <NavLink to={"/Yourvideo"} className="icon_sidebar_div" onClick={() => toggledraw()}>
                <div>
                  <AiFillPlaySquare size={22} className="icon_sidebar" />
                  <div className="text_sidebar_icon">Your Videos</div>
                </div>
              </NavLink>
              <NavLink to={"/Watchlater"} className="icon_sidebar_div" onClick={() => toggledraw()}>
                <div>
                  <MdOutlineWatchLater size={22} className="icon_sidebar" />
                  <div className="text_sidebar_icon">Watch Later</div>
                </div>
              </NavLink>
              <NavLink to={"/Likedvideo"} className="icon_sidebar_div" onClick={() => toggledraw()}>
                <div>
                  <AiFillLike size={22} className="icon_sidebar" />
                  <div className="text_sidebar_icon">Liked Videos</div>
                </div>
              </NavLink>
            </div>

            <div className="subScriptions_lsdbar">
              <h3>Subscriptions</h3>
              {chanelList?.filter(c => c._id !== currentuser?.result?._id).slice(0, 5).map(c => (
                <NavLink 
                  to={`/channel/${c._id}`} 
                  key={c._id} 
                  className="chanel_lsdbar" 
                  onClick={() => toggledraw()}
                  style={{ textDecoration: 'none', color: 'var(--yt-text-primary)' }}
                >
                  <div>{c.name ? c.name.charAt(0).toUpperCase() : c.email.charAt(0).toUpperCase()}</div>
                  <div>{c.name || c.email}</div>
                </NavLink>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="container3_DrawaerLeftSidebar" onClick={() => toggledraw()}></div>
    </div>
  );
};

export default DrawerSidebar;
