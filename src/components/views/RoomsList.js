import React, {useState, useEffect} from 'react'
import axios from 'axios'

import RoomInfo from '../common/RoomInfo'
import NavBar from '../common/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {fas} from '@fortawesome/free-solid-svg-icons'
import Error500 from '../common/Error500'

const RoomsList = (props) => {
    const initialState = {
        roomsList: [], 
        filteredRooms:[], 
        search: '',
        toggle: false,
    }
    
    
    const [rooms,
        setRooms] = useState(initialState)

    useEffect(() => {
        axios
            .get('http://localhost:5000/rooms')
            .then(response => {
                setRooms(rooms => ({
                    ...rooms,
                    roomsList: response.data,
                    filteredRooms: response.data
                    
                }))
            })
            .catch(err => setRooms(rooms => ({
                ...rooms,
                errorMessage: err.response.data.message
            })))
    }, [])

    const handleSearch = ({target}) => {
        const filter = target.value.toLowerCase()
        const filteredRooms = rooms.roomsList.filter(room =>
            room.location.direction.toLowerCase().includes(filter))

        setRooms(rooms => ({
            ...rooms,
            filteredRooms: filteredRooms,
            [target.name]: target.value
        }))
    }

    const handleToggle = () => {
        setRooms(rooms => ({
            ...rooms,
            toggle: !rooms.toggle
        }))
    }

    const showRooms = 
    rooms.filteredRooms.map(room => <RoomInfo
            key={room._id}
            userInSession={props.userInSession}
            setUserSession={props.setUserSession}
            _id={room._id}
            roomImg={room.images[0]}
            ownerImg={room.owner.imageUrl}
            ownerId={room.owner._id}
            ownerName={room.owner.name}
            ownerAge={room.owner.age}
            address={room.location.direction}
            price={room.price}/>)

    if(rooms.errorMessage){
        return(<Error500 />)
    } else {
        return (
            <main className="rooms-page">
                <div className="container-search">
                    <FontAwesomeIcon icon={fas.faSearchLocation}/>
                    <input 
                        name="search"
                        type="search"
                        placeholder="Search location..."
                        className="searchbar"
                        onChange={handleSearch}
                        aria-label="Search"
                    />
                </div>
                <h6 onClick={() => handleToggle()}>Order by {rooms.toggle ? <FontAwesomeIcon icon={fas.faArrowUp}/> : <FontAwesomeIcon icon={fas.faArrowDown} />}</h6>
                {rooms.toggle ? (<div className="container-order">
                <div className="o-col-1">
                    <h6 onClick={() => {
                        setRooms(rooms => ({
                            ...rooms,
                            filteredRooms: rooms.filteredRooms.sort((a, b) => (a.price > b.price) ? 1 : -1)
                        }))
                    }}> Price <FontAwesomeIcon icon={fas.faArrowDown}/></h6>
                    
                    <h6 onClick={() => {
                        setRooms(rooms => ({
                            ...rooms,
                            filteredRooms: rooms.filteredRooms.sort((a, b) => (a.price < b.price) ? 1 : -1)
                        }))
                    }}> Price <FontAwesomeIcon icon={fas.faArrowUp}/></h6>
                    
                    <h6 onClick={() => {
                        setRooms(rooms => ({
                            ...rooms,
                            filteredRooms: rooms.filteredRooms.sort((a, b) => (a.availability > b.availability) ? 1 : -1)
                        }))
                    }}> Availability (Sooner)</h6>
                    
                    <h6 onClick={() => {
                        setRooms(rooms => ({
                            ...rooms,
                            filteredRooms: rooms.filteredRooms.sort((a, b) => (a.amenities.daccess === b.amenities.daccess) ? 0 : a.amenitites.smokers? -1 : 1)
                        }))
                    }}> Adapted access <FontAwesomeIcon icon={fas.faArrowDown}/></h6>
                </div>
                <div className="o-col-2">
                    <h6 onClick={() => {
                        setRooms(rooms => ({
                            ...rooms,
                            filteredRooms: rooms.filteredRooms.sort((a, b) => (a.bedrooms < b.bedrooms) ? 1 : -1)
                        }))
                    }}> Nº rooms <FontAwesomeIcon icon={fas.faArrowUp}/></h6>
                
                    <h6 onClick={() => {
                        setRooms(rooms => ({
                            ...rooms,
                            filteredRooms: rooms.filteredRooms.sort((a, b) => (a.bedrooms > b.bedrooms) ? 1 : -1)
                        }))
                    }}> Nº rooms <FontAwesomeIcon icon={fas.faArrowDown}/></h6>
                    
                    <h6 onClick={() => {
                        setRooms(rooms => ({
                            ...rooms,
                            filteredRooms: rooms.filteredRooms.sort((a, b) => (a.tolerance.pets === b.tolerance.pets) ? 0 : a.tolerance.pets? -1 : 1)
                        }))
                    }}> Allows pets <FontAwesomeIcon icon={fas.faArrowDown}/></h6>
                    
                    <h6 onClick={() => {
                        setRooms(rooms => ({
                            ...rooms,
                            filteredRooms: rooms.filteredRooms.sort((a, b) => (a.tolerance.smokers === b.tolerance.smokers) ? 0 : a.tolerance.smokers? -1 : 1)
                        }))
                    }}> Allows smokers <FontAwesomeIcon icon={fas.faArrowDown}/></h6>
                </div>
                </div>) : null}
                <div className="container-roomlist">{showRooms}</div>
                <NavBar userInSession={props.userInSession}/>
            </main>
        )
    }
}

export default RoomsList
