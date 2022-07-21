import axios from 'axios';

export function getRecipes(){
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/recipes');
        return dispatch({
            type: 'GET_RECIPE',
            payload: json.data
        })
    }
}