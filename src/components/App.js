import React, {useState} from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './views/Home'
import Login from './views/Login'
import Signup from './views/Signup'
import UserProfile from './views/UserProfile'
import EditProfile from './views/EditProfile'
import DeleteProfile from './views/DeleteProfile'
import AddRoom from './views/AddRoom'

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
            <Route exact path='/userprofile' render={(props) => <UserProfile {...props} userInSession={userInSession}/>}/>
            <Route path='/userprofile/:id/delete' render={(props) => <DeleteProfile {...props} userInSession={userInSession}/>}/>
            <Route path='/userprofile/:id' render={(props) => <EditProfile {...props} userInSession={userInSession} setUserSession={setUserSession}/>}/>
            <Route exact path='/rooms/add' render={(props) => <AddRoom {...props}/>}/>
        </Switch>
    );
}

export default App;