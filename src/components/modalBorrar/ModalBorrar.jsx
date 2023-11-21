import React from 'react';
import Modal from 'react-modal';
import styles from './ModalBorrar.module.css';
import { deleteForm } from '../../services/FormsRequest';

function ModalBorrar({ modalDelete, setModalDelete , idForm, url, showAlert, fileToDelete}) {
  const handleCloseModal = () => {
    setModalDelete(false);
  };

  const handleDelete = () => {
    if(fileToDelete === 'formulario') {
      deleteForm(idForm, url).then((resp)=> {
        showAlert("success", "Formulario eliminado")
      })
      .catch((err) =>{
        showAlert("error", "Ocurrió un error")
      })
    }
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
        <h2 className={styles.title}>¿Deseas eliminar éste {fileToDelete}?</h2>
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

export default ModalBorrar;
