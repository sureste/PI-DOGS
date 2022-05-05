import axios from 'axios'


export const GET_ALL_DOGS = "GET_ALL_DOGS"
export const GET_DOG_DETAIL = "GET_DOG_DETAL"
export const GET_DOG_NAME = "GET_DOG_NAME"
export const FILTER_BY_MOOD = "FILTER_BY_MOOD"
export const FILTER_ABC = 'FILTER_ABC'
export const FILTER_CREATED_DOG = "FILTER_CREATED_DOG"




export const getAllDogs = () => {

    return async function (dispatch) {
        let json = await axios('http://localhost:3001/dogs')

            const payload = await  json.data
            return dispatch({
                type: GET_ALL_DOGS,
                payload
            })
        }

        
        
    }
    export const getDog = (id) => {

    return async function ( dispatch ){
        let json = await axios(`http://localhost:3001/dogs/${id}`)
        
        const payload = await json.data
            return dispatch({
                type: GET_DOG_DETAIL,
                payload
            })
        }
    }

    export const getDogName = (name) => {
        return async function(dispatch){
            let json = await axios(`http://localhost:3001/dogs/?name=${name}`)


            const payload = await json.data
            return dispatch({
                type : GET_DOG_NAME,
                payload
            })
        }
    }

    export const filterByMood = (payload) =>  {
        return {
            type : FILTER_BY_MOOD,
            payload
        }
    }
    
    export const filterAbc = (payload) => {
        console.log(payload)
        return {
            type : FILTER_ABC,
            payload
        }
    }

    export const filterCreatedDog = (payload) => {
        console.log(payload)
        return {
            type: FILTER_CREATED_DOG,
            payload
        }
    }