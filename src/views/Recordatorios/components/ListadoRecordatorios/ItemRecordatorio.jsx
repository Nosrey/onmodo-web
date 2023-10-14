import React, { useEffect, useState } from 'react';
import styles from './ItemRecordatorio.module.css';
import { RECORDATORIOS_INFO } from '../../../../components/shared/constants/recordatoriosInfo';

const FrecuenciaToDias = {
  Mensual: 7, // 7 días
  Bimestral: 7, // 2 meses
  Trimestral: 30, // 3 meses
  Semestral: 30, // 6 meses
  Anual: 60, // 1 año
  "Cada 2 años": 60, // 2 años
};

function ItemRecordatorio({data}) {
  const [nextDate, setNextDate] = useState()
  const [classDate, setClassDate] = useState("")
  const [classCard, setClassCard] = useState("")
  const [ejecutado, setEjecutado] = useState("no")
  const [status, setStatus] = useState(data.status)

  var nivelRol = localStorage.getItem('rol');

  useEffect(() => {
    if (data) {
      const valueDate = data.fechas.length !== 0 ? data.fechas.find((fechaObj) => !fechaObj.ejecutado).fecha : "";
      setNextDate( valueDate)
      if (valueDate  === "") {
        setClassCard("card-normal");
          setClassDate('date-normal');
      }
    
    }
  }, [data])

  useEffect(() => {
    if (nextDate) {
        const evaluacionAviso = evaluarFechaYFrecuencia(nextDate, data.frecuencia);
        const classNameText = evaluacionAviso === 'vencido' ? 'date-vencido' : 
                    evaluacionAviso === 'pendiente' ? 'date-pendiente' : 'date-normal';
        setClassDate(classNameText);
        const classNameCard = evaluacionAviso === 'vencido' ? 'card-vencido' : 
                    evaluacionAviso === 'pendiente' ? 'card-pendiente' : 'card-normal';
        setClassCard(classNameCard)
    }
  }, [nextDate])

  const parseFecha = (fechaString) => {
    const parts = fechaString.split('/');
    if (parts.length === 3) {
      const dia = parseInt(parts[0], 10);
      const mes = parseInt(parts[1], 10);
      const año = parseInt(parts[2], 10);
      if (!isNaN(dia) && !isNaN(mes) && !isNaN(año)) {
        return new Date(año, mes - 1, dia); // Resta 1 al mes, ya que los meses en JavaScript van de 0 a 11.
      }
    }
    return null; 
  }

  const evaluarFechaYFrecuencia = (fechaString, frecuencia)=> {
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
  }

  const handleChangeEjecutado = (value) => {
    setEjecutado(value);
  }
  
  const handleChangeStatus = (value) => {
    setStatus(value);
  }

  return (
    <>
      <div className={classCard}>
      <div className={styles.headerSup}>
        <div className={styles.fecha}>
          <span className={styles.frecuencia}>{data.frecuencia}</span>
          <span className={styles.frecuencia}>-</span>
          <span className={classDate}>{nextDate}</span>
        </div>
        {
          nivelRol === "2" && data.status === "En curso" && 
          <div className={styles.selectContainer}>
            <label htmlFor="ejecutado" for="ejecutado">Ejecutado</label>
              <select name="ejecutado" id="ejecutado"  onChange={(e) => handleChangeEjecutado(e.target.value)} value={ejecutado}>
                <option value="si">SI</option>
                <option value="no">NO</option>

              </select>
          </div>
        }
      </div>
        
        <div className={styles.header}>
          <span className={styles.title}>{RECORDATORIOS_INFO[data.tarea]}</span>

        </div>
        <p className={styles.description}>{data.descripcion.trim()  !== ""  ? data.descripcion  : "Sin descripción"}</p>
        <div className={styles.headerSup} style={{marginTop:"18px"}}>
          <a  className={styles.link} href={data.link} target='_blank' rel="noreferrer">{data.linkTitle ? data.linkTitle : data.link}</a>
          {
            nivelRol === "2" &&
            <div className={styles.selectContainer}>
                <select name="Status" id="Status"  onChange={(e) => handleChangeStatus(e.target.value)} value={status}>
                  <option value="Aún no desarrollado">Aún no desarrollado</option>
                  <option value="En proceso de desarrollo">En proceso de desarrollo</option>
                  <option value="En curso">En curso</option>
                  <option value="Desestimado Transitoriamente">Desestimado Transitoriamente</option>
                  <option value="Resuelto">Resuelto</option>

                </select>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default ItemRecordatorio;
