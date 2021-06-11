import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Authentication from 'pages/authentication/Authentication';
import useFetch from 'Components/use-fetch/useFetch';
import { authReq } from 'Services/AuthenticationServices';
import Feed from 'pages/feed/Feed';
import Header from 'Components/Header/Header';
<<<<<<< HEAD
<<<<<<< HEAD
import Profile from 'pages/profile/Profile';
=======
=======
import Authentication from './pages/authentication/Authentication';
import useFetch from './Components/use-fetch/useFetch';
import { authReq } from './Services/AuthenticationServices';
import Feed from './pages/feed/Feed';
import Header from './Components/Header/Header';
<<<<<<< HEAD
>>>>>>> c3e566b (Solved import configs)
<<<<<<< HEAD
>>>>>>> 7ec57d9 (Solved import configs)
=======
=======
import Profile from './pages/profile/Profile';
>>>>>>> a24ff37 ( profile Page front + route back)
>>>>>>> 8b4e604 ( profile Page front + route back)
=======
import Profile from 'pages/profile/Profile';
>>>>>>> cce8a4a (follow + recherche user + description relié au back + refonte front)

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
          <Route path="/">
            <Authentication
              setAuthentication={setIsAuthenticate}
              refresh={() => setRequest(authReq().isAuthenticated())}
            />
          </Route>
        </Switch>
      </Router>
    );
  }

  return (
    <Router>
      <Header logOut={logOut} />
      <Switch>
        <Route exact={true} path="/">
          <h1>You are now connected</h1>
          <button onClick={() => logOut()}>Log out</button>
        </Route>
        <Route exact={true} path="/feed">
          <Feed />
        </Route>
        <Route exact={true} path="/profile">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
