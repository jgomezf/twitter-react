import Tweet from 'components/Tweet';
import React, { useEffect, useState } from 'react';
import API from 'api';

function List() {
  const [data, setData] = useState([]);

  useEffect(() => {
    //llamados ajax
    API.getTweets().then((response) => setData(response));
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
