import { BASE_URL } from '../const';
import http from '../utils/http';

export async function login({ username = '', password = '' }) {
  const response = await http.post(`/users/login`, {
    username,
    password,
  });
  const { data, message } = response.data;
  console.log(response);
  if (message === 'ok') {
    return Promise.resolve(data);
  } else {
    return Promise.reject(message);
  }
}
