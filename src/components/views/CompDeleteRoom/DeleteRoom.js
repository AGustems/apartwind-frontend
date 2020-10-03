import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import Form from '../../layouts/CompForm/Form'

function DeleteProfile(props) {
    const handleDelete = () => {
        axios
            .delete(`${process.env.REACT_APP_API_URL}/rooms/${props.match.params.id}/delete`)
            .then(() => props.history.push(`/userprofile/${props.userInSession._id}`))
    }
    if (props.userInSession._id !== undefined) {
        return (<Form
            title="Errase Room"
            subtitle={`You are going to errase your advert ${props.userInSession.name}`}
            image="/images/delete-account.png"
            content={(
            <div className="farewell-text">
                <p>Are you sure that you want to delete your room advert? We hope that you are deleting
                    this advert because you have found the perfect roommmate for you!</p>
                <button className="delete-account" onClick={handleDelete}>Delete advert</button>
            </div>
        )}
            littleInfo={(
            <div className="footer-text">
                <p>If you are not sure about your decision...</p>
                <Link className="w-link" to={`/userprofile/${props.userInSession._id}`}>Go Back</Link>
            </div>
        )}/>)
    } else {
        return (
            <h1>You are not authorised to see this page</h1>
        )
    }
}

export default DeleteProfile