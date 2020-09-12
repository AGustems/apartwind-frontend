import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import Form from '../layouts/Form'

function DeleteProfile(props) {
    const handleDelete = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/userprofile/${props.match.params.id}/delete`)
            .then(() => props.history.push('/'))
    }
    
    if(props.userInSession._id === props.match.params.id){
        return (<Form
            title="Goodbye :("
            subtitle={`We are sad to see you go ${props.userInSession.name}`}
            image="/images/delete-account.png"
            content={(<div className="farewell-text">
                <p>Are you sure that you want to delete your user? If you do you are going to
                    lose all your information stored in your profile and you will no longer have
                    access to your account</p>
                    <button className="delete-account" onClick={handleDelete}>Delete account</button>
            </div>)}
            littleInfo={(<div className="footer-text"><p>If you are not sure about your decision...</p><Link className="w-link" to={`/userprofile/${props.userInSession._id}`}>Go Back</Link></div>)}
            />)
    } else {
        return( <h1>You are not authorised to see this page</h1>)
    }
}

export default DeleteProfile
