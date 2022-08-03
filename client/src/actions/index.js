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
export const GET_DETAILS = "GET_DETAILS";
export const RESET_DETAIL = "RESET_DETAILS";
export const GET_BY_DB = "GET_BY_DB";
//--------------------------------------------ACTIONS-----------------------------------------------------

export function getRecipes() {
  //en esta primera action, conecto mi BACK con el FRONT, mediante una acción asincrona a mi ruta /recipes.
  return (dispatch) => {
    axios.get("http://localhost:3001/recipes").then((response) => {
      dispatch({
        type: GET_RECIPES,
        payload: response.data,
      });
    });
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
      throw alert("Recipe name not found");
    }
  };
}
export function getDetails(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/recipes/" + id);
      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      throw new Error(error);
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

//-----------------------------------------------------POST----------------------------------------------------------

export function postRecipe(payload) {
  return async function (dispatch) {
    const json = await axios.post("http://localhost:3001/recipe", payload);
    return json;
  };
}
//-----------------------------------------FILTRADOS Y ORDENAMIENTOS------------------------------------------------------
export function getByDb(type) {
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/recipesdb?type=" + type);
      return dispatch({
        type: GET_BY_DB,
        payload: json.data,
      });
    } catch (error) {
      throw alert(error);
    }
  };
}

export function filterRecipeByDiet(payload) {
  return {
    type: FILTER_BY_DIET,
    payload,
  };
}

export function orderByTitle(payload) {
  return {
    type: ORDER_BY_TITLE,
    payload,
  };
}

export function orderByHealthScore(payload) {
  return {
    type: ORDER_BY_HEALTHSCORE,
    payload,
  };
}
//-------------------------------------------RESET DETAIL-------------------------------------------------------
export function resetDetail(payload) {
  return {
    type: RESET_DETAIL,
    payload,
  };
}
