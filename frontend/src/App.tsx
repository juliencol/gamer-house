import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './Components/Authentication/HomePageLanding.css';
import Authentication from 'Authentication/Authentication';
import useFetch from 'Components/Fetch/useFetch';
import { authReq } from 'Components/Fetch/request';

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
            <Switch>
                <Route path="/">
                    <h1>You are now connected</h1>
                    <button onClick={() => logOut()}>Log out</button>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
