import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import Form from '../layouts/Form'
import InputText from '../common/InputText'
import AgeSlider from '../common/AgeSlider'

const Signup = (props) => {
    const initialState = {
        name: '',
        surname: '',
        occupation: '',
        age: 0,
        email: '',
        password: '',
        description: '',
        char:'',
        characteristics: [],
        socials: {
            facebook: '',
            twitter: '', 
            instagram: ''
        },
        page: 0
    }

    const [userSignup,
        setUserSignup] = useState(initialState)

    const handleSubmit = () => {
        const name = userSignup.name
        const surname = userSignup.surname
        const occupation = userSignup.occupation
        const age = userSignup.age
        const email = userSignup.email
        const password = userSignup.password
        const description = userSignup.description
        const characteristics = userSignup.characteristics
        const socials = userSignup.socials

        axios.post('http://localhost:5000/auth/signup', {
            name,
            surname,
            occupation,
            age,
            email,
            password,
            description,
            characteristics,
            socials
        }, {withCredentials: true}).then(response => {
            props.setUserSession(response.data);
            props.history.push(`/userprofile/${response.data._id}`)
        }).catch(err => setUserSignup(userSignup => ({
            ...userSignup,
            errorMessage: err.response.data.message
        })))
    }

    const handleChange = ({target}) => {
        setUserSignup(userSignup => ({
            ...userSignup,
            [target.name]: target.value
        }))
    }

    const handleChangeObject = ({target}) => {
        setUserSignup(userSignup => ({
            ...userSignup,
            socials : {
                ...userSignup.socials,
                [target.name]:target.value
            }
        }))
    }
    
    const changePageNext = () => {
        const newPage = userSignup.page+1
        setUserSignup(userSignup => ({
            ...userSignup,
            page : newPage
        }))
    }

    const changePageBack = () => {
        const newPage = userSignup.page-1
        setUserSignup(userSignup => ({
            ...userSignup,
            page : newPage
        }))
    }

    const handleCharPush = (e) => {
        e.preventDefault()
        const charArray = userSignup.characteristics;
        charArray.push(userSignup.char)
        setUserSignup(userSignup => ({
            ...userSignup,
            characteristics: charArray,
            char:''
        }))
    }

    const controllers = (
        <div className="form-controllers">
            <button className="faux-button" onClick={changePageBack}>Back</button>
            <button className="faux-button" onClick={changePageNext}>Next</button>
        </div>
    )
    
    const showChar = userSignup.characteristics.map(char => <h4 key={char} className="title-inline">{char}</h4>)

    if(userSignup.page === 0){
        return (
            <Form   title="Hello!"
                    subtitle="It's nice to meet you!"
                    secondaryTitle="Start with the sign up form"
                    secondaryContent={
                        <div className="register-container"><button className="register-button" onClick={changePageNext}>Registration Questions</button></div>
                    }
                    image="/images/signup-0.png"
                    littleInfo = {
                    <p>You already have an account? <Link className="w-link" to={"/auth/login"}>Log in</Link></p>
                }
            />
        )
    } else if (userSignup.page === 1){
        return(
            <Form   title="About you ..."
                    subtitle="We want to know you!"
                    content={
                        <div className="banner-content">
                            {(userSignup.name === '') ? <h6 className="error-little">The name is required to sign up </h6> : null}
                            <InputText
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={userSignup.name}
                                onChange={e => handleChange(e)}
                            />
                            {(userSignup.surname === '') ? <h6 className="error-little">The surname is required to sign up </h6> : null}
                            <InputText 
                                type="text"
                                name="surname"
                                placeholder="Surname"
                                value={userSignup.surname}
                                onChange={e => handleChange(e)}
                            />
                            <InputText 
                                type="text"
                                name="occupation"
                                placeholder="Occupation"
                                value={userSignup.occupation}
                                onChange={e => handleChange(e)}
                            />
                            
                        </div>}
                    image="/images/signup-1.png"
                    littleInfo={controllers}
            />
        )
    } else if (userSignup.page === 2){
        return(
            <Form   title="Age"
                    subtitle="How old are you?"
                    content={
                        <div className="banner-content">
                            <div className="age-banner">
                                <h1>{userSignup.age}</h1>
                            </div>
                            <AgeSlider state={userSignup} setState={setUserSignup}/>
                        </div>}
                    image="/images/signup-2.png"
                    littleInfo={controllers}
            />)
    } else if (userSignup.page === 3){
        return(
            <Form   title="Details"
                    subtitle="Tell us about you..."
                    content={
                        <div>
                            <textarea   name="description"
                                        placeholder="Description"
                                        rows="7"
                                        value={userSignup.description}
                                        onChange={e => handleChange(e)}
                                        className="input-big"
                            ></textarea>
                            <form onSubmit={handleCharPush} className="char-form">
                                <InputText  type="text"  
                                            name="char"
                                            placeholder="Charactetistic"
                                            value={userSignup.char}
                                            onChange={e => handleChange(e)}
                                />
                                <input type="submit" value="+" className="char-submit"/>
                            </form>
                            {userSignup.characteristics ? (<div className="container-char">{showChar}</div>) : null}
                        </div>  
                    }
                    image="/images/signup-3.png"
                    littleInfo={controllers}
            />
        )
    } else if (userSignup.page === 4){
        return(<Form   title="Credentials"
                    subtitle="This is the information for the login"
                    content={
                        <div className="banner-content">
                            {(userSignup.email === '') ? <h6 className="error-little">The email is required to sign up </h6> : null}
                            <InputText
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={userSignup.email}
                                onChange={e => handleChange(e)}
                            />
                            {(userSignup.password === '') ? <h6 className="error-little">The password is required to sign up </h6> : null}
                            <InputText 
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={userSignup.password}
                                onChange={e => handleChange(e)}
                            />
                        </div>}
                    image="/images/signup-4.png"
                    littleInfo={controllers}
            />)
    } else if (userSignup.page === 5){
        return(
            <Form   title="Socials"
                    subtitle="Do you want to include your socials?"
                    content={
                        <div className="banner-content">
                            <InputText
                                type="text"
                                name="facebook"
                                placeholder="Facebook"
                                value={userSignup.socials.facebook}
                                onChange={e => handleChangeObject(e)}
                            />
                            <InputText 
                                type="text"
                                name="twitter"
                                placeholder="Twitter"
                                value={userSignup.socials.twitter}
                                onChange={e => handleChangeObject(e)}
                            />
                            <InputText 
                                type="text"
                                name="instagram"
                                placeholder="Instagram"
                                value={userSignup.socials.instagram}
                                onChange={e => handleChangeObject(e)}
                            />
                            {userSignup.errorMessage ? <h6 className="error">Error: {userSignup.errorMessage} </h6> : null}
                        </div>}
                    image="/images/signup-5.png"
                    littleInfo={<div className="submit-signup">
                        <button className="faux-button" onClick={changePageBack}>Back</button>
                        <button className="faux-button" onClick={handleSubmit}>Send</button>
                    </div>}
            />
        )
    }
}

export default Signup
