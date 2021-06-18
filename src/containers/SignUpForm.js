import React from 'react';

import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function SignUpForm() {
  return (
    <>
      <Typography variant="h4">SingUp</Typography>
      <form>
        <TextField
          name="name"
          required
          label="Name"
          margin="normal"
          fullWidth
        />
        <TextField
          name="username"
          required
          label="Username"
          margin="normal"
          fullWidth
        />
        <TextField
          name="email"
          required
          label="Email"
          margin="normal"
          type="email"
          fullWidth
        />
        <TextField
          name="password"
          required
          label="Password"
          margin="normal"
          type="password"
          fullWidth
        />
        <TextField
          name="passwordConfirmation"
          required
          label="Password Confirmation"
          margin="normal"
          type="password"
          fullWidth
        />
        <Button
          variant="contained"
          size="medium"
          color="primary"
          margin="normal"
          fullWidth
          type="submit"
        >
          Create User
        </Button>
      </form>
    </>
  );
}
