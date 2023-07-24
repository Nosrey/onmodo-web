import React from 'react';
import Card from '../card/Card';
import styles from './Inicio.module.css';

function Inicio() {
  var idUser = localStorage.getItem('idUser');
  var nivelRol = localStorage.getItem('rol');
  console.log(nivelRol);
  console.log(idUser);

  // Definir las opciones del menú según el rol del usuario
  let cards = [];

  if (nivelRol == '1') {
    cards = [
      {
        title: 'Formularios',
        link: '/formularios',
      },
      {
        title: 'Formularios cargados',
        link: '/formularios-cargados',
      },
      {
        title: 'Documentación',
        link: '/documentacion',
      },
      {
        title: 'Mi cuenta',
        link: '/cuenta',
      },
    ];
  } else if (nivelRol == '2') {
    cards = [
      {
        title: 'Formularios',
        link: '/formularios',
      },
      {
        title: 'Formularios cargados',
        link: '/formularios-cargados',
      },
      {
        title: 'Documentación',
        link: '/documentacion',
      },
      {
        title: 'Recordatorios',
        link: '/recordatorios',
      },
      {
        title: 'Solicitudes de Edición',
        link: '/solicitudes-edicion',
      },
      {
        title: 'Legajos',
        link: '/legajos',
      },
      {
        title: 'Cuentas',
        link: '/cuentas',
      },
    ];
  } else if (nivelRol == '3') {
    cards = [
      {
        title: 'Estadísticas',
        link: '/estadisticas',
      },
      {
        title: 'Formularios',
        link: '/formularios',
      },
      {
        title: 'Formularios cargados',
        link: '/formularios-cargados',
      },
      {
        title: 'Documentación',
        link: '/documentacion',
      },
      {
        title: 'Solicitudes de Edición',
        link: '/solicitudes-edicion',
      },
      {
        title: 'Legajos',
        link: '/legajos',
      },
      {
        title: 'Cuentas',
        link: '/cuentas',
      },
    ];
  } else if (nivelRol == '4') {
    cards = [
      {
        title: 'Estadísticas',
        link: '/estadisticas',
      },
      {
        title: 'Solicitudes de Edición',
        link: '/solicitudes-edicion',
      },
      {
        title: 'Legajos',
        link: '/legajos',
      },
      {
        title: 'Crear Cuenta',
        link: '/crear-cuenta',
      },
      {
        title: 'Mi cuenta',
        link: '/cuenta',
      },
    ];
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.nivelContainer}>
          <span className={styles.titleNivel}>Nivel {nivelRol}</span>
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
