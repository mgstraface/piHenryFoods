import React from "react";
import styles from "./Paginado.module.css";

export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
  //recibe 3 parametros
  const pageNumbers = []; //numeros de pagina

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    // pusheo al array los numeros de pagina
    pageNumbers.push(i);
  }
  return (
    <div className={styles.paginado}>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => {
            //por cada numero del array retorno un boton que aplique ese numero a la
            return (
              // lista
              <li>
                <button onClick={() => paginado(number)}> {number} </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
