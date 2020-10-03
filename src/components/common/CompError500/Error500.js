import React from 'react'
import {Link} from 'react-router-dom'

const Error500 = () => {
    return (
        <main className="error-page">
            <h1>Uuuups... </h1>
            <img className="error-page-img" style={{margin:" 8% 0"}} src="/images/error-500.png" alt="auth-error"/>
            <p>Sorry, something went wrong with our servers. Go <Link to="/">Home</Link> or <Link to="/rooms">the rooms list</Link></p>
        </main>
    )
}

export default Error500