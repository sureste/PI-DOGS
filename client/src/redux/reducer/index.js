import { FILTER_ABC, FILTER_BY_MOOD, FILTER_CREATED_DOG, GET_ALL_DOGS, GET_DOG_DETAIL, GET_DOG_NAME } from "../actions";

const initialState = {
    dogs : [],
    dogDetail : {},
    allDogs : []
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
            // esto probablemente va a tirar error
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

        default : return state
    }

}


export default rootReducer;