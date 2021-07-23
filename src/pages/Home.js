import React from 'react';
import List from '../containers/List';
import TweetForm from '../containers/TweetForm';
import { Helmet } from 'react-helmet';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <TweetForm />
      <List />
    </>
  );
}
