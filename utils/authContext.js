import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AuthContext = React.createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: '',
  });

  //   const setUserAuthInfo = data => {
  //     const token = localStorage.setItem('access-token', data);
  //     setAuthState({
  //       token,
  //     });
  //   };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAuthState({ token: localStorage.getItem('access-token') });
    }
  }, []);

  // checks if the user is authenticated or not
  const isUserAuthenticated = () => {
    if (!authState.token) {
      return false;
    }
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: userAuthInfo => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
