import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import styles from './DespachoProduccion.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';

function DespachoProduccion() {
    const [inputs] = useState([
        { id: 1, label: 'Producto' },
        { id: 2, label: 'Cantidad Planificad' },
        { id: 3, label: 'Cantidad Real' },
        { id: 4, label: 'Proveedor' },
        { id: 5, label: 'Lote' },
    ]);
    const [replicas, setReplicas] = useState(1);

    const handleClick = () => {
        setReplicas(replicas + 1);
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Planilla de Despacho a Producción</h3>
                    <h4 className="formNumber">Q/SOP-12-R01</h4>
                </div>

                <p>Los productos que deben registrarse en la siguiente planilla son:</p>
                <ul>
                    <li>Carnes vacunas</li>
                    <li>Pollo</li>
                    <li>Pescado</li>
                    <li>Cerdo</li>
                    <li>Huevo pasteurizado (líquido, barra, salmuera)</li>
                </ul>

                <p className={styles.frecuencia}>Frecuencia: Diaria</p>
              


                <div className={styles.personal}>
                    <TextField id="outlined-basic" label="Fecha" variant="outlined" />
                </div>
                
                <div className="table">
                <div className="tableSection">
                    {Array(replicas)
                        .fill(0)
                        .map((_, index) => (
                            <div className="tableRow" key={index}>
                                <p className="index">{index + 1} </p>

                                {inputs.map((input) => (
                                    <div key={input.id}>
                                        <TextField className='' id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} label={`${input.label}`} variant="outlined" />

                                    </div>
                                ))}
                                <div className="icon">
                                    <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick} />
                                </div>
                            </div>
                        ))}

                </div>
                </div>
              
                
                <div className="btn">
                    <Button variant="contained">Generar PDF</Button>

                </div>

            </div>
        </div>
    )
}

export default DespachoProduccion