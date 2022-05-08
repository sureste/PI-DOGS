import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getAllDogs,  getMoods } from "../../redux/actions";
import Card from '../dogCard'
import FilterBar from '../FilterBar'
import Paginated from "../Paginated";
import Nav from "../Nav";
import '../Home/Home.css'
import '../dogCard/dogCard.css'

const Home = () => {

    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)

    const [currentPage, setCurrentPage] = useState(1)
    const [currentDogs,setCurrentDogs] = useState(8)
    const lastI = currentPage * currentDogs
    const firstI = lastI - currentDogs
    const pagedDogs = allDogs.slice(firstI,lastI)

    const [order, setOrder] = useState('')
    const paginated = (pageN) => {
        setCurrentPage(pageN)
    }
    useEffect(() => {
        dispatch(getAllDogs())
    }, [dispatch])


    
    useEffect(() => {
        dispatch(getMoods())
    },[dispatch])

   

    return (
        <div className="background">
        <Nav />
               
        <FilterBar setCurrentPage={setCurrentPage} setOrder ={setOrder} />
        
        <Paginated currentDogs={currentDogs} allDogs={ allDogs.length } paginated= { paginated} />   

            <div className="container">
                {
                pagedDogs?.map (e => {
                       return( 
                        <div>
                         <Card name={e.name} image={e.image} mood={e.mood} id={e.id} weight_min={e.weight_min} weight_max={e.weight_max} key={e.id} />
                        </div>
                        )})}
            </div>
   
        </div>
                   )
}

export default Home