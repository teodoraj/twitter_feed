import React from "react";
import classes from "./Layout.module.css";
import logo from "../../static/logo.png";


const layout = (props) => {
    return(
        <div className={classes.Layout}>
            <header className={classes.Header}>
                <img src={logo} className={classes.Logo} alt="logo" />
                <div className={classes.Header_copy}> Live twitter feed</div>
            </header>
            <main className={classes.Main_container}>
                {props.children}
            </main>
        </div>
    )
}

export default layout;