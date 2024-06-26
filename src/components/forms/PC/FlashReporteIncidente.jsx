import { Button, TextField, Grid, Select, InputLabel, FormControl, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './FlashReporteIncidente.module.css';
import Alert from '../../shared/components/Alert/Alert';
import { editFlashIncidente, flashIncidente } from '../../../services/FormsRequest';
import { useLocation, useNavigate } from 'react-router';


function FlashReporteIncidente() {
  const location = useLocation();
  const navigate = useNavigate();
  const infoPrecargada = location.state?.objeto;
  const currentStatus = location.state?.status; // ('view' o 'edit' segun si vengo del icono del ojito o  de editar)
  const [textAlert, setTextAlert] = useState('');
  const [typeAlert, setTypeAlert] = useState('');
  const [showAlert, setShowlert] = useState(false);
  const idUser = localStorage.getItem('idUser');
  const [values, setValues] = useState({
    fecha: '',
    hora: '',
    comedor: '',
    responsable: '',
    incidentePotencial: '',
    tipo: '',
    descripcion: '',
    fotografias: [],
    acciones: '',
    planilla: '',
    idUser: idUser,
  });
  const [planillaFile, setPlanillaFile] = useState(null);
  const [blobUrls, setBlobUrls] = useState([]);
  const PhotoFile = () => {
    const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/*',
      onDrop: (acceptedFiles) => {
        const urls = acceptedFiles.map((file) => URL.createObjectURL(file));
        setBlobUrls(urls);
        setValues({ ...values, fotografias: acceptedFiles.slice(0, 5) });
      },
    });
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <h2 style={{ fontSize: '18px', textAlign: 'left', width: '100%', fontWeight: 'bold' }}>
          Fotografias
        </h2>
        <h6 style={{ fontSize: '14px', textAlign: 'left', width: '100%', display: (infoPrecargada?.fotografias?.length && blobUrls && currentStatus === 'view' ? 'none' : 'flex') }}>
          Arrastra y suelta las fotografias aquí o hace clic para seleccionar archivos.
        </h6>
      </div>
    );
  };

  const PlanillaFile = () => {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0];
        setPlanillaFile(file);
        console.log('entered')
        setValues({ ...values, planilla: file });
      },
    });
    if (currentStatus === 'view') {
      return (
        <div className={styles.border}>

          <h2 style={{ fontSize: '18px', textAlign: 'left', width: '100%', fontWeight: 'bold' }}>
            Planilla Firmada
          </h2>

          {values?.planilla && (
            <h6>
              {typeof values?.planilla === 'string' &&
                <a href={values?.planilla} target="_blank" rel="noopener noreferrer" download> Descargar Archivo</a>}
            </h6>
          )}

          {!values?.planilla && (
            <h6 style={{ fontSize: '12px' }}>
              No se ha cargado la planilla firmada.
            </h6>
          )}
          {values?.planilla && (
            // pongo la imagen de la planilla firmada
            <img
              src={values?.planilla}
              alt={`Preview-Planilla`}
              className={styles.previewImage}
              style={{
                width: '50%',
                height: '50%',
                objectFit: 'contain',
                objectPosition: 'center',
                marginVertical: '10px',
              }}
            />
          )}
        </div>
      );
    } else if (currentStatus === 'edit') {
      return (
        <div {...getRootProps()} className={styles.border}>
          <input {...getInputProps()} />
          <h2 style={{ fontSize: '18px', textAlign: 'left', width: '100%', fontWeight: 'bold' }}>
            Planilla Firmada
          </h2>

          {!values.planilla && (
            <h6 style={{ fontSize: '12px' }}>
              Suelta la planilla aquí, o haz clic para seleccionar una.
            </h6>
          )}
          {values.planilla && (
            <>
              <h6 style={{ fontSize: '12px', width: '100%', textAlign: 'center' }} className={styles.select}>
                Archivo seleccionado
              </h6>

              {(!planillaFile?.path) ? (
                <img
                  id='aa2b3c4d5e6f7g8h9i11'
                  src={values?.planilla}
                  alt={`Preview-Planilla`}
                  className={styles.previewImage}
                  style={{
                    width: '25%',
                    height: '25%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    marginVertical: '10px',
                  }}
                />
              )
                : (
                  <h3 style={{ fontSize: '14px', textAlign: 'center', width: '100%', fontWeight: 'bold' }}>
                    {planillaFile.name.substring(0, 25)}
                  </h3>
                )}

            </>
          )}
        </div>
      );
    }
    else {
      return (
        <div {...getRootProps()} className={styles.border}>
          <input {...getInputProps()} />
          <h2 style={{ fontSize: '18px', textAlign: 'left', width: '100%', fontWeight: 'bold' }}>
            Planilla Firmada
          </h2>

          {!planillaFile && (
            <h6 style={{ fontSize: '12px' }}>
              Suelta la planilla aquí, o haz clic para seleccionar una.
            </h6>
          )}
          {planillaFile && (
            <h6 style={{ fontSize: '12px', width: '100%' }} className={styles.select}>
              Archivo seleccionado:{' '}
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                {planillaFile.name.substring(0, 25)}
              </span>{' '}
            </h6>
          )}
        </div>
      )
    }
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
        const path = fileObject.path;
        const file = fileObject /* Obtener el archivo, por ejemplo, mediante una llamada a la API o desde algún otro lugar */;

        if (file) {
          if (typeof file === 'string') {
            return file;
          } else {
            const base64String = await getBase64(file);
            return base64String;
          }
          
        } else {
          // Manejar el caso en que el archivo no se pueda encontrar o cargar
          console.warn(`No se pudo cargar el archivo para ${path}`);
          return null;
        }
      }));

      return base64Array;
    } catch (error) {
      console.error('Error al convertir files a Base64:', error);
      throw error;
    }
  };
  const convertirFileABase64 = async (file) => {
    if (file) {
      if (typeof file === 'string') {
        console.log("es un string")
        return file;
      } else { 
        const base64String = await getBase64(file);
        return base64String;
      }
    } else {
      return null
    }
    
    
  };

  const handleSubmit = async () => {
    const copy = [...values.fotografias]
    const base64Array = await convertirFilesABase64(copy);
    values.fotografias = base64Array

    // si no se han cargado files , no se envia la propiedad directamente 
    if (values.planilla === '' || values.planilla === undefined) {
      delete values.planilla;
    } else {
      values.planilla = await convertirFileABase64(values.planilla);
    }

    if (values.fotografias === '' || values.fotografias === undefined || values.fotografias.length === 0) {
      delete values.fotografias;
    }

    flashIncidente(values)
      .then((resp) => {
        setTextAlert('¡Formulario cargado exitosamente!');
        setTypeAlert('success');
        // reset form
        setValues({
          fecha: '',
          hora: '',
          comedor: '',
          responsable: '',
          incidentePotencial: '',
          tipo: '',
          descripcion: '',
          fotografias: [],
          acciones: '',
          planilla: '',
          idUser: idUser,
        });
        setPlanillaFile(null);
        setBlobUrls([]);
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
    const copy = [...values.fotografias]
    const base64Array = await convertirFilesABase64(copy);
    values.fotografias = base64Array

    // si no se han cargado files , no se envia la propiedad directamente 
    if (values.planilla === '' || values.planilla === undefined) {
      delete values.planilla;
    } else {
      values.planilla = await convertirFileABase64(values.planilla);
    }

    if (values.fotografias === '' || values.fotografias === undefined || values.fotografias.length === 0) {
      delete values.fotografias;
    }

    editFlashIncidente(values, infoPrecargada._id)
      .then((resp) => {
        setTextAlert('¡Formulario editado exitosamente!');
        setTypeAlert('success');
        navigate('/formularios-cargados/flashincidente');

      })
      .catch((resp) => {
        setTextAlert('Ocurrió un error');
        setTypeAlert('error');
      })
  };

  useEffect(() => {
    if (infoPrecargada) {
      console.log('infoPrecargada', infoPrecargada)
      setValues({
        fecha: infoPrecargada.fecha,
        hora: infoPrecargada.hora,
        comedor: infoPrecargada.comedor,
        responsable: infoPrecargada.responsable,
        incidentePotencial: infoPrecargada.incidentePotencial,
        tipo: infoPrecargada.tipo,
        descripcion: infoPrecargada.descripcion,
        fotografias: infoPrecargada.fotografias || [],
        acciones: infoPrecargada.acciones,
        planilla: infoPrecargada.planilla,
        idUser: idUser,
      });
    } else {
      setValues({
        fecha: '',
        hora: '',
        comedor: '',
        responsable: '',
        incidentePotencial: '',
        tipo: '',
        descripcion: '',
        fotografias: [],
        acciones: '',
        planilla: '',
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
              <h3 className='title'>Flash Reporte de Incidente</h3>
              {(currentStatus === 'view' || currentStatus === 'edit') &&
                <span style={{ marginLeft: '20px', fontSize: '20px' }}>
                  <i className={currentStatus === 'view' ? 'ri-eye-line' : 'ri-pencil-line'}></i>
                </span>
              }
            </div>

            <div className={styles.personal}>
              <TextField
                type='date'
                label='Fecha'
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setValues({ ...values, fecha: e.target.value });
                }}
                value={values.fecha}
                disabled={currentStatus === 'view'}
              />
              <TextField
                type='time'
                label='Hora'
                onChange={(e) => {
                  setValues({ ...values, hora: e.target.value });
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={values.hora}
                disabled={currentStatus === 'view'}
              />
            </div>

            <div className={styles.personal}>
              <TextField
                onChange={(e) => {
                  setValues({ ...values, comedor: e.target.value });
                }}
                disabled={currentStatus === 'view'}
                value={values.comedor}
                id='outlined-basic'
                label='Comedor'
                variant='outlined'
              />
              <TextField
                onChange={(e) => {
                  setValues({ ...values, responsable: e.target.value });
                }}
                disabled={currentStatus === 'view'}
                value={values.responsable}
                id='outlined-basic'
                label='Responsable del contrato'
                variant='outlined'
              />
              <FormControl disabled={currentStatus === 'view'} style={{  width: "20%" }}>
                  <InputLabel id="select-label-1">Incidente</InputLabel>
                  <Select
                      labelId="select-label-1"
                      id="select-1"
                      className={styles.selectTipo}
                      value={values.incidentePotencial}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        setValues({ ...values, incidentePotencial: e.target.value });
                      }}                  >
                      <MenuItem value={'Potencial'}>Potencial</MenuItem>
                      <MenuItem value={'Real'}>Real</MenuItem>
                  </Select>
              </FormControl>
            </div>

            <div className={styles.personalText}>
              <TextField
                onChange={(e) => {
                  setValues({ ...values, tipo: e.target.value });
                }}
                disabled={currentStatus === 'view'}
                value={values.tipo}
                fullWidth
                id='outlined-basic'
                label='Tipo de Incidente'
                variant='outlined'
              />
            </div>

            <div className={styles.personalText}>
              <div className={styles.descripcion}>
                <TextField
                  fullWidth
                  className={styles.descipcionArea}
                  id='outlined-multiline-static'
                  label='Descripción del Incidente'
                  multiline
                  value={values.descripcion}
                  rows={4}
                  disabled={currentStatus === 'view'}
                  onChange={(e) => {
                    setValues({ ...values, descripcion: e.target.value });
                  }}
                />
                <p className={styles.aclaracion}>
                  *En esta área no se debe nombrar a la persona que tuvo el accidente, tampoco
                  plantear causales.
                </p>
              </div>
              {/* Área de dropzone */}
              <div className={styles.border}>
                {
                  (currentStatus === 'view') ?
                    <h2 style={{ fontSize: '18px', textAlign: 'left', width: '100%', fontWeight: 'bold' }}>Fotografia</h2>
                    :
                    <PhotoFile />
                }
                <div style={{ display: 'flex', width: '100%' }}>
                  { }
                  {(blobUrls.length > 0) ? 
                  // mapeo las imagenes que se cargaron
                    blobUrls.map((file, index) => (
                      <img
                        key={index}
                        src={file}
                        alt={`Preview-${index}`}
                        className={styles.previewImage}
                      />
                    ))
                    : (
                      values.fotografias.map((file, index) => (
                        <a key={index} href={file} target="_blank"  download={`Preview-${index}`}>
                          <img
                            src={file}
                            alt={`Preview-${index}`}
                            className={styles.previewImage}
                          />
                        </a>
                    ))
                  )}

                </div>
              </div>
            </div>

            <div className={styles.personalText}>
              <TextField
                fullWidth
                id='outlined-multiline-static'
                label='Acciones Inmediatas'
                value={values.acciones}
                multiline
                rows={4}
                disabled={currentStatus === 'view'}
                onChange={(e) => {
                  setValues({ ...values, acciones: e.target.value });
                }}
              />
            </div>

            <div className={styles.responsableCont}>
              <div className={styles.subtitleCont}>
                <p className={styles.subtitle}>Responsable (Accountable)</p>
              </div>
              <p>
                Una vez guardada esta planilla , es necesario imprimirla desde la sección
                Formularios Cargados para ser firmada por el Asesor HSEQ, el Supervisor Directo y el
                Gerente de Área. Con todas las firmas listas, desde la misma sección de Formularios
                Cargados, edite esta planilla adjuntando en el siguiente campo el documento firmado.{' '}
              </p>
              <PlanillaFile />
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
              (currentStatus === 'edit') &&
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

export default FlashReporteIncidente;
