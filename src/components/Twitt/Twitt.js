import React from 'react';
import classes from './Twitt.module.css';

const twitt = (props) => {
    return(
        <div className={classes.Twitt_wrapper}>
            <div className={classes.Twitt_img}>
                {/* handle this if no image */}
                <img src={props.image} alt="twitt avatar"></img>
            </div>
            <div className={classes.Twitt_content}>
                <h2 className={classes.Twitt_title}>
                    {props.username}
                </h2>
                <p>{props.timeStamp}</p>
                <p className={classes.Twitt_description}>
                    {props.text}
                </p>
            </div>
        </div>
    )
}

export default twitt;