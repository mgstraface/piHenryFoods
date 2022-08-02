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
    errors.title = "Title accept letters and spaces";
  } else if (!/^[\s\S]{3,25}$/.test(input.title)) {
    errors.title = "The title must contain between 3 and 25 characters";
  }
  if (
    input.image &&
    !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
      input.image
    )
  ) {
    errors.image = "Enter a valid image URL. 'example: http://example.com'";
  }
  if (!input.summary) {
    errors.summary = "Summary or description is required";
  } else if (input.summary && !/^[a-zA-Z0-9 .!,]+$/.test(input.summary)) {
    errors.summary = "Title accept letters, numbers and spaces";
  } else if (!/^[\s\S]{3,250}$/.test(input.summary)) {
    errors.summary = "The title must contain between 3 and 250 characters";
  }
  if (input.healthScore && !/^(?!$)(?:[0-9]{1,2}|100)$/gm.test(input.healthScore)) {
    errors.healthScore = "The Health Score must be between 1 and 100";
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
          <form>
            <div>
              <input
                autoComplete='off'
                type='text'
                placeholder='Title'
                value={input.title}
                name='title'
                onChange={handleChange}
              />
              {errors.title && <p className={styles.errors}>{errors.title}</p>}
            </div>

            <div>
              <input
                autoComplete='off'
                type='url'
                placeholder='Image LINK'
                value={input.image}
                name='image'
                onChange={handleChange}
              />
              {errors.image && <p className={styles.errors}>{errors.image}</p>}
            </div>

            <div>
              <input
                autoComplete='off'
                type='text'
                placeholder='Summary'
                value={input.summary}
                name='summary'
                onChange={handleChange}
              />
              {errors.summary && <p className={styles.errors}>{errors.summary}</p>}
            </div>

            <div>
              <input
                autoComplete='off'
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
                autoComplete='off'
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
                <option key={e.name} value={e.name}>
                  {e.name}
                </option>
              ))}
            </select>
            <div></div>
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
          <div className={styles.dietsBtn}>
            <div className={styles.buttonContainer}>
              <button className={styles.buttonForm} type='submit' onClick={(e) => handleSubmit(e)}>
                Create
              </button>
              <Link to='/home'>
                <button className={styles.buttonForm}>to Home</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
