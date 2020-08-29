import React, {useState} from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './views/Home'
import Login from './views/Login'
import Signup from './views/Signup'
import NavBar from './common/NavBar';

const App = () => {
    const initialState = {
        loggedInUser: {
            _id: null
        }
    }
    const [userInSession,
        setUserSession] = useState(initialState);

    return (
        <Switch>
            <Route exact path='/' render={(props) => <Home {...props} userInSession={userInSession}/>}/>
            <Route
                exact
                path='/auth/login'
                render={(props) => <Login {...props} setUserSession={setUserSession}/>}/>
            <Route
                exact
                path='/auth/signup'
                render={(props) => <Signup {...props} setUserSession={setUserSession}/>}/>
            <Route exact path='/test' render={(props) => <NavBar {...props} userInSession={userInSession}/>}/>
        </Switch>
    );
}

export default App;