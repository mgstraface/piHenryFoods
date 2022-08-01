import React from "react";
import { Link } from "react-router-dom";
import styles from "./About.module.css";
import Loading from "../../images/loading.gif";
import { useState } from "react";

export default function About() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }
  return (
    <div>
      {loading ? (
        <div>
          <img className={styles.Loading} src={Loading} alt='Loading' />
        </div>
      ) : (
        <div className={styles.about}>
          <Link to='/home'>
            <button className={styles.btnAbout}>To home</button>
          </Link>
        </div>
      )}
    </div>
  );
}
