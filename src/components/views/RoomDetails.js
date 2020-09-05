import React, {useState, useEffect} from 'react'
import GoogleMapReact from 'google-map-react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import axios from 'axios'

const RoomDetails = (props) => {
    const [room,
        setRoom] = useState({loading: true})

    useEffect(() => {
        axios
            .get(`http://localhost:5000/rooms/${props.match.params.id}`)
            .then(response => {
                setRoom(() => (response.data))
            })
    }, [props.match.params.id])

    const handleFavClick = () => {
        axios.patch(`http://localhost:5000/rooms/${props.match.params.id}`, {
            userId: props.userInSession._id
        }, {withCredentials: true}).then((response) => {
            props.setUserSession(state => response.data)
        }).catch(err => console.log('Something went wrong when updating the favourites list'))
    }

    const getMapOptions = (maps) => {
        return {
            disableDefaultUI: false,
            mapTypeControl: false,
            streetViewControl: false,
            styles: [
                {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [
                        {
                            visibility: 'on'
                        }
                    ]
                }
            ]
        }
    }

    const renderMarkers = (map, maps) => {
        let marker = new maps.Marker({
            position: {
                lat: room.location.lat,
                lng: room.location.lng
            },
            map,
            title: room.location.direction
        })
        return marker
    }

    if (room.loading) {
        return (
            <h1>
                Loading
            </h1>
        )
    } else {
        return (
            <main className="container-rdetails">
                <section className="room-images">
                    <img className="room-carr" alt={room.title} src={room.images[0]}/>
                    <img className="room-avt" alt={room.owner.name} src={room.owner.imageUrl}/>
                </section>
                <section className="room-title-fav">
                    <h1>{room.title}</h1>
                    {(props.userInSession.loggedInUser)
                        ? null
                        : <button onClick={() => handleFavClick()}>
                            {(props.userInSession.favourites.includes(props.match.params.id))
                                ? <FontAwesomeIcon icon={fas.faHeart}/>
                                : <FontAwesomeIcon icon={far.faHeart}/>}
                        </button>}
                </section>
                <section className="room-info">
                    <div className="room-intro">
                        <p><FontAwesomeIcon icon={fas.faUserFriends}/> {room.flatmates[0] + room.flatmates[1]}
                            roomates</p>
                        <p><FontAwesomeIcon icon={fas.faDoorOpen}/> {room.bedrooms}
                            bedrooms</p>
                        <p><FontAwesomeIcon icon={fas.faToilet}/> {room.bathrooms}
                            bathrooms</p>
                        <p><FontAwesomeIcon icon={fas.faBed}/> {room.size}</p>
                    </div>
                    <p className="room-description">{room.description}</p>
                    <div className="price-contact">
                        <h1>{room.price}€</h1>
                        <button className="button-contact">Contact</button>
                    </div>
                </section>
                <h3>Amenities</h3>
                <section className="room-mainchar">
                    <ul>
                        <li>{room.amenities.living
                                ? <FontAwesomeIcon className="list-check" icon={fas.faCheckCircle}/>
                                : <FontAwesomeIcon className="list-cross" icon={fas.faTimesCircle}/>}
                            Shared living room</li>
                        <li>{room.amenities.internet
                                ? <FontAwesomeIcon className="list-check" icon={fas.faCheckCircle}/>
                                : <FontAwesomeIcon className="list-cross" icon={fas.faTimesCircle}/>}
                            Internet</li>
                        <li>{room.amenities.parking
                                ? <FontAwesomeIcon className="list-check" icon={fas.faCheckCircle}/>
                                : <FontAwesomeIcon className="list-cross" icon={fas.faTimesCircle}/>}
                            Parking</li>
                        <li>{room.amenities.balcony
                                ? <FontAwesomeIcon className="list-check" icon={fas.faCheckCircle}/>
                                : <FontAwesomeIcon className="list-cross" icon={fas.faTimesCircle}/>}
                            Balcony or terrace</li>
                        <li>{room.amenities.garden
                                ? <FontAwesomeIcon className="list-check" icon={fas.faCheckCircle}/>
                                : <FontAwesomeIcon className="list-cross" icon={fas.faTimesCircle}/>}
                            Garden or patio</li>
                        <li>{room.amenities.daccess
                                ? <FontAwesomeIcon className="list-check" icon={fas.faCheckCircle}/>
                                : <FontAwesomeIcon className="list-cross" icon={fas.faTimesCircle}/>}
                            Adapted access</li>
                    </ul>
                </section>
                <h3>Location</h3>
                <section className="room-location">
                    <GoogleMapReact
                        key={room.location.direction}
                        bootstrapURLKeys={{
                        key: process.env.REACT_APP_API_GOOGLE
                    }}
                        defaultCenter={{
                        lat: room.location.lat,
                        lng: room.location.lng
                    }}
                        defaultZoom={15}
                        options={getMapOptions}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps)}/>
                </section>
                <h3>About the host</h3>
                <section className="room-owner">
                    <p className="room-description">{room.owner.description}</p>
                </section>
            </main>
        )
    }
}

export default RoomDetails