import React from 'react'
import './Flatmates.css'

const Flatmates = ({roomState, setRoomState}) => {
    return (
        <div className="flatmate-content">
            <div className="flatmate-banner">
                <h4>Number of guys</h4>
                <h1>{roomState.flatmates[0]}</h1>
                <div className="flatmate-buttons">
                    <input
                        type="button"
                        value="+"
                        onClick={() => {
                        setRoomState(roomState => ({
                            ...roomState,
                            flatmates: [
                                roomState.flatmates[0] + 1,
                                roomState.flatmates[1]
                            ]
                        }))
                    }}/>
                    <input
                        type="button"
                        value="-"
                        onClick={() => {
                        setRoomState(roomState => ({
                            ...roomState,
                            flatmates: [
                                roomState.flatmates[0] - 1,
                                roomState.flatmates[1]
                            ]
                        }))
                    }}/>
                </div>
            </div>
            <div className="flatmate-banner">
                <h4>Number of girls</h4>
                <h1>{roomState.flatmates[1]}</h1>
                <div className="flatmate-buttons">
                    <input
                        type="button"
                        value="+"
                        onClick={() => {
                        setRoomState(roomState => ({
                            ...roomState,
                            flatmates: [
                                roomState.flatmates[0], roomState.flatmates[1] + 1
                            ]
                        }))
                    }}/>
                    <input
                        type="button"
                        value="-"
                        onClick={() => {
                        setRoomState(roomState => ({
                            ...roomState,
                            flatmates: [
                                roomState.flatmates[0], roomState.flatmates[1] - 1
                            ]
                        }))
                    }}/>
                </div>
            </div>
        </div>
    )
}

export default Flatmates
