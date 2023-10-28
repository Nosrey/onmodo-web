import React, { useEffect, useState } from 'react';
import styles from './RecordatoriosContainer.module.css';
import CreacionRecordatorio from './components/CreacionRecordatorio/CreacionRecordatorio';
import ListadoRecordatorios from './components/ListadoRecordatorios/ListadoRecordatorios';
import { useMedia } from '../../utils/hooks/UseMedia';
import { Button } from '@mui/material';
import Modal from '../../components/shared/Modal';
import { getReminders } from '../../services/Request';

function RecordatoriosContainer() {
  const [dataReminders, setDataReminders] = useState();
  const media = useMedia();
  const [showModal, setShowModal] = useState(false);
  var nivelRol = localStorage.getItem('rol');
  const handleUpdateInfo = () => {
    setShowModal(false);
    getRecordatorios();
  };

  useEffect(() => {
    // Filtrary ordenar por fecha creciente
    getRecordatorios();
  }, []);

  const getRecordatorios = () => {
    getReminders(localStorage.getItem('business'))
      .then((resp) => {
        setDataReminders(() => [...resp]);
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  return (
    <>
      <h2 className={styles.tituloRecord}>Recordatorios</h2>
      <div className={styles.containerBody}>
        {nivelRol === '2' && media !== 'mobile' && (
          <CreacionRecordatorio updateRecordatorios={(e) => handleUpdateInfo(e)} />
        )}
        {nivelRol === '2' && media === 'mobile' && (
          <div className='btn'>
            <Button onClick={() => setShowModal(true)} variant='contained'>
              Crear Nuevo
            </Button>
          </div>
        )}
        {dataReminders && (
          <ListadoRecordatorios recordatorios={dataReminders} updateInfo={handleUpdateInfo} />
        )}
      </div>

      {showModal && (
        <Modal
          content={<CreacionRecordatorio updateRecordatorios={handleUpdateInfo} />}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default RecordatoriosContainer;
