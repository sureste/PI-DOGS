import React from "react";
import '../Paginated/Paginated.css'

export default function Paginated({currentDogs, allDogs, paginated}){

    const pages = []

    for(let i= 1 ; i <= Math.ceil(allDogs/currentDogs); i++ ){
        pages.push(i)
    }
    // console.log(pages, "soy pages")
    return (

        <nav className="back" >
        <ul>
           {pages?.map( (n) => {
                // console.log(n, 'puedo ser key?')
               return(
               <li key={n} className="list">
                <button key={n} onClick={() => paginated(n)}>{n} </button>       
                </li>
           )})} 
        </ul>
        </nav>
    ) }
