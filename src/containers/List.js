import Tweet from '../components/Tweet';
import { useHistory } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import API from '../api';

function List() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const history = useHistory();

  async function loadList() {
    try {
      const data = await API.getTweets();
      if (data) {
        setData(data);
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  }

  function displayTweet({ id }) {
    history.push(`/tweets/${id}`);
  }

  useEffect(() => {
    //llamados ajax
    loadList();
  }, []);

  return (
    <>
      {error && <p>{error}</p>}
      {data.map(({ id, user, date, content }) => {
        return (
          <div
            onClick={() => {
              displayTweet({ id });
            }}
            key={id}
          >
            <Tweet
              name={user.name}
              username={user.username}
              date={date}
              content={content}
            />
          </div>
        );
      })}
    </>
  );
}

export default List;
