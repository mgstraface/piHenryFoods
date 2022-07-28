import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../actions";
import styles from "./SearchBar.module.css";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getRecipesByName(name));
    setName("");
    setCurrentPage(1);
  }

  return (
    <div className={styles.SearchBar}>
      <input
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
