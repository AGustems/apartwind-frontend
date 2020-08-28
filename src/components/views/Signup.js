import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Signup = (props) => {
    const initialState = {
        name: '',
        surname: '',
        occupation: '',
        email: '',
        password: '',
        description: '',
        //location: {},
        characteristics: [],
        socials: {
            facebook: '',
            twitter: '',
            instagram: ''
        },
        controls: {
            page: 0
        }
    }
    const [userSignup,
        setUserSignup] = useState(initialState)

    const handleSubmit = e => {
        e.preventDefault()
        const name = userSignup.name
        const surname = userSignup.surname
        const occupation = userSignup.occupation
        const email = userSignup.email
        const password = userSignup.password
        const description = userSignup.description
        // const location = userSignup.location
        const characteristics = userSignup.characteristics
        const socials = userSignup.socials

        axios.post('http://localhost:5000/auth/signup', {
            name,
            surname,
            occupation,
            email,
            password,
            description,
            //location,
            characteristics,
            socials
        }, {withCredentials: true}).then(response => {
            props.setUserSession(response.data)
        }).catch(err => console.log('Something went wrong when sending the signup information', err))
    }

    const handleChange = ({target}) => {
        setUserSignup(userSignup => ({
            ...userSignup,
            [target.name]: target.value
        }))
    }

    return (
        <div className="container-login">
            <section className="banner-form">
                <div className="form-logo">
                    <img alt="roomer-logo" src="/images/LogoRoomer-blue.png"/>
                </div>
                <div className="form-title">
                    <h1>Hello!</h1>
                    <h3>It's nice to meet you!</h3>
                </div>
            </section>
            <form className="login-form" onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                    type='text'
                    name='name'
                    value={userSignup.name}
                    onChange={e => handleChange(e)}/>

                <label>Surname</label>
                <input
                    type='text'
                    name='surname'
                    value={userSignup.surname}
                    onChange={e => handleChange(e)}/>

                <label>Occupation</label>
                <input
                    type='text'
                    name='occupation'
                    value={userSignup.occupation}
                    onChange={e => handleChange(e)}/>

                <label>Email</label>
                <input
                    type='text'
                    name='email'
                    value={userSignup.email}
                    onChange={e => handleChange(e)}/>

                <label>Password</label>
                <input
                    type='password'
                    name='password'
                    value={userSignup.password}
                    onChange={e => handleChange(e)}/>

                <input type="submit" value="Sign up"/>
            </form>
            <p>Already have an account?
                <Link to={"/auth/login"}>
                    Log in</Link>
            </p>
        </div>
    )
}

export default Signup
