import axios from "axios";

//--------------------------------------------CONSTANTES-------------------------------------------------
//delaro y exporto constantes, que contienen el string con el TYPE, para evitar errores de tipeo.

export const GET_RECIPES = "GET_RECIPES";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const ORDER_BY_TITLE = "ORDER_BY_TITLE";
export const ORDER_BY_HEALTHSCORE = "ORDER_BY_HEALTHSCORE";
export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME";
export const GET_DIETS = "GET_DIETS";
export const POST_RECIPE = "POST_RECIPE";

//--------------------------------------------ACTIONS-----------------------------------------------------

export function getRecipes() {
  //en esta primera action, conecto mi BACK con el FRONT, mediante una acción asincrona a mi ruta /recipes.
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/recipes");
      return dispatch({
        type: GET_RECIPES,
        payload: json.data,
      });
    } catch (error) {
      throw new Error("Recipes not found");
    }
  };
}

export function getRecipesByName(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/recipes?name=" + name);
      return dispatch({
        type: GET_RECIPES_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      throw new Error("Recipe name not found");
    }
  };
}

export function getDiets() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/diets");
    return dispatch({
      type: GET_DIETS,
      payload: json.data,
    });
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    const json = await axios.post("http://localhost:3001/recipe", payload);
    return json;
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
