import React from "react";
import { Link } from "react-router-dom";

export default function Card({ name, image ,mood, weight_min,weight_max, id, }){


    return (
                //mati enseña en una clase como evitar que se vea la busqueda anterior, recuerda, en una clase, creo fue de movies
                // es importante mejorar ese detalle después
                //tambien checa como quitar el azul ese de m
        <div>
            <Link to={`/home/${id}`}> 
            <h2>{name}</h2>
            </Link>
            <img src={image} alt="woof" width="200" height="250" />
            <h4>Peso min : {weight_min}</h4>
            <h4>Peso max : {weight_max}</h4>
            <h3>{mood}</h3>
            
        </div>
    )
}