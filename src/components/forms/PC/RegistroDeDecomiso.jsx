import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckboxIcon from '@mui/icons-material/IndeterminateCheckBox';
import Alert from '../../shared/components/Alert/Alert';
import { editRegistroDecomiso, registroDecomiso, sendEditApplication } from '../../../services/FormsRequest';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function RegistroDeDecomiso() {
  const location = useLocation();
  const navigate = useNavigate();

  const infoPrecargada = location.state?.objeto;
  const currentStatus= location.state?.status; // ('view' o 'edit' segun si vengo del icono del ojito o  de editar)
  
  //** ALERTA */
  const [textAlert, setTextAlert] = useState('');
  const [typeAlert, setTypeAlert] = useState('');
  const [showAlert, setShowlert] = useState(false);

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

    if (confirmado) {
      setTrigger(true)
    } else {
      setTrigger(false)
    }
  }, [values, replicaValues])

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
    const data= {...values , inputs:replicaValues}
    registroDecomiso(data)
      .then((resp) => {
        if (resp.error) {
          setTextAlert('Ocurrió un error');
          setTypeAlert('error');
        } else {
          setTextAlert('¡Formulario cargado exitosamente!');
          setTypeAlert('success');
           // limpiar fomr
          window.location.href = window.location.href;
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
        setShowlert(true);
        setTimeout(() => {
          setShowlert(false);
        }, 7000);
      });
  };

  const deleteEmptyRows = (inputs) => {
    return inputs.filter((row) =>
        Object.values(row).some((value) => value !== ''));
  }

  const handleEdit = () => {
    const data= {...values , inputs:deleteEmptyRows(replicaValues)}
    editRegistroDecomiso(data , infoPrecargada._id)
      .then((resp) => {
        if (resp.error) {
          setTextAlert('Ocurrió un error');
          setTypeAlert('error');
        } else {
          setTextAlert('¡Formulario editado exitosamente!');
          setTypeAlert('success');
          const data = {
            editEnabled: false,
            status:"",
          }
          sendEditApplication({values: data, formId:  infoPrecargada._id, form: '/registrodecomiso'}).finally((resp)=>{
            navigate('/formularios-cargados/registrodecomiso');
          })

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
        setShowlert(true);
        setTimeout(() => {
          setShowlert(false);
        }, 7000);
      });
  };

  useEffect(() => {
    if (infoPrecargada) {
      // muestro un form del historial
      setReplicas(infoPrecargada.inputs.length);

      setValues({
        inputs: infoPrecargada.inputs,
        idUser: idUser,
      });
      setObjValues(() => [...infoPrecargada.inputs]);
      setReplicaValues(() => [...infoPrecargada.inputs])
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
            { (currentStatus === 'view' || currentStatus === 'edit') &&
                <span style={{marginLeft:'20px', fontSize:'20px'}}>
                    <i className={ currentStatus === 'view' ? 'ri-eye-line':'ri-pencil-line' }></i>
                </span>
            }
          </div>
          <div className='table'>
            <div className='tableSection'>
              {Array(replicas)
                .fill(0)
                .map((_, index) => (
                  <div className='tableRow' key={replicaValues[index].id}>
                    <p className='index'>{index + 1} </p>

                    {inputs.map((input, index2) => (
                      <div key={replicaValues[index]?.id + index2}>
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
                            disabled={currentStatus === 'view'}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            label="Fecha"
                          />
                        ) :(

                          input.label === 'Turno' ? (
                            <FormControl fullWidth   disabled={currentStatus === 'view'}
                            >
                              <InputLabel id="demo-simple-select-label">Turno</InputLabel>
                              <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              className='input'
                              label="turno"
                              value={
                                replicaValues[index][input.label.toLowerCase().replace(/\s/g, '')]
                              }
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={(e) => {
                                let replicaCopy = [...replicaValues];
                                replicaCopy[index][
                                  input.label.toLowerCase().replace(/\s/g, '')
                                ] = e.target.value;
                                setReplicaValues(replicaCopy);
                              }}
                              >
                              <MenuItem value={"Turno Mañana"}>Turno Mañana</MenuItem>
                              <MenuItem value={"Turno Tarde"}>Turno Tarde</MenuItem>
                              <MenuItem value={"Turno Noche"}>Turno Noche</MenuItem>
                              </Select>
                          </FormControl>
                          ): (
                            input.label === 'Causa' ? (
                              <FormControl fullWidth disabled={currentStatus === 'view'}
                              >
                                <InputLabel id="demo-simple-select-label">Causa</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className='input'
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                label="causa"
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
                                >
                                <MenuItem value={"Recall"}>Recall</MenuItem>
                                <MenuItem value={"Desvíos de Proceso"}>Desvíos de Proceso</MenuItem>
                                <MenuItem value={"Fuera fecha de vida útil"}>Fuera fecha de vida útil</MenuItem>
                                <MenuItem value={"Fuera de aptitud"}>Fuera de aptitud</MenuItem>
                                <MenuItem value={"Otras causas"}>Otras causas</MenuItem>
                                </Select>
                            </FormControl>
                            ): (
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
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />)
                          )
                          )
                        }
                      </div>
                    ))}
                   {infoPrecargada && currentStatus === 'view' ? (
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
          {
              (infoPrecargada === undefined) &&
              <div className='btn'>
                  <Button
                      onClick={handleSubmit}
                      variant='contained'
                  >
                      Guardar
                  </Button>
              </div>
          }
          {
              (currentStatus === 'edit' ) &&
              <div className='btn'>
                  <Button
                      onClick={handleEdit}
                      variant='contained'
                  >
                      Editar
                  </Button>
              </div>
          }
        </div>
      </div>
      {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}
    </>
  );
}

export default RegistroDeDecomiso;
