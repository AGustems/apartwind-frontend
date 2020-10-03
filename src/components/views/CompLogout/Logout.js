import React, {useLayoutEffect} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const Logout = ({setUserSession}) => {
    useLayoutEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`)
            .then(() => {
                setUserSession({
                    loggedInUser: {
                        _id: null
                    }
                })
            }).catch(err => console.log(err))
    }, [setUserSession])
    
    return (
        <Redirect to='/'/>
    )
}

export default Logout
