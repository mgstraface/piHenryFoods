import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../actions";
import styles from "./SearchBar.module.css";
import Loading from "../../images/loading.gif";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getRecipesByName(name));
    setName("");
    setCurrentPage(1);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return (
    <div className={styles.SearchBar}>
      {loading && (
        <div>
          <img className={styles.Loading} src={Loading} alt='Loading' />
        </div>
      )}
      <input
        className={styles.inputSb}
        value={name}
        type='text'
        placeholder='Search recipe by name'
        onChange={(e) => handleInputChange(e)}
      />
      <button type='submit' onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}
