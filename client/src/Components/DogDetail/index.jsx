import React from "react";
import { getDog } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "../Nav";
import '../DogDetail/DogDetail.css'

const DogDetail = () => {

    const dispatch = useDispatch();
    const dog = useSelector((state) => state.dogDetail)
    const {id} = useParams(); 

    useEffect(() => {
        dispatch(getDog(id))
        
    },[dispatch,id])

        return(
            <div>
            <Nav />
            <div className="general">
            <img src={dog.image} alt="woof" width="50%" height="50%" />
            <div className="dogdetail" >
            
            <h1>name :{dog.name}</h1>
            <div>
            <h2>Moods:</h2>
            <h2>{typeof dog.mood === 'string'? dog.mood : console.log(dog.Mood)}</h2>
            </div>
            <h2>Life years :{dog.lifeTime}</h2>
            <h2> Weight min :{dog.weight_min}  /  Weight max :{dog.weight_max}</h2>
            <h2> Height :{dog.height}</h2>
            </div>

        </div>
            </div>
    )
       
}

export default DogDetail