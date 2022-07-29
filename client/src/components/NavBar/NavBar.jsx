import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Logo from "../../images/LogoNav.png";
import { getRecipes } from "../../actions";
import styles from "../NavBar/NavBar.module.css";
import refresh from "../../images/refresh.png";
import create from "../../images/create.png";

export default function NavBar({ setCurrentPage }) {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  return (
    <div className={styles.Container}>
      <button
        className={styles.btnNav}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <img className={styles.imgNav} src={refresh} />
      </button>
      <img src={Logo} />
      <Link to='/recipe'>
        <button className={styles.btnNav}>
          <img className={styles.imgNav} src={create} />
        </button>
      </Link>
      {/* <div className={styles.SearchBar}>
        <SearchBar setCurrentPage={setCurrentPage} />
      </div> */}
    </div>
  );
}
