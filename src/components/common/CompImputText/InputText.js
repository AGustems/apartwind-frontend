import React from 'react'
import './InputText.css'

const InputText = (props) => {
    return (
        <div className="input-text-bg">
            <input
                className="input-text"
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}/>
        </div>
    )
}

export default InputText
