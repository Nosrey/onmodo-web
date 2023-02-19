import { Button,  TextField } from '@mui/material'
import React, { useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './Recepcion.module.css'
import imageTemp from "../../../assets/img/forms/temperatura.png";
import imageAd from "../../../assets/img/forms/adherencia.png";
import imageProcedim from "../../../assets/img/forms/procedim.png";

function Recepcion() {
    const [inputs] = useState([
        { id: 1, label: 'Fecha' },
        { id: 2, label: 'Proveedor' },
        { id: 3, label: 'Producto' },
        { id: 4, label: 'Comprada' },
        { id: 5, label: 'Recibida' },
        { id: 6, label: 'Alimento' },
        { id: 7, label: 'Caja camión' },
        { id: 8, label: 'Dentro de vida útil' },
        { id: 9, label: 'Nro. lote' },
        { id: 10, label: 'Fecha Vto.' },
        { id: 11, label: 'Recibido' },
        { id: 12, label: 'Motivo del rechazo' },
    ]);
    const [replicas, setReplicas] = useState(1);

    const handleClick = () => {
        setReplicas(replicas + 1);
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Recepción</h3>
                </div>

                <br />
                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>LÍMITES CRÍTICOS PARA EL INGRESO DE MERCADERÍAS</p>
                </div>
                <div className={styles.limites}>
                    <img src={imageTemp} className={styles.limitesImg} />
                    <img src={imageAd}  className={styles.limitesImg} />
                </div>
                <br />
                <div className={styles.limites}>
                    <img src={imageProcedim} className={styles.limitesImg} />
                </div>
                <br />
                <br />
                <br />
                <div className="table">
                <div className={styles.contTitTabla}>
                    <div className={styles.subtituloTable}>
                        <div>
                            <p style={{textAlign: 'center', fontWeight:'bold'}}>Cantidad (Kg-Un) </p>
                        </div>
                    </div>
                    <div className={styles.subtituloTable}>
                        <div>
                            <p style={{textAlign: 'center', fontWeight:'bold'}}>Temperatura (ºC) </p>
                        </div>
                    </div>
                    <div className={styles.subtituloTable2}>
                        <div>
                            <p style={{textAlign: 'center', fontWeight:'bold'}}>Rotulación</p>
                        </div>
                    </div>
                    <div className={styles.subtituloTable3}>
                        <div>
                            <p style={{textAlign: 'center', fontWeight:'bold'}}>Acciones de corrección tomadas</p>
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
                    <TextField id="outlined-basic" label="Fecha/hora" variant="outlined" />
                </div>
                <div className="btn">
                    <Button variant="contained">Generar PDF</Button>
                </div>

            </div>
        </div>
    )
}

export default Recepcion