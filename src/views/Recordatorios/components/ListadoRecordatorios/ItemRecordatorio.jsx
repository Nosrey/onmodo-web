import React, { useEffect, useState } from 'react';
import styles from './ItemRecordatorio.module.css';
import { RECORDATORIOS_INFO } from '../../../../components/shared/constants/recordatoriosInfo';
import { createReminder, deleteReminder, editReminder } from '../../../../services/Request';
import { Oval } from 'react-loader-spinner';
import ModalBorrar from '../../../../components/modalBorrar/ModalBorrar';
import ModalEliminarRecordatorio from '../Modales/ModalEliminarRecordatorio';
import Alert from '../../../../components/shared/components/Alert/Alert';
import ModalResuelto from '../Modales/ModalResuelto';
import ModalChangeStatus from '../Modales/ModalChangeStatus';
import { FrecuenciaToDias, parseFecha } from '../../../../services/SharedService';

function ItemRecordatorio({ data, updateInfo }) {
  const [infoReminder, setInfoReminder] = useState(data);

  const [nextDate, setNextDate] = useState();
  const [classDate, setClassDate] = useState('');
  const [classCard, setClassCard] = useState('');
  const [ejecutado, setEjecutado] = useState('no');
  const [status, setStatus] = useState(data.status);
  const [fechaParticular, setFechaParticular] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [modalChangeStatus, setModalChangeStatus] = useState(false);
  const [modalResuelto, setModalResuelto] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
    //** ALERTA */
    const [textAlert, setTextAlert] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [showAlert, setShowlert] = useState(false);

  var nivelRol = localStorage.getItem('rol');

  useEffect(() => {
    if (data && data.status !== "Resuelto") {
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
    } else {
      setNextDate(data.fechas[0].fecha);
      setClassCard('card-normal');
      setClassDate('date-normal');
    }
    setInfoReminder(data);
    setStatus(data.status);
  }, [data]);

  useEffect(() => {
    if (nextDate && data.status !== "Resuelto") {  // no quiero que le cambie la clase a los que estan resuetos
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
    if (value === 'si') {
      setModalResuelto(true);
    }
  };

  const handleChangeStatus = (value) => {
    setStatus(value);
    setModalChangeStatus(true);
  };

  const handleDeleteReminder = (id) => {
    setModalDelete(true)
  }

  const showLoader = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const showAlertNotif = (type, msg) => {
    setTextAlert(msg);
    setTypeAlert(type);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setShowlert(true);
    setTimeout(() => {
      setShowlert(false);
    }, 7000);
    if (type === "success") {
      // recargo la pagina
      window.location.href = window.location.href;
    }
  }
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
              { nextDate !== '' && <span className={styles.frecuencia}>-</span>}
              <span className={classDate}>{nextDate}</span>
            </div>
            {nivelRol === '2' && infoReminder.status === 'En curso' && (
              <div className={styles.selectContainer}>
                <label htmlFor='ejecutado' for='ejecutado'>
                  Resuelto
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
            <span onClick={() => handleDeleteReminder(infoReminder._id)}>Eliminar</span>
            {nivelRol === '2' &&  (
              <div className={styles.selectContainer}>
                <select
                  name='Status'
                  id='Status'
                  value={status}
                  onChange={(e) => handleChangeStatus(e.target.value)}
                  disabled={status === 'Resuelto'}
                >
                  <option value='Aún no desarrollado'>Aún no desarrollado</option>
                  <option value='En proceso de desarrollo'>En proceso de desarrollo</option>
                  <option value='En curso'>En curso</option>
                  <option value='Desestimado Transitoriamente'>Desestimado Transitoriamente</option>
                  <option value='Archivar tarea completa'>Archivar tarea completa</option>
                  <option value='Resuelto'>Resuelto</option>

                </select>
              </div>
            )}
          </div>
        </div>
      )}
       <ModalResuelto modalResuelto={modalResuelto} setModalResuelto={setModalResuelto} reminder={infoReminder}  fechaParticular={fechaParticular} showLoader={showLoader} updateInfo={updateInfo}/>
       <ModalChangeStatus modalChangeStatus={modalChangeStatus} setModalChangeStatus={setModalChangeStatus} reminder={infoReminder}  fechaParticular={fechaParticular} showLoader={showLoader} newStatus={status} updateInfo={updateInfo}/>

       <ModalEliminarRecordatorio modalDelete={modalDelete} setModalDelete={setModalDelete} idReminder={infoReminder._id}  showAlert={(type, msg) => showAlertNotif(type, msg)} />
       {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}

    </>
  );
}

export default ItemRecordatorio;
