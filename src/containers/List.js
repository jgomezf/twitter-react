import Tweet from '../components/Tweet';
import React, { useEffect, useState } from 'react';
import API from '../api';

function List() {
  const [data, setData] = useState([]);

  async function loadList() {
    try {
      const { data = [], message = '' } = await API.getTweets();
      setData(data);
    } catch (error) {
      console.error(error);
    }
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
          <Tweet
            key={item._id}
            name={item.user.name}
            username={item.user.username}
            date={date}
            content={item.content}
          />
        );
      })}
    </>
  );
}

export default List;
