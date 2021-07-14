import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import useUser from './useUser';
import API from '../api';
import { useStore } from '../store/Store';

export default function UserEdit() {
  const {
    selectors: {
      user: { id },
    },
    actions: { updateUser },
  } = useStore();
  const history = useHistory();
  const { user } = useUser({ id });

  function cancel() {
    history.push(`/profile/${id}`);
  }

  async function update(event) {
    event.preventDefault();
    const { name, username, email, password1, password2 } =
      event.target.elements;

    try {
      if (password1.value !== password2.value) {
        return;
      }

      const data = await API.updateUser({
        id,
        name: name.value,
        username: username.value,
        email: email.value,
        password: password1.value,
        passwordConfirmation: password2.value,
      });

      if (data) {
        updateUser({
          id,
          name: data.value,
          username: data.value,
          email: data.value,
        });
        history.push(`/profile/${id}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (!user) return null;

  return (
    <form autoComplete="off" onSubmit={update}>
      <TextField
        required
        name="name"
        label="Name"
        defaultValue={user.name}
        fullWidth
      />
      <TextField
        disabled
        required
        name="username"
        label="Username"
        defaultValue={user.username}
        fullWidth
      />
      <TextField
        required
        name="email"
        label="Email"
        defaultValue={user.email}
        fullWidth
      />
      <TextField
        required
        name="password1"
        label="Password"
        fullWidth
        type="password"
      />
      <TextField
        required
        name="password2"
        label="Password confirmation"
        type="password"
        fullWidth
      />
      <Button variant="contained" color="primary" type="submit">
        Update
      </Button>
      <Button variant="contained" onClick={cancel} disabled={!id}>
        Cancel
      </Button>
    </form>
  );
}
