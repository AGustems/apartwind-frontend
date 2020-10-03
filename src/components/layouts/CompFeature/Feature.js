import React from 'react'
import './Feature.css'

const Feature = (props) => {
    return (
        <article className='feature'>
            <div className='feature-icon'>
                <img src={props.image} alt={props.alt}/>
            </div>
            <div className='feature=text'>
                <h3><b>{props.featureTitle}</b></h3>
                <p>{props.featureText}</p>
            </div>
        </article>
    )
}

export default Feature
