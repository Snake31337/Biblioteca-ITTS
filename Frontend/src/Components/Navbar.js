import logo from '../Images/logo.bmp';
import '../CSS/NavBar.scss';
import AccountButton from './AccountButton';
import LanguageSelect from './LanguageSelect';
import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";

function NavBar() {

    const [isDark, setisDark] = useState(false);    // react hook

    useEffect(() => {
        if (isDark) {
            console.log("Dark");
        } else {
            console.log("Light");
        }
    }, [isDark])

    return(
        <nav className="navBar">
            <div className="nav-left nav-items">
                <LanguageSelect> </LanguageSelect>
            </div>

            <div className="container-logo-link nav-centered">
                <Link to="/" className="link logo-link" href="#">
                    <img className="logo" src={logo} alt="Logo dell'ITTS O.Belluzzi"/>
                </Link>    
            </div>
            
            <div className="nav-right nav-items"> 
                <button onClick={() =>  setisDark(!isDark)}>Tema Scuro</button>
            </div>
        </nav>
    );
}


export default NavBar;