import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from './RegistroSimulacro.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import Alert from '../../shared/components/Alert/Alert';
import IndeterminateCheckboxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { registroSimulacro } from '../../../services/FormsRequest';
import { useLocation } from 'react-router';
import { useDropzone } from 'react-dropzone';

function RegistroSimulacro() {
    //** ALERTA */
    const [textAlert, setTextAlert] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [showAlert, setShowlert] = useState(false);

    const [inputs] = useState([
        { id: 1, label: 'Apellido y Nombre', prop: "nombreCompleto" },
        { id: 2, label: 'Nro DNI',  prop: "dni" },
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
    const handleSubmit = () => {
        registroSimulacro(values).then((resp) => {
            setTextAlert("¡Formulario cargado exitosamente!");
            setTypeAlert("success");
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
    const location = useLocation();
    const infoPrecargada = location.state?.objeto;
    useEffect(() => {
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
            console.log("values", values)
        } else { // creo un form desde cero
            console.log("error")
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
                            <TextField disabled={!!location.state?.objeto} onChange={(e) => { setValues({ ...values, razonSocial: e.target.value }) }} value={values.razonSocial} fullWidth id="outlined-basic" label="Razón Social/Contrato" variant="outlined" />
                        </div>

                        <div className={styles.personal}>
                            <TextField disabled={!!location.state?.objeto} onChange={(e) => { setValues({ ...values, ubicacion: e.target.value }) }} value={values.ubicacion} id="outlined-basic" label="Ubicación" variant="outlined" />
                            <TextField disabled={!!location.state?.objeto} onChange={(e) => { setValues({ ...values, localidad: e.target.value }) }} value={values.localidad} id="outlined-basic" label="Localidad" variant="outlined" />

                            <TextField
                                disabled={!!location.state?.objeto}
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
                                                        disabled={!!location.state?.objeto}
                                                        onChange={(e) => handleChangePerson(index, input.prop, e.target.value)}
                                                        id={`input-${input.id}-${index}`}
                                                        name={`input-${input.id}-${index}`}
                                                        label={`${input.label}`}
                                                        variant="outlined"
                                                        value={values.personas[index]?.[input.prop]}
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


                        <div className={styles.responsableCont}>
                            <div className={styles.subtitleCont}>
                                <p className={styles.subtitle}>Firma de los participantes</p>
                            </div>
                            <p>Una vez guardada esta planilla ,  es necesario imprimirla desde la sección Formularios Cargados para ser firmada por los participantes. Con todas las firmas listas, desde la misma sección de Formularios Cargados, edite esta planilla adjuntando en el siguiente campo el documento firmado. </p>
                            <div className={styles.border} {...getRootProps()}>
                                <input  {...getInputProps()} />
                                {acceptedFiles.length > 0 ? (
                                    <h6>Archivo cargado: {acceptedFiles[0].name}</h6>
                                ) : (
                                    <h6>Arrastra y suelta o haz clic para adjuntar documento</h6>
                                )}
                            </div>
                        </div>

                        <div className="btn">
                            <Button disabled={!!location.state?.objeto} onClick={handleSubmit} variant="contained">Guardar</Button>
                        </div>
                    </div>
                </div>
            }
            {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}
        </>

    )
}

export default RegistroSimulacro;