import React from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../../contexts/AuthContext.js';
import Banner from '../Banner/Banner.jsx';
import NewsList from '../NewsList/NewsList.jsx';

function Content(props) {
  return (
    <div className="content">
      <AuthContext.Consumer>
        {value => (value.profile) ? <NewsList /> : <Banner />}
      </AuthContext.Consumer>
    </div>
  )
}

Content.propTypes = {
};

export default Content;
