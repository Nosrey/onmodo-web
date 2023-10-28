import React from 'react';
import Modal from 'react-modal';
import styles from './Modales.module.css';
import { deleteReminder } from '../../../../services/Request';

function ModalEliminarRecordatorio({ modalDelete, setModalDelete , idReminder, showAlert}) {
  const handleCloseModal = () => {
    setModalDelete(false);
  };

  const handleDelete = () => {
    deleteReminder(idReminder).then((resp)=> {
      showAlert("success", "Recordatorio Eliminado")
    })
    .catch((err) =>{
      showAlert("error", "Ocurrió un error")
    })
    handleCloseModal();
  }

  return (
    <div>
      <Modal
        isOpen={modalDelete}
        onRequestClose={handleCloseModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2 className={styles.title}>¿Deseas eliminar éste recordatorio?</h2>
        <p className={styles.text}>
          Si así lo decides, se eliminará de manera permanente y no lo podrás recuperar.
        </p>

        <div className={styles.contBtn}>
          <button id={styles.btnCancelar} onClick={handleCloseModal} type='button'>
            Cancelar
          </button>
          <button onClick={handleDelete} >Eliminar</button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalEliminarRecordatorio;
