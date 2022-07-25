import { GET_RECIPES, FILTER_BY_DIET, ORDER_BY_HEALTHSCORE, ORDER_BY_TITLE } from "../actions";

const initialState = {
  //defino 2 arrays vacios
  recipes: [],
  allRecipes: [],
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

    default:
      return state;
  }
}

export default rootReducer;
