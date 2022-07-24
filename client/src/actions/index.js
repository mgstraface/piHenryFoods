import axios from 'axios';
export const GET_RECIPES = 'GET_RECIPES';
export const FILTER_BY_DIET = 'FILTER_BY_DIET'

export function getRecipes(){
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/recipes'); console.log (json);
        return dispatch({
            type: GET_RECIPES,
            payload: json.data
        })
    }
}

export function filterRecipeByDiet(payload){
    return{
        type: FILTER_BY_DIET,
        payload
    }
}