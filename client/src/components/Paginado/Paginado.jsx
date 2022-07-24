import React from "react";
import styles from './Paginado.module.css';

export default function Paginado ({recipesPerPage, allRecipes, paginado}){
    const pageNumbers = []

    for ( let i=1; i<=Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i)
    }
    return(
        <div className = {styles.paginado}>
            <ul>
                {pageNumbers && 
                pageNumbers.map(number =>{
									return(
										<li>
                    <button onClick = {()=>paginado(number)}> {number} </button>
										</li>
									)
                })}
            </ul>
        </div>
    )
}