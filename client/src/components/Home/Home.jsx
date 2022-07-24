import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filterRecipeByDiet } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import styles from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

	function handleFilterDiet(e) {
		dispatch(filterRecipeByDiet(e.target.value))

	}

  return (
    <div className={styles.HomeBg}>
      <Link to='/recipe'>Create recipe</Link>
      <h1>The best recipes </h1>

      <button onClick={(e) => { handleClick(e);}}>
        Refresh recipes
      </button>

    <div>
        <select>
          <option value='asc'> Asc (A-Z) </option>
          <option value='desc'> Desc (Z-A) </option>
        </select>

        <select>
          <option value='ascScore'> Asc (Health Score) </option>
          <option value='descScore'> Desc (Health Score) </option>
        </select>
        
				<select onChange = {(e) => handleFilterDiet(e)}>
          <option value='all'> All recipes </option>
					<option value='dairy free'> Dairy Free </option>
          <option value='gluten free'> Gluten Free </option>
          <option value='ketogenic'> Ketogenic </option>
          <option value='vegetarian'> Vegetarian </option>
          <option value='lacto ovo vegetarian'> Lacto-Vegetarian </option>
          <option value='ovo vegetarian'> Ovo-Vegetarian </option>
          <option value='vegan'> Vegan </option>
          <option value='pescetarian'> Pescetarian </option>
          <option value='paleo'> Paleo </option>
          <option value='primal'> Primal </option>
          <option value='low FODMAP'> low FODMAP </option>
          <option value='whole30'>Whole 30</option>
        </select>

        <Paginado
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
        />

        <div className={styles.container}>
          {currentRecipes &&
            currentRecipes.map((el) => {
              return <Card title={el.title} image={el.image} diets={el.diets}></Card>;
            })}
        </div>

      </div>
    </div>
  );
}
