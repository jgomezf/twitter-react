import React, { useEffect, useState } from 'react';
import Tweet from '../components/Tweet';
import { useParams } from 'react-router-dom';
import API from '../api';

export default function TweetDetails() {
  const { id } = useParams();
  const [tweet, setTweet] = useState(null);

  async function loadTweet() {
    try {
      const data = await API.getTweet({ id });
      if (data) {
        setTweet(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      loadTweet();
    }
  }, [id]);

  return (
    tweet && (
      <Tweet
        name={tweet.user.name}
        username={tweet.user.username}
        content={tweet.content}
        date={new Date(tweet.createdAt).toDateString()}
      />
    )
  );
}
