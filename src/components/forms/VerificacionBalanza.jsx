import { Button,  TextField } from '@mui/material'
import React, { useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './VerificacionBalanza.module.css'

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

    const handleClick = () => {
        setReplicas(replicas + 1);
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Verificación de Instrumentos de Medición Balanzas</h3>
                </div>

                <br />
                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>PROCEDIMIENTO</p>
                </div>
                <p>Se tara la balanza y se coloca una masa patrón de 1 kg.(puede utilizarse algún producto envasado-lentejas,   azúcar)   en   cada   uno   de   los   puntos establecidos.</p>
                <p>Para  comedores  certificados,  usar  las  masas  de referencias.</p>
                <br />
                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>DESVÍO PERMITIDO</p>
                </div>
                <p>Balanza de producción:±10 gramos.</p>
                <p>Báscula de recepción:±200 gramos.</p>
                <br />

                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>ACCIONES DE CORRECCIÓN</p>
                </div>
                <p>Si  alguno  de  los  puntos  supera  el  desvío,  la balanza se debe enviar a calibrar.</p>
                <br />

                <b>FRECUENCIA: ANUAL</b>


                <br />
                <br />
                <br />
                <div className={styles.personal}>
                    <TextField id="outlined-basic" label="Fecha" variant="outlined" />
                    <TextField id="outlined-basic" label="Responsable de validación" variant="outlined" />
                    <TextField id="outlined-basic" label="Balanza/Báscula" variant="outlined" />

                </div>

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
                                        <TextField id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} label={`${input.label}`} variant="outlined" />

                                    </div>
                                ))}
                                <div className="icon">
                                    <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick} />
                                </div>
                            </div>
                        ))}

                <span><b>*</b> BP(Balanza de producción) - BR (Balanza de recepción)</span>
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

export default VerificacionBalanza