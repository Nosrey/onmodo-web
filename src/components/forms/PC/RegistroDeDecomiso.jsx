import { Button,  TextField } from '@mui/material'
import React, { useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './RegistroDeDecomiso.module.css'

function RegistroDeDecomiso() {
    const [inputs] = useState([
        { id: 1, label: 'Fecha' },
        { id: 2, label: 'Turno' },
        { id: 3, label: 'Producto decomisado' },
        { id: 4, label: 'Cantidad' },
        { id: 5, label: 'Desvios de proceso' },
        { id: 6, label: 'Fuera fecha vida util' },
        { id: 7, label: 'Fuera de aptitud' },
        { id: 8, label: 'Recall' },
        { id: 9, label: 'Otras causas' },
        { id: 10, label: 'Destino final' },
        { id: 11, label: 'Responsable' },




    ]);
    const [replicas, setReplicas] = useState(1);

    const handleClick = () => {
        setReplicas(replicas + 1);
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Registros de decomisos de materias primas</h3>
                    <h4 className="formNumber">Q/SOP-03-R02</h4>
                </div>

                <div className={styles.subtituloTable}>
                    <p>Causa de decomiso</p>
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

                <div className="btn">
                    <Button variant="contained">Generar PDF</Button>
                </div>

            </div>
        </div>
    )
}

export default RegistroDeDecomiso