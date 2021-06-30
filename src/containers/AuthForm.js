import { Button, TextField, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../api';
import { setSession } from '../utils/auth';
import UserContext from './UserContext';

export default function AuthForm() {
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  async function onSubmit(event) {
    event.preventDefault();
    const { username, password } = event.target.elements;
    try {
      const data = await API.login({
        username: username.value,
        password: password.value,
      });
      const { token } = data;
      setSession({ data: token });
      setUser(data);
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={onSubmit}>
        <TextField
          name="username"
          required
          id="standard-required"
          label="Username"
          margin="normal"
          fullWidth
        />
        <TextField
          name="password"
          required
          id="standard-password-input"
          label="Password"
          type="password"
          margin="normal"
          fullWidth
          autoComplete="current-password"
        />
        <Button
          variant="contained"
          size="medium"
          color="primary"
          margin="normal"
          fullWidth
          type="submit"
        >
          Login
        </Button>
      </form>
    </>
  );
}
