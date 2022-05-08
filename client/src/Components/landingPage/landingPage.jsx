import React from "react";
import { Link } from "react-router-dom";
import styles from '../LandingPage/LandingPage.module.css'

const LandingPage = () => {
    return (

    <div className={styles.back_image} >

            <div  className={styles.divStyle} >
           <Link to ="/home">
                <button className={styles.boton} > WOOF WOOF  </button>
           </Link>
        </div>

        <div >
                    <div  >
        </div>
        </div>
        
    </div>
        )
}
export default LandingPage
