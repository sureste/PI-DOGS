import React from "react";
import { getDog } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const DogDetail = (props) => {

    const dispatch = useDispatch();
    const dog = useSelector((state) => state.dogDetail)
    const {id} = useParams(); 

    useEffect(() => {
        dispatch(getDog(id))
    },[dispatch,id])

        return(
            <div>
            <h1>{dog.name}</h1>
            <h2>{dog.mood}</h2>
            <img src={dog.image} alt="woof" width="50%" height="50%" />
            <h3>{dog.height}</h3>
            <h4>{dog.weight}</h4>
            <h4>{dog.lifeTime}</h4>

        </div>
    )
       
}

export default DogDetail