import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Feed from './Feed/Feed';
import Authentication from './Authentication/Authentication';

function App() {
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  if (!isAuthenticate) {
    return (
      <Router>
        <Switch>
          <Route exact={true} path="/">
            <Authentication setAuthentication={setIsAuthenticate} />
          </Route>
          <Route exact={true} path="/feed">
            <Feed />
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
