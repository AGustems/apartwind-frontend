import React from 'react'

import User from '../layouts/User'


function UserProfile(props) {
    if(props.userInSession._id != null){
        return (
            <User 
                image={props.userInSession.imageUrl}
                fullName={`${props.userInSession.name} ${props.userInSession.surname}`}
                occupation={props.userInSession.occupation}
                facebook={props.userInSession.socials.facebook}
                twitter={props.userInSession.socials.twitter}
                instagram={props.userInSession.socials.instagram}
                description={props.userInSession.description}
                characteristics={props.userInSession.characteristics}
                adverts={props.userInSession.adverts}
                favourites={props.userInSession.favourites}
                edit={props.userInSession._id}
            />
        )
    } else {
        return(<h1>There is no user in session</h1>)
    }
}

export default UserProfile
