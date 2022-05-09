import React from "react";
import { Link } from "react-router-dom";
import '../dogCard/dogCard.css'

export default function Card({ name, image ,mood, weight_min,weight_max, id, }){


    return (
                //mati enseña en una clase como evitar que se vea la busqueda anterior, recuerda, en una clase, creo fue de movies
                // es importante mejorar ese detalle después
                //tambien checa como quitar el azul ese de m
        <div  className="card">


            <div className="cardImg" >
                <img src={image ? image : image = "https://www.nextdayflyers.com/blog/wp-content/uploads/2014/10/Pet-Flyer-1-768x1024.jpg"} alt="woof" width="200" height="250" />
            </div>

            <div className="cardInfo">
            <Link to={`/home/${id}`}> 
            <h2 className="dogTitle" >{name}</h2>
            </Link>
            <h2>{mood}</h2>
            <h3>Peso minimo : {weight_min}  / Peso maximo : {weight_max} </h3>
            </div>


            </div>
            
    )
}