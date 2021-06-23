import React from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import API from '../api';

export default function AuthForm() {
  const history = useHistory();

  async function onSubmit(event) {
    event.preventDefault();
    const { username, password } = event.target.elements;
    try {
      const data = await API.login({
        username: username.value,
        password: password.value,
      });
      console.log(data);
      const { token } = data;
      localStorage.setItem('token', token);
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
