import React from "react";
import "./LeftSidebar.css";
import shorts from "./shorts.png";
import { AiOutlineHome } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import {
  MdOutlineExplore,
  MdOutlineSubscriptions,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LeftSidebar = () => {
  const { currentuser } = useAuth();

  return (
    <div className="container_leftSidebar">
      <NavLink to={"/"} className="icon_sidebar_div">
        <AiOutlineHome size={22} className="icon_sidebar" />
        <div className="text_sidebar_icon">Home</div>
      </NavLink>

      {!currentuser ? (
        <>
          <div className="icon_sidebar_div">
            <img src={shorts} width={22} alt="shorts" className="icon_sidebar" />
            <div className="text_sidebar_icon">Shorts</div>
          </div>
          <div className="icon_sidebar_div">
            <MdOutlineSubscriptions size={22} className="icon_sidebar" />
            <div className="text_sidebar_icon">Subscription</div>
          </div>
          <NavLink to={"/Library"} className="icon_sidebar_div">
            <BiUserCircle size={22} className="icon_sidebar" />
            <div className="text_sidebar_icon">You</div>
          </NavLink>
          <NavLink to={"/Watchhistory"} className="icon_sidebar_div">
            <FaHistory size={22} className="icon_sidebar" />
            <div className="text_sidebar_icon">History</div>
          </NavLink>
        </>
      ) : (
        <>
          <div className="icon_sidebar_div">
            <MdOutlineExplore size={22} className="icon_sidebar" />
            <div className="text_sidebar_icon">Explore</div>
          </div>
          <div className="icon_sidebar_div">
            <img src={shorts} width={22} alt="shorts" className="icon_sidebar" />
            <div className="text_sidebar_icon">Shorts</div>
          </div>
          <div className="icon_sidebar_div">
            <MdOutlineSubscriptions size={22} className="icon_sidebar" />
            <div className="text_sidebar_icon" style={{ fontSize: "12px" }}>
              Subscription
            </div>
          </div>
          <NavLink to={"/Library"} className="icon_sidebar_div">
            <MdOutlineVideoLibrary size={22} className="icon_sidebar" />
            <div className="text_sidebar_icon">Library</div>
          </NavLink>
        </>
      )}
    </div>
  );
};

export default LeftSidebar;
