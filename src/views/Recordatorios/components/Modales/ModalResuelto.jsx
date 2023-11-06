import React from 'react';
import Modal from 'react-modal';
import styles from './Modales.module.css';
import { createReminder, editReminder } from '../../../../services/Request';

function ModalResuelto({ modalResuelto, setModalResuelto , reminder, fechaParticular, showLoader, updateInfo}) {
  const handleCloseModal = () => {
    setModalResuelto(false);
  };

  const handleResuelto = () => {
    const data = { ...reminder };

    // editamos el array de fechas de este recordatorio para que nos muestre el siguiente
    for (let i = 0; i < data.fechas.length; i++) {
      if (data.fechas[i].fecha === fechaParticular.fecha) {
        data.fechas[i].ejecutado = true ;
        break;
      }
    }
    editReminder({ values: data, recordatorioId: data._id }).then(() => showLoader());
    
    // creamos un nuevo recordatorio que solo tenga esa fecha para poder visualizarlo en el historial
    const newRecordatorio = {
      tarea:data.tarea ,
      descripcion: data.descripcion,
      link:data.link,
      linkTitle:data.linkTitle,
      frecuencia : data.frecuencia,
      fechaInicio: "", 
      fechas: [fechaParticular], // le pongo la fecha de la que acabo de marcar como resuelto
      status: "Resuelto",
    } 

    createReminder(newRecordatorio).then((resp)=> {
        updateInfo();
        handleCloseModal();
    })
  }

  return (
    <div>
      <Modal
        isOpen={modalResuelto}
        onRequestClose={handleCloseModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2 className={styles.title}>¿Deseas marcar como Resuelto éste recordatorio?</h2>
        <p className={styles.text}>
          Si así lo decides, daremos lugar a la siguiente fecha pendiente del mismo.
         
        </p>

        <div className={styles.contBtn}>
          <button id={styles.btnCancelar} onClick={handleCloseModal} type='button'>
            Cancelar
          </button>
          <button onClick={handleResuelto} >
            Aceptar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalResuelto;
