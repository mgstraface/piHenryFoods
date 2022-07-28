import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Logo from "../../images/LogoHF.png";
import { getRecipes } from "../../actions";
import styles from "../NavBar/NavBar.module.css";

export default function NavBar({ setCurrentPage }) {
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
          className={styles.btnNav}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Refresh recipes
        </button>
        <Link to='/recipe'>
          <button className={styles.btnNav}>Create recipe</button>
        </Link>
      </div>
      <div className={styles.SearchBar}>
        <SearchBar setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
}
