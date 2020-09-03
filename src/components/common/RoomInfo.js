import React, {useState} from 'react'
import '../../theme/common.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import axios from 'axios'


function RoomInfo(props) {
    const handleClick = () => {
        axios.patch(`http://localhost:5000/rooms/${props._id}`, {userId: props.userInSession._id}, {withCredentials: true})
            .then((response) => {
                props.setUserSession(state => response.data)
            }).catch(err => console.log('Something went wrong when updating the favourites list'))
    }
    
    return (
        <div className="room-item">
            <div className="room-img">
                <img src={props.roomImg} alt={props.address}/>
            </div>
            <div className="room-data">
                <div className="room-top-info">
                    <img src={props.ownerImg} alt={props.ownerName}/>
                    {(props.userInSession.loggedInUser) ? null :
                        <button onClick={() => handleClick()}>
                        {(props.userInSession.favourites.includes(props._id)) ? 
                        <FontAwesomeIcon icon={fas.faHeart}/> : 
                        <FontAwesomeIcon icon={far.faHeart}/>}                    
                    </button> 
                    }
                    
                </div>
                <h5>{props.ownerName} {props.ownerSurname}</h5>
                <hr/>
                <h6><FontAwesomeIcon icon={fas.faMapMarkerAlt}/> {props.address}</h6>
                <h2>{props.price}€</h2>
            </div>
        </div>
    )
}

export default RoomInfo
