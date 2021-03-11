import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth.js';
import Card from '../Card/Card.jsx';

const newsUrl = process.env.REACT_APP_NEWS_URL;

function NewsList() {
  const { profile, sendRequest } = useAuth();
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

    return () => { canceled = true; };
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
