import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './ModalBorrar.module.css';

function ModalBorrar({ modalDelete, setModalDelete }) {
  const handleCloseModal = () => {
    setModalDelete(false);
  };
  return (
    <div>
      <Modal
        isOpen={modalDelete}
        onRequestClose={handleCloseModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2 className={styles.title}>¿Deseas eliminar este formulario?</h2>
        <p className={styles.text}>
          Si así lo decides, se eliminará de manera permanente y no lo podrás recuperar.
        </p>

        <div className={styles.contBtn}>
          <button id={styles.btnCancelar} onClick={handleCloseModal} type='button'>
            Cancelar
          </button>
          <button>ELiminar</button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalBorrar;
