import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './ModalEdicionInfo.module.css';

Modal.setAppElement('#root');

const ModalEdicionInfo = ({ openModal, setOpenModal, form}) => {
  const [motivoEdicion, setMotivoEdicion] = useState('');
  
  const handleCloseModal = () => {
    setOpenModal(false);
  };


  return (
    <>
      {form &&
          <div>
          <Modal
            isOpen={openModal}
            onRequestClose={handleCloseModal}
            className={styles.modal}
            overlayClassName={styles.overlay}
          >
            {form.status === 'denied' ?
                    <h2 className={styles.title}>Solicitud Denegada</h2>

            :
            <h2 className={styles.title}>Solicitud Aprobada</h2>

          }
          <div>
            <b>Solicitante: </b> <span className={styles.textMotivo}>
              {/* // en el unico caso que mi form no vien eocn la propiedad user es cuando estoy viendo los forms desde formularios cargados, por lo tanto ahi solo puedo ver lo mios asique el nombre del solicitante seria el mio y lo traigo del localstorage  */}
              {form.user || localStorage.getItem("userName")}
            </span>
          </div>

          <div>
            <b>Comentario del solicitante: </b> <span className={styles.textMotivo}>
                "{form.motivoPeticion}"
              </span>
          </div>


          <div>
            <b>Referente: </b> <span className={styles.textMotivo}>
              {form.whoApproved}
            </span>
          </div>
          <div>
            <b>Comentario del referente: </b> <span className={styles.textMotivo}>
              "{form.motivo}"
            </span>
          </div>
          
          
            <form >
              
              <div className={styles.contBtn}>
              <button id={styles.btnCancelar} onClick={handleCloseModal} type='button'>
                  Cerrar
                </button>
              </div>
            </form>
          </Modal>
        </div>
      
      }
    </>
  );
};

export default ModalEdicionInfo;
