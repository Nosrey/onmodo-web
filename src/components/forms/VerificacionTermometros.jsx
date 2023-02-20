import { Button,  TextField } from '@mui/material'
import React, { useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './VerificacionTermometros.module.css'
import imageCoccion from "../../assets/img/forms/temometros.png";

function VerificacionTermometros() {
    const [inputs] = useState([
        { id: 1, label: 'Código' },
        { id: 2, label: 'Tipo (PIN/IR)' },
        { id: 3, label: 'Responsable del uso' },
        { id: 4, label: 'Área' },
        { id: 5, label: 'Punto 0' },
        { id: 6, label: 'Desvío' },
        { id: 7, label: 'Punto 100' },
        { id: 8, label: 'Desvío' },
        { id: 9, label: 'Acciones de corrección' },
    ]);

    const [inputs2] = useState([
        { id: 1, label: 'Código' },
        { id: 2, label: 'Área' },
        { id: 3, label: 'Temp. termóm referencia' },
        { id: 4, label: 'Temp. termóm evaluado'  },
        { id: 5, label: 'Desvío' },
        { id: 6, label: 'Acciones de corrección' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [replicas2, setReplicas2] = useState(1);

    const handleClick = () => {
        setReplicas(replicas + 1);
    };
    const handleClick2 = () => {
        setReplicas2(replicas2 + 1);
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Verificación de Instrumentos de Medición: Termometros</h3>
                </div>

                <br />

                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>PROCEDIMIENTO</p>
                </div>

                <br />

                <div className={styles.limites}>
                    <img src={imageCoccion} className={styles.limitesImg} />
                </div>

                <br />
                <br />

                <div className={styles.personal}>
                    <TextField id="outlined-basic" label="Fecha" variant="outlined" />
                    <TextField id="outlined-basic" label="Responsable de validación" variant="outlined" />
                </div>
        
                <br />

                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>TERMÓMETROS DE PINCHE/INFRARROJOS </p>
                </div>

                <b>   FRECUENCIA: TRIMESTRAL</b>

                <div className="table">
                    <div className={styles.contTitTabla}>
                        <div className={styles.subtituloTable}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Identificación Termómetro  </p>
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

<span><b>*</b> PIN(Termómetro de pinche) - IR (Termómetro infrarrojo)</span>
<br />
                <br />
                <br />
                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>TERMÓMETROS DE CÁMARAS, ANTECAMARAS, HELADERAS Y FREEZER </p>
                </div>

                <b>   FRECUENCIA: SEMESTRAL</b>
          

                <div className="table">
                    <div className={styles.contTitTabla2}>
                        <div className={styles.subtituloTable2}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Identificación Termómetro  </p>
                            </div>
                        </div>
                    </div>
                
                    <div className="tableSection">
                        {Array(replicas2)
                            .fill(0)
                            .map((_, index) => (
                                <div className="tableRow" key={index}>
                                    <p className="index">{index + 1} </p>

                                    {inputs2.map((input) => (
                                        <div key={input.id}>
                                            <TextField  id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} label={`${input.label}`} variant="outlined" />

                                        </div>
                                    ))}
                                    <div className="icon">
                                        <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick2} />
                                    </div>
                                </div>
                            ))}

                    </div>
                </div>
                

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

export default VerificacionTermometros