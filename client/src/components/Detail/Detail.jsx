import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById } from "../../actions";
import { useEffect } from "react";
import Logo from "../../images/LogoHF.png";

export default function Detail(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecipeById(props.match.params.id));
  }, [dispatch]);

  const recipe = useSelector((state) => state.detail);

  return (
    <div>
      {recipe.length > 0 ? (
        <div>
          <h1>{recipe.title}</h1>
          <image src={recipe.image ? recipe.image : { Logo }} />
        </div>
      ) : (
        <p>data no encontrada</p>
      )}
      <Link to='/home'>
        <button>Home</button>
      </Link>
    </div>
  );
}
