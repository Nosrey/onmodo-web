import React, { useState } from 'react';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


// controlalergenos
// entregabidones
// flashincidente
// informeintaccidente
// registrocapacitacion
// registrodecomiso
// registrosimulacro
// reporterechazo
// verificacionbalanza
// verificaciontermometros
function Card({ text }) {
  console.log(text)
  const { title, link } = text;
  const [titulo, setTitulo] = useState("");
  const [reminders, setReminders] = useState(false);
  useEffect(() => {
    getTitle();

    if (title === "Recordatorios") { 
      setReminders(true);
      
    }
  },)
  async function getTitle() {

    if (title == "controlalergenos") {
      setTitulo("Control Alergenos")
    } else if (title == "entregabidones") {
      setTitulo("Entrega Bidones")
    }
    else if (title == "flashincidente") {
      setTitulo("Flash Incidente")
    }
    else if (title == "informeintaccidente") {
      setTitulo("Informe Accidente")
    }
    else if (title == "registrocapacitacion") {
      setTitulo("Registro Capacitacion")
    }
    else if (title == "registrodecomiso") {
      setTitulo("Registro Decomiso")
    }
    else if (title == "registrosimulacro") {
      setTitulo("Registro Simulacro")
    }
    else if (title == "reporterechazo") {
      setTitulo("Reporte Rechazo")
    }
    else if (title == "verificacionbalanza") {
      setTitulo("Verificacion Balanza")
    }
    else if (title == "verificaciontermometros") {
      setTitulo("Verificacion Termómetros")
    }
    else{
      // setTitulo("0")
      setTitulo(title)
    }
  }



  return (
    <Link to={link}>
      <div className={styles.cardContainer} style={ reminders ? {backgroundColor:"#7bc100"}: {}}>
        {
          reminders &&  <span className={styles.asterisco} >!</span>

        }
        <div className={styles.cardWrapper}>
          <span className={styles.titleCard}>{titulo === "0" ? title : titulo}</span>
        </div>
      </div>
    </Link>
  );
}

export default Card;
