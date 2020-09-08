import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

import NavBar from '../common/NavBar'
import RoomInfo from '../common/RoomInfo'
import Error403 from '../common/Error403'
import axios from 'axios'

function UserProfile(props) {
    const [state,
        setState] = useState({favourites: [], adverts: []})

    useEffect(() => {
        let mounted = true;
        axios
            .get(`http://localhost:5000/userprofile/${props.match.params.id}`)
            .then(response => {
                if(mounted){
                    setState(user => ({
                        favourites: response.data.favourites,
                        adverts: response.data.adverts
                    }))
                }
            })
            return function cleanup() {mounted = false}
    }, [props.match.params.id])
    
    if (props.userInSession._id === props.match.params.id) {
        const showChar = props
            .userInSession
            .characteristics
            .map(item => (
                <li key={item}>{item}</li>
            ))

        return (
            <div className='container-userprofile'>
                <section className='banner-top'>
                    <div className="user-img">
                        <img alt="user" src={props.userInSession.imageUrl}/>
                    </div>
                    <div className="user-title">
                        <h2>{props.userInSession.name} {props.userInSession.surname}<span>{props.match.params.id
                                    ? <Link to={`${props.match.params.id}/delete`}><img alt="delete" src="/icons/delete.png"/></Link>
                                    : null}</span>
                        </h2>
                        <h4>{props.userInSession.occupation}</h4>
                        {props.match.params.id
                            ? <Link to={`${props.match.params.id}/edit`}>Edit profile</Link>
                            : null}
                    </div>
                </section>
                <section className="user-description">
                    <div className="user-presentation">
                        <p>{props.userInSession.description}</p>
                    </div>
                    <div className="social-links">
                        <a target="_blank" rel="noopener noreferrer" href={props.userInSession.socials ? `https://${props.userInSession.socials.facebook}` : '/'}><img alt="facebook" src="/icons/facebook.png"/></a>
                        <a target="_blank" rel="noopener noreferrer" href={props.userInSession.socials ? `https://${props.userInSession.socials.twitter}` : '/'}><img alt="twitter" src="/icons/twitter.png"/></a>
                        <a target="_blank" rel="noopener noreferrer" href={props.userInSession.socials ? `https://${props.userInSession.socials.instagram}` : '/'}><img alt="instagram" src="/icons/instagram.png"/></a>
                    </div>
                </section>
                <section className="characteristics-list">
                    <h2>Characteristics</h2>
                    <ul>
                        {showChar}
                    </ul>
                </section>
                <section className="container-adsfavs">
                    <h2>Adverts</h2>
                    {(state.adverts === [])
                        ? <h6>You haven't posted any adverts yet</h6>
                        : state.adverts.map(room => <RoomInfo
                            key={room._id}
                            userInSession={props.userInSession}
                            setUserSession={props.setUserSession}
                            _id={room._id}
                            roomImg={room.images[0]}
                            ownerId={props.userInSession._id}
                            ownerImg={props.userInSession.imageUrl}
                            ownerName={props.userInSession.name}
                            ownerSurname={props.userInSession.surname}
                            address={room.location.direction}
                            price={room.price}/>)}
                </section>
                <section className="container-adsfavs">
                    <h2>Favourites</h2>
                    {(state.favourites === [])
                        ? <h6>You haven't added any favourites yet</h6>
                        : state.favourites.map(room => <RoomInfo
                            key={room._id}
                            userInSession={props.userInSession}
                            setUserSession={props.setUserSession}
                            _id={room._id}
                            roomImg={room.images[0]}
                            ownerId={room.owner._id}
                            ownerImg={room.owner.imageUrl}
                            ownerName={room.owner.name}
                            ownerSurname={room.owner.surname}
                            address={room.location.direction}
                            price={room.price}/>)}
                    </section>
                <NavBar userInSession={props.userInSession}/> 
                </div>)
    } else {
        props.history.push("/auth/login")
        return <Error403 />
    }
}

export default UserProfile
