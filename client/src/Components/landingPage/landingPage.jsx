import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css'

const LandingPage = (props) => {
    return (
        <div className="back_ground">
           <a className="style">
           <Link className = "back_ground" to ="/home">WOOF WOOF</Link>
            </a>
        </div>
        )
}
export default LandingPage
