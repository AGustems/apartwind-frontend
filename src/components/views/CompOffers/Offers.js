import React, {useState, useEffect} from 'react'
import axios from 'axios'

import OfferInfo from '../../common/CompOfferInfo/OfferInfo'
import NavBar from '../../common/CompNavBar/NavBar'
import Error500 from '../../common/CompError500/Error500'
import './Offers.css'

const Offers = (props) => {
    const [offers,
        setOffers] = useState({
        recieved: [],
        recievedCheck: false,
        sent: [],
        sentCheck: false,
        offersToggle: false,
        deleteToggle: false
    })

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/rooms/userAds/${props.match.params.id}`)
            .then(response => {
                setOffers(offers => ({
                    ...offers,
                    recieved: response.data,
                    recievedCheck: true
                }))
            })
            .catch(err => console.log(err))
    }, [props.match.params.id])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/rooms/userOffers/${props.match.params.id}`)
            .then(response => {
                setOffers(offers => ({
                    ...offers,
                    sent: response.data,
                    sentCheck: true
                }))
            })
            .catch(err => console.log(err))
    }, [props.match.params.id])

    const handleOffersToggle = () => {
        setOffers(offers => ({
            ...offers,
            offersToggle: !offers.offersToggle
        }))
    }

    const offersRecived = offers
        .recieved
        .map(room => <OfferInfo
            key={`${room._id}ad`}
            type="from"
            roomImg={room.images[0]}
            roomTitle={room.title}
            offers={room.offers}
            callText={"Check your email for the full details of the offer"}/>)

    const offersSent = offers
        .sent
        .map(room => <OfferInfo
            key={`${room._id}of`}
            type="to"
            setState={setOffers}
            userId={props.match.params.id}
            roomId={room._id}
            roomImg={room.images[0]}
            roomTitle={room.title}
            roomOwner={room.owner}
            offers={room.offers}
            callText={"Check your email for the full details of the offer"}/>)

    if (offers.recievedCheck && offers.sentCheck) {
        return (
            <main className="offers">
                <div className="offers-controllers">
                    <h3>Offers:
                    </h3>
                    <h4 onClick={handleOffersToggle} style={offers.offersToggle ? null : {textDecoration: "underline"}}>Recieved</h4>
                    <h4 onClick={handleOffersToggle} style={offers.offersToggle ? {textDecoration: "underline"}: null}>Sent</h4>
                </div>
                <section className="offers-list">
                    {offers.offersToggle
                        ? offersSent
                        : offersRecived}
                </section>
                <NavBar userInSession={props.userInSession}/>
            </main>
        )
    } else {
        return (
            <Error500/>
        )
    }
}

export default Offers
