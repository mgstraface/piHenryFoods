import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const ORDER_BY_TITLE = "ORDER_BY_TITLE";
export const ORDER_BY_HEALTHSCORE = "ORDER_BY_HEALTHSCORE";

export function getRecipes() {
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
