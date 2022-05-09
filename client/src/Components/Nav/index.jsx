import React from "react";
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux'
import {  useEffect } from "react";
import { getAllDogs, } from '../../redux/actions'
import SearchBar from "../SearchBar";
import '../Nav/Nav.css'


const Nav = () => {

    const dispatch = useDispatch();

    const handleDogs = (e) => {
        dispatch(getAllDogs())
    }

    
    useEffect(() => {
        dispatch(getAllDogs())
    }, [dispatch])


    return(
        <div className="navStyle">

        <nav className="navMenu">
                <h1> <Link to ="/home"> 
                <button onClick={(e) => handleDogs(e)}> Home </button> 
                </Link> </h1>

                <h1>  <Link to= "/dogs">Crear Perro </Link> </h1>
        <SearchBar />
        </nav>
        </div>
        )
}

export default Nav