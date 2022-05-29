import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  if (authing) {
    return <div>i am authing</div>;
  }

  return (
    <div>
      {!auth.currentUser && (
        <button onClick={sigInWithGoogle}>LoginRoute</button>
      )}
      {auth.currentUser && (
        <button onClick={() => signOut(auth)}>signOut</button>
      )}
    </div>
  );
};

export default LoginRoute;
