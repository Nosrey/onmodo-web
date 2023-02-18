import { Button,  TextField } from '@mui/material'
import React, { useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './ServiciosEnLinea.module.css'

function ServiciosEnLinea() {
    const [inputs] = useState([
        { id: 1, label: 'Servicio' },
        { id: 2, label: 'Preparación' },
        { id: 3, label: 'Hora' },
        { id: 4, label: 'Temp.' },
        { id: 5, label: 'Hora' },
        { id: 6, label: 'Temp.' },
        { id: 7, label: 'Hora' },
        { id: 8, label: 'Temp.' },
        { id: 9, label: 'Acciones correctivas' },
        { id: 10, label: 'Responsable' },
    ]);
    const [replicas, setReplicas] = useState(1);

    const handleClick = () => {
        setReplicas(replicas + 1);
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Planilla de Servicio en Línea </h3>
                    {/* <h4 className="formNumber">Q/SOP-03-R02</h4> */}
                </div>


                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>SERVICIO LÍNEA CALIENTE</p>
                </div>
                <p>Las preparaciones calientes deben mantenerse a temperaturas mayores a 65ºC, por un tiempo máximo de 2 horas.</p>
                <p>Los productos sobrantes deberán ser eliminados si fueron presentados en la línea.</p>
                
                <br />
                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>SERVICIO LÍNEA FRIA</p>
                </div>
                <p>Las preparaciones servidas en frio, entradas, postres y ensaladas deben mantenerse a temperaturas inferiores a 10ºCpor un máximo de 2 horas.</p>
                <p>Los productos sobrantes deberán ser eliminados si fueron presentados en la línea.</p>

                <p>Contratos certificados con IRAM BPM: mantener a menos de 4ºC.</p>


                <br />
                <br />
                <div className={styles.personal}>
                    <TextField id="outlined-basic" label="Fecha" variant="outlined" />
                </div>

                <div className={styles.contTitTabla}>
                    <div className={styles.subtituloTable}>
                        <div>
                            <p style={{textAlign: 'center', fontWeight:'bold'}}>Monitoreo del servicio </p>
                        </div>
                        <div className={styles.subtituloTable2}>
                            <p className={styles.subtituloTableText}>Inicio del servicio</p>
                            <p className={styles.subtituloTableText}>Mantenimiento 1</p>
                            <p className={styles.subtituloTableText}>Mantenimiento 2</p>
                        </div>
                    </div>
                    
                    <div className={styles.subtituloTableDerecha}>
                        <div>
                            <p style={{textAlign: 'center', fontWeight:'bold'}}>En caso de desvíos </p>
                        </div>
                    </div>
                </div>
             
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
                <div className={styles.personal}>
                    <TextField id="outlined-basic" label="Verificado por" variant="outlined" />
                    <TextField id="outlined-basic" label="Fecha/hora" variant="outlined" />
                </div>
                <div className="btn">
                    <Button variant="contained">Generar PDF</Button>
                </div>

            </div>
        </div>
    )
}

export default ServiciosEnLinea