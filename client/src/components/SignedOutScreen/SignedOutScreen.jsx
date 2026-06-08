import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { BiUserCircle as UserIcon } from 'react-icons/bi';
import './SignedOutScreen.css';

const SignedOutScreen = ({ icon: Icon, title, description }) => {
  const { loginUser } = useAuth();
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
    <div className="signed-out-container">
      <div className="signed-out-content">
        <div className="signed-out-icon-wrapper">
          {Icon ? <Icon size={120} /> : <UserIcon size={120} />}
        </div>
        <h2 className="signed-out-title">{title}</h2>
        <p className="signed-out-description">{description}</p>
        <button className="signed-out-btn" onClick={() => google_login()}>
          <UserIcon size={22} />
          <span>Sign in</span>
        </button>
      </div>
    </div>
  );
};

export default SignedOutScreen;
