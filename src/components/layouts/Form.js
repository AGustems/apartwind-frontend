import React from 'react'
import '../../theme/layouts.css'

const Form = (props) => {
    return (
        <div className='container-login'>
            <section className='banner-form'>
                <div className="form-logo">
                    <img alt="roomer-logo" src="/images/LogoRoomer-blue.png"/>
                </div>
                <div className="form-title">
                    <h1>{props.title}</h1>
                    <h3>{props.subtitle}</h3>
                    {props.content
                        ? (
                            <div clasName="banner-content">
                                {props.content}
                            </div>
                        )
                        : null}
                </div>
            </section>
            <h3>{props.secondaryTitle}</h3>
            {props.secondaryContent}
            <img alt="drawing" src={props.image}/> 
            {props.littleInfo}
        </div>
    )
}

export default Form
