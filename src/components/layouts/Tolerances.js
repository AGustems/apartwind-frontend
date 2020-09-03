import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faCheckCircle,
    faTimesCircle,
    faMale,
    faFemale,
    faPeopleArrows,
    faGraduationCap,
    faSmoking,
    faPaw
} from '@fortawesome/free-solid-svg-icons'


const Tolerances = ({roomState, setRoomState}) => {
    return (
        <div className="container-amenities">
            <div className="amenity-feature">
                <h6
                    onClick={(e) => setRoomState(roomState => ({
                    ...roomState,
                    tolerance: {
                        ...roomState.tolerance,
                        guys: !roomState.tolerance.guys
                    }
                }))}>
                    <FontAwesomeIcon className="list-icon" icon={faMale}/>
                    Guys</h6>
                {roomState.tolerance.guys
                    ? <h6><FontAwesomeIcon className="list-check" icon={faCheckCircle}/></h6>
                    : <h6><FontAwesomeIcon className="list-cross" icon={faTimesCircle}/></h6>}
            </div>
            <div className="amenity-feature">
                <h6
                    onClick={(e) => setRoomState(roomState => ({
                    ...roomState,
                    tolerance: {
                        ...roomState.tolerance,
                        girls: !roomState.tolerance.girls
                    }
                }))}>
                    <FontAwesomeIcon className="list-icon" icon={faFemale}/>
                    Girls</h6>
                {roomState.tolerance.girls
                    ? <h6><FontAwesomeIcon className="list-check" icon={faCheckCircle}/></h6>
                    : <h6><FontAwesomeIcon className="list-cross" icon={faTimesCircle}/></h6>}
            </div>
            <div className="amenity-feature">
                <h6
                    onClick={(e) => setRoomState(roomState => ({
                    ...roomState,
                    tolerance: {
                        ...roomState.tolerance,
                        couples: !roomState.tolerance.couples
                    }
                }))}>
                    <FontAwesomeIcon className="list-icon" icon={faPeopleArrows}/>
                    Couples</h6>
                {roomState.tolerance.couples
                    ? <h6><FontAwesomeIcon className="list-check" icon={faCheckCircle}/></h6>
                    : <h6><FontAwesomeIcon className="list-cross" icon={faTimesCircle}/></h6>}
            </div>
            <div className="amenity-feature">
                <h6
                    onClick={(e) => setRoomState(roomState => ({
                    ...roomState,
                    tolerance: {
                        ...roomState.tolerance,
                        students: !roomState.tolerance.students
                    }
                }))}>
                    <FontAwesomeIcon className="list-icon" icon={faGraduationCap}/>
                    Students</h6>
                {roomState.tolerance.students
                    ? <h6><FontAwesomeIcon className="list-check" icon={faCheckCircle}/></h6>
                    : <h6><FontAwesomeIcon className="list-cross" icon={faTimesCircle}/></h6>}
            </div>
            <div className="amenity-feature">
                <h6
                    onClick={(e) => setRoomState(roomState => ({
                    ...roomState,
                    tolerance: {
                        ...roomState.tolerance,
                        smokers: !roomState.tolerance.smokers
                    }
                }))}>
                    <FontAwesomeIcon className="list-icon" icon={faSmoking}/>
                    Smokers</h6>
                {roomState.tolerance.smokers
                    ? <h6><FontAwesomeIcon className="list-check" icon={faCheckCircle}/></h6>
                    : <h6><FontAwesomeIcon className="list-cross" icon={faTimesCircle}/></h6>}
            </div>
            <div className="amenity-feature">
                <h6
                    onClick={(e) => setRoomState(roomState => ({
                    ...roomState,
                    tolerance: {
                        ...roomState.tolerance,
                        pets: !roomState.tolerance.pets
                    }
                }))}>
                    <FontAwesomeIcon className="list-icon" icon={faPaw}/>
                    Pets</h6>
                {roomState.tolerance.pets
                    ? <h6><FontAwesomeIcon className="list-check" icon={faCheckCircle}/></h6>
                    : <h6><FontAwesomeIcon className="list-cross" icon={faTimesCircle}/></h6>}
            </div>
        </div>
    )
}

export default Tolerances
