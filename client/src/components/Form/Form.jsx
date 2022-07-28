import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getDiets } from "../../actions/index";
import styles from "../Form/Form.module.css";
import Logo from "../../images/LogoHF.png";

//---------------------------------------------FUNCION VALIDADORA-------------------------------------------------

function validate(input) {
  let errors = {};
  if (!input.title) {
    errors.title = "Title is required";
  } else if (!/^[a-zA-Z ]+$/.test(input.title)) {
    errors.title = "Title accept a words and spaces";
  } else if (!/^[\s\S]{3,25}$/.test(input.title)) {
    errors.title = "the title must contain between 3 and 25 characters";
  } else if (!input.summary) {
    errors.summary = "Summary or description is required";
  } else if (!/^(?!$)(?:[0-9]{1,2}|100)$/gm.test(input.healthScore)) {
    errors.healthScore = "The Health Score must be between 0 and 100";
  }
  return errors;
}
//--------------------------------------------COMPONENTE FUNCIONAL-----------------------------------------------
export default function Form() {
  const dispatch = useDispatch();
  const history = useHistory();

  const diets = useSelector((state) => state.diets);

  //----------------------------------------------ESTADOS LOCALES----------------------------------------------------
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    title: "",
    image: "",
    summary: "",
    healthScore: "",
    analyzedInstructions: "",
    diets: [],
  });
  //-------------------------------------------------HANDLERS-----------------------------------------------------
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      diets: [...input.diets, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !errors.image &&
      !errors.title &&
      input.title &&
      !errors.healthScore &&
      input.healthScore &&
      !errors.summary &&
      input.summary &&
      input.diets.length
    ) {
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
    } else {
      alert("Check your recipe, something is wrong or you did not select the type of diet");
    }
  }

  function handleDelete(e) {
    setInput({
      ...input,
      diets: input.diets.filter((diet) => diet !== e),
    });
  }
  //--------------------------------------------ESTADO GLOBAL---------------------------------------------------
  useEffect(() => {
    dispatch(getDiets());
  }, []);
  //------------------------------------------------FORM--------------------------------------------------------
  return (
    <div>
      <div className={styles.formBG}>
        <img src={Logo} />
        <h1>Create your own recipe!</h1>
        <div className={styles.Form}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <input
                type='text'
                placeholder='Title' //--------------title INPUT
                value={input.title}
                name='title'
                onChange={handleChange}
              />
              {errors.title && <p className={styles.errors}>{errors.title}</p>}
            </div>

            <div>
              <input
                type='url'
                placeholder='Image LINK' //---------------image INPUT
                value={input.image}
                name='image'
                onChange={handleChange}
              />
              {errors.image && <p className={styles.errors}>{errors.image}</p>}
            </div>

            <div>
              <input
                type='text'
                placeholder='Summary' //-------------------summary INPUT
                value={input.summary}
                name='summary'
                onChange={handleChange}
              />
              {errors.summary && <p className={styles.errors}>{errors.summary}</p>}
            </div>

            <div>
              <input
                type='text'
                placeholder='Healt Score'
                value={input.healthScore}
                name='healthScore'
                onChange={handleChange}
              />
              {errors.healthScore && <p className={styles.errors}>{errors.healthScore}</p>}
            </div>
            <div>
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
            <div></div>
            <div className={styles.buttonContainer}>
              <button className={styles.buttonForm} type='submit'>
                Create
              </button>
              <Link to='/home'>
                <button className={styles.buttonForm}>to Home</button>
              </Link>
            </div>
          </form>
          <div className={styles.dietCONT}>
            {input.diets.map((e) => (
              <div className={styles.divDiets}>
                <p className={styles.eDiets}>{e}</p>
                <button className={styles.btnX} onClick={() => handleDelete(e)}>
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
