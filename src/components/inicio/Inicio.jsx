import React, {useState, useEffect} from 'react';
import Card from '../card/Card';
import styles from './Inicio.module.css';
import { MENU_OPTIONS } from '../shared/constants/menuOptions';
import { getReminders } from '../../services/Request';
import { FrecuenciaToDias, parseFecha } from '../../services/SharedService';

function Inicio() {
  var nivelRol = localStorage.getItem('rol');

  const [cards, setCards] = useState([])
  const [remindersCloseToExpire, setRemindersCloseToExpire] = useState(false)

  useEffect(() => {
    if (nivelRol) setCards(MENU_OPTIONS.filter((item)=> item.showToRol.includes(parseInt(nivelRol))))
      
  }, [nivelRol])

  const evaluarFechaYFrecuencia = (fechaString, frecuencia) => {
    const fechaActual = new Date();
    const fechaLimite = parseFecha(fechaString);

    // Comprueba si la fecha ya pasó
    if (fechaActual > fechaLimite) {
      return 'vencido';
    }

    // Comprueba si la fecha está próxima según la frecuencia
    const umbralDias = FrecuenciaToDias[frecuencia];
    fechaLimite.setDate(fechaLimite.getDate() - umbralDias);

    if (fechaActual > fechaLimite) {
      return 'pendiente';
    }

    return '';
  };

  useEffect(() => {
    // traigo lo recordatorios para evaluar si  hay alguno proximo , mostrarselo al usuario
    getRecordatorios();
  }, []);

  const getRecordatorios = () => {
    getReminders(localStorage.getItem('business'))
      .then((resp) => {
        if (resp.length !== 0) {
          for (let i = 0; i < resp.length; i++) {
            if (resp[i].status === "En curso") { // solo evaluo las que estan en curso para saber si estoy cerca de una fecha de vencimiento
              const valueDate =
               resp[i].fechas.length !== 0 ?resp[i].fechas.find((fechaObj) => !fechaObj.ejecutado).fecha : '';
        
        
              const evaluacionAviso = evaluarFechaYFrecuencia(valueDate, resp.frecuencia);
              if (evaluacionAviso !== '') {
                setRemindersCloseToExpire(true)
              } else 
              setRemindersCloseToExpire(false)
            }
            
          }
        }
      })
  };


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.nivelContainer}>
          <span className={styles.titleNivel}>Nivel {nivelRol}</span>
        </div>
        <div className={styles.cardContainer}>
          {cards.map((card, index) => (
            <Card text={card} key={index} isCloseToExpire={remindersCloseToExpire} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Inicio;
