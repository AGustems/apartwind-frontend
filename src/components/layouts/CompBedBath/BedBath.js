import React from 'react'

const BedBath= ({roomState, setRoomState}) => {
    return (
        <div className="flatmate-content">
            <div className="flatmate-banner">
                <h4>Number of bedrooms</h4>
                <h1>{roomState.bedrooms}</h1>
                <div className="flatmate-buttons">
                    <input
                        type="button"
                        value="+"
                        onClick={() => {
                        setRoomState(roomState => ({
                            ...roomState,
                            bedrooms: roomState.bedrooms+1
                        }))
                    }}/>
                    <input
                        type="button"
                        value="-"
                        onClick={() => {
                        setRoomState(roomState => ({
                            ...roomState,
                            bedrooms: roomState.bedrooms-1
                        }))
                    }}/>
                </div>
            </div>
            <div className="flatmate-banner">
                <h4>Number of bathrooms</h4>
                <h1>{roomState.bathrooms}</h1>
                <div className="flatmate-buttons">
                    <input
                        type="button"
                        value="+"
                        onClick={() => {
                        setRoomState(roomState => ({
                            ...roomState,
                            bathrooms: roomState.bathrooms+1
                        }))
                    }}/>
                    <input
                        type="button"
                        value="-"
                        onClick={() => {
                        setRoomState(roomState => ({
                            ...roomState,
                            bathrooms: roomState.bathrooms-1
                        }))
                    }}/>
                </div>
            </div>
        </div>
    )
}

export default BedBath
