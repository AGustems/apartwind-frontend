import React, {useState, useEffect} from 'react'
import axios from 'axios'

import NavBar from './NavBar'
import '../../theme/layouts.css'

const User = (props) => {
    const[user, setUser] = useState({})
    
    useEffect(() => {
        axios.get(`http://localhost:5000/userprofile/${props.match.params.id}`)
            .then(response => {
                setUser(response.data)
            }).catch(err => console.log("Error while retrieving the user's data: ", err))
    },[props.match.params.id])

    
    if(user !== {}){
        return (
            <div className='container-userinfo'>
                <section className='banner-top'>
                        <div className="user-img">
                            <img alt="user" src={user.imageUrl}/>
                        </div>
                        <div className="user-title">
                            <h2>{user.name} {user.surname}</h2>
                            <h4>{user.occupation}</h4>
                            {//contact button space
                            }
                        </div>
                </section>
                <section className="user-description">
                    <div className="user-presentation">
                        <p>{user.description}</p>
                    </div>
                    <div className="social-links">
                        <a href={user.socials ? user.socials.facebook : "https://www.facebook.com/"}><img alt="facebook" src="/icons/facebook.png"/></a>
                        <a href={user.socials ? user.socials.twitter : "https://www.twitter.com/"}><img alt="twitter" src="/icons/twitter.png"/></a>
                        <a href={user.socials ? user.socials.instagram : "https://www.instagram.com/"}><img alt="instagram" src="/icons/instagram.png"/></a>
                    </div>
                </section>
                <section className="characteristics-list">
                    <h2>Characteristics</h2>
                    <ul>
                        {(user.characteristics !== undefined) ? user.characteristics.map(item => (<li key={item}>{item}</li>)) : null}
                    </ul>
                </section>
                <NavBar userInSession={props.userInSession}/>
            </div>
        )

    } else {
        return (<h2>Error</h2>)
    }
}

export default User
