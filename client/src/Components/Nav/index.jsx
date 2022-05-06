import React from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { useState, useEffect } from "react";
import {FilterAbc, getAllDogs, } from '../../redux/actions'
import SearchBar from "../SearchBar";
import '../Nav/Nav.css'

const Nav = () => {

    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getAllDogs());
    }
    useEffect(() => {
        dispatch(getAllDogs())
    }, [dispatch])

    // const handleAbcFilter = (e) => {
    //     e.preventDefault()
    //     setCurrentPage(1)
    //     dispatch(FilterAbc(e.target.value))
    // }
    return(
        <div className="navStyle">

        <nav className="navMenu">
                <a>    <Link to ="/home"> Home </Link> </a>
                <a>    <Link to= "/dogs">Crear Perro guau guau</Link> </a>
                <button className="btn" onClick={e => { handleClick(e) }}> Rewoof </button>
                {/* esta madre no esta funcionando en todas las rutas, ayudaaa
                y tampoco manda nada cuando no encuentra al perro   */}
                <SearchBar />

                {/* <li> */}
                    {/* <label>ORDEN ALFABETICO?</label>
                    <select onChange={e => handleAbcFilter(e)}>
                        <option value="" disabled>
                        Elegir...
                        </option>
                        <option value='Asc'>Ascendente </option>
                        <option value='Desc'>Descendente </option>
                    </select> */}
                {/* </li> */}   
        </nav>
        </div>
        )
}

export default Nav