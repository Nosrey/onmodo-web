import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import styles from './AlergenosComida.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';


function AlergenosComida() {
    const [inputs] = useState([
        { id: 1, label: 'Fecha' },
        { id: 2, label: 'Nombre Comensal' },
        { id: 3, label: 'Preparación' },
        { id: 4, label: 'Listado de ingredientes' },
        { id: 5, label: 'Responsable' },
    ]);
    const [replicas, setReplicas] = useState(1);

    const handleClick = () => {
        setReplicas(replicas + 1);
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Control de Alérgenos en las Comidas</h3>
                    <h4 className="formNumber">Q/SOP-10-R02</h4>
                </div>
                <div className={styles.personal}>
                    <TextField fullWidth id="outlined-basic" label="Comedor" variant="outlined" />
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
                    <TextField id="outlined-basic" label="Fecha" variant="outlined" />
                </div>
                <div className="btn">
                    <Button variant="contained">Generar PDF</Button>
                </div>

            </div>
        </div>
    )
}

export default AlergenosComida