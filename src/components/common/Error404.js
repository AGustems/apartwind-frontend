import React from 'react'
import {Link} from 'react-router-dom'

const Error404 = () => {
    return (
        <main className="error-page">
            <h1>Uuuups... </h1>
            <img className="error-page-img" style={{margin:" 8% 0"}} src="/images/error-404.png" alt="auth-error"/>
            <p>Sorry, we couldn't find the content that you were searching for, go <Link to="/">Home</Link> or <Link to="/rooms">the rooms list</Link></p>
        </main>
    )
}

export default Error404
