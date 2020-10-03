import React from 'react'
import {Link} from 'react-router-dom'

const Error403 = () => {
    return (
        <main className="error-page">
            <h1>Uuuups... </h1>
            <img className="error-page-img" src="/images/error-403.png" alt="auth-error"/>
            <p>To access this content you need to be registered  <Link to="/auth/login">Log in</Link> or <Link to="/auth/signup">Sign up</Link></p>
        </main>
    )
}

export default Error403
