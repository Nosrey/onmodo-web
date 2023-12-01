import React, { useState } from 'react';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Card({ text , isCloseToExpire }) {
  const { title, link } = text;
  const [titulo, setTitulo] = useState("");
  useEffect(() => {
    getTitle();
  },)
  async function getTitle() {

    if (title == "controlalergenos") {
      setTitulo("Control de comensales con dietas Especiales")
    } else if (title == "entregabidones") {
      setTitulo("Entrega de bidones de aceite usado")
    }
    else if (title == "flashincidente") {
      setTitulo("Flash reporte de incidentes")
    }
    else if (title == "informeintaccidente") {
      setTitulo("Informe interno de accidente")
    }
    else if (title == "registrocapacitacion") {
      setTitulo("Registro de Capacitación")
    }
    else if (title == "registrodecomiso") {
      setTitulo("Decomiso de materias primas")
    }
    else if (title == "registrosimulacro") {
      setTitulo("Registro de Simulacro")
    }
    else if (title == "reporterechazo") {
      setTitulo("Rechazo - Devolución de mat primas")
    }
    else if (title == "verificacionbalanza") {
      setTitulo("Verificación Balanzas")
    }
    else if (title == "verificaciontermometros") {
      setTitulo("Verificación Termómetros")
    }
    else if (title == "entregaropa") {
      setTitulo("Entrega de ropa de trabajo y EPP")
    }
    else{
      // setTitulo("0")
      setTitulo(title)
    }
  }



  return (
    <Link to={link} target={title === 'Documentación' && '_blank'}>
      <div className={styles.cardContainer} style={ title === "Recordatorios" && isCloseToExpire ? {backgroundColor:"#7bc100"} : {}}>
        {
          title === "Recordatorios" && isCloseToExpire &&  <span className={styles.asterisco} >!</span>

        }
        <div className={styles.cardWrapper}>
          <span className={styles.titleCard}>{titulo === "0" ? title : titulo}</span>
        </div>
      </div>
    </Link>
  );
}

export default Card;
