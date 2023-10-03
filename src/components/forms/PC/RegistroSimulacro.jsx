import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from './RegistroSimulacro.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import Alert from '../../shared/components/Alert/Alert';
import { registroSimulacro } from '../../../services/FormsRequest';
import { useLocation } from 'react-router';

function RegistroSimulacro() {
    //** ALERTA */
    const [textAlert, setTextAlert] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [showAlert, setShowlert] = useState(false);

    const [inputs] = useState([
        { id: 1, label: 'Apellido y Nombre' },
        { id: 2, label: 'Nro DNI' },
        { id: 3, label: 'Firma' },
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
                    firma: ""
                }
            ]
        });
    };

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
        registroSimulacro(values).then((resp)=> {
            setTextAlert("¡Formulario cargado exitosamente!");
            setTypeAlert("success");
        }).catch((resp)=> {
            setTextAlert("Ocurrió un error")
            setTypeAlert("error");
        }).finally(()=> {
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
            console.log("infoPrecargada", infoPrecargada)
            console.log("sepudo")
            setValues({
                razonSocial: infoPrecargada.razonSocial,
                ubicacion: infoPrecargada.ubicacion,
                localidad: infoPrecargada.localidad,
                fecha: infoPrecargada.fecha,
                personas: infoPrecargada.personas,
                firmaInstructor: infoPrecargada.firmaInstructor,
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
                        firma: ""
                    }
                ],
                firmaInstructor: "",
                idUser: idUser
            })
        }
    }, [])

    return (
        <>
        {values &&
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Registro de Simulacro</h3>
                </div>

                <div className={styles.personalText}>
                    <TextField  disabled={!!location.state?.objeto} onChange={(e) => { setValues({ ...values, razonSocial: e.target.value }) }} value={values.razonSocial} fullWidth id="outlined-basic" label="Razón Social/Contrato" variant="outlined" />
                </div>

                <div className={styles.personal}>
                    <TextField  disabled={!!location.state?.objeto} onChange={(e) => { setValues({ ...values, ubicacion: e.target.value }) }} value={values.ubicacion}  id="outlined-basic" label="Ubicación" variant="outlined" />
                    <TextField  disabled={!!location.state?.objeto} onChange={(e) => { setValues({ ...values, localidad: e.target.value }) }} value={values.localidad}  id="outlined-basic" label="Localidad" variant="outlined" />
                 
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
                                                onKeyUp={(e) => handleChangePerson(index, input.label, e.target.value)}
                                                id={`input-${input.id}-${index}`}
                                                name={`input-${input.id}-${index}`}
                                                label={`${input.label}`}
                                                variant="outlined"
                                                value= {values.personas[index]?.[input.label] || ''}
                                            />
                                        </div>
                                    ))}
                                    {infoPrecargada? <div></div>: <div className="icon">
                                        <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick} />
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

                <div className={styles.personal}>
                    <TextField disabled={!!location.state?.objeto}  onChange={(e) => { setValues({ ...values, firmaInstructor: e.target.value }) }} value={values.firmaInstructor}  id="outlined-basic" label="Firma del Instructor" variant="outlined" />
                </div>

                <div className="btn">
                    <Button  disabled={!!location.state?.objeto} onClick={handleSubmit} variant="contained">Guardar</Button>
                </div>
            </div>
        </div>
        }
        { showAlert && <Alert type={typeAlert} text={textAlert}></Alert> }
        </>

    )
}

export default RegistroSimulacro;
