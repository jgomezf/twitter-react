import http from '../utils/http';
import { formatDistance } from 'date-fns';

function formatTweet(tweet) {
  const date = formatDistance(new Date(tweet.createdAt), new Date());
  return {
    ...tweet,
    id: tweet._id,
    date,
  };
}

function formatTweets(tweets) {
  //return tweets.map((tweet) => formatTweet(tweet));
  return tweets.map(formatTweet); //single point
}

export async function getTweets() {
  const response = await http.get(`/tweets`);
  const { data } = response.data;
  return formatTweets(data);
}

export async function getTweet({ id }) {
  const response = await http.get(`/tweets/${id}`);
  const { data } = response.data;
  return formatTweet(data);
}

export async function createComment({ tweetId, comment, userId }) {
  return await http.post(`/tweets/comments`, {
    tweetId,
    comment,
    userId,
  });
}

export async function likeTweet({ tweetId, userId }) {
  return await http.post(`/tweets/likes/`, {
    tweetId,
    userId,
  });
}

export async function createTweet({ content }) {
  const response = await http.post('/tweets', {
    content,
  });
  const data = response.data;
  return formatTweet(data);
}
