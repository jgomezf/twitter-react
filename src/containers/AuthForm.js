import { Button, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../api';
import { setSession } from '../utils/auth';
import { useStore } from '../store/Store';
import Alert from '../components/Alert';

export default function AuthForm() {
  const history = useHistory();
  const {
    actions: { login },
  } = useStore();
  const [error, setError] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    const { username, password } = event.target.elements;
    try {
      setError('');
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
      setError('Incorrect username or password');
    }
  }

  return (
    <>
      <Typography variant="h4">Login</Typography>
      {error && <Alert severity="error" message={error} />}
      <form onSubmit={onSubmit}>
        <TextField
          name="username"
          placeholder="username"
          required
          id="standard-required"
          label="Username"
          margin="normal"
          fullWidth
        />
        <TextField
          name="password"
          placeholder="password"
          required
          id="standard-password-input"
          label="Password"
          type="password"
          margin="normal"
          fullWidth
          autoComplete="current-password"
        />
        <Button
          placeholder="submit"
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
