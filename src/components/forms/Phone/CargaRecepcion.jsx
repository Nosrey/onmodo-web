import { Button,  TextField } from '@mui/material'
import React, { useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './CargaRecepcion.module.css'
import Modal from '../../shared/Modal';
import CargaInfo from '../../modales/CargaInfo';

function CargaRecepcion() {
    const [inputs] = useState([
        { id: 1, label: 'Carga' },
        { id: 2, label: 'Recepción' },
        { id: 3, label: 'Proveedor' },
        { id: 4, label: 'Producto' },
        { id: 5, label: 'Comprada' },
        { id: 6, label: 'Recibida' },
        { id: 7, label: 'Carga' },
        { id: 8, label: 'Recepción' },
        { id: 9, label: 'Carga' },
        { id: 10, label: 'Recepción' },
        { id: 11, label: 'Dentro de vida útil' },
        { id: 12, label: 'Nro. lote' },
        { id: 13, label: 'Fecha vto.' },
        { id: 14, label: 'Recibido' },
        { id: 15, label: 'Motivo del rechazo' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setReplicas(replicas + 1);
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Carga/ Recepción</h3>
                </div>
                { showModal ? (
                    <Modal
                    content={<CargaInfo/>}
                    closeModal={() => setShowModal(false)}
                    />
                
                    )
                    : (
                    <div className='cont-btn'>
                        <Button  size="small" onClick={() => setShowModal(true)}>
                            <i class="ri-information-line" style={{marginRight: "8px", fontSize:"22px"}}></i> Ver Más
                        </Button>
                    </div>
                    )
                }

                <div className="table">
                    <div className={styles.contTitTabla}>
                         <div className={styles.subtituloTableDoble}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Fecha </p>
                            </div>
                        </div>
                        <div className={styles.subtituloTableEspacio}>
                            <div>
                            </div>
                        </div>

                      
                        <div className={styles.subtituloTableDoble}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Cantidad (Kg-Un) </p>
                            </div>
                        </div>
                        <div className={styles.subtituloTableDoble}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Temperatura Alimento (ºC)</p>
                            </div>
                        </div>
                        <div className={styles.subtituloTableDoble}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Temperatura Caja Camión (ºC) </p>
                            </div>
                        </div>
      
                        <div className={styles.subtituloTableTriple}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Rotulación </p>
                            </div>
                        </div>

                        <div className={styles.subtituloTableDoble}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Acciones de corrección tomadas </p>
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

export default CargaRecepcion