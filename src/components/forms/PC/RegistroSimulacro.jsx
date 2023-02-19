import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import styles from './RegistroSimulacro.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';

function RegistroSimulacro() {
    const [inputs] = useState([
        { id: 1, label: 'Apellido y Nombre' },
        { id: 2, label: 'Nro DNI' },
        { id: 3, label: 'Firma' },
    ]);
    const [replicas, setReplicas] = useState(1);


    const handleClick = () => {
        setReplicas(replicas + 1);
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Registro de Simulacro</h3>
                    <h4 className="formNumber"> HS-02-R01</h4>
                </div>

                <div className={styles.personal}>
                    <p>Curso: Manejo Extintores –Plan Emergencia y Evacuación –Simulacro Evacuación“Según Ley 1346/04” –Sistema de alarma y señal de evacuación.</p>
                </div>
                <div className={styles.personalText}>
                    <TextField fullWidth id="outlined-basic" label="Razón Social" variant="outlined" />
                </div>

                <div className={styles.personal}>
                    <TextField id="outlined-basic" label="Ubicación" variant="outlined" />
                    <TextField id="outlined-basic" label="Localidad" variant="outlined" />
                    <TextField id="outlined-basic" label="Fecha:" variant="outlined" />
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
                                            <TextField id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} label={`${input.label}`} variant="outlined" />

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
                    <TextField  id="outlined-basic" label="Firma del Instructor" variant="outlined" />
                </div>
                <div className="btn">
                    <Button variant="contained">Generar PDF</Button>

                </div>

            </div>
        </div>
    )
}

export default RegistroSimulacro