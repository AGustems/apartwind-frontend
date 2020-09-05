import React, {useState, useEffect} from 'react'
import axios from 'axios'

import RoomInfo from '../common/RoomInfo'
import NavBar from '../common/NavBar'

const RoomsList = (props) => {
    const [rooms,
        setRooms] = useState({roomsList: []})

    useEffect(() => {
        axios
            .get('http://localhost:5000/rooms')
            .then(response => {
                setRooms(rooms => ({
                    ...rooms,
                    roomsList: response.data
                }))
            })
            .catch(err => console.log("Error while trying to get the rooms information: ", err))
    }, [])

    const showRooms = rooms
        .roomsList
        .map(room => <RoomInfo
            key={room._id}
            userInSession={props.userInSession}
            setUserSession={props.setUserSession}
            _id={room._id}
            roomImg={room.images[0]}
            ownerImg={room.owner.imageUrl}
            ownerId={room.owner._id}
            ownerName={room.owner.name}
            ownerSurname={room.owner.surname}
            address={room.location.direction}
            price={room.price}/>)

    return (
        <main className="rooms-page">
            <div>
                <p>Future SearchBar</p>
            </div>
            <div>
                <p>Future Filters?</p>
            </div>
            {showRooms}
            <NavBar userInSession={props.userInSession}/>
        </main>
    )
}

export default RoomsList
