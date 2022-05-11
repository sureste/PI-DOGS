import axios from 'axios'


export const GET_ALL_DOGS = "GET_ALL_DOGS"
export const GET_DOG_DETAIL = "GET_DOG_DETAL"
export const GET_DOG_NAME = "GET_DOG_NAME"
export const FILTER_BY_MOOD = "FILTER_BY_MOOD"
export const FILTER_ABC = 'FILTER_ABC'
export const FILTER_CREATED_DOG = "FILTER_CREATED_DOG"
export const FILTER_BY_WEIGHT = 'FILTER_BY_WEIGHT'
export const GET_ALL_MOODS = "GET_ALL_MOODS"
export const FILTER_BY_MOODS = 'FILTER_BY_MOODS'
export const POST_DOG = 'POST_DOG'
export const CLEAR_DETAIL = "CLEAR_DETAIL"
export const LOADING_PAGE = 'LOADING_PAGE'



export const getAllDogs = () => {

    return async function (dispatch) {  //Ruta getAllDogs del back
        let json = await axios('http://localhost:3001/dogs')

            const payload = await  json.data
            return dispatch({
                type: GET_ALL_DOGS,
                payload
            })
        }
    

    }
    export const postDog = (payload) => {
        return async function() {
            let json = await axios.post('http://localhost:3001/dogs', payload)
            console.log(json)
            return json;

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
            try{

                let json = await axios(`http://localhost:3001/dogs/?name=${name}`)
                
                const payload = await json.data
                return dispatch({
                    type : GET_DOG_NAME,
                    payload
                })
            }
            catch(e){
                alert('Guau guau no encontrado')
            }
        }
        }

    export const filterByMoods = (payload) =>  {
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

    export const filterByWeight = (payload) => {
        return {
            type : FILTER_BY_WEIGHT,
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

    export const getMoods = () => {
        return async function (dispatch) {
            let json = await axios('http://localhost:3001/temperament')

            const payload = await json.data
            return dispatch({
                type: GET_ALL_MOODS,
                payload
            })
        }
    }

    export const clearDetail = () => {
        return {
            type : CLEAR_DETAIL
        }
    }


