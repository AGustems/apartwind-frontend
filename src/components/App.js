import React, {useState} from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './views/Home'
import Login from './views/Login'
import Signup from './views/Signup'
import UserProfile from './views/UserProfile'
import EditProfile from './views/EditProfile'
import EditRoom from './views/EditRoom'
import DeleteProfile from './views/DeleteProfile'
import DeleteRoom from './views/DeleteRoom'
import RoomDetails from './views/RoomDetails'
import AddRoom from './views/AddRoom'
import RoomsList from './views/RoomsList'
import User from './common/User'
import Logout from './views/Logout'
import Error404 from './common/Error404'

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
            <Route exact path='/auth/logout' render={(props) => <Logout {...props} setUserSession={setUserSession}/>}/>
            <Route
                exact
                path='/auth/login'
                render={(props) => <Login {...props} setUserSession={setUserSession}/>}/>
            <Route
                exact
                path='/auth/signup'
                render={(props) => <Signup {...props} setUserSession={setUserSession}/>}/>
            <Route path='/user/:id' render={(props) => <User {...props} userInSession={userInSession}/>}/>
            <Route exact path='/userprofile/:id' render={(props) => <UserProfile {...props} userInSession={userInSession} setUserSession={setUserSession}/>}/>
            <Route path='/userprofile/:id/delete' render={(props) => <DeleteProfile {...props} userInSession={userInSession}/>}/>
            <Route path='/userprofile/:id/edit' render={(props) => <EditProfile {...props} userInSession={userInSession} setUserSession={setUserSession}/>}/>
            <Route exact path='/rooms/add' render={(props) => <AddRoom {...props} userInSession={userInSession}/>}/>
            <Route exact path='/rooms' render={(props) => <RoomsList {...props} userInSession={userInSession} setUserSession={setUserSession}/>}/>
            <Route exact path='/rooms/:id' render={(props) => <RoomDetails {...props} userInSession={userInSession} setUserSession={setUserSession}/>}/>
            <Route exact path='/rooms/edit/:id' render={(props) => <EditRoom {...props} userInSession={userInSession} setUserSession={setUserSession}/>}/>
            <Route exact path='/rooms/delete/:id' render={(props) => <DeleteRoom {...props} userInSession={userInSession}/>}/>
            <Route component={Error404}/>
        </Switch>
    );
}

export default App;