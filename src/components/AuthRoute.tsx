import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
export interface IAuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<IAuthRouteProps> = ({ children }) => {
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = onAuthStateChanged(auth, user => {
      if (user) {
        setLoading(false);
      } else {
        console.log('unauthorized');
        navigate('/login', { replace: true });
        // navigate to login
      }
    });

    return () => {
      () => authCheck();
    };
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return <div>{children}</div>;
};

export default AuthRoute;
