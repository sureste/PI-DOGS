import React from "react";
import { getDog , clearDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from '../Nav'
import { useState } from "react";
import { Link } from "react-router-dom";
import '../DogDetail/DogDetail.css'

const DogDetail = () => {

    const dispatch = useDispatch();
    const dog = useSelector((state) => state.dogDetail)
    const {id} = useParams(); 
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        dispatch(getDog(id))
        return dispatch(clearDetail())
    },[dispatch,id])

        return(
            <div className="background">
                <Nav setCurrentPage={setCurrentPage}/>
                <Link to="/home">
                    <button className='btn'>
                        Volver
                    </button>
                </Link>
            {Object.keys(dog).length ? 
            <div className="general">
                    <img src={dog.image ? dog.image : dog.image = "https://www.nextdayflyers.com/blog/wp-content/uploads/2014/10/Pet-Flyer-1-768x1024.jpg"} alt="woof" width="1000" height="1000" />
            <div className="dogdetail" >
            
            <h1> Nombre de la raza : {dog.name}</h1>
            <h2>¿Cuanto tiempo vive? : {dog.lifeTime}</h2>
            <h2> Peso Mínimo :{dog.weight_min}  /  Peso Máxima :{dog.weight_max}</h2>
            <h2> Altura :{dog.height}</h2>
            <div>
            <h2>Temperamentos :</h2>
            <h2>{!dog.createdInDb? dog.mood  : dog.Moods.map(d => d.name + " ")}</h2>
            </div>
            </div>

        </div>
                    : <div> <h1>Cargando...</h1> </div> }
            </div>
            )
            
        }
        
export default DogDetail