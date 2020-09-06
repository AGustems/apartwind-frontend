import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Form from '../layouts/Form'
import InputText from '../common/InputText'
import Map from '../common/Map'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAccessibleIcon} from '@fortawesome/free-brands-svg-icons'
import {faCheckCircle, faTimesCircle, faMale, faFemale, faPeopleArrows, faGraduationCap,
    faSmoking, faPaw, faCouch, faWifi, faCar, faWind, faTree} from '@fortawesome/free-solid-svg-icons'

import '../../theme/views.css'

const EditRoom = (props) => {
    const[roomState, setRoomState] = useState({})
    
    useEffect(() => {
        axios.get(`http://localhost:5000/rooms/${props.match.params.id}`)
        .then(response => {
            setRoomState({
                property: response.data.property,
                location: response.data.location,
                images: [],
                oldImages: response.data.images,
                files: null,
                price: response.data.price,
                size: response.data.size,
                availability: response.data.availability.toString().slice(0,10),
                flatmates:response.data.flatmates,
                bedrooms: response.data.bedrooms,
                bathrooms: response.data.bathrooms,
                pets: response.data.pets,
                smokers: response.data.smokers,
                amenities: response.data.amenities,
                tolerance: response.data.tolerance,
                title: response.data.title,
                description: response.data.description,
            })
        })
        .catch(err => setRoomState(roomState => ({
            ...roomState,
            errorMessage: err.response.data.message
        })))}, [props.match.params.id])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData ()
        if(roomState.files !== null){
            for(const key of Object.keys(roomState.files)){
                formData.append("images", roomState.files[key])
            }
        }
        formData.append("oldImages", JSON.stringify(roomState.oldImages))
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

        axios.put(`http://localhost:5000/rooms/${props.match.params.id}/edit`, formData, {withCredentials:true})
            .then(() => {
                props.history.push(`/userprofile/${props.userInSession._id}`)
            }).catch(err => setRoomState(roomState => ({
                ...roomState,
                errorMessage: err.response.data.message
            })))
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

    const handleChange = ({target}) => {
        setRoomState(roomState => ({
            ...roomState,
            [target.name]: target.value
        }))
    }

    const handleFileUpload = ({target}) => {
        setRoomState(roomState => ({
            ...roomState,
            files: target.files
        }))
    }
    
    if(props.userInSession._id !== undefined && roomState.location !== undefined){
        return (
            <Form   title="Edit room" 
                    subtitle="You can change the room data here!"
                    image="/images/signup-2.png"
                    content={
                        <div className="container-roomedit">
                            <h4>Type or property</h4>
                            <div className='property-content'>
                                <button className={(roomState.property === 'House') ? 'button-dark-little' : 'button-light-little'} onClick={() => handleClickP('House')}>House</button>
                                <button className={(roomState.property === 'Flat') ? 'button-dark-little' : 'button-light-little'} onClick={() => handleClickP('Flat')}>Flat</button>
                                <button className={(roomState.property === 'Other') ? 'button-dark-little' : 'button-light-little'} onClick={() => handleClickP('Other')}>Other</button>
                            </div>
                            
                            <h4>Room availability date</h4>
                            <InputText
                                type="date"
                                name="availability"
                                value={roomState.availability}
                                onChange={e => handleChange(e)}
                            />
                            
                            <h4>Monthly cost</h4>
                            <InputText
                                type="number"
                                placeholder="Price"
                                name="price"
                                value={roomState.price}
                                onChange={e => handleChange(e)}
                            />
                            
                            <h4>Room size</h4>
                            <div className="property-content">
                                <button className={(roomState.size === 'individual') ? 'button-dark-little' : 'button-light-little'} onClick={() => handleClickS('individual')}>Individual</button>
                                <button className={(roomState.size === 'double') ? 'button-dark-little' : 'button-light-little'} onClick={() => handleClickS('double')}>Double</button>
                            </div>
                            <h4>Pictures</h4>
                            <div className="input-text-bg">
                                <input
                                    className="input-text" 
                                    type="file"
                                    name="image"
                                    onChange={e => handleFileUpload(e)}
                                    multiple
                                />
                            </div>
                            
                            <h4>Address</h4>
                            <p>The actual address is: <br/>{roomState.location.direction}</p>
                            <Map className="edit-map" setState={setRoomState}/>
                            
                            <h4 style={{marginTop:"80px"}}>Amenities</h4>
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
                            <h4>Flatmates (men)</h4>
                            <InputText
                                type="number"
                                placeholder="Man"
                                name="flatmates"
                                value={roomState.flatmates[0]}
                                onChange={e => {
                                    setRoomState(roomState => ({
                                        ...roomState,
                                        flatmates: [parseInt(e.target.value), roomState.flatmates[1]]
                                    }))
                                }}
                            />
                            
                            <h4>Flatmates (women)</h4>
                            <InputText
                                type="number"
                                placeholder="Women"
                                name="flatmates"
                                value={roomState.flatmates[1]}
                                onChange={e => {
                                    setRoomState(roomState => ({
                                        ...roomState,
                                        flatmates: [roomState.flatmates[0], parseInt(e.target.value)]
                                    }))
                                }}
                            />

                            <h4>Bedrooms</h4>
                            <InputText
                                type="number"
                                placeholder="Bedrooms"
                                name="bedrooms"
                                value={roomState.bedrooms}
                                onChange={e => handleChange(e)}
                            />
                            <h4>Bathrooms</h4>
                            <InputText
                                type="number"
                                placeholder="Bathrooms"
                                name="bathrooms"
                                value={roomState.bathrooms}
                                onChange={e => handleChange(e)}
                            />

                            <h4>Smokers in the house</h4>
                            <div className="property-content">
                                <button className={(roomState.smokers === true) ? 'button-dark-little' : 'button-light-little'} onClick={()=> handleSmokersClick()}>Yes</button>
                                <button className={(roomState.smokers === false) ? 'button-dark-little' : 'button-light-little'} onClick={()=> handleSmokersClick()}>No</button>
                            </div>
                            
                            <h4>Pets in the house</h4>
                            <div className="property-content">    
                                <button className={(roomState.pets === true) ? 'button-dark-little' : 'button-light-little'} onClick={()=> handlePetsClick()}>Yes</button>
                                <button className={(roomState.pets === false) ? 'button-dark-little' : 'button-light-little'} onClick={()=> handlePetsClick()}>No</button>
                            </div>

                            <h4>Tolerances</h4>
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
                            <h4>Title and description of the advert</h4>
                            <div className="add-publi">
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
                            </div>
                            {roomState.errorMessage ? <h6 className="error">Error: {roomState.errorMessage} </h6> : null}
                            <input className="edit-submit" type="button" onClick={handleSubmit} value="Save changes"/>
                        </div>
                    }
            />
        )
    } else {
        return(<h1>Not authorised</h1>)
    }
}

export default EditRoom
