import React from "react";
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux'
import {  useEffect } from "react";
import { getAllDogs, } from '../../redux/actions'
import SearchBar from "../SearchBar";
import '../Nav/Nav.css'


const Nav = () => {

    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(getAllDogs())
    }, [dispatch])


    return(
        <div className="navStyle">

        <nav className="navMenu">
                <a>    <Link to ="/home"> Home </Link> </a>
                <a>    <Link to= "/dogs">Crear Perro </Link> </a>
        <SearchBar />
        </nav>
        </div>
        )
}

export default Nav