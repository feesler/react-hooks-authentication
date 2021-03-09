import React,{useContext} from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../LoginForm/LoginForm.jsx';
import UserProfile from '../UserProfile/UserProfile.jsx';

function Header(props) {

  return (
    <div className="header">
      <div className="header__logo me-4">Neto Social</div>
      <UserProfile />
    </div>
  )
}

Header.propTypes = {

};

export default Header;
