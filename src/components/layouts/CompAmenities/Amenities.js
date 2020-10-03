import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faCouch,
    faCheckCircle,
    faTimesCircle,
    faWifi,
    faCar,
    faWind,
    faTree
} from '@fortawesome/free-solid-svg-icons'
import {faAccessibleIcon} from '@fortawesome/free-brands-svg-icons'

const Amenities = ({roomState, setRoomState}) => {
    return (
        <div className="container-amenities">
            <div className="amenity-feature">
                <h6
                    onClick={(e) => setRoomState(roomState => ({
                    ...roomState,
                    amenities: {
                        ...roomState.amenities,
                        living: !roomState.amenities.living
                    }
                }))}>
                    <FontAwesomeIcon className="list-icon" icon={faCouch}/>
                    Shared Living Room</h6>
                {roomState.amenities.living
                    ? <h6><FontAwesomeIcon className="list-check" icon={faCheckCircle}/></h6>
                    : <h6><FontAwesomeIcon className="list-cross" icon={faTimesCircle}/></h6>}
            </div>
            <div className="amenity-feature">
                <h6
                    onClick={(e) => setRoomState(roomState => ({
                    ...roomState,
                    amenities: {
                        ...roomState.amenities,
                        internet: !roomState.amenities.internet
                    }
                }))}>
                    <FontAwesomeIcon className="list-icon" icon={faWifi}/>
                    Internet</h6>
                {roomState.amenities.internet
                    ? <h6><FontAwesomeIcon className="list-check" icon={faCheckCircle}/></h6>
                    : <h6><FontAwesomeIcon className="list-cross" icon={faTimesCircle}/></h6>}
            </div>
            <div className="amenity-feature">
                <h6
                    onClick={(e) => setRoomState(roomState => ({
                    ...roomState,
                    amenities: {
                        ...roomState.amenities,
                        parking: !roomState.amenities.parking
                    }
                }))}>
                    <FontAwesomeIcon className="list-icon" icon={faCar}/>
                    Parking</h6>
                {roomState.amenities.parking
                    ? <h6><FontAwesomeIcon className="list-check" icon={faCheckCircle}/></h6>
                    : <h6><FontAwesomeIcon className="list-cross" icon={faTimesCircle}/></h6>}
            </div>
            <div className="amenity-feature">
                <h6
                    onClick={(e) => setRoomState(roomState => ({
                    ...roomState,
                    amenities: {
                        ...roomState.amenities,
                        balcony: !roomState.amenities.balcony
                    }
                }))}>
                    <FontAwesomeIcon className="list-icon" icon={faWind}/>
                    Balcony or terrace</h6>
                {roomState.amenities.balcony
                    ? <h6><FontAwesomeIcon className="list-check" icon={faCheckCircle}/></h6>
                    : <h6><FontAwesomeIcon className="list-cross" icon={faTimesCircle}/></h6>}
            </div>
            <div className="amenity-feature">
                <h6
                    onClick={(e) => setRoomState(roomState => ({
                    ...roomState,
                    amenities: {
                        ...roomState.amenities,
                        garden: !roomState.amenities.garden
                    }
                }))}>
                    <FontAwesomeIcon className="list-icon" icon={faTree}/>
                    Garden or patio</h6>
                {roomState.amenities.garden
                    ? <h6><FontAwesomeIcon className="list-check" icon={faCheckCircle}/></h6>
                    : <h6><FontAwesomeIcon className="list-cross" icon={faTimesCircle}/></h6>}
            </div>
            <div className="amenity-feature">
                <h6
                    onClick={(e) => setRoomState(roomState => ({
                    ...roomState,
                    amenities: {
                        ...roomState.amenities,
                        daccess: !roomState.amenities.daccess
                    }
                }))}>
                    <FontAwesomeIcon className="list-icon" icon={faAccessibleIcon}/>
                    Disabled access</h6>
                {roomState.amenities.daccess
                    ? <h6><FontAwesomeIcon className="list-check" icon={faCheckCircle}/></h6>
                    : <h6><FontAwesomeIcon className="list-cross" icon={faTimesCircle}/></h6>}
            </div>
        </div>
    )
}

export default Amenities
