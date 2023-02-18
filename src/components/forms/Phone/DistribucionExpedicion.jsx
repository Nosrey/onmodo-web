import { Button,  TextField } from '@mui/material'
import React, { useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './DistribucionExpedicion.module.css'

function DistribucionExpedicion() {
    const [inputs] = useState([
        { id: 1, label: 'Servicio' },
        { id: 2, label: 'Preparación' },
        { id: 3, label: 'Hora' },
        { id: 4, label: 'Temp.' },
        { id: 5, label: 'Hora' },
        { id: 6, label: 'Temp.' },
        { id: 7, label: 'Acciones correctivas' },
        { id: 8, label: 'Responsable' },
    ]);
    const [replicas, setReplicas] = useState(1);

    const handleClick = () => {
        setReplicas(replicas + 1);
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Planilla de Distribución/Expedición</h3>
                </div>

                <p>Llegado al punto de distribución los alimentos deben consumirse <b>dentro de las 2 horas de entrega</b> o mantenerse en refrigeración hasta el momento de su regeneración.</p>
                <br />
                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>ALIMENTOS CALIENTES</p>
                </div>
                <p>Las preparaciones calientes deben mantenerse a temperaturas mayores a 65ºC durante el transporte y la recepción.</p>
                
                <br />
                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>ALIMENTOS FRÍOS</p>
                </div>
                <p>Las preparaciones servidas en frio, entradas, postres y ensaladas deben mantenerse a temperaturas inferiores  a 10ºC</p>
                <p>Contratos certificados con IRAM BPM: mantener a menos de 4ºC-Veladero: mantener a menos de 5ºC.</p>



                <br />
                <br />
                <div className={styles.personal}>
                    <TextField id="outlined-basic" label="Fecha" variant="outlined" />
                </div>

                <div className={styles.contTitTabla}>
                    <div className={styles.subtituloTable}>
                        <div>
                            <p style={{textAlign: 'center', fontWeight:'bold'}}>Distribución/Expedición </p>
                        </div>
                        <div className={styles.subtituloTable2}>
                            <p className={styles.subtituloTableText}>Despacho</p>
                            <p className={styles.subtituloTableText}>Recepción</p>
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

export default DistribucionExpedicion