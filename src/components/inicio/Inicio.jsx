import React from 'react';
import Card from '../card/Card';
import styles from './Inicio.module.css';
import { useState } from 'react';

function Inicio() {
  const cards = [
    {
      title: 'Formularios',
      link: '/home',
    },
    {
      title: 'Formularios cargados',
      link: '/home',
    },
    {
      title: 'Documentación',
      link: '/documentacion',
    },
    {
      title: 'Cuenta',
      link: '/cuenta',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.nivelContainer}>
          <span className={styles.titleNivel}>Nivel 1</span>
        </div>
        <div className={styles.cardContainer}>
          {cards.map((card, index) => (
            <Card text={card} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Inicio;
