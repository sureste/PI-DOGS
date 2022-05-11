import { CLEAR_DETAIL, FILTER_ABC, FILTER_BY_MOOD, FILTER_BY_WEIGHT, FILTER_CREATED_DOG, GET_ALL_DOGS, GET_ALL_MOODS, GET_DOG_DETAIL, GET_DOG_NAME, POST_DOG } from "../actions";

const initialState = {
    dogs : [],
    dogDetail : {},
    allDogs : [],
    allMoods : [],
};

const rootReducer = (state = initialState , action) => {
    switch( action.type){

        case GET_ALL_DOGS : return {
            ...state,
                dogs:action.payload,
                allDogs : action.payload
        }

        case GET_DOG_DETAIL : return {
            ...state,
            dogDetail : action.payload
        }

        case GET_DOG_NAME : return {
            ...state,
            dogs: action.payload
        }


        case FILTER_ABC : 
        const  filterAbcDogs = action.payload === 'asc'? 
        state.dogs.sort((a,b) => {
            if(a.name > b.name) return 1
            if(a.name < b.name) return -1
            return 0
            
        })
        :
        state.dogs.sort((a,b) => {
            if(a.name > b.name) return -1
            if(a.name < b.name) return -1
            return 0
        })
        console.log(filterAbcDogs)
        return {
            
            ...state ,
            dogs : filterAbcDogs 
        }

        case FILTER_CREATED_DOG :
            const allDogs = state.allDogs
            const filterCreated = action.payload === 'created' ? allDogs.filter(d => d.createdInDb)
            :
            allDogs.filter(d => !d.createdInDb)

        return {
            ...state, 
            dogs : action.payload === "all" ?  state.allDogs : filterCreated
        }

        case FILTER_BY_WEIGHT : 
        const allDogsW = state.allDogs.filter( d => d.weight_min) //excluyo al que no tiene weight_min
        console.log(action.payload, "soy el PAYLOAD")
        const filterWeight = action.payload === 'min'?  allDogsW.sort((a , b) =>{
            return a.weight_min - b.weight_min
        }) :
        allDogsW.sort((a,b) =>{
            return a.weight_min - b.weight_min
        }).reverse()

        return {
            ...state,
            dogs : filterWeight
        }
        
        case GET_ALL_MOODS : return{
            ...state,
            allMoods : action.payload
        }

        case FILTER_BY_MOOD : 
        const allDogs2 = state.allDogs
        const filteredMood = action.payload === 'all'?  allDogs : allDogs2.filter(e => {
            return e.mood?.includes(action.payload)
        })
        
        return {
            ...state,
            dogs : filteredMood
        }

        case CLEAR_DETAIL : {
            return {
                ...state ,
                dogDetail : {}
            }
        }

        case POST_DOG : 
        return {
            ...state
        }

        default : return state
    }


}


export default rootReducer;