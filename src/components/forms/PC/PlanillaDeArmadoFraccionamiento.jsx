import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import styles from './PlanillaDeArmadoFraccionamiento.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';

function PlanillaDeArmadoFraccionamiento() {

    const [inputs] = useState([
        { id: 1, label: 'Fecha' },
        { id: 2, label: 'Producto' },
        { id: 3, label: 'Hora' },
        { id: 4, label: 'Temp. Interna' },
        { id: 5, label: 'Hora' },
        { id: 6, label: 'Temp. Interna' },
        { id: 7, label: 'Acciones Correcion' },
        { id: 8, label: 'Responsable' },

    ]);
    const [replicas, setReplicas] = useState(1);

    const handleClick = () => {
        setReplicas(replicas + 1);
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Planilla de Armado/Fraccionamiento</h3>
                    {/* <h4 className="formNumber"> Q/CCP-06-R01</h4> */}
                </div>
                <div>
                    <p className={styles.subtitle}>LÍMITE CRÍTICO</p>
                    <p>TEMPERATURA INTERNA: Menor a 13ºC</p>
                </div>
                <div>
                    <p className={styles.subtitle}>PROCEDIMIENTO</p>
                    <p>1. Se prepara el primer plato (plato testigo)como muestra de referencia para armar el resto de los platos, teniendo en cuenta gramajes, ingredientes, formas, tamaños, presentación, entre otros.<br/>2. Se registra en esta planillala temperatura inicial del alimento del plato testigo y se deja el termómetro colocado en él durante todo el proceso. El uso de porcionadores es mandatorio para la estandarización del producto final y uso racional de la materia prima.<br/>3. El primer plato permanece a un lado conel termómetro mientras se continúa con la producción de todo el lote, siguiendo el plato testigo.<br/>4. Del plato testigo se monitorea su temperatura, estando correcto el procedimiento si el alimento se encuentra a menos de 13ºC en el centro del alimento.<br/>5. Finalizado  el  último  plato,  se  efectúa  la  lectura  del  termómetro  del  plato  testigo  y  se  registra  en esta  planillala  temperatura  final.  El armado de platos no debe superar los 45 minutos de exposición a temperatura ambiente.</p>
                </div>
                <div>
                    <p className={styles.subtitle}>ACCIONES DE CORRECCIÓN</p>
                    <p>Si la temperatura interna del alimento:<br/>-Está entre 13ºC y 15ºC, refrigerar el lote inmediatamente.<br/>-Supera los 15ºC, desechar el lote.</p>
                </div>
                <div className="table">
                    <div className={styles.contTitTabla}>

                        <div className={styles.subtituloTableCuadruple}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>PROCESO DE ARMADO/FRACCIONAMIENTO</p>
                            </div>
                            <div className={styles.subtituloTable2}>
                                <p className={styles.subtituloTableTextDoble}>INICIO</p>
                                <p className={styles.subtituloTableTextDoble}>FINAL</p>
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
                    <TextField id="outlined-basic" label="Fecha" variant="outlined" />
                </div>
                <div className="btn">
                    <Button variant="contained">Generar PDF</Button>
                </div>
                </div>
            <div>

            </div>
        </div>
    )
}

export default PlanillaDeArmadoFraccionamiento