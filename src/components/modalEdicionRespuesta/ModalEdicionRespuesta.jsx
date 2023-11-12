import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from './ModalEdicionRespuesta.module.css';
import { sendEditApplication } from '../../services/FormsRequest';

Modal.setAppElement('#root');

const ModalEdicionRespuesta = ({ openModal, setOpenModal, idForm, urlForm, showAlert, motivo }) => {
  const [motivoEdicion, setMotivoEdicion] = useState('');
  
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleMotivoEdicionChange = (event) => {
    setMotivoEdicion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const data = {
      status:"approved",
      motivo: motivoEdicion,
      editEnabled: true,
      whoApproved:localStorage.getItem("userName"),
    }
    
    sendEditApplication({values: data, formId: idForm, form: urlForm}).then((resp)=>{
      showAlert("success", "Solicitud Aprobada")
    })
    .catch((err) =>{
      showAlert("error", "Ocurrió un error")
    })
    handleCloseModal();
  };

  const handleDenegar = (event) => {
    event.preventDefault();
    
    const data = {
      status:"denied",
      motivo: motivoEdicion,
      whoApproved:localStorage.getItem("userName"),
    }
    
    sendEditApplication({values: data, formId: idForm, form: urlForm}).then((resp)=>{
      showAlert("success", "Solicitud Denegada")
    })
    .catch((err) =>{
      showAlert("error", "Ocurrió un error")
    })
    handleCloseModal();
  };

  return (
    <div>
      <Modal
        isOpen={openModal}
        onRequestClose={handleCloseModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2 className={styles.title}>Aprobar o denegar solicitud de edición</h2>
       <b>Comentario del solicitante: </b> <span className={styles.textMotivo}>
          "{motivo}"
        </span>
        <p className={styles.text}>
          Puedes dejar un comentario sobre la decisión que has tomado.
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={motivoEdicion}
            onChange={handleMotivoEdicionChange}
            placeholder='Motivo ...'
            maxLength={1000}
          />
          <div className={styles.contBtn}>
          <button id={styles.btnCancelar} onClick={handleCloseModal} type='button'>
              Cancelar
            </button>
            <button id={styles.btnDenegar} onClick={handleDenegar} type='button'>
              Denegar
            </button>
            <button type='submit'>Aprobar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ModalEdicionRespuesta;
