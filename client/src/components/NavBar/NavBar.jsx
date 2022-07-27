import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Logo from "../../images/LogoHF.png";
import { getRecipes } from "../../actions";
import styles from "../NavBar/NavBar.module.css";

export default function NavBar() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  return (
    <div className={styles.Container}>
      <img src={Logo} />
      <div className={styles.btnContainer}>
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Refresh recipes
        </button>
        <Link to='/recipe'>
          <button>Create recipe</button>
        </Link>
      </div>
      <div className={styles.SearchBar}>
        <SearchBar />
      </div>
    </div>
  );
}
