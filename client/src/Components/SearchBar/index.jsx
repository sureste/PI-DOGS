import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogName } from "../../redux/actions";

export default function SearchBar() {

    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getDogName(name))
        setName("")
    }

    
    return (
        <div>
    <form>
        <input onChange={(e) => handleInputChange(e) }    value={name}  placeholder="Buscar guau guau"/>
        <button onClick={e => handleSubmit(e)} type='submit'>Buscar woof</button>
    </form>
        </div>
    ) 
}
