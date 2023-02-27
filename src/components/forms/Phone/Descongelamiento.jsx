import { Button,  TextField } from '@mui/material'
import React, { useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './Descongelamiento.module.css'
import imageCrudos from "../../../assets/img/forms/crudos.png";
import imageCrudosCocidos from "../../../assets/img/forms/crudoscocidos.png";
import imageMicroondas from "../../../assets/img/forms/micro.png";
import imageLimite from "../../../assets/img/forms/interna.png";
import imageAcciones from "../../../assets/img/forms/correccion.png";

function Descongelamiento() {
    const [inputs] = useState([
        { id: 1, label: 'Fecha' },
        { id: 2, label: 'Alimento' },
        { id: 3, label: 'Nro. lote' },
        { id: 4, label: 'Método* (C/A/M)' },
        { id: 5, label: 'Fecha/ Hora' },
        { id: 6, label: 'Temp' },
        { id: 7, label: 'Fecha/ Hora' },
        { id: 8, label: 'Temp' },
        { id: 9, label: 'Fecha/ Hora' },
        { id: 10, label: 'Temp' },
        { id: 11, label: 'Fecha/ Hora' },
        { id: 12, label: 'Temp' },
        { id: 13, label: 'Acciones de correción' },
        { id: 14, label: 'Responsable' },
    ]);
    const [replicas, setReplicas] = useState(1);

    const handleClick = () => {
        setReplicas(replicas + 1);
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Descongelamiento</h3>
                </div>

                <br />
                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>PROCEDIMIENTO</p>
                </div>
                <div className={styles.limites}>
                    <img src={imageCrudosCocidos} className={styles.limitesImg} />
                    <img src={imageCrudos}  className={styles.limitesImg} />
                    <img src={imageMicroondas} className={styles.limitesImg} />
                </div>
                <br />
                <br />
                <div className={styles.limites}>
                    <img src={imageLimite} className={styles.limitesImg} />
                    <img src={imageAcciones}  className={styles.limitesImg} />
                </div>
                <br />
                <br />
                <div className="table">
                    <div className={styles.contTitTabla}>
                        <div className={styles.subtituloTable}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Inicio</p>
                            </div>
                        </div>
                        <div className={styles.subtituloTable}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Monitoreo 1</p>
                            </div>
                        </div>
                        <div className={styles.subtituloTable}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Monitoreo 2</p>
                            </div>
                        </div>
                        <div className={styles.subtituloTable}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Final</p>
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
                                            <TextField  className="input" id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} label={`${input.label}`} variant="outlined" />

                                        </div>
                                    ))}
                                    <div className="icon">
                                        <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick} />
                                    </div>
                                </div>
                            ))}

                    </div>
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

export default Descongelamiento