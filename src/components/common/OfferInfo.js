import React, {useState} from 'react'
import {useHistory} from 'react-router'
import axios from 'axios'

const OfferInfo = (props) => {
    const [state, setToggle] = useState({toggle: false})
    const history = useHistory()

    const showOffers = props
        .offers
        .map(offer => (
            <div className="offer-message" key={`${offer.offeror._id}data`}>
                <h6>Message {props.type}: {(props.type === "from")
                        ? `${offer.offeror.name} ${offer.offeror.surname}`
                        : `${props.roomOwner.name} ${props.roomOwner.surname}`}
                </h6>
                <p>{offer.message}</p>
            </div>
        ))

    const handleToggle = () => {
        setToggle(state => ({
            toggle: !state.toggle
        }))
    }
    
    const handleDelete = () => {
        axios.put(`${process.env.REACT_APP_API_URL}/rooms/${props.roomId}/deleteOffer`, {
            userId: props.userId
        }, {withCredentials: true})
        .then(() => history.go(0))
    }
    
    return (
        <div className="offer-info">
            <div
                className="offer-banner"
                style={{
                background: `url(${props.roomImg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
                <h2>{props.roomTitle}</h2>
            </div>

            {(props.offers[0] !== undefined)
                ? showOffers
                :   (<div className="offer-message">
                        <h6>You haven't recieved any offers for that room yet</h6>
                    </div>)}

            {props.roomOwner ? <p onClick={handleToggle} style={{color: "#f74d4d", padding:0, marginBottom: "5px"}}>Retrieve offer</p>:null}
            {state.toggle ? <div className="offer-warning">
                <p>Are you sure that you want to retrieve your offer?</p>
                <button onClick={handleDelete} className="delete-account">Delete</button>
            </div> : null}


            {(props.offers[0] !== undefined)
                    ? <p>{props.callText}</p>
                    : null}
        </div>
    )
}

export default OfferInfo
