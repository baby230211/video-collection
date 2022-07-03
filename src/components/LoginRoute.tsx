import axios from 'axios';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

const client_id = import.meta.env.VITE_LINE_CLIENT_ID;
const redirect_uri = 'http://localhost:3000/login';
const client_secret = import.meta.env.VITE_LINE_SECRET_ID;

const LoginRoute = () => {
  const auth = getAuth();
  const [authing, setAuthing] = useState(false);
  const navigate = useNavigate();
  const sigInWithGoogle = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(response => {
        console.log(response);
        setAuthing(false);
        navigate('/');
        // navigate
      })
      .catch(error => {
        console.log(error);
      });
  };

  const signInWithLine = () => {
    const lineAuthoriseURL = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=profile&state=12345`;

    // Redirect to external URL.
    window.location.href = lineAuthoriseURL;
  };
  const getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    if (code) {
      const reqBody = {
        grant_type: 'authorization_code',
        code,
        redirect_uri,
        client_id,
        client_secret,
      };
      const reqConfig = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      axios
        .post(
          'https://api.line.me/oauth2/v2.1/token',
          qs.stringify(reqBody),
          reqConfig
        )
        .then(res => {
          console.log('res', res);
          if (!res.data?.id_token) {
            return;
          }
        });
    }
  };

  if (authing) {
    return <div>i am authing</div>;
  }

  return (
    <div>
      {!auth.currentUser && (
        <button onClick={sigInWithGoogle}>LoginRoute</button>
      )}
      {/* <div>Line Login Section</div>
      <div>
        <button
          className="border-2 border-red-300 px-4"
          onClick={signInWithLine}
        >
          Line Login
        </button>
        <button
          className="border-2 border-red-300 px-4"
          onClick={getAccessToken}
        >
          getAccessToken
        </button>
      </div> */}
      {auth.currentUser && (
        <button onClick={() => signOut(auth)}>signOut</button>
      )}
    </div>
  );
};

export default LoginRoute;
