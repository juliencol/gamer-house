import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Authentication from 'pages/authentication/Authentication';
import useFetch from 'Components/use-fetch/useFetch';
import { authReq } from 'Services/AuthenticationServices';
import Feed from 'pages/feed/Feed';
import Header from 'Components/Header/Header';
import Profile from 'pages/profile/Profile';
import Home from '../src/pages/Home/Home';

function App() {
  const { data, setRequest, resetData } = useFetch<boolean>(
    false,
    authReq().isAuthenticated()
  );
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  useEffect(() => {
    setIsAuthenticate(data);
  }, [data]);

  function logOut() {
    setIsAuthenticate(false);
    localStorage.removeItem('accessToken');
    resetData();
  }

  if (!isAuthenticate) {
    return (
      <Router>
        <Switch>
          <Route path="/authentication" exact={true}>
            <Header logOut={logOut} isAuthenticated={isAuthenticate} />
            <Authentication refresh={() => setRequest(authReq().isAuthenticated())} />
          </Route>
          <Route path="/">
            <Header logOut={logOut} isAuthenticated={isAuthenticate} />
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }

  return (
    <Router>
      <Header logOut={logOut} isAuthenticated={isAuthenticate} />
      <Switch>
        <Route exact={true} path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Feed />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
