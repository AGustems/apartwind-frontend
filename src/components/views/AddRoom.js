import React, {useState} from 'react'
import axios from 'axios'

import Form from '../layouts/Form'
import InputText from '../common/InputText'
import Map from '../common/Map'
import '../../theme/views.css'

const AddRoom = (props) => {
    const initialState = {
        property: '',
        location: {
            search: '',
            lat: 0,
            lng: 0,
            direction: ''
        },
        images: [],
        files: null,
        price: 0,
        size: '',
        availability: '',
        flatmates: [
            0, 0
        ],
        bedrooms: 0,
        bathrooms: 0,
        pets: null,
        smokers: null,
        tolerance: {
            guys: null,
            girls: null,
            couples: null,
            students: null,
            smokers: null,
            pets: null
        },
        title: '',
        description: '',
        page: 0
    }

    const [roomState,
        setRoomState] = useState(initialState)

    const handleChange = ({target}) => {
        setRoomState(roomState => ({
            ...roomState,
            [target.name]: target.value
        }))
    }

    const handleChangeTolerance = ({target}) => {
        setRoomState(roomState => ({
            ...roomState,
            tolerance: {
                ...roomState.tolerance,
                [target.name]: target.value
            }
        }))
    }

    const changePageNext = () => {
        const newPage = roomState.page + 1
        setRoomState(roomState => ({
            ...roomState,
            page: newPage
        }))
    }

    const changePageBack = () => {
        const newPage = roomState.page - 1
        setRoomState(roomState => ({
            ...roomState,
            page: newPage
        }))
    }

    const handleClickP = property => {
        setRoomState(roomState => ({
            ...roomState,
            property: property
        }))
    }

    const handleClickS = size => {
        setRoomState(roomState => ({
            ...roomState,
            size: size
        }))
    }


    const controllers = (
        <div className="form-controllers">
            <button className="faux-button" onClick={changePageBack}>Back</button>
            <button className="faux-button" onClick={changePageNext}>Next</button>
        </div>
    )

    if (roomState.page === 0) {
        return <Form    title="Property" 
                        subtitle="Please, choose the property type" 
                        content={
                            <div className='banner-content'>
                                <button className={(roomState.property === 'house') ? 'button-dark-forms' : 'button-light-forms'} onClick={() => handleClickP('house')}>House</button>
                                <button className={(roomState.property === 'flat') ? 'button-dark-forms' : 'button-light-forms'} onClick={() => handleClickP('flat')}>Flat</button>
                                <button className={(roomState.property === 'other') ? 'button-dark-forms' : 'button-light-forms'} onClick={() => handleClickP('other')}>Other</button>
                            </div>}
                        image="/images/signup-1.png"
                        littleInfo={<div className="only-controller">
                                        <button className="faux-button" onClick={changePageNext}>Next</button>
                                    </div>}
        />
    } else if (roomState.page === 1){
        return(
            <Form   title="Details"
                    subtitle="Tell us a little about the room..."
                    content={
                        <div className="banner-content">
                            <label>Room availability date</label>
                            <InputText
                                type="date"
                                name="availability"
                                value={roomState.availability}
                                onChange={e => handleChange(e)}
                            />
                            <label>Monthly cost</label>
                            <InputText
                                type="number"
                                placeholder="Price"
                                name="availability"
                                value={roomState.availability}
                                onChange={e => handleChange(e)}
                            />
                            <hr/>
                            <label>Room size</label>
                            <div className="buttons-h">
                                <button className={(roomState.size === 'individual') ? 'button-dark-forms' : 'button-light-forms'} onClick={() => handleClickS('individual')}>Individual</button>
                                <button className={(roomState.size === 'double') ? 'button-dark-forms' : 'button-light-forms'} onClick={() => handleClickS('double')}>Double</button>
                            </div>
                        </div>
                    }
                    image="/images/signup-1.png"
                    littleInfo={controllers}
            />
        )
    } else if (roomState.page === 2){
        return(
            <Form   title="Location" 
                    subtitle="Where is the appartment located?"
                    content={<Map setState={setRoomState}/>}
                    image="/images/signup-1.png"
                    littleInfo={controllers}
            />
        )
    }
}

export default AddRoom
