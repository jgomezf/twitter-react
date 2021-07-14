import { Button, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import API from '../api';
import { setSession } from '../utils/auth';
import { useStore } from '../store/Store';

export default function AuthForm() {
  const history = useHistory();
  const {
    actions: { login },
  } = useStore();

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
      login({
        ...data,
        token: '',
      });
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
