import { Button,  TextField } from '@mui/material'
import React, { useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './ControlProcesos.module.css'
import imageCoccion from "../../../assets/img/forms/coccion.png";
import imageEnfriamiento from "../../../assets/img/forms/enfriamiento.png";
import imageRegeneracion from "../../../assets/img/forms/regeneracion.png";

function ControlProcesos() {
    const [inputs] = useState([
        { id: 1, label: 'Alimento' },
        { id: 2, label: 'Fecha / Hora' },
        { id: 3, label: 'Temp.' },
        { id: 4, label: 'Hora' },
        { id: 5, label: 'Temp.' },
        { id: 6, label: 'Temp.' },
        { id: 7, label: 'Temp.' },
        { id: 8, label: 'Temp.' },
        { id: 9, label: 'Fecha / Hora' },
        { id: 10, label: 'Temp.' },
        { id: 11, label: 'Temp.' },
        { id: 12, label: 'Temp.' },
        { id: 13, label: 'Temp.' },
        { id: 14, label: 'Acciones Correción' },
        { id: 15, label: 'Responsable' },
    ]);
    const [replicas, setReplicas] = useState(1);

    const handleClick = () => {
        setReplicas(replicas + 1);
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Planilla de Control de Procesos</h3>
                </div>

                <div className={styles.limites}>
                    <img src={imageCoccion} className={styles.limitesImg} />
                    <img src={imageEnfriamiento}  className={styles.limitesImg} />
                </div>
                <br />
                <div className={styles.limites}>
                    <img src={imageRegeneracion} className={styles.limitesImg} />
                </div>

                <div className="table">
                    <div className={styles.contTitTabla}>
                         <div className={styles.subtituloTableDoble}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Cocción </p>
                            </div>
                            <div className={styles.subtituloTable2}>
                                <p className={styles.subtituloTableTextDoble}>Final</p>
                            </div>
                        </div>

                        <div className={styles.subtituloTableCuadruple}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Enfriamiento</p>
                            </div>
                            <div className={styles.subtituloTable2}>
                                <p className={styles.subtituloTableTextDoble}>Inicio</p>
                                <p className={styles.subtituloTableText}>2 hs.</p>
                                <p className={styles.subtituloTableText}>4 hs.</p>
                                <p className={styles.subtituloTableText}>6 hs.</p>
                            </div>
                        </div>

                        <div className={styles.subtituloTableDoble}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Regeneración </p>
                            </div>
                            <div className={styles.subtituloTable2}>
                                <p className={styles.subtituloTableTextDoble}>Final</p>
                            </div>
                        </div>
                        
                        <div className={styles.subtituloTableTriple}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Mantenimiento en caliente </p>
                            </div>
                            <div className={styles.subtituloTable2}>
                                 <p className={styles.subtituloTableText}>Inicio</p>
                                <p className={styles.subtituloTableText}>1 hs.</p>
                                <p className={styles.subtituloTableText}>2 hs.</p>
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
                                            <TextField className='input' id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} label={`${input.label}`} variant="outlined" />

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

export default ControlProcesos