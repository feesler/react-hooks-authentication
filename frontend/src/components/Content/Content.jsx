import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../../contexts/AuthContext.js';
import Banner from '../Banner/Banner.jsx';
import NewsList from '../NewsList/NewsList.jsx';

function Content(props) {
  const { profile } = useContext(AuthContext);

console.log('[Content] profile: ', profile);

  const content = (profile)
    ? <NewsList />
    : <Banner />;

  return (
    <div className="content">
      {content}
    </div>
  )
}

Content.propTypes = {

};

export default Content;
