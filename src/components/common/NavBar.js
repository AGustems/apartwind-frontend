import React from 'react'
import {Link} from 'react-router-dom'
import '../../theme/common.css'

const NavBar = (props) => {
    return (
        <div className="navbar">
            <Link className="navbar-title" to={"/"}><h3 style={{color: "white"}}>Roomer</h3></Link>
            <div><Link to={"/rooms"}><img alt="room-search" src="/icons/magGlass.png"/><p className="navbar-title">Room List</p></Link></div>
            <div><Link to={"/offers/" + props.userInSession._id}><img alt="offers" src="/icons/chat.png"/><p className="navbar-title">Offers</p></Link></div>
            <div><Link to={"/userprofile/" + props.userInSession._id}><img alt="userprofile" src="/icons/userprofile.png"/><p className="navbar-title">User Profile</p></Link></div>
            <div><Link to={"/rooms/add"}><img alt="add-room" src="/icons/plus.png"/><p className="navbar-title">Add room</p></Link></div>
        </div>
    )
}

export default NavBar
