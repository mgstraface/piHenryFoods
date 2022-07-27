import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getDiets } from "../../actions/index";
import styles from "../Form/Form.module.css";
import Logo from "../../images/LogoHF.png";

export default function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);

  const [input, setInput] = useState({
    title: "",
    image: "",
    summary: "",
    healthScore: "",
    analyzedInstructions: "",
    diets: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      diets: [...input.diets, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postRecipe(input));
    alert("Recipe created");
    setInput({
      title: "",
      image: "",
      summary: "",
      healthScore: "",
      analyzedInstructions: "",
      diets: [],
    });
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getDiets());
  }, []);

  return (
    <div>
      <div className={styles.formBG}>
        <img src={Logo} />
        <h1>Create your own recipe!</h1>
        <div className={styles.Form}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              {/* <label>Title</label> */}
              <input
                type='text'
                placeholder='Title'
                value={input.title}
                name='title'
                onChange={handleChange}
              />
            </div>
            <div>
              {/* <label>Image</label> */}
              <input
                type='text'
                placeholder='Image LINK'
                value={input.image}
                name='image'
                onChange={handleChange}
              />
            </div>
            <div>
              {/* <label>Summary</label> */}
              <input
                type='text'
                placeholder='Summary'
                value={input.summary}
                name='summary'
                onChange={handleChange}
              />
            </div>
            <div>
              {/* <label>Health Score</label> */}
              <input
                type='text'
                placeholder='Healt Score'
                value={input.healthScore}
                name='healthScore'
                onChange={handleChange}
              />
            </div>
            <div>
              {/* <label>Steps</label> */}
              <input
                type='text'
                placeholder='Steps'
                value={input.analyzedInstructions}
                name='analyzedInstructions'
                onChange={handleChange}
              />
            </div>

            <select className={styles.dietSelect} onChange={(e) => handleSelect(e)}>
              <option value='' hidden>
                Diet types
              </option>
              {diets.map((e) => (
                <option value={e.name}>{e.name}</option>
              ))}
            </select>
            <ul className={styles.dietTypes}>
              <li>{input.diets.map((e) => e + " ,")}</li>
            </ul>
            <div className={styles.buttonContainer}>
              <button className={styles.buttonForm} type='text'>
                Send
              </button>
              <Link to='/home'>
                <button className={styles.buttonForm}>to Home</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
