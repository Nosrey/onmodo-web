import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckboxIcon from '@mui/icons-material/IndeterminateCheckBox';
import styles from './RegistroDeDecomiso.module.css';
import { useSelector } from 'react-redux';
import Alert from '../../shared/components/Alert/Alert';
import { registroDecomiso } from '../../../services/FormsRequest';
import { useLocation } from 'react-router-dom';

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
  const [replicaValues, setReplicaValues] = useState([{}]);

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
    console.log('BNUEVO VLRO ', objValues);
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

  const handleClick = () => {
    setReplicas(replicas + 1);
    setObjValues({ fecha: '', turno: '', productoDecomisado: '', cantidad: '', causa: '' });
    setTrigger(false);
  };

  const todasLasPropiedadesLlenas = (obj) => {
    for (let prop in obj) {
      if (obj[prop] === '') {
        return false;
      }
    }
    return true;
  };
  const handleClickRemove = (index) => {
    const inputsArrFiltered = inputValues.filter((input) => input.id !== replicas - 1);
    setInputValues(inputsArrFiltered);
    setReplicas(replicas - 1);
    if (values.inputs.every(todasLasPropiedadesLlenas)) {
      setTrigger(true);
    } else {
      setTrigger(false);
    }
  };

  const handleSubmit = () => {
    console.log('form ', values);
    registroDecomiso(values)
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
                  <div className='tableRow' key={index}>
                    <p className='index'>{index + 1} </p>

                    {inputs.map((input) => (
                      <div key={input.id}>
                        {input.label === 'Fecha' ? (
                          <TextField
                            type='date'
                            value={objValues[index]?.fecha}
                            className='input'
                            onChange={(e) => {
                              inputsValuesConstructor(
                                `input-${input.id}-${index}`,
                                input.label,
                                index
                              );
                            }}
                            id={`input-${input.id}-${index}`}
                            name={`input-${input.id}-${index}`}
                            disabled={!!location.state?.objeto}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        ) : input.label === 'Causa' ? (
                          <FormControl variant='outlined' className={`${styles.selectField} `}>
                            <InputLabel id='causa'>Causa</InputLabel>
                            <Select
                              labelId='causa'
                              className='input'
                              id={`input-${input.id}-${index}`}
                              name={`input-${input.id}-${index}`}
                              disabled={!!location.state?.objeto}
                              onChange={(e) => {
                                inputsValuesConstructor(
                                  `input-${input.id}-${index}`,
                                  input.label,
                                  index,
                                  e.target.value
                                );
                              }}
                              label='Causa'
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={objValues[index] && objValues[index]['causa']}
                            >
                              <MenuItem value='Recal'>Recall</MenuItem>
                              <MenuItem value='Desvíos de Proceso'>Desvíos de Proceso</MenuItem>
                              <MenuItem value='Fuera fecha de vida útil'>
                                Fuera fecha de vida útil
                              </MenuItem>
                              <MenuItem value='Fuera de aptitud'>Fuera de aptitud</MenuItem>
                              <MenuItem value='Otras Causas'>Otras Causas</MenuItem>
                            </Select>
                          </FormControl>
                        ) : input.label === 'Turno' ? (
                          <FormControl variant='outlined' className={`${styles.selectField} `}>
                            <InputLabel id='turno'>Turno</InputLabel>
                            <Select
                              labelId='turno'
                              disabled={!!location.state?.objeto}
                              className='input'
                              id={`input-${input.id}-${index}`}
                              name={`input-${input.id}-${index}`}
                              value={objValues[index]?.turno}
                              onChange={(e) => {
                                inputsValuesConstructor(
                                  `input-${input.id}-${index}`,
                                  input.label,
                                  index,
                                  e.target.value
                                );
                              }}
                              label='Turno'
                              InputLabelProps={{
                                shrink: true,
                              }}
                            >
                              <MenuItem value='Mañana'>Mañana</MenuItem>
                              <MenuItem value='Tarde'>Tarde</MenuItem>
                              <MenuItem value='Noche'>Noche</MenuItem>
                            </Select>
                          </FormControl>
                        ) : (
                          <TextField
                            className='input'
                            onKeyUp={(e) => {
                              inputsValuesConstructor(
                                `input-${input.id}-${index}`,
                                input.label,
                                index
                              );
                            }}
                            id={`input-${input.id}-${index}`}
                            name={`input-${input.id}-${index}`}
                            disabled={!!location.state?.objeto}
                            label={`${input.label}`}
                            variant='outlined'
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={
                              input.label === 'Producto decomisado'
                                ? objValues[index]?.productoDecomisado
                                : input.label === 'Cantidad'
                                ? objValues[index]?.cantidad
                                : ''
                            }
                          />
                        )}
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
                              handleClickRemove(index);
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
