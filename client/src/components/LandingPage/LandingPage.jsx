import React from 'react'
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';


function LandingPage() {
  return (
      <div className={styles.landing}>
        <Link to='/home'>
          <button className={styles.btn}>Let's COOK</button>
        </Link>
      </div>
  );
}


export default LandingPage


