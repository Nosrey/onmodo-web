import React from 'react';
import styles from './Card.module.css';

function Card({ text }) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardWrapper}>
        <span className={styles.titleCard}>{text.title}</span>
      </div>
    </div>
  );
}

export default Card;
