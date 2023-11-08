import { Box, Button, InputLabel, MenuItem, Select, TextField, FormControl } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './VerificacionBalanza.module.css';
import Modal from '../shared/Modal';
import Balanzas from '../modales/Balanzas';
import axios from 'axios';
import { verificacionBalanza } from '../../services/FormsRequest';
import Alert from '../shared/components/Alert/Alert';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import IndeterminateCheckboxIcon from '@mui/icons-material/IndeterminateCheckBox';

function VerificacionBalanza() {
  const location = useLocation();
  const infoPrecargada = location.state?.objeto;
  const currentStatus= location.state?.status; // ('view' o 'edit' segun si vengo del icono del ojito o  de editar)

  //** ALERTA */
  const [textAlert, setTextAlert] = useState('');
  const [typeAlert, setTypeAlert] = useState('');
  const [showAlert, setShowlert] = useState(false);

  const [inputs] = useState([
    { id: 1, label: 'Código' },
    { id: 2, label: 'Tipo (BP/BR)' },
    { id: 3, label: 'Responsable del uso' },
    { id: 4, label: 'Área' },
    { id: 5, label: 'Peso Masa ref/Pto balanza' },
    { id: 6, label: 'Peso real' },
    { id: 7, label: 'Desvío' },
    { id: 8, label: 'Acciones de corrección' },
  ]);
  const [replicas, setReplicas] = useState(1);
  const [replicaValues, setReplicaValues] = useState([{ id: 0 }]);
  const [showModal, setShowModal] = useState(false);
  var idUser = localStorage.getItem('idUser');
  const [values, setValues] = useState({
    fecha: '',
    responsable: '',
    balanza: '',
    inputs: [{}],
    idUser: idUser,
  });
  const [objValues, setObjValues] = useState({
    codigo: '',
    tipo: '',
    responsableUso: '',
    area: '',
    pesoMasa: '',
    pesoReal: '',
    desvio: '',
    accionesCorrecion: '',
  });
  const [inputValues, setInputValues] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (
      replicas === 1 &&
      objValues.codigo !== '' &&
      objValues.tipo !== '' &&
      objValues.responsableUso !== '' &&
      objValues.area !== '' &&
      objValues.pesoMasa !== '' &&
      objValues.pesoReal !== '' &&
      objValues.desvio !== '' &&
      objValues.accionesCorrecion !== '' &&
      objValues.id !== ''
    ) {
      setInputValues([objValues]);
    } else if (
      replicas > 1 &&
      objValues.codigo !== '' &&
      objValues.tipo !== '' &&
      objValues.responsableUso !== '' &&
      objValues.area !== '' &&
      objValues.pesoMasa !== '' &&
      objValues.pesoReal !== '' &&
      objValues.desvio !== '' &&
      objValues.accionesCorrecion !== '' &&
      objValues.id !== ''
    ) {
      setInputValues([...inputValues, objValues]);
    }
  }, [trigger]);
  useEffect(() => {
    setValues({ ...values, inputs: inputValues });
  }, [inputValues]);
  useEffect(() => {
    if (
      objValues.codigo !== '' &&
      objValues.tipo !== '' &&
      objValues.responsableUso !== '' &&
      objValues.area !== '' &&
      objValues.pesoMasa !== '' &&
      objValues.pesoReal !== '' &&
      objValues.desvio !== '' &&
      objValues.accionesCorrecion !== ''
    ) {
      setTrigger(true);
    }
  }, [objValues]);

  const inputsValuesConstructor = (id, label, index, selectedValue) => {
    const inputTarget = document.getElementById(id);

    if (label === 'Código') {
      setObjValues({ ...objValues, codigo: inputTarget.value, id: index });
    } else if (label === 'Tipo (BP/BR)') {
      setObjValues({ ...objValues, tipo: selectedValue });
    } else if (label === 'Responsable del uso') {
      setObjValues({ ...objValues, responsableUso: inputTarget.value });
    } else if (label === 'Área') {
      setObjValues({ ...objValues, area: inputTarget.value });
    } else if (label === 'Peso Masa ref/Pto balanza') {
      setObjValues({ ...objValues, pesoMasa: inputTarget.value });
    } else if (label === 'Peso real') {
      setObjValues({ ...objValues, pesoReal: inputTarget.value });
    } else if (label === 'Desvío') {
      setObjValues({ ...objValues, desvio: inputTarget.value });
    } else if (label === 'Acciones de corrección') {
      setObjValues({ ...objValues, accionesCorrecion: inputTarget.value });
    }
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
    let objFinal = {...values, inputs: replicaValues}
    verificacionBalanza(objFinal)
      .then((resp) => {
        setTextAlert('¡Formulario cargado exitosamente!');
        setTypeAlert('success');
        // limpiar fomr
        window.location.href = window.location.href;
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
        setShowlert(true);
        setTimeout(() => {
          setShowlert(false);
        }, 7000);
      });
  };
  
  useEffect(() => {
    if (infoPrecargada) {
      // muestro un form del historial
      console.log('infoPrecargada', infoPrecargada);
      console.log('sepudo');
      setValues({
        fecha: infoPrecargada.fecha,
        responsable: infoPrecargada.responsable,
        balanza: infoPrecargada.balanza,
        inputs: infoPrecargada.inputs,
        idUser: idUser,
      });
      setReplicas(infoPrecargada.inputs.length);
      console.log('values', values);
    } else {
      // creo un form desde cero
      console.log('error');
      setValues({
        fecha: '',
        responsable: '',
        balanza: '',
        inputs: [{}],
        idUser: idUser,
      });
    }
  }, []);
  return (
    <>
      <div>
        <div className='form'>
          <div className='titleContainer'>
            <h3 className='title'>Verificación de Instrumentos de Medición: Balanzas</h3>
          </div>
          {showModal ? (
            <Modal content={<Balanzas />} closeModal={() => setShowModal(false)} />
          ) : (
            <div className='cont-btn'>
              <Button size='small' onClick={() => setShowModal(true)}>
                <i class='ri-information-line' style={{ marginRight: '8px', fontSize: '22px' }}></i>{' '}
                Ver Más
              </Button>
            </div>
          )}

          <div className={styles.personal}>
            <TextField
              type='date'
              className='input'
              onChange={(e) => {
                setValues({ ...values, fecha: e.target.value });
              }}
              id='fecha'
              name='fecha'
              value={values.fecha || ''}
              disabled={currentStatus === 'view'}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl variant='outlined' disabled={currentStatus === 'view'}>
              <InputLabel>Instrumento</InputLabel>
              <Select
                onChange={(e) => {
                  let copyValues = { ...values };
                  copyValues = { ...copyValues, balanza: e.target.value };
                  setValues(copyValues);
                }}
                value={values.balanza}
                defaultValue={'Báscula'}
                className='input'
                label={`Instrumento`}
                variant='outlined'
              >
                <MenuItem value='Balanza'>Balanza</MenuItem>
                <MenuItem value='Báscula'>Báscula</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className='table'>
            <div className={styles.contTitTabla}>
              <div className={styles.subtituloTable}>
                <div>
                  <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Identificación Balanza </p>
                </div>
              </div>
            </div>

            <div className='tableSection'>
              {Array(replicas)
                .fill(0)
                .map((_, index) => (
                  <div className='tableRow' key={replicaValues[index].id}>
                    <p className='index'>{index + 1} </p>

                    {inputs.map((input, index2) => (
                      <div key={replicaValues[index].id + index2}>
                        {input.label === 'Tipo (BP/BR)' ? (
                          <FormControl variant='outlined'>
                            <InputLabel>Tipo (BP/BR)</InputLabel>
                            <Select
                              value={replicaValues[index]?.["Tipo (BP/BR)"]}
                              onChange={(e) => {
                                let replicaCopy = [...replicaValues];
                                replicaCopy[index]["Tipo (BP/BR)"] = e.target.value;
                                setReplicaValues(replicaCopy);
                              }}
                              className='input'
                              id={`input-${input.id}-${index}`}
                              label={`${input.label}`}
                              variant='outlined'
                              disabled={currentStatus === 'view'}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            >
                              <MenuItem value='BP'>BP</MenuItem>
                              <MenuItem value='BR'>BR</MenuItem>
                            </Select>
                          </FormControl>
                        ) : (
                          <TextField
                            className='input'
                            id={`input-${input.id}-${index}`}
                            name={`input-${input.id}-${index}`}
                            label={`${input.label}`}
                            variant='outlined'
                            disabled={currentStatus === 'view'}
                            InputLabelProps={{
                              shrink: true,
                            }}
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
                          />
                        )}
                      </div>
                    ))}
                    {infoPrecargada ? (
                      <div></div>
                    ) : (
                      <div className='icon'>
                        {index === 0 || index >= replicas ? (
                          <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick} />
                        ) : (
                          <IndeterminateCheckboxIcon
                            style={{ color: 'grey' }}
                            onClick={() => {
                              handleClickRemove(replicaValues[index].id);
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
          <span>
            <b>*</b> BP(Balanza de producción) - BR (Balanza de recepción)
          </span>
          <br />
          <br />

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

export default VerificacionBalanza;
