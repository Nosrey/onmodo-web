import React, { useEffect, useState } from 'react';
import styles from './ItemRecordatorio.module.css';
import { RECORDATORIOS_INFO } from '../../../../components/shared/constants/recordatoriosInfo';
import { editReminder } from '../../../../services/Request';
import { Oval } from 'react-loader-spinner';

const FrecuenciaToDias = {
  Mensual: 7, // 7 días
  Bimestral: 7, // 2 meses
  Trimestral: 30, // 3 meses
  Semestral: 30, // 6 meses
  Anual: 60, // 1 año
  'Cada 2 años': 60, // 2 años
};

function ItemRecordatorio({ data, updateInfo }) {
  const [infoReminder, setInfoReminder] = useState(data);

  const [nextDate, setNextDate] = useState();
  const [classDate, setClassDate] = useState('');
  const [classCard, setClassCard] = useState('');
  const [ejecutado, setEjecutado] = useState('no');
  const [status, setStatus] = useState(data.status);
  const [fechaParticular, setFechaParticular] = useState();
  const [isLoading, setIsLoading] = useState(false);

  var nivelRol = localStorage.getItem('rol');

  useEffect(() => {
    if (data) {
      const objetoFecha =
        data.fechas.length !== 0 ? data.fechas.find((fechaObj) => !fechaObj.ejecutado) : null;
      const valueDate =
        data.fechas.length !== 0 ? data.fechas.find((fechaObj) => !fechaObj.ejecutado).fecha : '';

      setNextDate(valueDate);
      setFechaParticular(objetoFecha); // para saber a cual de todoos los objetos fecha que trae el recordatorio hay que hacer el edit/put
      if (valueDate === '') {
        setClassCard('card-normal');
        setClassDate('date-normal');
      }
      setEjecutado('no'); // para que cuando edito una fecha y al pongo en ejecutada cuando me traiga la nueva se reinicie el selec
    }
    setInfoReminder(data);
    setStatus(data.status);
  }, [data]);

  useEffect(() => {
    if (nextDate) {
      const evaluacionAviso = evaluarFechaYFrecuencia(nextDate, data.frecuencia);
      const classNameText =
        evaluacionAviso === 'vencido'
          ? 'date-vencido'
          : evaluacionAviso === 'pendiente'
          ? 'date-pendiente'
          : 'date-normal';
      setClassDate(classNameText);
      const classNameCard =
        evaluacionAviso === 'vencido'
          ? 'card-vencido'
          : evaluacionAviso === 'pendiente'
          ? 'card-pendiente'
          : 'card-normal';
      setClassCard(classNameCard);
    }
  }, [nextDate]);

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
  };

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

  const handleChangeEjecutado = (value) => {
    setEjecutado(value);
    const data = { ...infoReminder };

    for (let i = 0; i < data.fechas.length; i++) {
      if (data.fechas[i].fecha === fechaParticular.fecha) {
        data.fechas[i].ejecutado = value === 'si' ? true : false;
        break;
      }
    }
    editReminder({ values: data, recordatorioId: data._id }).then((resp) => {
      showLoader();
      updateInfo();
    });
  };

  const handleChangeStatus = (value) => {
    setStatus(value);
  };

  const showLoader = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      {isLoading ? (
        <Oval
          height={30}
          width={30}
          color='#4fa94d'
          wrapperStyle={{
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: '60px',
            paddingBottom: '60px',
          }}
          wrapperClass=''
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor='#4fa94d'
          strokeWidth={5}
          strokeWidthSecondary={2}
        />
      ) : (
        <div className={classCard}>
          <div className={styles.headerSup}>
            <div className={styles.fecha}>
              <span className={styles.frecuencia}>{infoReminder.frecuencia}</span>
              <span className={styles.frecuencia}>-</span>
              <span className={classDate}>{nextDate}</span>
            </div>
            {nivelRol === '2' && infoReminder.status === 'En curso' && (
              <div className={styles.selectContainer}>
                <label htmlFor='ejecutado' for='ejecutado'>
                  Ejecutado
                </label>
                <select
                  name='ejecutado'
                  id='ejecutado'
                  onChange={(e) => handleChangeEjecutado(e.target.value)}
                  value={ejecutado}
                >
                  <option value='si'>SI</option>
                  <option value='no'>NO</option>
                </select>
              </div>
            )}
          </div>

          <div className={styles.header}>
            <span className={styles.title}>{RECORDATORIOS_INFO[infoReminder.tarea]}</span>
          </div>
          <p className={styles.description}>
            {infoReminder.descripcion.trim() !== '' ? infoReminder.descripcion : 'Sin descripción'}
          </p>
          <div className={styles.headerSup} style={{ marginTop: '18px' }}>
            <a className={styles.link} href={infoReminder.link} target='_blank' rel='noreferrer'>
              {infoReminder.linkTitle ? infoReminder.linkTitle : infoReminder.link}
            </a>
            {nivelRol === '2' && (
              <div className={styles.selectContainer}>
                <select
                  name='Status'
                  id='Status'
                  value={status}
                  onChange={(e) => handleChangeStatus(e.target.value)}
                >
                  <option value='Aún no desarrollado'>Aún no desarrollado</option>
                  <option value='En proceso de desarrollo'>En proceso de desarrollo</option>
                  <option value='En curso'>En curso</option>
                  <option value='Desestimado Transitoriamente'>Desestimado Transitoriamente</option>
                  <option value='Resuelto'>Resuelto</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ItemRecordatorio;
