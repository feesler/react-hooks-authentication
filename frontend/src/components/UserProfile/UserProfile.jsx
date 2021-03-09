import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../../contexts/AuthContext.js';
import LoginForm from '../LoginForm/LoginForm.jsx';

function UserProfile(props) {
  const { profile, handleLogout } = useContext(AuthContext);

console.log('[UserProfile] profile: ', profile);

  if (!profile) {
    return <LoginForm />;
  }

  return (
    <div className="profile">
      <div>Hello, {profile.name}</div>
      <div className="profile__avatar"><img src={profile.avatar} /></div>
      <button className="btn btn-outline-danger" type="button" onClick={handleLogout}>Logout</button>
    </div>
  )
}

UserProfile.propTypes = {

};

export default UserProfile;
