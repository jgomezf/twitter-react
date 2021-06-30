import React, { useEffect, useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';

import Tweet from '../components/Tweet';
import API from '../api';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
      {error && <Alert severity="error">{error}</Alert>}
      {data.map(({ id, user, date, content }) => {
        return (
          <div onClick={() => displayTweet({ id })} key={id}>
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
