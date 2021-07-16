import { render, act } from '@testing-library/react';
import faker from 'faker';
import API from '../api';
import { StoreProvider } from '../store/Store';
import List from './List';

jest.mock('../api');

describe('List Container', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Display Tweets', async () => {
    const tweet = {
      id: faker.datatype.uuid(),
      content: faker.lorem.sentences(3),
      user: {
        id: faker.datatype.uuid(),
        username: faker.internet.userName(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email,
      },
      date: faker.date.past().toLocaleDateString(),
      comments: [],
      likes: [],
    };

    API.getTweets.mockResolvedValueOnce([tweet]);

    await act(async () => {
      const { findByText } = render(
        <StoreProvider>
          <List />
        </StoreProvider>
      );
      expect(await findByText(tweet.content)).toBeTruthy();
    });
  });
});
