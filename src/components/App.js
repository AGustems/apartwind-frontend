import React, {useState, useEffect} from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './views/CompHome/Home'
import Login from './views/CompLogin/Login'
import Signup from './views/CompSignup/Signup'
import UserProfile from './views/CompUserProfile/UserProfile'
import EditProfile from './views/CompEditProfile/EditProfile'
import EditRoom from './views/CompEditRoom/EditRoom'
import DeleteProfile from './views/CompDeleteProfile/DeleteProfile'
import DeleteRoom from './views/CompDeleteRoom/DeleteRoom'
import RoomDetails from './views/CompRoomDetails/RoomDetails'
import AddRoom from './views/CompAddRoom/AddRoom'
import RoomsList from './views/CompRoomsList/RoomsList'
import User from './common/CompUser/User'
import Logout from './views/CompLogout/Logout'
import Offers from './views/CompOffers/Offers'
import AddOffer from './views/CompAddOffer/AddOffer'
import Error404 from './common/CompError404/Error404'

const App = () => {
    const initialState = {
        loggedInUser: {
            _id: null
        }
    }
    const [userInSession,
        setUserSession] = useState(initialState);

    useEffect(() => {
        const data = localStorage.getItem('user');
        if(data){
            setUserSession(JSON.parse(data))
        }
    },[])
    
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(userInSession))
    });

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
            <Route exact path='/rooms/:id/newOffer' render={(props) => <AddOffer {...props} userInSession={userInSession}/>}/>
            <Route exact path='/rooms/edit/:id' render={(props) => <EditRoom {...props} userInSession={userInSession} setUserSession={setUserSession}/>}/>
            <Route exact path='/rooms/delete/:id' render={(props) => <DeleteRoom {...props} userInSession={userInSession}/>}/>
            <Route exact path='/offers/:id' render={(props) => <Offers {...props} userInSession={userInSession}/>}/>
            <Route component={Error404}/>
        </Switch>
    );
}

export default App;