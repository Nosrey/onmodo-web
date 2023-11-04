import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './AlergenosComida.module.css';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckboxIcon from '@mui/icons-material/IndeterminateCheckBox';
import Alert from '../../shared/components/Alert/Alert';
import { controlAlergenos } from '../../../services/FormsRequest';
import { useLocation } from 'react-router';
import { useDropzone } from 'react-dropzone';

function AlergenosComida() {
  const location = useLocation();
  const infoPrecargada = location.state?.objeto;
  var idUser = localStorage.getItem('idUser');
  useEffect(() => {
    console.log(infoPrecargada);
    if (infoPrecargada) {
      // muestro un form del historial
      setObjValues(infoPrecargada.inputs);
      setValues({
        comedor: infoPrecargada.comedor,
        idUser: idUser,
      });
    } else {
      // creo un form desde cero
      console.log('error');
      setValues({
        comedor: '',
        inputs: [{}],
        idUser: idUser,
      });
    }
  }, []);
  //** ALERTA */
  const [textAlert, setTextAlert] = useState('');
  const [typeAlert, setTypeAlert] = useState('');
  const [showAlert, setShowlert] = useState(false);
  const formValue = useSelector((state) => state.comensalesR.inputsValues);

  console.log(formValue);
  const [inputs] = useState([
    { id: 1, label: 'Fecha', prop: 'fecha' },
    { id: 2, label: 'Nombre Comensal', prop: 'nombre' },
    { id: 3, label: 'Diagnóstico', prop: 'diagnostico' },
    { id: 4, label: 'Requiere renovación', prop: 'requiereRenovacion' },
    { id: 5, label: 'Fecha Renovación', prop: 'fechaRenovacion' },
    { id: 6, label: 'Ingredientes/ Alimentos excluidos', prop: 'listado' },
    { id: 7, label: 'Presenta Certificado', prop: 'presentaCertificado' },
    { id: 8, label: 'Certificado', prop: 'certificado' },
  ]);
  const [values, setValues] = useState({ idUser: idUser });
  const initialObjValues = {fecha: '', nombre: '', diagnostico: '', requiereRenovacion: 'NO', fechaRenovacion: '', listado: '', presentaCertificado: 'NO', certificado: null}
  const [objValues, setObjValues] = useState([initialObjValues]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newValues = [...objValues];
    newValues[index][name] = value;
    if(newValues[index].requiereRenovacion === 'NO') newValues[index].fechaRenovacion = '';
    if(newValues[index].presentaCertificado === 'NO') newValues[index].certificado = null;
    setObjValues(newValues)
    };

  const handleClick = () => {
    setObjValues([...objValues, initialObjValues]);
  };

  const handleClickRemove = (e) => {
    const idToDelete = parseInt(e.currentTarget.id);
    const objValuesFiltered = objValues.filter((_, index) => index !== idToDelete);
    setObjValues(objValuesFiltered);
  };

  const handleSubmit = () => {
    const valuesToSend = {...values, inputs: objValues}
    console.log('values:', valuesToSend);

    // controlAlergenos(values)
    //   .then((resp) => {
    //     if (resp.error) {
    //       setTextAlert('Ocurrió un error');
    //       setTypeAlert('error');
    //     } else {
    //       setTextAlert('¡Formulario cargado exitosamente!');
    //       setTypeAlert('success');
    //       // limpiar formulario
    //       setInputValues([]);
    //       setReplicas(1);
    //       setValues({
    //         comedor: '',
    //         inputs: [{}],
    //         idUser: idUser,
    //       });
    //     }
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
  
  const DropCertificado = ({index, input}) => {
    const onDrop = (acceptedFiles) => {
        // Solo permitir un archivo, puedes ajustar según tus necesidades
        const file = acceptedFiles[0];
        const newValues = [...objValues];
        newValues[index].certificado = file;
        setObjValues(newValues);
      };
    
    const { getRootProps, getInputProps } = useDropzone({ onDrop });    

    return (
        <div {...getRootProps()} className={styles.border}>
        <input {...getInputProps()} />
        {!input.certificado && (
          <h6 style={{ fontSize: '12px' }}>
            Suelta el certificado aquí, o haz clic para seleccionar uno.
          </h6>
        )}
        {input.certificado && (
          <h6
            style={{ fontSize: '12px', width: '100%' }}
            className={styles.select}
          >
            Archivo seleccionado:{' '}
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
              {input.certificado.name.substring(0, 25)}
            </span>{' '}
          </h6>
        )}
      </div>
    )
  }

  return (
    <>
      {values && (
        <div>
          <div className='form'>
            <div className='titleContainer'>
              <h3 className='title'>Control de comensales con dietas especiales</h3>
            </div>
            <div className={styles.personal}>
              <TextField
                onChange={(e) => {
                  setValues({ ...values, comedor: e.target.value });
                }}
                fullWidth
                id='outlined-basic'
                label='Comedor'
                variant='outlined'
                value={infoPrecargada?.comedor}
                disabled={!!location.state?.objeto}
              />
            </div>
            <div className='table'>
              <div className='tableSection'>
                {objValues.map((_, index) => (
                    <div className='tableRow' key={index}>
                      <p className='index'>{index + 1} </p>
                      {inputs.map((input) => (
                        <div key={input.id}>
                          {input.label === 'Fecha' ? (
                            <TextField
                              onChange={(e) => handleInputChange(index, e)}
                              id={`input-${input.id}-${index}`}
                              name={input.prop}
                              label={`${input.label}`}
                              variant='outlined'
                              type='date'
                              InputLabelProps={{
                                shrink: true,
                              }}
                              className='input'
                              value={_[input.prop]}
                              disabled={!!location.state?.objeto}
                            />
                          ) : input.label === 'Fecha Renovación' ? (
                            <TextField
                              onChange={(e) => handleInputChange(index, e)}
                              id={`input-${input.id}-${index}`}
                              name={input.prop}
                              label={`${input.label}`}
                              variant='outlined'
                              type='date'
                              InputLabelProps={{
                                shrink: true,
                              }}
                              className='input'
                              disabled={_.requiereRenovacion === 'NO' || !!location.state?.objeto}
                              value={_[input.prop]}
                            />
                          ) : input.label === 'Presenta Certificado' ? (
                            <FormControl variant='outlined' className={`${styles.selectField} `}>
                              <InputLabel id='select'>{input.label}</InputLabel>
                              <Select
                                labelId='select'
                                className='input'
                                id={`input-${input.id}-${index}`}
                                name={input.prop}
                                onChange={(e) => handleInputChange(index, e)}
                                label={`${input.label}`}
                                value={_[input.prop]}
                                disabled={!!location.state?.objeto}
                              >
                                <MenuItem value='SI'>SI</MenuItem>
                                <MenuItem value='NO'>NO</MenuItem>
                              </Select>
                            </FormControl>
                          ) : input.label === 'Requiere renovación' ? (
                            <FormControl variant='outlined' className={`${styles.selectField} `}>
                              <InputLabel id='select'>{input.label}</InputLabel>
                              <Select
                                labelId='select'
                                className='input'
                                id={`input-${input.id}-${index}`}
                                name={input.prop}
                                onChange={(e) => handleInputChange(index, e)}
                                label={`${input.label}`}
                                defaultValue={'NO'}
                                value={_[input.prop]}
                                disabled={!!location.state?.objeto}
                              >
                                <MenuItem value='SI'>SI</MenuItem>
                                <MenuItem value='NO'>NO</MenuItem>
                              </Select>
                            </FormControl>
                          ) : input.label === 'Certificado' && _.presentaCertificado === 'SI' ? (
                            <DropCertificado index={index} input={_}/>
                          ) : input.label !== 'Certificado' ? (
                            <TextField
                              onChange={(e) => handleInputChange(index, e)}
                              id={`input-${input.id}-${index}`}
                              name={input.prop}
                              label={`${input.label}`}
                              variant='outlined'
                              className='input'
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={_[input.prop]}
                              disabled={!!location.state?.objeto}
                            />
                          ) : null}
                        </div>
                      ))}

                      {infoPrecargada ? (
                        <div></div>
                      ) : (
                        <div className='icon'>
                          {index === 0 ? (
                            <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick} />
                          ) : (
                            <IndeterminateCheckboxIcon
                              style={{ color: 'grey' }}
                              id={index}
                              onClick={handleClickRemove}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            <div className='btn'>
              <Button
                disabled={!!location.state?.objeto}
                onClick={handleSubmit}
                variant='contained'
              >
                Guardar
              </Button>
            </div>
          </div>
        </div>
      )}
      {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}
    </>
  );
}

export default AlergenosComida;
