import { Button,  TextField } from '@mui/material'
import React, { useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './Sanitizacion.module.css'
import Modal from '../../shared/Modal';
import SanitizacionInfo from '../../modales/SanitizacionInfo';

function Sanitizacion() {
    const [inputs] = useState([
        { id: 1, label: 'Fecha' },
        { id: 2, label: 'Vegetal a desinfecta' },
        { id: 3, label: 'SI/NO' },
        { id: 4, label: '<50' },
        { id: 5, label: '100' },
        { id: 6, label: '200' },
        { id: 7, label: '300' },
        { id: 8, label: '>400' },
        { id: 9, label: 'Minutos' },
        { id: 10, label: 'Acciones de corrección' },
        { id: 11, label: 'Responsable' },
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
                    <h3 className="title">Planilla de Sanitización </h3>
                </div>
                { showModal ? (
                    <Modal
                    content={<SanitizacionInfo/>}
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
                         <div className={styles.subtituloTable}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>LAVADO INICIAL</p>
                            </div>
                        </div>

                        <div className={styles.subtituloTableSextuple}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>DESINFECCIÓN </p>
                            </div>
                            <div className={styles.subtituloTable2}>
                                <p className={styles.subtituloTableTextCuadruple}>Concentración</p>
                                <p className={styles.subtituloTableText}>Tiemp. inmersión</p>
                            </div>
                        </div>
                        <div className={styles.subtituloTable}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>ENJUAGUE FINAL</p>
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
                    <TextField id="outlined-basic" label="Responsable" variant="outlined" />
                    <TextField id="outlined-basic" label="Fecha/hora" variant="outlined" />
                </div>
                <div className="btn">
                    <Button variant="contained">Generar PDF</Button>
                </div>

            </div>
        </div>
    )
}

export default Sanitizacion