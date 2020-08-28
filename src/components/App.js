import React, {useState} from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './views/Home'
import Login from './views/Login'
import Signup from './views/Signup'

const App = (props) => {
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
        </Switch>
    );
}

export default App;