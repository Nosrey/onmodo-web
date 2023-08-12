import React from 'react';
import styles from './Cuentas.module.css';
import Card from '../../components/card/Card';

function Cuentas() {

  return (
    <div className={styles.container}>
       <div className={styles.wrapper}>
            <div className={styles.cardContainer}>
                <Card text={{ title: "Crear Cuenta", link:"/crear-cuenta" }}  />
                <Card text={{ title: "Mi Cuenta", link:"/cuenta" }}  />
            </div>
        </div>
    </div>
  );
}

export default Cuentas;
