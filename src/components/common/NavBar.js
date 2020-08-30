import React from 'react'
import {Link} from 'react-router-dom'
import '../../theme/common.css'

const NavBar = () => {
    return (
        <div className="navbar">
            <div><Link to={"/rooms"}><img alt="room-search" src="/icons/magGlass.png"/></Link></div>
            <div><Link to={"/chat"}><img alt="chat" src="/icons/chat.png"/></Link></div>
            <div><Link to={"/userprofile"}><img alt="userprofile" src="/icons/userprofile.png"/></Link></div>
            <div><Link to={"/rooms/add"}><img alt="add-room" src="/icons/plus.png"/></Link></div>
        </div>
    )
}

export default NavBar
