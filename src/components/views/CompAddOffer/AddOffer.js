import React, {useState} from 'react'
import axios from 'axios'

import Error403 from '../../common/CompError403/Error403'
import NavBar from '../../common/CompNavBar/NavBar'
import Form from '../../layouts/CompForm/Form'
import './AddOffer.css'

const AddOffer = (props) => {
    const [state, setState] = useState({message:''})

    const handleChange = ({target}) => {
        setState(state => ({
            ...state,
            [target.name]: target.value
        }))
    }

    const handleSubmit = () => {
        const message = state.message
        const userId = props.userInSession._id

        axios.put(`${process.env.REACT_APP_API_URL}/rooms/${props.match.params.id}/newOffer`, {
            userId: userId,
            message: message
        }, {withCredentials: true}).then(() => props.history.push('/rooms'))
        .catch(err => setState(state => ({
            ...state, 
            errorMessage: err.response.data.message
        })))
    }

    if(props.userInSession._id === null){
        return(<Error403 />)
    } else {
        return (
            <div className="offer-form">
                <Form   title="Make offer"
                        subtitle="Let's say the owner why!"
                        image="/images/offer.png"
                        content={
                            <div className="banner-content">
                                <textarea   name="message"
                                            placeholder="Send a message to the owner..."
                                            rows="7"
                                            value={state.message}
                                            onChange={e => handleChange(e)}
                                            className="input-big"
                            ></textarea>
                            {state.errorMessage ? <h6 className="error">Error: {state.errorMessage} </h6> : null}
                            <button onClick={handleSubmit} className="button-light-forms">Send offer!</button>
                            </div>
                        }
                />
                <NavBar userInSession={props.userInSession}/>
            </div>
        )
    }
}

export default AddOffer
