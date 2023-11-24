import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from './RegistroSimulacro.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import Alert from '../../shared/components/Alert/Alert';
import IndeterminateCheckboxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { editRegistroSimulacro, registroSimulacro, sendEditApplication } from '../../../services/FormsRequest';
import { useLocation, useNavigate } from 'react-router';
import { useDropzone } from 'react-dropzone';
import { current } from '@reduxjs/toolkit';

function RegistroSimulacro() {
    const location = useLocation();
    const navigate = useNavigate();
    const infoPrecargada = location.state?.objeto;
    const currentStatus = location.state?.status; // ('view' o 'edit' segun si vengo del icono del ojito o  de editar)
    //** ALERTA */
    const [textAlert, setTextAlert] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [showAlert, setShowlert] = useState(false);

    const [inputs] = useState([
        { id: 1, label: 'Apellido y Nombre', prop: "nombreCompleto" },
        { id: 2, label: 'Nro DNI', prop: "dni" },
    ]);
    var idUser = localStorage.getItem("idUser");
    const [replicas, setReplicas] = useState(1);
    const [values, setValues] = useState();

    const handleClick = () => {
        setReplicas(replicas + 1);
        setValues({
            ...values,
            personas: [
                ...values.personas,
                {
                    nombreCompleto: "",
                    dni: "",
                }
            ]
        });
    };

    const handleClickRemove = (index) => {
        const inputsArrFiltered = values["personas"].filter((_, i) => i !== index);
        setValues({ ...values, personas: inputsArrFiltered });
        setReplicas(replicas - 1);
    }

    const handleChangePerson = (index, field, value) => {
        const updatedPersonas = [...values.personas];
        updatedPersonas[index] = {
            ...updatedPersonas[index],
            [field]: value
        };
        setValues({
            ...values,
            personas: updatedPersonas
        });
    };

    const configToFreeEdition = ( idForm , ) => {
        const data = {
            status:"free",
          }
        sendEditApplication({values: data, formId: idForm, form: 'registrosimulacro'}).then((resp) => {

            // reinicio los valores del form
            setValues({
                razonSocial: "",
                ubicacion: "",
                localidad: "",
                fecha: "",
                personas: [
                    {
                        nombreCompleto: "",
                        dni: "",
                    }
                ],
                firmaDoc: "",
                idUser: idUser
            })
            setReplicas(1);
        })
    }

    const handleSubmit = () => {
        if (values.firmaDoc === ''  || values.firmaDoc === undefined) {
            delete values.firmaDoc;
        }

        registroSimulacro(values).then((resp) => {
            
            if (resp.error) {
                setTextAlert('Ocurrió un error');
                setTypeAlert('error');
              } else {
                setTextAlert('¡Formulario cargado exitosamente!');
                setTypeAlert('success');

                // lo seteo para que se pueda editar libremente
                // configToFreeEdition(idForm)
                console.log(resp)
                 
              }
        }).catch((resp) => {
            setTextAlert("Ocurrió un error")
            setTypeAlert("error");
        }).finally(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            setShowlert(true);
            setTimeout(() => {
                setShowlert(false);

            }, 7000);
        }
        )
    };

    const handleEdit = () => {
        if (values.firmaDoc === ''  || values.firmaDoc === undefined) {
            delete values.firmaDoc;
        }
        
        editRegistroSimulacro(values, infoPrecargada._id).then((resp) => {
            
            if (resp.error) {
                setTextAlert('Ocurrió un error');
                setTypeAlert('error');
              } else {
                setTextAlert('¡Formulario editado exitosamente!');
                setTypeAlert('success');
                navigate('/formularios-cargados/registrosimulacro');
              }
        }).catch((resp) => {
            setTextAlert("Ocurrió un error")
            setTypeAlert("error");
        }).finally(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            setShowlert(true);
            setTimeout(() => {
                setShowlert(false);

            }, 7000);
        }
        )
    };

    useEffect(() => {
        console.log(currentStatus)
        if (infoPrecargada) { // muestro un form del historial
            setValues({
                razonSocial: infoPrecargada.razonSocial,
                ubicacion: infoPrecargada.ubicacion,
                localidad: infoPrecargada.localidad,
                fecha: infoPrecargada.fecha,
                personas: infoPrecargada.personas,
                firmaDoc: infoPrecargada.firmaDoc,
                idUser: idUser
            })
            setReplicas(infoPrecargada.personas.length)
        } else { // creo un form desde cero
            setValues({
                razonSocial: "",
                ubicacion: "",
                localidad: "",
                fecha: "",
                personas: [
                    {
                        nombreCompleto: "",
                        dni: "",
                    }
                ],
                firmaDoc: "",
                idUser: idUser
            })
        }
    }, [])

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {

            setValues({
                ...values,
                firmaDoc: acceptedFiles[0],
            });
        },
        disabled: !!location.state?.objeto,
    });

    return (
        <>
            {values &&
                <div>
                    <div className="form">
                        <div className="titleContainer">
                            <h3 className="title">Registro de Simulacro</h3>
                        </div>

                        <div className={styles.personalText}>
                            <TextField disabled={currentStatus === 'view'} onChange={(e) => { setValues({ ...values, razonSocial: e.target.value }) }} value={values.razonSocial} fullWidth id="outlined-basic" label="Razón Social/Contrato" variant="outlined" />
                        </div>

                        <div className={styles.personal}>
                            <TextField disabled={currentStatus === 'view'} onChange={(e) => {
                                setValues({ ...values, ubicacion: e.target.value })
                            }} value={values.ubicacion} id="outlined-basic" label="Ubicación" variant="outlined" />
                            <TextField disabled={currentStatus === 'view'} onChange={(e) => { setValues({ ...values, localidad: e.target.value }) }} value={values.localidad} id="outlined-basic" label="Localidad" variant="outlined" />

                            <TextField
                                disabled={currentStatus === 'view'}
                                label="Fecha"
                                variant="outlined"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="fecha"
                                name="fecha"
                                required
                                value={values.fecha}
                                onChange={(e) => { setValues({ ...values, fecha: e.target.value }) }}
                            />
                        </div>

                        <div className="table">
                            <div className="tableSection">
                                {Array(replicas)
                                    .fill(0)
                                    .map((_, index) => (
                                        <div className="tableRow" key={index}>
                                            <p className="index">{index + 1} </p>
                                            {inputs.map((input) => (
                                                <div key={input.id}>
                                                    <TextField
                                                        disabled={currentStatus === 'view'}
                                                        value={(currentStatus === 'view' ? infoPrecargada?.personas[index][input.prop] : values.personas[index][input.prop])}
                                                        onChange={(e) => handleChangePerson(index, input.prop, e.target.value)}
                                                        id={`input-${input.id}-${index}`}
                                                        name={`input-${input.id}-${index}`}
                                                        label={`${input.label}`}
                                                        variant="outlined"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                            {infoPrecargada ? <div></div> : <div className="icon">
                                                {
                                                    (index === 0 || index >= replicas) ?
                                                        <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick} />
                                                        : <IndeterminateCheckboxIcon style={{ color: 'grey' }} onClick={() => { handleClickRemove(index) }} />
                                                }
                                            </div>}
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div className={styles.responsableCont}>
                            <div className={styles.subtitleCont}>
                                <p className={styles.subtitle}>CONTENIDO:</p>
                            </div>

                            <ul>
                                <li>Clase de fuegos.</li>
                                <li>Tipo de Extintores.</li>
                                <li>Manejo de extintores.</li>
                                <li>Sistema de alarma y señal de evacuación.</li>
                                <li>Presentación del plan de emergencias y evacuación.</li>
                                <li>Contenidos –Definiciones –Procedimiento de evacuación.</li>
                                <li>Recomendaciones prácticas y medidas de seguras –vías de evacuación –Roles.</li>
                            </ul>
                        </div>

                        
                        { (currentStatus === 'view' || currentStatus === 'edit') ?
                            <>
                                <div className={styles.border}>
                                    {infoPrecargada?.firmaDoc ?
                                        <h6>
                                            <a href={infoPrecargada?.firmaDoc} target="_blank" rel="noopener noreferrer"> Descargar Archivo</a>
                                        </h6>
                                        :
                                        <h6>No se han cargado documentos.</h6>
                                    }
                                </div>
                                <a href={infoPrecargada?.firmaDoc} target="_blank" rel="noopener noreferrer">
                                    <img src={infoPrecargada?.firmaDoc} alt="planilla" srcSet="" style={{ marginTop: '30px' }} />
                                </a>
                            </>
                            :
                            <>
                                <p>Una vez guardada esta planilla, es necesario imprimirla desde la sección Formularios Cargados para ser firmada por los participantes. Con todas las firmas listas, desde la misma sección de Formularios Cargados, edite esta planilla adjuntando en el siguiente campo el documento firmado.</p>
                                <div className={styles.border} {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {acceptedFiles.length > 0 ? (
                                        <h6>Archivo cargado: {acceptedFiles[0].name}</h6>
                                    ) : (
                                        <h6>Arrastra y suelta o haz clic para adjuntar documento</h6>
                                    )}
                                </div>
                            </>
                        }


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
            }
            {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}
        </>

    )
}

export default RegistroSimulacro;