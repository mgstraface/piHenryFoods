import {
  GET_RECIPES,
  FILTER_BY_DIET,
  ORDER_BY_HEALTHSCORE,
  ORDER_BY_TITLE,
  GET_RECIPES_BY_NAME,
  POST_RECIPE,
  GET_DIETS,
  GET_DETAILS,
  RESET_DETAIL,
  GET_BY_DB,
} from "../actions";

const initialState = {
  //defino  el estado inicial (coloco 2 arrays de recetas para que uno siempre tenga TODAS las recetas)
  recipes: [],
  allRecipes: [],
  diets: [],
  detail: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
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

    case GET_DETAILS:
      return {
        ...state,
        detail: action.payload,
      };
    //-------------------------------------------FILTRADOS Y ORDENAMIENTOS----------------------------------------------------

    case FILTER_BY_DIET:
      const allRecipes = state.allRecipes;
      const allRecipesA = state.allRecipes.filter((e) => !e.vegetarian);
      const allRecipesB = state.allRecipes.filter((e) => e.vegetarian);
      allRecipesB.map((e) => e.diets.unshift("vegetarian"));
      allRecipesB.map((e) => (e.vegetarian = false));
      const allRecipesC = [...allRecipesA, ...allRecipesB];

      const dietFiltered =
        action.payload === "all"
          ? allRecipes
          : allRecipesC.filter((el) =>
              el.diets.find((el) => (el.name ? el.name === action.payload : el === action.payload))
            );
      return {
        ...state,
        recipes: dietFiltered,
      };

    case ORDER_BY_TITLE:
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

    case ORDER_BY_HEALTHSCORE:
      let sortedArray =
        action.payload === "ascScore"
          ? state.recipes.sort((a, b) => {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: sortedArray,
      };

    case GET_BY_DB:
      return {
        ...state,
        recipes: action.payload,
      };
    //------------------------------------------------RESET DETAIL-------------------------------------------
    case RESET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
