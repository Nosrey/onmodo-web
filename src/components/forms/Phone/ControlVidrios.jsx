import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import styles from './ControlVidrios.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';


function ControlVidrios() {
    const [inputs1] = useState([
        { id: 1, label: 'Fecha de Recepción' },
        { id: 2, label: 'Proveedor' },
        { id: 3, label: 'Alimento contenido en vidrio' },
        { id: 4, label: 'Responsable de control' },
    ]);
    const [replicas1, setReplicas1] = useState(1);

    const handleClick1 = () => {
        setReplicas1(replicas1 + 1);
    };

    const [inputs2] = useState([
        { id: 1, label: 'Fecha' },
        { id: 2, label: 'Envase de vidrio roto' },
        { id: 3, label: 'Acción correctiva sobre el alimento potencialmente contaminado' },
        { id: 4, label: 'Responsable' },
    ]);
    const [replicas2, setReplicas2] = useState(1);

    const handleClick2 = () => {
        setReplicas2(replicas2 + 1);
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Control de Vidrios</h3>
                    {/* <h4 className="formNumber">Q/SOP-02-R01</h4> */}
                </div>

                <p>Registro de envases de vidrio y roturas</p>


                <div className="table">
                <div className="tableSection">
                    {Array(replicas1)
                        .fill(0)
                        .map((_, index) => (
                            <div className="tableRow" key={index}>
                                <p className="index">{index + 1} </p>

                                {inputs1.map((input) => (
                                    <div key={input.id}>
                                        <TextField id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} label={`${input.label}`} variant="outlined" />

                                    </div>
                                ))}
                                <div className="icon">
                                    <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick1} />
                                </div>
                            </div>
                        ))}

                </div>
                </div>
                
                <div className="table">
                <div className="tableSection">
                    {Array(replicas2)
                        .fill(0)
                        .map((_, index) => (
                            <div className="tableRow" key={index}>
                                <p className="index">{index + 1} </p>

                                {inputs2.map((input) => (
                                    <div key={input.id}>
                                        <TextField id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} label={`${input.label}`} variant="outlined" />

                                    </div>
                                ))}
                                <div className="icon">
                                    <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick2} />
                                </div>
                            </div>
                        ))}

                </div>
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

export default ControlVidrios