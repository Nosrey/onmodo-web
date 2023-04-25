import React from 'react';
import styles from './Footer.module.css';
import imgFooter from '../../assets/image/on-modo-logo.png';

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.text}>Desarrollado por Yellow Patito | Propulsado por OnModo </span>
        <img src={imgFooter} alt='' />
      </div>
    </div>
  );
}

export default Footer;
