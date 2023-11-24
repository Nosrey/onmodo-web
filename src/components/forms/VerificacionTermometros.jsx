import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './VerificacionTermometros.module.css';
import Termometros from '../modales/Termometros';
import { verificacionTermometros } from '../../services/FormsRequest';

import Modal from '../shared/Modal';
import Alert from '../shared/components/Alert/Alert';
import IndeterminateCheckboxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function VerificacionTermometros() {
  const location = useLocation();
  const infoPrecargada = location.state?.objeto;
  const currentStatus= location.state?.status; // ('view' o 'edit' segun si vengo del icono del ojito o  de editar)
  //** ALERTA */
  const [textAlert, setTextAlert] = useState('');
  const [typeAlert, setTypeAlert] = useState('');
  const [showAlert, setShowlert] = useState(false);
  const initialInputsValue = {
    codigo: '',
    tipo: '',
    responsable: '',
    area: '',
    punto0: '',
    desvio0: '',
    punto100: '',
    desvio100: '',
    acciones: '',
  };
  const initialInputs2Value = {
    codigo: '',
    area: '',
    termoReferencia: '',
    termoEvaluado: '',
    desvio: '',
    acciones: '',
  };

  var idUser = localStorage.getItem('idUser');
  const [values, setValues] = useState();
  const [inputs] = useState([
    { id: 1, label: 'Código', prop: 'codigo' },
    { id: 2, label: 'Tipo (PIN/IR)', prop: 'tipo' },
    { id: 3, label: 'Responsable del uso', prop: 'responsable' },
    { id: 4, label: 'Área', prop: 'area' },
    { id: 5, label: 'Punto 0', prop: 'punto0' },
    { id: 6, label: 'Desvío 0', prop: 'desvio0' },
    { id: 7, label: 'Punto 100', prop: 'punto100' },
    { id: 8, label: 'Desvío 100', prop: 'desvio100' },
    { id: 9, label: 'Acciones de corrección', prop: 'acciones' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [objValues1, setObjValues1] = useState([initialInputsValue]);

  const [inputs2] = useState([
    { id: 1, label: 'Código', prop: 'codigo' },
    { id: 2, label: 'Área', prop: 'area' },
    { id: 3, label: 'Temp. termóm referencia', prop: 'termoReferencia' },
    { id: 4, label: 'Temp. termóm evaluado', prop: 'termoEvaluado' },
    { id: 5, label: 'Desvío', prop: 'desvio' },
    { id: 6, label: 'Acciones de corrección', prop: 'acciones' },
  ]);
  const [objValues2, setObjValues2] = useState([initialInputs2Value]);
  const [replicas, setReplicas] = useState(1);
  const [replicas2, setReplicas2] = useState(1);
  const [replicaValues, setReplicaValues] = useState([{ id: 0 }]);
  const [replicaValues2, setReplicaValues2] = useState([{ id: 0 }]);



  const handleClick = (index) => {
    setReplicas(replicas + 1);
    const id = uuidv4();
    setReplicaValues([...replicaValues, { id: id }]);
  };

  const handleClickRemove = (index) => {
    let copyReplicas = replicaValues.filter(replica => replica.id !== index)
    setReplicaValues(copyReplicas);
    setReplicas(replicas - 1);
  }

  const handleClick2 = (index) => {
    setReplicas2(replicas2 + 1);
    const id = uuidv4();
    setReplicaValues2([...replicaValues2, { id: id }]);
  };

  const handleClickRemove2 = (index) => {
    let copyReplicas = replicaValues2.filter(replica => replica.id !== index)
    setReplicaValues2(copyReplicas);
    setReplicas2(replicas2 - 1);
  }

  const handleSubmit = () => {
    const valuesToSend = { ...values, inputsTrimestral: replicaValues, inputsSemestral: replicaValues2};
    console.log("valuesToSend", valuesToSend)
    verificacionTermometros(valuesToSend)
      .then((resp) => {
        setTextAlert('¡Formulario cargado exitosamente!');
        setTypeAlert('success');
        // limpiar fomr
        // window.location.href = window.location.href;
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
      setValues({
        fecha: infoPrecargada.fecha,
        responsable: infoPrecargada.responsable,
        inputsTrimestral: infoPrecargada.inputsTrimestral,
        inputsSemestral: infoPrecargada.inputsSemestral,
        idUser: idUser,
      });
      setReplicas(infoPrecargada.inputsTrimestral.length);
      setReplicas2(infoPrecargada.inputsSemestral.length);
    } else {
      // creo un form desde cero
      setValues({
        fecha: '',
        responsable: '',
        inputsTrimestral: [initialInputsValue],
        inputsSemestral: [initialInputs2Value],
        idUser: idUser,
      });
    }
  }, []);

  return (
    <>
      {values && (
        <div>
          <div className='form'>
            <div className='titleContainer'>
              <h3 className='title'>Verificación de Instrumentos de Medición: Termometros</h3>
            </div>

            {showModal ? (
              <Modal content={<Termometros />} closeModal={() => setShowModal(false)} />
            ) : (
              <div className='cont-btn'>
                <Button size='small' onClick={() => setShowModal(true)}>
                  <i
                    className='ri-information-line'
                    style={{ marginRight: '8px', fontSize: '22px' }}
                  ></i>{' '}
                  Ver Más
                </Button>
              </div>
            )}

            <div className={styles.personal}>
              <TextField
                type='date'
                onChange={(e) => {
                  setValues({ ...values, fecha: e.target.value });
                }}
                id='fecha'
                name='fecha'
                value={(currentStatus === 'view') ? infoPrecargada.fecha : values.fecha}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={currentStatus === 'view'}
              />
              <TextField
                value={(currentStatus === 'view') ? infoPrecargada.responsable : values.responsable}
                disabled={currentStatus === 'view'}
                onChange={(e) => {
                  setValues({ ...values, responsable: e.target.value });
                }}
                id='outlined-basic'
                placeholder='Responsable de validación'
                label='Responsable de validación'
                variant='outlined'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <br />

            <div className={styles.subtitleCont}>
              <p className={styles.subtitle}>TERMÓMETROS DE PINCHE/INFRARROJOS </p>
            </div>

            {/* <b>   FRECUENCIA: TRIMESTRAL</b> */}

            <div className='table'>
              <div className={styles.contTitTabla}>
                <div className={styles.subtituloTable}>
                  <div>
                    <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
                      Identificación Termómetro{' '}
                    </p>
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
                          {input.label === 'Tipo (PIN/IR)' ? (
                            <FormControl variant='outlined' className={`${styles.selectField} `}>
                              <InputLabel id='select'>{input.label}</InputLabel>
                              <Select
                                disabled={currentStatus === 'view'}
                                value={(currentStatus === 'view') ? infoPrecargada.inputsTrimestral[index]['Tipo (PIN/IR)'] : replicaValues[index]['Tipo (PIN/IR)']}
                                onChange={(e) => {
                                  let replicaCopy = [...replicaValues];
                                  replicaCopy[index]["Tipo (PIN/IR)"] = e.target.value;
                                  setReplicaValues(replicaCopy);
                                }}
                                labelId='select'
                                className='input'
                                id={`input-${input.id}-${index}`}
                                name={`${input.prop}`}
                                label={`${input.label}`}
                              >
                                <MenuItem value='PIN'>PIN</MenuItem>
                                <MenuItem value='IR'>IR</MenuItem>
                              </Select>
                            </FormControl>
                          ) : (
                            <TextField
                              // value={
                              //   replicaValues[index][input.label.toLowerCase().replace(/\s/g, '')]
                              // }
                              value={(currentStatus === 'view') ? infoPrecargada.inputsTrimestral[index][input.label.toLowerCase().replace(/\s/g, '')] : replicaValues[index][input.label.toLowerCase().replace(/\s/g, '')]}
                              disabled={currentStatus === 'view'}
                              onChange={(e) => {
                                let replicaCopy = [...replicaValues];
                                replicaCopy[index][
                                  input.label.toLowerCase().replace(/\s/g, '')
                                ] = e.target.value;
                                setReplicaValues(replicaCopy);
                              }}
                              className='input'
                              InputLabelProps={{
                                shrink: true,
                              }}
                              name={`${input.prop}`}
                              label={input.label}
                              id={`input-${input.id}-${index}`}
                              placeholder={`${input.label}`}
                              variant='outlined'
                            />
                          )}
                        </div>
                      ))}
                      {(currentStatus !== 'view') && <div className='icon'>
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
                      </div>}
                    </div>
                  ))}
              </div>
            </div>

            <br />
            <br />
            <div className={styles.subtitleCont}>
              <p className={styles.subtitle}>
                TERMÓMETROS DE CÁMARAS, ANTECAMARAS, HELADERAS Y FREEZER{' '}
              </p>
            </div>

            {/* <b>   FRECUENCIA: SEMESTRAL</b> */}

            <div className='table'>
              <div className={styles.contTitTabla2}>
                <div className={styles.subtituloTable2}>
                  <div>
                    <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
                      Identificación Termómetro{' '}
                    </p>
                  </div>
                </div>
              </div>

              <div className='tableSection'>
                {Array(replicas2)
                .fill(0)
                .map((_, index) => (
                  <div className='tableRow' key={replicaValues2[index].id}>
                    <p className='index'>{index + 1} </p>

                    {inputs2.map((input, index2) => (
                      <div key={replicaValues2[index].id + index2}>
                        <TextField
                          // value={
                          //   replicaValues2[index][input.label.toLowerCase().replace(/\s/g, '')]
                          // }
                          value={(currentStatus === 'view') ? infoPrecargada.inputsSemestral[index][input.label.toLowerCase().replace(/\s/g, '')] : replicaValues2[index][input.label.toLowerCase().replace(/\s/g, '')]}
                          disabled={currentStatus === 'view'}
                          onChange={(e) => {
                            let replicaCopy = [...replicaValues2];
                            replicaCopy[index][
                              input.label.toLowerCase().replace(/\s/g, '')
                            ] = e.target.value;
                            setReplicaValues2(replicaCopy);
                          }}
                          id={`input-${input.id}-${index}`}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          className='input'
                          label={input.label}
                          name={`${input.prop}`}
                          placeholder={`${input.label}`}
                          variant='outlined'
                        />
                      </div>
                    ))}
                   {(currentStatus !== 'view') && <div className='icon'>
                      {index === 0 || index >= replicas ? (
                        <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick2} />
                      ) : (
                        <IndeterminateCheckboxIcon
                          style={{ color: 'grey' }}
                          onClick={() => {
                            handleClickRemove2(replicaValues2[index].id);
                          }}
                        />
                      )}
                    </div>}
                  </div>
                ))}
              </div>
            </div>

            <br />
            <br />

            <span>
              <b>*</b> PIN(Termómetro de pinche) - IR (Termómetro infrarrojo)
            </span>

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
      )}

      {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}
    </>
  );
}

export default VerificacionTermometros;
