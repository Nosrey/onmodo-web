import React, {useState, useEffect} from 'react';
import Card from '../card/Card';
import styles from './Inicio.module.css';
import { MENU_OPTIONS } from '../shared/constants/menuOptions';

function Inicio() {
  var idUser = localStorage.getItem('idUser');
  var nivelRol = localStorage.getItem('rol');

  // Definir las opciones del menú según el rol del usuario
  // let cards = [];
  //   cards = ¨/// if else if elseif  TRABAJAR CON ESTADOS;

  const [cards, setCards] = useState([])

  useEffect(() => {
    if (nivelRol) setCards(MENU_OPTIONS.filter((item)=> item.showToRol.includes(parseInt(nivelRol))))
      
  }, [nivelRol])


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
