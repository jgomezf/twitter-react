import Tweet from '../components/Tweet';
import { useHistory } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import API from '../api';

function List() {
  const [data, setData] = useState([]);
  const history = useHistory();

  async function loadList() {
    try {
      const data = await API.getTweets();
      if (data) {
        setData(data);
      }
    } catch (error) {
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
      {data.map((item) => {
        const date = new Date(item.createdAt).toDateString();
        return (
          <div
            onClick={() => {
              displayTweet({ id: item._id });
            }}
            key={item._id}
          >
            <Tweet
              name={item.user.name}
              username={item.user.username}
              date={date}
              content={item.content}
            />
          </div>
        );
      })}
    </>
  );
}

export default List;
