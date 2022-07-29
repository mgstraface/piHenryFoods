import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../actions/index";
import { useEffect } from "react";
import styles from "./Detail.module.css";
import imgBtn from "../../images/btnGoHome.png";

export default function Detail(props) {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetails(props.match.params.id));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {recipe.title ? (
        <div>
          <h1>{recipe.title}</h1>

          <img
            className={styles.imgDetail}
            src={recipe.image}
            alt='img not found'
            width='250px'
            height='250px'
          />

          <h2>{recipe.summary && "Summary"}</h2>
          <div className={styles.summary}>
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
      <div className={styles.healthScore}>
        <h3>HEALTH SCORE</h3>
        <h3>{recipe.healthScore && `${recipe.healthScore}%`}</h3>
      </div>
      <Link to='/home'>
        <button className={styles.btnDetail}>
          <img className={styles.imgBtnDetail} src={imgBtn} />
        </button>
      </Link>
    </div>
  );
}
// return (
//   <div className={styles.card}>
//     <h3> {title} </h3>
//     <Link to={`/detail/${id}`}>
//       <img src={image} alt='img not found' width='150px' height='150px' />
//     </Link>
//     <div>
//       <h3>Diet types</h3>
//       <ul className={styles.ul}>
//         {finalDiets.map((el) => {
//           return <li key={el}>{el.charAt(0).toUpperCase() + el.slice(1)}</li>;
//         })}
//       </ul>
//     </div>
//   </div>
// );
// }
