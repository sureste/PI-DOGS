import React from "react";
import { Link } from "react-router-dom";
import '../dogCard/dogCard.css'

export default function Card({ name, image ,mood, weight_min,weight_max, id, }){


    return (

        <div  className="card">

            <div className="cardImg" >
                <img src={image ? image : image = "https://www.nextdayflyers.com/blog/wp-content/uploads/2014/10/Pet-Flyer-1-768x1024.jpg"} alt="woof" width="200" height="250" />
            </div>

            <div className="cardInfo">
                <div className="titleStyle">
            <Link to={`/home/${id}`}> 
            <h1 >{name}</h1>
            </Link>
                </div>
            <h2>{mood}</h2>
            <h2>Peso minimo : {weight_min}  / Peso maximo : {weight_max} </h2>
            </div>


            </div>
            
    )
}