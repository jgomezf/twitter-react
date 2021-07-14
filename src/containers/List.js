import React, { useEffect, useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import Tweet from '../components/Tweet';
import API from '../api';
import { useStore } from '../store/Store';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function List() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const {
    selectors: {
      user: { id: userId },
    },
  } = useStore();

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

  async function onLike(event, id) {
    event.stopPropagation();

    try {
      await API.likeTweet({
        tweetId: id,
        userId: userId,
      });
      const tweet = await API.getTweet({ id });
      const newList = data.map((item) => {
        if (item.id === id) {
          // return {
          //   ...item,
          //   likes: item.likes + 1
          // }
          return tweet;
        } else {
          return item;
        }
      });
      setData(newList);
      //await loadList();
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
      {error && <Alert severity="error">{error}</Alert>}
      {data.map(({ id, user, date, content, comments, likes }) => {
        return (
          <div onClick={() => displayTweet({ id })} key={id}>
            <Tweet
              id={id}
              name={user.name}
              username={user.username}
              date={date}
              content={content}
              likes={likes.filter((x) => x.like === true).length}
              commentsCount={comments.length}
              onLike={onLike}
              liked={(() => likes.find((l) => l.user === userId && l.like))()}
            />
          </div>
        );
      })}
    </>
  );
}

export default List;
