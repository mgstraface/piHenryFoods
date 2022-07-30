import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, resetDetail } from "../../actions/index";
import { useEffect } from "react";
import styles from "./Detail.module.css";
import imgBtn from "../../images/btnGoHome.png";
import logo from "../../images/LogoHF.png";

export default function Detail(props) {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.detail);
  console.log(recipe);
  const dishTypes = recipe.dishTypes && recipe.dishTypes.join(" - ");

  const getDiets = function () {
    const arrDiets = []; //defino un array para pushear las dietas de la api y la db

    if (recipe.vegetarian === true) {
      arrDiets.push("vegetarian");
    }
    if (recipe.diets) {
      for (const diet of recipe.diets) {
        typeof diet === "object" ? arrDiets.push(diet.name) : arrDiets.push(diet);
      }
    }
    return arrDiets.length ? arrDiets.join(" - ") : "Diets not found";
  };

  const getSteps = function () {
    const recipeSteps = [];
    if (Array.isArray(recipe.analyzedInstructions) && recipe.analyzedInstructions.length) {
      recipe.analyzedInstructions[0].steps.map((e) => recipeSteps.push(e.step));
    } else if (typeof recipe.analyzedInstructions === "string") {
      recipeSteps.push(recipe.analyzedInstructions);
    } else if (recipe.analyzedInstructions.length < 1 || recipe.analyzedInstructions === "")
      recipeSteps.push("Instructions not found");
    return recipeSteps;
  };

  useEffect(() => {
    dispatch(getDetails(props.match.params.id));
    return () => {
      dispatch(resetDetail({}));
    };
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.bgImage}>
        <img
          className={styles.logoDetailIzq}
          src={logo}
          alt='img not found'
          width='250px'
          height='250px'
        />
      </div>
      {recipe.title ? (
        <div className={styles.titleIMG}>
          <h1>
            <u>{recipe.title}</u>
          </h1>
          <div className={styles.imagesDetail}>
            <img
              className={styles.imgDetail}
              src={recipe.image}
              alt='img not found'
              width='250px'
              height='250px'
            />
          </div>

          <div className={styles.summary}>
            <h2>{recipe.summary && <u>"Summary"</u>}</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: recipe.summary,
              }}
            />
          </div>
        </div>
      ) : (
        <p>data no encontrada</p>
      )}
      <div className={styles.contHDDtot}>
        <div className={styles.containerHDD}>
          <div className={styles.healthScore}>
            <h2>
              <u>Health Score</u>
            </h2>
            <h1>{recipe.healthScore && `${recipe.healthScore}%`}</h1>
          </div>

          <div className={styles.dishTypes}>
            <h2>
              <u>Dish types</u>
            </h2>
            <h4>{recipe.dishTypes && dishTypes}</h4>
          </div>
        </div>
        <div className={styles.dietTypes}>
          <h2>
            <u>Diet types</u>
          </h2>
          <h4>{recipe.diets && getDiets()}</h4>
        </div>
        <div className={styles.steps}>
          <h2>
            <u>Instructions</u>
          </h2>
          <ul>
            {recipe.analyzedInstructions &&
              getSteps().map((el) => {
                return <li>{el}</li>;
              })}
          </ul>
        </div>
      </div>
      <Link to='/home'>
        <button className={styles.btnDetail}>
          <img className={styles.imgBtnDetail} src={imgBtn} />
        </button>
      </Link>
    </div>
  );
}
