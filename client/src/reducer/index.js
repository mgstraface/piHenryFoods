import {
  GET_RECIPES,
  FILTER_BY_DIET,
  ORDER_BY_HEALTHSCORE,
  ORDER_BY_TITLE,
  GET_RECIPES_BY_NAME,
  POST_RECIPE,
  GET_DIETS,
  GET_DETAILS,
} from "../actions";

const initialState = {
  //defino  el estado inicial (coloco 2 arrays de recetas para que uno siempre tenga TODAS las recetas)
  recipes: [],
  allRecipes: [],
  diets: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload, //lleno los 2 arrays con todas las dietas que traigo de la API
        allRecipes: action.payload,
      };

    case FILTER_BY_DIET: //filtro una copia del array allRecipes y busco las que coincidan con el payload
      const allRecipes = state.allRecipes;
      const dietFiltered =
        action.payload === "all"
          ? allRecipes
          : allRecipes.filter((el) =>
              el.diets.find((el) => (el.name ? el.name === action.payload : el === action.payload))
            );
      return {
        ...state,
        recipes: dietFiltered,
      };

    case ORDER_BY_TITLE: //analizo el title de c/el y los ordeno segun corresponda en un array nuevo
      let sortArray =
        action.payload === "asc"
          ? state.recipes.sort((a, b) => {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
              }
              if (b.title.toLowerCase() > a.title.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return -1;
              }
              if (b.title.toLowerCase() > a.title.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: sortArray,
      };

    case ORDER_BY_HEALTHSCORE: //analizo el title de c/el y los ordeno segun corresponda en un array nuevo
      let sortedArray =
        action.payload === "ascScore"
          ? state.recipes.sort((a, b) => {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: sortedArray,
      };

    case GET_RECIPES_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
      };

    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };

    case POST_RECIPE:
      return {
        ...state,
      };

    case GET_DETAILS:
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
