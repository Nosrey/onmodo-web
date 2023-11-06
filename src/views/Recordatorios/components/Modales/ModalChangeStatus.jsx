import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './Modales.module.css';
import { editReminder } from '../../../../services/Request';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { generarFechas } from '../../../../services/SharedService';

function ModalChangeStatus({ modalChangeStatus, setModalChangeStatus , reminder,  showLoader, newStatus, updateInfo}) {
  const [frecuencia, setFrecuencia] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const today = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato "yyyy-mm-dd"

  
  const handleCloseModal = () => {
    setModalChangeStatus(false);
  };

  const handleChangeStatus = () => {
    const data = { ...reminder };
    data.status = newStatus; 

    if (newStatus === 'En curso') {
      const fechasGeneradas = generarFechas(fechaInicio,frecuencia);
      data.fechas = fechasGeneradas;
      data.frecuencia = frecuencia;
      data.fechaInicio = fechaInicio;
    } else {
      data.fechas = [];
      data.frecuencia = "";
      data.fechaInicio = "";
    }

    editReminder({ values: data, recordatorioId: data._id }).then(() =>{
      showLoader()
      updateInfo()
      handleCloseModal();
    } );
  }  

  return (
    <div>
      <Modal
        isOpen={modalChangeStatus}
        onRequestClose={handleCloseModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2 className={styles.title}>¿Deseas cambiar el status de tu recodatorio?</h2>
        <p className={styles.text}>
          Si así lo decides, el status pasará a ser "{newStatus}".
          {newStatus === "En curso" && "Es necesario configurar la frecuencia de este recordatorio."}
         
        </p>
        {
          newStatus === 'En curso' && (
            <div className={styles.linkInfo}  style={{marginBottom: "27px"}}>
            <FormControl  variant="outlined" className={styles.input}>
              <InputLabel   id="metodo-evaluacion-label">Frecuencia</InputLabel>
              <Select
                  value={frecuencia}
                  onChange={(e) => setFrecuencia(e.target.value)}
                  label="Frecuencia"
              >
                  <MenuItem value="Mensual">Mensual</MenuItem>
                  <MenuItem value="Bimestral">Bimestral</MenuItem>
                  <MenuItem value="Trimestral">Trimestral</MenuItem>
                  <MenuItem value="Semestral">Semestral</MenuItem>
                  <MenuItem value="Anual">Anual</MenuItem>
                  <MenuItem value="Cada 2 años">Cada 2 años</MenuItem>
              </Select>
            </FormControl>
  
              <TextField
                onChange={(e) => setFechaInicio(e.target.value)}
                label="Fecha 1er Evento"
                variant="outlined"
                type="date"
                InputLabelProps={{
                    shrink: true,
                }}
                 inputProps={{
                  min: today, // Establece la fecha mínima como la fecha de hoy
                }}
                className={styles.input}
  
              />
            </div>
          )
        }

        <div className={styles.contBtn}>
          <button id={styles.btnCancelar} onClick={handleCloseModal} type='button'>
            Cancelar
          </button>
          <button onClick={handleChangeStatus}  disabled={newStatus=== "En curso" && (frecuencia === '' || fechaInicio === '')}>
            Aceptar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalChangeStatus;
