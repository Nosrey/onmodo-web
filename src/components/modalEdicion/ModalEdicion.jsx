import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from './ModalEdicion.module.css';
import { sendEditApplication } from '../../services/FormsRequest';

Modal.setAppElement('#root');

const ModalEdicion = ({ openModal, setOpenModal, idForm, urlForm, showAlert }) => {
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
      status:"pending",
      motivo: motivoEdicion,
    }
    
    sendEditApplication({values: data, formId: idForm, form: urlForm}).then((resp)=>{
      showAlert("success", "Solicitud enviada")
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
        <h2 className={styles.title}>Solicitud de Edición</h2>
        <p className={styles.text}>
          Para editar, debes estar autorizado. Puedes enviar una solicitud de edición junto con un
          mensaje explicando el motivo.
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={motivoEdicion}
            onChange={handleMotivoEdicionChange}
            placeholder='Motivos de la edición...'
            maxLength={1000}
          />
          <div className={styles.contBtn}>
            <button id={styles.btnCancelar} onClick={handleCloseModal} type='button'>
              Cancelar
            </button>
            <button type='submit'>Enviar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ModalEdicion;

// {aprobado ? (
//     <p className={styles.aprobado}>¡Aprobado! La solicitud ha sido procesada y aprobada.</p>
//   ) : (
//     <form onSubmit={handleSubmit}>
//       <textarea
//         value={motivoEdicion}
//         onChange={handleMotivoEdicionChange}
//         placeholder='Escribe aquí el motivo de la edición...'
//       />
//       <div>
//         <button onClick={handleCloseModal} type='button'>
//           Cancelar
//         </button>
//         <button type='submit'>Enviar Solicitud</button>
//       </div>
//     </form>
//   )}
