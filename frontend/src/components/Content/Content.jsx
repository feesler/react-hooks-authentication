import React from 'react';
import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth.js';
import Banner from '../Banner/Banner.jsx';
import NewsList from '../NewsList/NewsList.jsx';

function Content(props) {
  const { profile } = useAuth();

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
