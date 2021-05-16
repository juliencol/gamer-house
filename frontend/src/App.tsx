import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Authentication from './Authentication/Authentication';

function App() {
  const [isAuthenticate, setIsAuthenticate] = useState(false);

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
