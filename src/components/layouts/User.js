import React from 'react'
import {Link} from 'react-router-dom'

import NavBar from '../common/NavBar'
import '../../theme/layouts.css'

const User = (props) =>{
    const showChar = props.characteristics.map(item => (<li key={item}>{item}</li>))
    const showAdverts = props.adverts.map(item => <p key={item}>{item}</p>) // Change when the common Room is done
    const showFavourites = props.adverts.map(item => <p key={item}>{item}</p>) // Change when the common Room is done

    return (
        <div className='container-userprofile'>
            <section className='banner-top'>
                    <div className="user-img">
                        <img alt="user" src={props.image}/>
                    </div>
                    <div className="user-title">
                        <h2>{props.fullName}<span>{props.edit ? <Link to={`userprofile/${props.edit}/delete`}><img alt="delete" src="/icons/delete.png"/></Link> : null}</span></h2>
                        <h4>{props.occupation}</h4>
                        {props.edit ? <Link to={`userprofile/${props.edit}`}>Edit profile</Link> : null}
                        {props.contact ? props.contact : null}
                    </div>
            </section>
            <section className="user-description">
                <div className="user-presentation">
                    <p>{props.description}</p>
                </div>
                <div className="social-links">
                    <a href={props.facebook}><img alt="facebook" src="/icons/facebook.png"/></a>
                    <a href={props.twitter}><img alt="twitter" src="/icons/twitter.png"/></a>
                    <a href={props.instagram}><img alt="instagram" src="/icons/instagram.png"/></a>
                </div>
            </section>
            <section className="characteristics-list">
                <h2>Characteristics</h2>
                <ul>
                    {showChar}
                </ul>
            </section>
            {props.adverts ? (<section className="container-adsfavs">
                <h2>Adverts</h2>
                {(props.adverts.length > 0) ? showAdverts : (<h6>You haven't posted any rooms yet</h6>)}
            </section>) : null}
            {props.favourites? (<section className="container-adsfavs">
                <h2>Favourites</h2>
                {(props.favourites.length > 0) ? showFavourites : (<h6>You haven't added any favourites yet</h6>)}
                </section>) : null}
            <NavBar />
        </div>
    )
}

export default User
