import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filterRecipeByDiet, orderByTitle, orderByHealthScore } from "../../actions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import styles from "./Home.module.css";
import NavBar from "../NavBar/NavBar";

export default function Home() {
  const dispatch = useDispatch();

  //----------------------------------------------PAGINADO---------------------------------------------------------------

  const allRecipes = useSelector((state) => state.recipes);
  const [currentPage, setCurrentPage] = useState(1); // defino estado local para el paginado
  const recipesPerPage = 9; // defino cantidad de recetas por pagina
  const indexOfLastRecipe = currentPage * recipesPerPage; // indice de la ultima receta de la pagina
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; // indice de la primera receta
  const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe); // recetas que se muestran en la pag
  const [ordered, setOrdered] = useState(""); //defino estado local para que renderice la pagina con los filtros

  const paginado = (pageNumber) => {
    //se define la variable con su numero de pagina, y este num de pagina
    setCurrentPage(pageNumber); //modifica el estado de la pagina actual
  };

  useEffect(() => {
    //despacho la funcion que trae las dietas, con el array vacio indico que solo lo haga la 1ra vez que se renderiza el componente
    dispatch(getRecipes());
  }, []);

  //--------------------------------------------HANDLERS----------------------------------------------------------//

  function handleFilterDiet(e) {
    // tomo el value del select y lo mando como payload a la action
    dispatch(filterRecipeByDiet(e.target.value));
    setCurrentPage(1);
  }

  function handleOrderByTitle(e) {
    e.preventDefault();
    dispatch(orderByTitle(e.target.value));
    setCurrentPage(1);
    setOrdered(`Ordered ${e.target.value}`);
  }

  function handleOrderByHealthScore(e) {
    e.preventDefault();
    dispatch(orderByHealthScore(e.target.value));
    setCurrentPage(1);
    setOrdered(`Ordered ${e.target.value}`);
  }
  // ----------------------------------------------HOME------------------------------------------------------------//
  return (
    <div>
      <div className={styles.NavBar}>
        <NavBar setCurrentPage={setCurrentPage} />
      </div>
      <div className={styles.cont}>
        <div className={styles.btnCont}>
          <select className={styles.selecHome} onChange={(e) => handleOrderByTitle(e)}>
            <option value='' hidden>
              Order by title
            </option>
            <option value='asc'> Asc (A-Z) </option>
            <option value='desc'> Desc (Z-A) </option>
          </select>

          <select className={styles.selecHome} onChange={(e) => handleOrderByHealthScore(e)}>
            <option value='' hidden>
              Order by health score
            </option>
            <option value='ascScore'> Healthier </option>
            <option value='descScore'> Less healthy </option>
          </select>

          <select className={styles.selecHome} onChange={(e) => handleFilterDiet(e)}>
            <option value='' hidden>
              Filter by diet types
            </option>
            <option value='all'> All recipes </option>
            <option value='dairy free'> Dairy Free </option>
            <option value='gluten free'> Gluten Free </option>
            <option value='ketogenic'> Ketogenic </option>
            <option value='vegetarian'> Vegetarian </option>
            <option value='ovo vegetarian'> Ovo-Vegetarian </option>
            <option value='lacto vegetarian'> Lacto-Vegetarian </option>
            <option value='lacto ovo vegetarian'> Lacto-Ovo-Vegetarian </option>
            <option value='vegan'> Vegan </option>
            <option value='pescatarian'> Pescetarian </option>
            <option value='paleolithic'> Paleo </option>
            <option value='primal'> Primal </option>
            <option value='low FODMAP'> low FODMAP </option>
            <option value='fodmap friendly'> Fodmap Friendly </option>
            <option value='whole30'>Whole 30</option>
          </select>
        </div>
      </div>
      <div className={styles.totalCont}>
        <div className={styles.paginado}>
          <Paginado //se coloca el paginado arriba y abajo para no tener que subir para cambiar
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}
            paginado={paginado}
            currentPage={currentPage}
          />
        </div>

        {/* por cada receta en current, retorno una card, pasandole los parametros correspondientes */}
        <div className={styles.container}>
          {currentRecipes &&
            currentRecipes.map((el) => {
              return <Card id={el.id} title={el.title} image={el.image} diets={el.diets}></Card>;
            })}
        </div>
        <div className={styles.paginado}>
          <Paginado
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}
            paginado={paginado}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}
