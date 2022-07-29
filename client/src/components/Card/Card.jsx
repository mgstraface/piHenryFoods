import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card({ id, title, image, diets, vegetarian }) {
  const getDiets = function () {
    const arrDiets = []; //defino un array para pushear las dietas de la api y la db

    if (vegetarian === true) {
      arrDiets.push("vegetarian");
    }
    if (diets) {
      for (const diet of diets) {
        typeof diet === "object" ? arrDiets.push(diet.name) : arrDiets.push(diet);
      }
    }
    if (!diets) {
      arrDiets.push("Diet type not found");
    }
    return arrDiets;
  };
  if (!image) {
    image =
      "https://img.freepik.com/premium-vector/fast-food-cartoon-color-illustration_7243-196.jpg?w=740";
  }
  const finalDiets = getDiets();

  //en cada card retorno su title, img y mapeo el arreglo de dietas devolviendo un 'li' por cada una

  return (
    <div className={styles.card}>
      <h3> {title} </h3>
      <Link to={`/detail/${id}`}>
        <img src={image} alt='img not found' width='150px' height='150px' />
      </Link>
      <div>
        <h3>Diet types</h3>
        <ul className={styles.ul}>
          {finalDiets.map((el) => {
            return <li key={el}>{el.charAt(0).toUpperCase() + el.slice(1)}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
