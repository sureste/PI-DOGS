import React from "react";
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux'
import {  useEffect } from "react";
import { getAllDogs, } from '../../redux/actions'
import SearchBar from "../SearchBar";
import '../Nav/Nav.css'


const Nav = ({setCurrentPage}) => {

    const dispatch = useDispatch();

    const handleDogs = () => {
        dispatch(getAllDogs()
        )
        setCurrentPage(1)
    }

    
    useEffect(() => {
        dispatch(getAllDogs())
    }, [dispatch])


    return(
        <div className="navStyle">

        <nav className="navMenu">
                 <Link to ="/home"> 
                <h1 onClick={(e) => handleDogs()}> Home </h1> 
                </Link> 

                <h1>  <Link to= "/dogs">Crear Perro </Link> </h1>
        <SearchBar />
        </nav>
        </div>
        )
}

export default Nav