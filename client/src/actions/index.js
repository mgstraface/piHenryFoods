import axios from "axios";

//--------------------------------------------CONSTANTES-------------------------------------------------
//delaro y exporto constantes, que contienen el string con el TYPE, para evitar errores de tipeo.

export const GET_RECIPES = "GET_RECIPES";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const ORDER_BY_TITLE = "ORDER_BY_TITLE";
export const ORDER_BY_HEALTHSCORE = "ORDER_BY_HEALTHSCORE";

//--------------------------------------------ACTIONS-----------------------------------------------------

export function getRecipes() {
  //en esta primera action, conecto mi BACK con el FRONT, mediante una acción asincrona a mi ruta /recipes.
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/recipes");
    console.log(json);
    return dispatch({
      type: GET_RECIPES,
      payload: json.data,
    });
  };
}

export function filterRecipeByDiet(payload) {
  //el PAYLOAD es el que recibo del SELECT de HOME
  return {
    type: FILTER_BY_DIET,
    payload,
  };
}

export function orderByTitle(payload) {
  //el PAYLOAD es el que recibo del SELECT de HOME
  return {
    type: ORDER_BY_TITLE,
    payload,
  };
}

export function orderByHealthScore(payload) {
  //el PAYLOAD es el que recibo del SELECT de HOME
  return {
    type: ORDER_BY_HEALTHSCORE,
    payload,
  };
}
