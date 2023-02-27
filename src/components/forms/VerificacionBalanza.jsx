import { Button,  TextField } from '@mui/material'
import React, { useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './VerificacionBalanza.module.css'
import Modal from '../shared/Modal';
import Balanzas from '../modales/Balanzas';

function VerificacionBalanza() {
    const [inputs] = useState([
        { id: 1, label: 'Código' },
        { id: 2, label: 'Tipo (BP/BR)' },
        { id: 3, label: 'Responsable del uso' },
        { id: 4, label: 'Área' },
        { id: 5, label: 'Peso Masa ref/Pto balanza' },
        { id: 6, label: 'Peso real' },
        { id: 7, label: 'Desvío' },
        { id: 8, label: 'Acciones de corrección' },
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
                    <h3 className="title">Verificación de Instrumentos de Medición: Balanzas</h3>
                </div>
                { showModal ? (
                    <Modal
                    content={<Balanzas/>}
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
                <div className={styles.personal}>
                    <TextField id="outlined-basic" label="Fecha" variant="outlined" />
                    <TextField id="outlined-basic" label="Responsable de validación" variant="outlined" />
                    <TextField id="outlined-basic" label="Balanza/Báscula" variant="outlined" />

                </div>

                <div className="table">
                    <div className={styles.contTitTabla}>
                        <div className={styles.subtituloTable}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Identificación Balanza </p>
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
                <span><b>*</b> BP(Balanza de producción) - BR (Balanza de recepción)</span>
                <br />
                <br />
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

export default VerificacionBalanza