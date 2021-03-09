import { useState, useEffect } from 'react';
import useStorage from '../hooks/useStorage.js';
import { API } from '../api/index.js';

const profileURL = process.env.REACT_APP_PROFILE_URL;

export default function useAuthProvider() {
  const [token, setToken] = useStorage(localStorage, 'token');
  const [profile, setProfile] = useStorage(localStorage, 'profile');
  const [error, setError] = useState(null);

  const sendRequest = async (url, opts = {}) => {
    try {
      if (!token) {
        throw new Error('Not authorised');
      }

      const defaultOpts = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await fetch(url, {
        ...defaultOpts,
        ...opts,
      });

      if (!response.ok) {
        if (response.status === 401) {
          handleLogout();
          throw new Error('Not authorised');
        }

        throw new Error('Authentication failed');
      }

      const data = await response.json();
      return { data };
    } catch (e) {
      return { error: e.message };
    }
  }

  const handleLogin = async (login, password) => {
    setError(null);

    const authResult = await API.user.auth(login, password);
    if (!authResult.token) {
      const errorMessage = (authResult.error) ? authResult.error : 'Unknown error';
      setError(errorMessage);
      return;
    }

    setToken(authResult.token);
  }

  const handleLogout = () => {
    setToken(null);
    setProfile(null);
  }

  const readProfile = async () => {
    const profileResult = await sendRequest(profileURL);
    if (!profileResult.data) {
      const errorMessage = (profileResult.error) ? profileResult.error : 'Unknown error';
      setError(errorMessage);
      return;
    }

    setProfile(profileResult.data);
  }

  useEffect(() => {
    if (token) {
      readProfile();
    } else {
      handleLogout();
    }
  }, [token])

  return {
    handleLogin,
    handleLogout,
    sendRequest,
    token,
    profile,
    error,
  };
}
