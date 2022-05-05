import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getAllDogs, filterAbc, filterCreatedDog, getMoods, filterByMoods, filterByWeight } from "../../redux/actions";
import Card from '../dogCard'
import Paginated from "../Paginated";
import '../Home/Home.css'

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

    const handleAbcFilter = (e) => {
        e.preventDefault()
        dispatch(filterAbc(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    const handleFilterCreated = (e) => {
        dispatch(filterCreatedDog(e.target.value))
    }

    const handleWeightFilter = (e) => {
        e.preventDefault()
        dispatch( filterByWeight(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }
    
    useEffect(() => {
        dispatch(getMoods())
    },[dispatch])

    const moodsName = useSelector(state => { return state.allMoods})


    const handleMoodFilter = (e) => {
        e.preventDefault()
        dispatch(filterByMoods(e.target.value))
    }

    return (
        <div>    
        <h1 className=" backGround ">
            WOOF WOOF HOME WOOF WOOF
        </h1>
        <h2>

        <Paginated currentDogs={currentDogs} allDogs={ allDogs.length } paginated= { paginated} />
        </h2>
        <div>

            <label>ORDEN ALFABETICO?</label>
            <select onChange={e => handleAbcFilter(e)}>
                <option value='asc'>Ascendente </option>
                <option value='desc'>Descendente </option>
            </select>

            <label>Created?</label>
            <select onChange={e => handleFilterCreated(e) }>
                <option value='all'>All</option>
                <option value='created'>Created</option>
                <option value='api'>Api</option>
            </select>

            <label>MOOOOOOODS</label>

            <select onChange={e => handleMoodFilter(e)}>
                <option value="all">protomood</option>
                {
                    moodsName.map(e => {
                        
                    return (
                        <option value={e.name} key={e.id}>{e.name}</option>
                    )
                    })
                }
            </select>

                <label>Weight</label>

                <select onChange={e => handleWeightFilter(e) }>
                    <option value='all'>All</option>
                    <option value='min'>Ligero a pesao</option>
                    <option value='max'> Pesao a ligero</option>
                </select>

        </div>

            <div>


            {
                pagedDogs?.map (e => {
                       return( 
                           
                        <div>
                         <Card name={e.name} image={e.image} mood={e.mood} id={e.id} weight_min={e.weight_min} weight_max={e.weight_max} key={e.id} />
                        </div>
                        
                        )})
            }
            </div>
    </div>
                   )
}

export default Home