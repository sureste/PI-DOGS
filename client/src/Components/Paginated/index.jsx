import React from "react";


export default function Paginated({currentDogs, allDogs, paginated}){

    const pages = []

    for(let i= 1 ; i <= Math.ceil(allDogs/currentDogs); i++ ){
        pages.push(i)
    }
    console.log(pages, "soy pages")
    return (
        <nav>
        <ul>
           {pages?.map( (n) => (
               <li key={n}>
                <button onClick={() => paginated(n)}>{n} </button>       
                </li>
           ))} 
        </ul>
        </nav>
    ) }
