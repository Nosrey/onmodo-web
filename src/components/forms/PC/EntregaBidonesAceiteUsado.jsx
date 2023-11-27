import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckboxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { useDropzone } from 'react-dropzone';
import { entregaBidones } from '../../../services/FormsRequest';
import Alert from '../../shared/components/Alert/Alert';
import { useLocation } from 'react-router';
import styles from './EntregaBidonesAceiteUsado.module.css';
import { v4 as uuidv4 } from 'uuid';

function EntregaBidonesAceiteUsado() {
  const location = useLocation();
  const infoPrecargada = location.state?.objeto;
  const currentStatus= location.state?.status; // ('view' o 'edit' segun si vengo del icono del ojito o  de editar)
  
  const [replicas, setReplicas] = useState(1);
  const [replicaValues, setReplicaValues] = useState([{id: 0}]);
  const [trigger, setTrigger] = useState(false);

  const [textAlert, setTextAlert] = useState('');
  const [typeAlert, setTypeAlert] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const idUser = localStorage.getItem('idUser');

  const inputs = [
    { id: 1, label: 'Fecha' },
    { id: 2, label: 'Cantidad de Litros entregados' },
    { id: 3, label: 'Responsable de Entrega' },
    { id: 4, label: 'Responsable de Retiro' },
    { id: 5, label: 'Transporte' },
    { id: 6, label: 'Disposición final' },
  ];

  const areAllValuesFilled = (valuesObj) => {
    return Object.values(valuesObj).every((value) => value !== '');
  };

  useEffect(() => {
    if (replicas === 1 && areAllValuesFilled(replicaValues[0])) {
      // setValues({ ...values, inputs: [replicaValues[0]] });
    } else if (replicas > 1 && replicaValues.every(areAllValuesFilled)) {
      // setValues({ ...values, inputs: replicaValues });
    }
  }, [replicaValues, replicas]);

  const handleInputChange = (event, index, label) => {
    const { value } = event.target;
    const newReplicaValues = replicaValues.map((replicaValue, i) => {
      return i === index
        ? { ...replicaValue, [label.toLowerCase().replace(/\s/g, '')]: value, idUser: idUser }
        : replicaValue;
    });
    setReplicaValues(newReplicaValues);
  };

  const handleFileChange = (files, index, label) => {
    const file = files[0];
    const newReplicaValues = replicaValues.map((replicaValue, i) =>
      i === index
        ? { ...replicaValue, [label.toLowerCase().replace(/\s/g, '')]: file, idUser: idUser }
        : replicaValue
    );
    setReplicaValues(newReplicaValues);
  };

  const Dropzone = ({ onDrop, index, label }) => {
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    return (
      <div {...getRootProps()} className={styles.border}>
        <input {...getInputProps()} />
        {replicaValues[index][label.toLowerCase().replace(/\s/g, '')] === undefined && (
          <h6 style={{ fontSize: '12px' }}>Selecciona una foto de {label}</h6>
        )}

        {replicaValues[index][label.toLowerCase().replace(/\s/g, '')] && (
          <h6 style={{ fontSize: '12px', width: '100%' }} className={styles.select}>
            Archivo seleccionado para {label}:{' '}
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
              {replicaValues[index][label.toLowerCase().replace(/\s/g, '')].name.substring(0, 25)}
            </span>
          </h6>
        )}
      </div>
    );
  };

  const handleClick = (index) => {
    setReplicas(replicas + 1);
    const id = uuidv4();
    setReplicaValues([...replicaValues, { id: id }]);
    setTrigger(false);
  };

  const handleClickRemove = (index) => {
    let copyReplicas = replicaValues.filter(replica => replica.id !== index)
    setReplicaValues(copyReplicas);
    setReplicas(replicas - 1);
  }

  const handleSubmit = () => {
    const arrayFilesTransporte = replicaValues.map(value => value.transporte || null);
    const arrayFilesDisposicion = replicaValues.map(value => value.disposiciónfinal || null);

    const data = {
      certificadoTransporte : arrayFilesTransporte,
      certificadoDisposicion: arrayFilesDisposicion,
      inputs : replicaValues
    }
    
    entregaBidones(data)
      .then((resp) => {
       if (resp.error) {
            setTextAlert('Ocurrió un error');
            setTypeAlert('error');
          } else {
            setTextAlert('¡Formulario cargado exitosamente!');
            setTypeAlert('success');
           // limpiar fomr
          // window.location.href = window.location.href;
          }
      })
      .catch((resp) => {
        setTextAlert('Ocurrió un error');
        setTypeAlert('error');
      })
      .finally(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 7000);
      });
  };

  useEffect(() => {
    if (infoPrecargada) {
      setReplicas(infoPrecargada.inputs.length);
      setReplicaValues(infoPrecargada.inputs);
    } else {
      setReplicas(1);
      setReplicaValues([{}]);
    }
  }, [location.state?.objeto]);

  return (
    <>
      <div>
        <div className='form'>
          <div className='titleContainer'>
            <h3 className='title'>Circuito de Aceite Usado</h3>
          </div>
          <div className='table'>
            <div className='tableSection'>
              {Array(replicas)
                .fill(0)
                .map((_, index) => 
                { 
                  return (
                  <div className='tableRow' key={replicaValues[index].id}>
                    <p className='index'>{index + 1} </p>

                    {inputs.map((input, index2) => (
                      <div key={replicaValues[index].id + index2}>
                        {input.label === 'Fecha' ? (
                          <TextField
                            type='date'
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={(e) => {
                              let replicaCopy = [...replicaValues];
                              replicaCopy[index].fecha = e.target.value;
                              setReplicaValues(replicaCopy);
                            }}
                            id={`input-${input.id}-${index}`}
                            name={`input-${input.id}-${index}`}
                            value={replicaValues[index].fecha}
                            disabled={currentStatus === 'view'}
                          />
                        ) : input.label === 'Transporte' || input.label === 'Disposición final' ? (
                          <Dropzone
                            onDrop={(files) => handleFileChange(files, index, input.label)}
                            index={index}
                            label={input.label}
                          />
                        ) : (
                          <TextField                            
                            id={`input-${input.id}-${index}`}
                            name={`input-${input.id}-${index}`}
                            label={`${input.label}`}
                            value={
                              replicaValues[index][input.label.toLowerCase().replace(/\s/g, '')]
                            }
                            onChange={(e) => {
                              let replicaCopy = [...replicaValues];
                              replicaCopy[index][
                                input.label.toLowerCase().replace(/\s/g, '')
                              ] = e.target.value;
                              setReplicaValues(replicaCopy);
                            }}
                            variant='outlined'
                            disabled={currentStatus === 'view'}
                            className='input'
                          />
                        )}
                      </div>
                    ))}
                    {infoPrecargada ? (
                      <div></div>
                    ) : (
                      <div className="icon">
                      {
                          (index == 0 || index > Array(replicas).fill(0).length) ? 
                          <AddBoxIcon style={{ color: 'grey' }} onClick={() => handleClick(index)} />
                          :  <IndeterminateCheckboxIcon style={{ color: 'grey' }} onClick={() => handleClickRemove(replicaValues[index].id)} />
                      }
                      </div>
                    )}
                  </div>
                )}
                )}
            </div>
          </div>
          {
            (currentStatus === 'edit' || infoPrecargada === undefined) &&
            <div className='btn'>
                <Button
                onClick={handleSubmit}
                variant='contained'
                >
                Guardar
                </Button>
            </div>
            }
        </div>
      </div>
      {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}
    </>
  );
}

export default EntregaBidonesAceiteUsado;
