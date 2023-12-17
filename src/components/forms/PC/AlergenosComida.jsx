import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './AlergenosComida.module.css';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckboxIcon from '@mui/icons-material/IndeterminateCheckBox';
import Alert from '../../shared/components/Alert/Alert';
import { controlAlergenos, editControlAlergenos } from '../../../services/FormsRequest';
import { useLocation , useNavigate } from 'react-router';
import { useDropzone } from 'react-dropzone';

function AlergenosComida() {
  const location = useLocation();
  const navigate = useNavigate();
  let infoPrecargada = location.state?.objeto;
  const currentStatus= location.state?.status; // ('view' o 'edit' segun si vengo del icono del ojito o  de editar)

  var idUser = localStorage.getItem('idUser');
  useEffect(() => {
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
        certificados: null,
        idUser: idUser,
      });
    }
  }, []);
  //** ALERTA */
  const [textAlert, setTextAlert] = useState('');
  const [typeAlert, setTypeAlert] = useState('');
  const [showAlert, setShowlert] = useState(false);
  const formValue = useSelector((state) => state.comensalesR.inputsValues);

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
  const [values, setValues] = useState({ idUser: idUser, certificados: null });
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
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => {
        console.log('Error: ', error);
        reject(error);
      };
    });
  };
  
  const convertirFilesABase64 = async (files) => {

    try {
      const base64Array = await Promise.all(files.map(async (fileObject) => {
     
        if (typeof fileObject === 'object') {
          const path = fileObject ?  fileObject.path : 'archivo';
          const file = fileObject /* Obtener el archivo, por ejemplo, mediante una llamada a la API o desde algún otro lugar */;
          if (file) {
            const base64String = await getBase64(file);
            return  base64String ;
          } else {
            // Manejar el caso en que el archivo no se pueda encontrar o cargar
            console.warn(`No se pudo cargar el archivo para ${path}`);
            return   null ;
          }
        } else {
          return fileObject
        }
        
      }));
  
      return base64Array;
    } catch (error) {
      console.error('Error al convertir files a Base64:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    const valuesToSend = {...values, inputs: objValues}
    const arrayFiles = []
    for (let i = 0; i < objValues.length; i++) {
      arrayFiles.push(objValues[i].certificado);
    }
    const base64Array = await convertirFilesABase64(arrayFiles);
    valuesToSend.certificados = base64Array
    if (valuesToSend.certificados === '' || valuesToSend.certificados === null || valuesToSend.certificados.length === 0 ) {
      delete valuesToSend.certificados;
  }
    controlAlergenos(valuesToSend)
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
  
  const handleEdit = async () => {
    let valuesToSend = {...values, inputs: objValues}
    const arrayFiles = []
    for (let i = 0; i < objValues.length; i++) {
      arrayFiles.push(objValues[i].certificado);
    }
    const base64Array = await convertirFilesABase64(infoPrecargada.certificados);
  
    valuesToSend = {...valuesToSend, certificados: base64Array}
  
    editControlAlergenos(valuesToSend, infoPrecargada._id)
      .then((resp) => {
        if (resp.error) {
          setTextAlert('Ocurrió un error');
          setTypeAlert('error');
        } else {
          setTextAlert('¡Formulario editado exitosamente!');
          setTypeAlert('success');
          navigate('/formularios-cargados/controlalergenos');
        }
      })
      .catch((resp) => {
        setTextAlert('Ocurrió un error');
        setTypeAlert('error');
      })
  };
  
  const DropCertificado = ({index, input}) => {
    const onDrop = (acceptedFiles) => {
        // Solo permitir un archivo, puedes ajustar según tus necesidades
        const file = acceptedFiles[0];
        const newValues = [...objValues];
        newValues[index].certificado = file;
        infoPrecargada.certificados[index]=file;
        setObjValues(newValues);
      };
    
    const { getRootProps, getInputProps } = useDropzone({ onDrop });    

    return (
      <>
       {currentStatus === 'view'  && 
        <div className='campoFileRow'>
          
        {currentStatus === "view" && typeof infoPrecargada.certificados[index] === 'string'
          && 
            <a className='linkFileRow' href={infoPrecargada.certificados[index]} target="_blank" rel="noopener noreferrer">
                Ver Certificado
            </a>
          }
        {currentStatus === "view" && !infoPrecargada.certificados[index]
          && 
            <a className='linkFileRowNoArcchivo'  target="_blank" rel="noopener noreferrer">
              No se ha cargado Certificado 

            </a>
          }
        </div>
       }
 {currentStatus !== 'view'  &&
      <>
       {currentStatus === "edit" && typeof infoPrecargada.certificados[index] === 'string'
          && 
            <a className='linkFileRow' href={infoPrecargada.certificados[index]} target="_blank" rel="noopener noreferrer">
                Ver Certificado
            </a>
          }
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
            {input.certificado.name ?
            <>
            Archivo seleccionado:{' '}
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
              {input.certificado.name.substring(0, 25) }
            </span>{' '}</>
            :
            <>Click para modificar el archivo</>
            }
          </h6>
        )}
      </div>
      </>
  }
  
      </>
       
    )
  }

  return (
    <>
      {values && (
        <div>
          <div className='form'>
            <div className='titleContainer'>
              <h3 className='title'>Control de comensales con dietas especiales</h3>
              { (currentStatus === 'view' || currentStatus === 'edit') &&
                        <span style={{marginLeft:'20px', fontSize:'20px'}}>
                            <i className={ currentStatus === 'view' ? 'ri-eye-line':'ri-pencil-line' }></i>
                        </span>
                    }
            </div>
            <div className={styles.personal}>
              <TextField
                onChange={(e) => {
                  let valuesCopy = { ...values };
                  valuesCopy.comedor = e.target.value;
                  setValues(valuesCopy);
                }}
                fullWidth
                id='outlined-basic'
                label='Comedor'
                variant='outlined'
                value={values?.comedor}
                disabled={currentStatus === 'view'}
              />
            </div>
            <div className='table'>
              <div className='tableSection'>
                {objValues?.map((_, index) => (
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
                              disabled={currentStatus === 'view'}
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
                              disabled={_.requiereRenovacion === 'NO' || currentStatus === 'view'}
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
                                disabled={currentStatus === 'view'}
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
                                disabled={currentStatus === 'view'}
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
                              disabled={currentStatus === 'view'}
                            />
                          ) : null}
                        </div>
                      ))}

                      {currentStatus === 'view' ? (
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
      )}
      {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}
    </>
  );
}

export default AlergenosComida;
