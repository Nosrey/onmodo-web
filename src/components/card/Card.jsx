import React from 'react';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';

function Card({ text }) {
  const { title, link } = text;
  return (
    <Link to={title}>
      <div className={styles.cardContainer}>
        <div className={styles.cardWrapper}>
          <span className={styles.titleCard}>{title}</span>
        </div>
      </div>
    </Link>
  );
}

export default Card;
