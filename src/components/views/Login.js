import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

import Form from '../layouts/Form'
import InputText from '../common/InputText'

const Login = (props) => {
    const initialState = {
        email: '',
        password: ''
    }
    const [userLogin,
        setUserLogin] = useState(initialState)

    const handleSubmit = e => {
        e.preventDefault()
        const email = userLogin.email
        const password = userLogin.password
        axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
            email,
            password
        }, {withCredentials: true}).then(response => {
            props.setUserSession(response.data);
            props.history.push("/userprofile/" + response.data._id)
        }).catch(err => setUserLogin(userLogin => ({
            ...userLogin,
            errorMessage: err.response.data.message
        })))
    }

    const handleChange = ({target}) => {
        setUserLogin(userLogin => ({
            ...userLogin,
            [target.name]: target.value
        }))
    }

    return (
        <Form   title="Hello!" 
                subtitle="Nice to see you again!"
                secondaryTitle="Log in with your credentials"
                secondaryContent = {
                <form className="login-form" onSubmit={handleSubmit}>
                    <InputText 
                        type='text'
                        name='email'
                        placeholder="Email"
                        value={userLogin.email}
                        onChange={e => handleChange(e)}
                    />
                    <InputText 
                        placeholder="Password"
                        type='password'
                        name='password'
                        value={userLogin.password}
                        onChange={e => handleChange(e)}
                    />
                    <div className="container-submit">
                    <input className="input-submit" type="submit" value="Log in"/>
                    {userLogin.errorMessage ? <h6 style={{marginLeft: "20%"}} className="error">Error: {userLogin.errorMessage} </h6> : null}
                    </div>
                </form>}
                image="/images/login-img.png"
                littleInfo = {
                    <p>You don't have account? <Link className="w-link" to={"/auth/signup"}>Sign up</Link></p>
                }
                />
    )
}

export default Login
