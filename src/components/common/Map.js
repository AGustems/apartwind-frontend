import React, {useState} from 'react'
import GoogleMapReact from 'google-map-react'
import axios from 'axios'
import InputText from "./InputText"
require('dotenv').config()

const Map = (props) => {
    const initialState = {
        search: '',
        lat: 0,
        lng: 0,
        direction: ''
    }

    const [state,
        setState] = useState(initialState)

    const handleChange = ({target}) => {
        setState(state => ({
            ...state,
            [target.name]: target.value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios
            .get('http://localhost:5000/maps?search=' + state.search)
            .then(response => {
                setState(state => ({
                    ...state,
                    lat: response.data.candidates[0].geometry.location.lat,
                    lng: response.data.candidates[0].geometry.location.lng,
                    direction: response.data.candidates[0].formatted_address
                }))
                props.setState(state => ({
                    ...state,
                    location: {
                        lat: response.data.candidates[0].geometry.location.lat,
                        lng: response.data.candidates[0].geometry.location.lng,
                        direction: response.data.candidates[0].formatted_address
                    }
                }))
            })
            .catch(err => console.log('Something went wrong when trying to retrieve the data from the provided address'))
    }

    const getMapOptions = (maps) => {
        return {
            disableDefaultUI: false,
            mapTypeControl: false,
            streetViewControl: false,
            styles: [
                {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [
                        {
                            visibility: 'on'
                        }
                    ]
                }
            ]
        }
    }

    const renderMarkers = (map, maps) => {
        let marker = new maps.Marker({
            position: {
                lat: state.lat,
                lng: state.lng
            },
            map,
            title: state.direction
        })
        return marker
    }

    return (
        <div className='map'>
            <form className='map-form' onSubmit={handleSubmit}>
                <InputText
                    type="text"
                    placeholder="Please, write the address"
                    name="search"
                    value={state.search}
                    onChange={handleChange}/>
                <input type="submit" name="submit" value="+" className="char-submit"/>
            </form>

            <GoogleMapReact
                key={state.direction}
                bootstrapURLKeys={{
                key: process.env.REACT_APP_API_GOOGLE
            }}
                defaultCenter={{
                lat: state.lat,
                lng: state.lng
            }}
                defaultZoom={15}
                options={getMapOptions}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps)}/>
        </div>
    )
}

export default Map