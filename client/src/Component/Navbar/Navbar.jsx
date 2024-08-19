import "./Navbar.css";
import logo from "./logo.ico";
import Auth from "../../Pages/Auth/Auth";
import { login } from "../../action/auth";
import Searchbar from "./Searchbar/Searchbar";
import { setcurrentuser } from "../../action/currentuser";
// import { getUserPoints } from "../../action/userPointsActions.js";

import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode
import { BiUserCircle } from "react-icons/bi";
import { RiVideoAddLine } from "react-icons/ri";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";

const Navbar = ({ toggledrawer, seteditcreatechanelbtn }) => {
  const [authbtn, setauthbtn] = useState(false);
  const [user, setuser] = useState(null);
  const [profile, setprofile] = useState([]);
  const dispatch = useDispatch();

  const currentuser = useSelector((state) => state.currentuserreducer);
  // const { points, videosWatched } = useSelector((state) => state.userPointsReducer);

  const google_login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setuser(tokenResponse);
    },
    onError: (error) => console.log("Login Failed", error),
  });

  useEffect(() => {
    const successlogin = () => {
      if (profile.email) {
        dispatch(login({ email: profile.email }));
      }
    };

    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setprofile(res.data);
          successlogin();
          // dispatch(getUserPoints());
        });
    }
  }, [user, profile.email, dispatch]);

  // useEffect(() => {
  //   if (currentuser?.result) {
  //     userpoint?.data
  //       .filter((q) => q.UserId === currentuser.result._id)
  //       .map((m) => { });
  //     filter();
  //   }
  // }, []);

  const logout = () => {
    dispatch(setcurrentuser(null));
    googleLogout();
    localStorage.clear();
  };

  useEffect(() => {
    const token = currentuser?.token;
    if (token) {
      const decodetoken = jwtDecode(token);
      if (decodetoken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
  }, [currentuser?.token, dispatch]);

  return (
    <>
      <div className="Container_Navbar">
        <div className="Burger_Logo_Navbar">
          <div className="burger" onClick={() => toggledrawer()}>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="white"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </div>
          <Link to={"/"} className="logo_div_Navbar">
            <img src={logo} alt="" />
            <p className="logo_title_navbar">K-Tube</p>
          </Link>
        </div>
        <Searchbar />
        <RiVideoAddLine size={22} className={"vid_bell_Navbar"} />
        <div className="apps_Box">
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd" // Corrected property
              clipRule="evenodd" // Corrected property
              d="M4.857 3A1.857 1.857 0 0 0 3 4.857v4.286C3 10.169 3.831 11 4.857 11h4.286A1.857 1.857 0 0 0 11 9.143V4.857A1.857 1.857 0 0 0 9.143 3H4.857Zm10 0A1.857 1.857 0 0 0 13 4.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 9.143V4.857A1.857 1.857 0 0 0 19.143 3h-4.286Zm-10 10A1.857 1.857 0 0 0 3 14.857v4.286C3 20.169 3.831 21 4.857 21h4.286A1.857 1.857 0 0 0 11 19.143v-4.286A1.857 1.857 0 0 0 9.143 13H4.857Zm10 0A1.857 1.857 0 0 0 13 14.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 19.143v-4.286A1.857 1.857 0 0 0 19.143 13h-4.286Z"
            />
          </svg>
        </div>

        <IoMdNotificationsOutline size={22} className={"vid_bell_Navbar"} />

        {currentuser ? (
          <>
            <div className="user_points_rewards">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m7.171 12.906-2.153 6.411 2.672-.89 1.568 2.34 1.825-5.183m5.73-2.678 2.154 6.411-2.673-.89-1.568 2.34-1.825-5.183M9.165 4.3c.58.068 1.153-.17 1.515-.628a1.681 1.681 0 0 1 2.64 0 1.68 1.68 0 0 0 1.515.628 1.681 1.681 0 0 1 1.866 1.866c-.068.58.17 1.154.628 1.516a1.681 1.681 0 0 1 0 2.639 1.682 1.682 0 0 0-.628 1.515 1.681 1.681 0 0 1-1.866 1.866 1.681 1.681 0 0 0-1.516.628 1.681 1.681 0 0 1-2.639 0 1.681 1.681 0 0 0-1.515-.628 1.681 1.681 0 0 1-1.867-1.866 1.681 1.681 0 0 0-.627-1.515 1.681 1.681 0 0 1 0-2.64c.458-.361.696-.935.627-1.515A1.681 1.681 0 0 1 9.165 4.3ZM14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                />
              </svg>
              {/* <p className="user_points">{points}</p>
              <p className="user_points">{videosWatched}</p> */}
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="Auth_cont_Navbar">
          {currentuser ? (
            <>
              <div className="Chanel_logo_App" onClick={() => setauthbtn(true)}>
                <p className="fstChar_logo_App">
                  {currentuser?.result.name ? (
                    <>{currentuser?.result.name.charAt(0).toUpperCase()}</>
                  ) : (
                    <>{currentuser?.result.email.charAt(0).toUpperCase()}</>
                  )}
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="Auth_Btn" onClick={() => google_login()}>
                <BiUserCircle size={22} />
                <b>Sign in</b>
              </p>
            </>
          )}
        </div>
      </div>
      {authbtn && (
        <Auth
          seteditcreatechanelbtn={seteditcreatechanelbtn}
          setauthbtn={setauthbtn}
          user={currentuser}
        />
      )}
    </>
  );
};

export default Navbar;
