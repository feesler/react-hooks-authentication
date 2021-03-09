import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../contexts/AuthContext.js';
import Card from '../Card/Card.jsx';

const newsUrl = process.env.REACT_APP_NEWS_URL;

function NewsList() {
  const { profile, sendRequest } = useContext(AuthContext);
  const [news, setNews] = useState([]);

  useEffect(() => {
    let canceled = false;

    const requestNews = async () => {
      const news = await sendRequest(newsUrl);
      if (!canceled && news && news.data) {
        setNews([...news.data]);
      }
    }

    if (profile) {
      requestNews();
    }

    return () => {
      canceled = true;
    }
  }, []);

  if (!profile) {
    return null;
  }

  return (
    <div className="news-list">
      {news.map((item) =>
        <Card key={item.id} {...item}>
          <p className="card-text">{item.content}</p>
        </Card>
      )}
    </div>
  )
}

export default NewsList;
