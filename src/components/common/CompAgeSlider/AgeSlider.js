import React, {useState} from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 180 + theme.spacing(3) * 2
    },
    margin: {
        height: theme.spacing(0)
    }
}));

const PrettoSlider = withStyles({
    root: {
        color: '#17252A',
        height: 8
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit'
        }
    },
    track: {
        height: 8,
        borderRadius: 4
    },
    rail: {
        height: 8,
        borderRadius: 4
    }
})(Slider);

export default function CustomizedSlider(props) {
    const classes = useStyles();
    const [value,
        setValue] = useState(0)

    const handleAge = (e, newValue) => {
        setValue(newValue)

        props.setState(userSignup => ({
            ...userSignup,
            age: value
        }))
    }
    return (
        <div className={classes.root}>
            <PrettoSlider value={value} onChange={handleAge} aria-label="pretto slider"/>
            <div className={classes.margin}/>
        </div>
    );
}