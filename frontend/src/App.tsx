import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Authentication from './Authentication/Authentication';
import useFetch from './Components/Fetch/useFetch';
import { authReq } from './Components/Fetch/request';

function App() {
  const { data } = useFetch<boolean>(false, authReq().isAuthenticated());
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  useEffect(() => {
    setIsAuthenticate(data);
  }, [data]);

  if (!isAuthenticate) {
    return (
      <Router>
        <Switch>
          <Route path="/">
            <Authentication setAuthentication={setIsAuthenticate} />
          </Route>
        </Switch>
      </Router>
    );
  }

  return (
    <Router>
      <Switch>
        <Route path="/">
          <h1>You are now connected</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
