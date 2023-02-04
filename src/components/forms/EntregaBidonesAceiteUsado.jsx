import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import styles from './EntregaBidonesAceiteUsado.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';


function EntregaBidonesAceiteUsado() {
    const [inputs] = useState([
        { id: 1, label: 'Fecha' },
        { id: 2, label: 'Cantidad de Bidones entregados' },
        { id: 3, label: 'Firma Emisor (ARAMARK)' },
        { id: 4, label: 'Firma Receptor (Cliente)' },
    ]);
    const [replicas, setReplicas] = useState(1);

    const handleClick = () => {
        setReplicas(replicas + 1);
    };

    return (
        <div>
        <div className="form">
            <div className="titleContainer">
                <h3 className="title">Entrega de Bidones de Aceite Usado</h3>
                <h4 className="formNumber">E-02-R02</h4>
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

export default EntregaBidonesAceiteUsado