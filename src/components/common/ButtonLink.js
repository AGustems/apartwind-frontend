import React from 'react'
import {Link} from 'react-router-dom'
import '../../theme/common.css'

const ButtonLink = (props) => {
    return (
        <div className={props.buttonClass}>
        <Link to={props.routeText}>
            {props.buttonText}
        </Link>
        </div>
    )
}

export default ButtonLink
