import React, {useState} from 'react'
import axios from 'axios'

import Form from '../layouts/Form'
import InputText from '../common/InputText'
import Map from '../common/Map'
import Amenities from '../layouts/Amenities'
import Flatmates from '../layouts/Flatmates'
import BedBath from '../layouts/BedBath'
import Tolerances from '../layouts/Tolerances'
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
        pets: false,
        smokers: false,
        amenities:{
            living: false,
            internet: false,
            parking: false,
            balcony: false,
            garden: false,
            daccess: false
        },
        tolerance: {
            guys: false,
            girls: false,
            couples: false,
            students: false,
            smokers: false,
            pets: false
        },
        title: '',
        description: '',
        page: 0
    }

    const [roomState,
        setRoomState] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(roomState.files)
        const formData = new FormData ()
        formData.append("owner", props.userInSession._id)
        formData.append("property", roomState.property)
        formData.append("location", JSON.stringify(roomState.location))
        formData.append("price", roomState.price)
        formData.append("size", roomState.size)
        formData.append("availability", roomState.availability)
        formData.append("flatmates", JSON.stringify(roomState.flatmates))
        formData.append("bedrooms", roomState.bedrooms)
        formData.append("bathrooms", roomState.bathrooms)
        formData.append("pets", roomState.pets)
        formData.append("smokers", roomState.smokers)
        formData.append("amenities", JSON.stringify(roomState.amenities))
        formData.append("tolerance", JSON.stringify(roomState.tolerance))
        formData.append("title", roomState.title)
        formData.append("description", roomState.description)
        for(const key of Object.keys(roomState.files)){
            formData.append("images", roomState.files[key])
        }

        axios.post('http://localhost:5000/rooms/add', formData, {withCredentials:true})
            .then((response) => {
                console.log(response.data)
                props.history.push("/")
            }).catch(err => console.log('Something went wrong when sending the room information', err))
    }
    
    const handleChange = ({target}) => {
        setRoomState(roomState => ({
            ...roomState,
            [target.name]: target.value
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

    const handleFileUpload = ({target}) => {
        setRoomState(roomState => ({
            ...roomState,
            files: target.files
        }))
    }

    const handleSmokersClick = () => {
        setRoomState(roomState => ({
            ...roomState,
            smokers: !roomState.smokers
        }))
    }

    const handlePetsClick = () => {
        setRoomState(roomState => ({
            ...roomState,
            pets: !roomState.pets
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
                        image="/images/room/room-form1.png"
                        littleInfo={<div className="only-controller" style={{marginTop: "50px"}}>
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
                                name="price"
                                value={roomState.price}
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
                    image="/images/room/room-form6.png"
                    littleInfo={controllers}
            />
        )
    } else if (roomState.page === 2){
        return(
            <Form   title="Location and Pictures" 
                    subtitle="Can you show us the room?"
                    content={
                        <div className="banner-content">
                            <label>Pictures</label>
                            <div className="input-text-bg">
                                <input
                                    className="input-text" 
                                    type="file"
                                    name="image"
                                    onChange={e => handleFileUpload(e)}
                                    multiple
                                />
                            </div>
                            <hr/>
                            <label>Address</label>
                            <Map setState={setRoomState}/>
                        </div>}
                    image="/images/room/room-form3.png"
                    littleInfo={controllers}
            />
        )
    } else if (roomState.page === 3){
        return(
            <Form   title="Amenities"
                    subtitle="What services does the room have?"
                    content = {
                        <Amenities roomState={roomState} setRoomState={setRoomState}/>
                    }
                    image="/images/room/room-form4.png"
                    littleInfo={controllers}
            />
        )
    } else if (roomState.page === 4) {
        return(
            <Form   title="Flatmates"
                    subtitle="Who is living in the appartment at the moment?"
                    content={
                        <Flatmates roomState={roomState} setRoomState={setRoomState}/>
                    }
                    image="/images/room/room-form5.png"
                    littleInfo={controllers}
            />
        )
    } else if (roomState.page === 5){
        return(
            <Form   title="Rooms"
                    subtitle="How many bedrooms and bathrooms are?"
                    content={<BedBath roomState={roomState} setRoomState={setRoomState}/>}
                    image="/images/room/room-form2.png"
                    littleInfo={controllers}
            />
        )
    } else if (roomState.page === 6){
        return(
            <Form   title="Specials"
                    subtitle="Are there any smokers or pets in the house?"
                    content={
                        <div className='banner-content'>
                            <h4>Are there any smokers?</h4>    
                            <div className="buttons-h">
                                <button className={(roomState.smokers === true) ? 'button-dark-forms' : 'button-light-forms'} onClick={()=> handleSmokersClick()}>Yes</button>
                                <button className={(roomState.smokers === false) ? 'button-dark-forms' : 'button-light-forms'} onClick={()=> handleSmokersClick()}>No</button>
                            </div>
                            <hr/>
                            
                            <h4>Are there any pets?</h4>
                            <div className="buttons-h">    
                                <button className={(roomState.pets === true) ? 'button-dark-forms' : 'button-light-forms'} onClick={()=> handlePetsClick()}>Yes</button>
                                <button className={(roomState.pets === false) ? 'button-dark-forms' : 'button-light-forms'} onClick={()=> handlePetsClick()}>No</button>
                            </div>
                        </div>
                    }
                    image="/images/room/room-form7.png"
                    littleInfo={controllers}
            />
        )
    } else if (roomState.page === 7){
        return(
            <Form   title="Looking for..."
                    subtitle="I'm happy to live with..."
                    content={<Tolerances roomState={roomState} setRoomState={setRoomState}/>}
                    image="/images/room/room-form8.png"
                    littleInfo={controllers}
            />
        )
    } else if (roomState.page === 8){
        return(
            <Form   title="Advert"
                    subtitle="The last details of the advert"
                    content={<div className="add-publi">
                        <InputText  type="text"  
                                    name="title"
                                    placeholder="Advert title"
                                    value={roomState.title}
                                    onChange={e => handleChange(e)}/>
                        <textarea   name="description"
                                    placeholder="Advert Description"
                                    rows="7"
                                    value={roomState.description}
                                    onChange={e => handleChange(e)}
                                    className="input-big"></textarea>                        
                    </div>}
                    image="/images/room/room-form9.png"
                    littleInfo={<div className="submit-signup">
                        <button className="faux-button" onClick={changePageBack}>Back</button>
                        <button className="faux-button" onClick={handleSubmit}>Send</button>
                    </div>}
            />
        )
    }
}

export default AddRoom
