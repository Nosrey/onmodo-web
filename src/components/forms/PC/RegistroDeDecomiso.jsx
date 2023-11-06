import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckboxIcon from '@mui/icons-material/IndeterminateCheckBox';
import styles from './RegistroDeDecomiso.module.css';
import { useSelector } from 'react-redux';
import Alert from '../../shared/components/Alert/Alert';
import { registroDecomiso } from '../../../services/FormsRequest';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function RegistroDeDecomiso() {
  //** ALERTA */
  const [textAlert, setTextAlert] = useState('');
  const [typeAlert, setTypeAlert] = useState('');
  const [showAlert, setShowlert] = useState(false);
  const location = useLocation();
  const infoPrecargada = location.state?.objeto;

  const prueba = useSelector((state) => state.registroDecomisosR.inputsValues);
  const [fecha, setFecha] = useState('');
  const [causa, setCausa] = useState('');
  const [turno, setTurno] = useState('');

  var idUser = localStorage.getItem('idUser');
  const [inputs] = useState([
    { id: 1, label: 'Fecha' },
    { id: 2, label: 'Turno' },
    { id: 3, label: 'Producto decomisado' },
    { id: 4, label: 'Cantidad' },
    { id: 5, label: 'Causa' },
  ]);
  const [replicas, setReplicas] = useState(1);
  const [replicaValues, setReplicaValues] = useState([{ id: 0 }]);

  const [values, setValues] = useState({
    inputs: [{}],
    idUser: idUser,
  });
  const [objValues, setObjValues] = useState({
    fecha: '',
    turno: '',
    productoDecomisado: '',
    cantidad: '',
    causa: '',
  });
  const [inputValues, setInputValues] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (
      replicas === 1 &&
      objValues.fecha !== '' &&
      objValues.turno !== '' &&
      objValues.productoDecomisado !== '' &&
      objValues.cantidad !== '' &&
      objValues.causa !== ''
    ) {
      setInputValues([objValues]);
    } else if (
      replicas > 1 &&
      objValues.fecha !== '' &&
      objValues.turno !== '' &&
      objValues.productoDecomisado !== '' &&
      objValues.cantidad !== '' &&
      objValues.causa !== ''
    ) {
      setInputValues([...inputValues, objValues]);
    }
  }, [trigger]);

  useEffect(() => {
    setValues({ ...values, inputs: inputValues });
  }, [inputValues, objValues]);

  useEffect(() => {
    if (
      objValues.fecha !== '' &&
      objValues.turno !== '' &&
      objValues.productoDecomisado !== '' &&
      objValues.cantidad !== '' &&
      objValues.causa !== ''
    ) {
      setTrigger(true);
    }
  }, [objValues]);

  useEffect(() => {
    let confirmado = false
    for (let i = 0; i < replicaValues.length; i++) {
      if (replicaValues[i]?.["turno"]?.length && replicaValues[i]?.["productodecomisado"]?.length && replicaValues[i]?.["cantidad"]?.length && replicaValues[i]?.["causa"]?.length && replicaValues[i]?.["fecha"]?.length) {
        confirmado = true
      } else {
        confirmado = false
        break
      }
    }
    console.log('confirmado ', confirmado)
    if (confirmado) {
      setTrigger(true)
    } else {
      setTrigger(false)
    }
  }, [values, replicaValues])

  const inputsValuesConstructor = (id, label, index, value) => {
    const inputTarget = document.getElementById(id);
    label === 'Fecha'
      ? setObjValues({ ...objValues, fecha: inputTarget.value, id: index })
      : label === 'Turno'
        ? setObjValues({ ...objValues, turno: value })
        : label === 'Producto decomisado'
          ? setObjValues({ ...objValues, productoDecomisado: inputTarget.value })
          : label === 'Cantidad'
            ? setObjValues({ ...objValues, cantidad: inputTarget.value })
            : label === 'Causa' && setObjValues({ ...objValues, causa: value });
  };

  const todasLasPropiedadesLlenas = (obj) => {
    for (let prop in obj) {
      if (obj[prop] === '') {
        return false;
      }
    }
    return true;
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
    console.log('form ', replicaValues);
    // registroDecomiso(values)
    //   .then((resp) => {
    //     setTextAlert('¡Formulario cargado exitosamente!');
    //     setTypeAlert('success');
    //     // limpiar fomr
    //     window.location.href = window.location.href;
    //   })
    //   .catch((resp) => {
    //     setTextAlert('Ocurrió un error');
    //     setTypeAlert('error');
    //   })
    //   .finally(() => {
    //     window.scrollTo({
    //       top: 0,
    //       behavior: 'smooth',
    //     });
    //     setShowlert(true);
    //     setTimeout(() => {
    //       setShowlert(false);
    //     }, 7000);
    //   });
  };

  useEffect(() => {
    if (infoPrecargada) {
      // muestro un form del historial
      console.log('TENGO INFO ', infoPrecargada);
      setReplicas(infoPrecargada.inputs.length);

      setValues({
        inputs: infoPrecargada.inputs,
        idUser: idUser,
      });
      setObjValues(() => [...infoPrecargada.inputs]);
    } else {
      // creo un form desde cero
      setValues({
        inputs: [{}],
        idUser: idUser,
      });
    }
  }, [location.state?.objeto]);
  return (
    <>
      <div>
        <div className='form'>
          <div className='titleContainer'>
            <h3 className='title'>Registros de decomisos de materias primas</h3>
          </div>
          <div className='table'>
            <div className='tableSection'>
              {Array(replicas)
                .fill(0)
                .map((_, index) => (
                  <div className='tableRow' key={replicaValues[index].id}>
                    <p className='index'>{index + 1} </p>

                    {inputs.map((input, index2) => (
                      <div key={replicaValues[index].id + index2}>
                        {input.label === 'Fecha' ? (
                          <TextField
                            type='date'
                            className='input'
                            value={replicaValues[index]?.fecha}
                            onChange={(e) => {
                              let replicaCopy = [...replicaValues];
                              replicaCopy[index].fecha = e.target.value;
                              setReplicaValues(replicaCopy);
                            }}
                            id={`input-${input.id}-${index}`}
                            name={`input-${input.id}-${index}`}
                            disabled={!!location.state?.objeto}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        ) :
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
                            disabled={!!location.state?.objeto}
                            className='input'
                          />
                        }
                      </div>
                    ))}
                    {!!infoPrecargada ? null : (
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
          <div className='btn'>
            {!trigger && <span>*Completar todos los campos para poder Guardar</span>}
            <Button
              disabled={!!location.state?.objeto || !trigger}
              onClick={handleSubmit}
              variant='contained'
            >
              Guardar
            </Button>
          </div>
        </div>
      </div>
      {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}
    </>
  );
}

export default RegistroDeDecomiso;
