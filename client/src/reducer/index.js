import { GET_RECIPES } from '../actions';
import { FILTER_BY_DIET } from '../actions';

const initialState = {
    recipes : [],
    allRecipes : []
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case  GET_RECIPES :
            return{
                ...state,
                recipes: action.payload,
                allRecipes : action.payload
            }

        case FILTER_BY_DIET :
            const allRecipes = state.allRecipes
            const dietFiltered = action.payload === 'all' ? allRecipes : allRecipes.filter(el => el.diets === action.payload)
            return{
                ...state,
                recipes: dietFiltered

            }  
            
        default:
            return state;
    }



}

export default rootReducer;