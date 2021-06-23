import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
import TweetDetails from './pages/TweetDetails';
import ProtectedRoute from './containers/ProtectedRoute';
import UserBar from './containers/UserBar';

const Login = React.lazy(() => import('./pages/Login'));
const Home = React.lazy(() => import('./pages/Home'));
const SignUp = React.lazy(() => import('./pages/SignUp'));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
          <ListItem component={NavLink} to="/" button>
            <Typography variant="h6" className={classes.title}>
              React Twitter
            </Typography>
          </ListItem>
          <UserBar />
          <ListItem component={NavLink} to="/signUp" button>
            SignUp
          </ListItem>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <React.Suspense fallback={<div> Loading...</div>}>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
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
    </Router>
  );
}
export default App;
