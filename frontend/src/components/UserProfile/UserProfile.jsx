import React from 'react';
import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth.js';
import LoginForm from '../LoginForm/LoginForm.jsx';

function UserProfile(props) {
  const { profile, logOut } = useAuth();

  if (!profile) {
    return <LoginForm />;
  }

  return (
    <div className="profile">
      <div>Hello, {profile.name}</div>
      <div className="profile__avatar"><img src={profile.avatar} /></div>
      <button className="btn btn-outline-danger" type="button" onClick={logOut}>Logout</button>
    </div>
  )
}

UserProfile.propTypes = {
};

export default UserProfile;
