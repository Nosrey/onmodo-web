import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import styles from './RegistroSimulacro.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from 'axios';

function RegistroSimulacro() {
    const [inputs] = useState([
        { id: 1, label: 'Apellido y Nombre' },
        { id: 2, label: 'Nro DNI' },
        { id: 3, label: 'Firma' },
    ]);
    var idUser = localStorage.getItem("idUser");
    const [replicas, setReplicas] = useState(1);
    const [values, setValues] = useState({
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
    });

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

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Registro de Simulacro</h3>
                </div>

                <div className={styles.personalText}>
                    <TextField onChange={(e) => { setValues({ ...values, razonSocial: e.target.value }) }} fullWidth id="outlined-basic" label="Razón Social" variant="outlined" />
                </div>

                <div className={styles.personal}>
                    <TextField onChange={(e) => { setValues({ ...values, ubicacion: e.target.value }) }} id="outlined-basic" label="Ubicación" variant="outlined" />
                    <TextField onChange={(e) => { setValues({ ...values, localidad: e.target.value }) }} id="outlined-basic" label="Localidad" variant="outlined" />
                    <input
                        onChange={(e) => { setValues({ ...values, fecha: e.target.value }) }}
                        type="date"
                        id="fecha"
                        name="fecha"
                        required
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
                                                onKeyUp={(e) => handleChangePerson(index, input.label, e.target.value)}
                                                id={`input-${input.id}-${index}`}
                                                name={`input-${input.id}-${index}`}
                                                label={`${input.label}`}
                                                variant="outlined"
                                            />
                                        </div>
                                    ))}
                                    <div className="icon">
                                        <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick} />
                                    </div>
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
                        <p className={styles.subtitle}>OBSERVACIONES:</p>
                    </div>

                    <ul>
                        <li>Se entrega material didáctico.</li>
                    </ul>
                </div>

                <div className={styles.personal}>
                    <TextField onChange={(e) => { setValues({ ...values, firmaInstructor: e.target.value }) }} id="outlined-basic" label="Firma del Instructor" variant="outlined" />
                </div>

                <div className="btn">
                    <Button onClick={async () => {
                        console.log(values);
                        await axios.post('https://api.onmodoapp.com/api/registrosimulacro', values);
                    }} variant="contained">Guardar</Button>
                </div>
            </div>
        </div>
    )
}

export default RegistroSimulacro;
