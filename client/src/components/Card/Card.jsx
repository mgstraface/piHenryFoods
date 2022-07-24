import React, {useEffect} from "react";
import styles from './Card.module.css'



export default function Card({ title, image, diets }) {

    const getDiets = function (){
        const arrDiets = [];
        if (diets){
            for(const diet of diets) {
                typeof diet === 'object' ? arrDiets.push(diet.name) : arrDiets.push(diet);
            }
        }else{
            arrDiets.push('Diet type not found') ;
        }
        return arrDiets
    }

    const finalDiets = getDiets();



    return (
    <div className={styles.card}>
        <h3> {title} </h3>
        <img src = {image} alt='img not found' width='150px' height='150px'/>
        <div>
            <h3>Diet types</h3>
        <ul>
        {finalDiets.map((el) => {
            return <li>{el}</li>;
        })} 
        </ul>
        </div>
    </div>
    );
}