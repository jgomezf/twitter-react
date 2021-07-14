import React from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import ListItem from '@material-ui/core/ListItem';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import ProtectedRoute from './containers/ProtectedRoute';
import UserBar from './containers/UserBar';

const Login = React.lazy(() => import('./pages/Login'));
const Home = React.lazy(() => import('./pages/Home'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const TweetDetails = React.lazy(() => import('./pages/TweetDetails'));
const Profile = React.lazy(() => import('./pages/Profile'));
const EditProfile = React.lazy(() => import('./pages/EditProfile'));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1da1f2',
      contrastText: 'white',
    },
  },
});

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
    </SvgIcon>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: 'white',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
      <Router>
        <ThemeProvider theme={theme}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <HomeIcon />
              <ListItem component={NavLink} to="/" button>
                <Typography variant="h6" className={classes.title}>
                  React Twitter
                </Typography>
              </ListItem>
              <UserBar />
            </Toolbar>
          </AppBar>

          <Container maxWidth="sm">
            <React.Suspense fallback={<div> Loading...</div>}>
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <ProtectedRoute path="/profile/:id" exact>
                  <Profile />
                </ProtectedRoute>
                <ProtectedRoute path="/profile/:id/edit">
                  <EditProfile />
                </ProtectedRoute>
                <ProtectedRoute path="/tweets/:id">
                  <TweetDetails />
                </ProtectedRoute>
                <Route path="/signUp">
                  <SignUp />
                </Route>
                <ProtectedRoute path="/">
                  <Home />
                </ProtectedRoute>
              </Switch>
            </React.Suspense>
          </Container>
        </ThemeProvider>
      </Router>
  );
}
export default App;
