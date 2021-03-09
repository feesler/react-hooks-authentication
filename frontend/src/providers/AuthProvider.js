import React from 'react';
import AuthContext from '../contexts/AuthContext.js';
import useAuthProvider from '../hooks/useAuthProvider.js';

function AuthProvider(props) {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
