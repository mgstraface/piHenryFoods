import React from "react";
import styles from "./Paginado.module.css";

export default function Paginado({ recipesPerPage, allRecipes, paginado, currentPage }) {
  //recibe 3 parametros
  const pageNumbers = []; //numeros de pagina

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    // pusheo al array los numeros de pagina
    pageNumbers.push(i);
  }
  return (
    <div className={styles.paginado}>
      <ul>
        <button onClick={() => paginado(currentPage === 1 ? currentPage : currentPage - 1)}>
          Prev
        </button>
        {pageNumbers &&
          pageNumbers.map((number) => {
            //por cada numero del array retorno un boton que aplique ese numero a la
            return (
              // lista
              <li key={number}>
                <button onClick={() => paginado(number)}>
                  {currentPage === number ? (
                    <u>
                      <b className={styles.bPag}> {number}</b>
                    </u>
                  ) : (
                    number
                  )}
                </button>
              </li>
            );
          })}
        <button
          onClick={() =>
            paginado(currentPage === pageNumbers.length ? currentPage : currentPage + 1)
          }
        >
          Next
        </button>
      </ul>
    </div>
  );
}
