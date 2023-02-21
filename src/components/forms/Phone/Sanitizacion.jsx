import { Button,  TextField } from '@mui/material'
import React, { useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './Sanitizacion.module.css'
import imageProcedimientos from "../../../assets/img/forms/procedimiento.png";
import imageCorreccion from "../../../assets/img/forms/correccionSanitizacion.png";
import imageLimite from "../../../assets/img/forms/critico.png";

function Sanitizacion() {
    const [inputs] = useState([
        { id: 1, label: 'Fecha' },
        { id: 2, label: 'Vegetal a desinfecta' },
        { id: 3, label: 'SI/NO' },
        { id: 4, label: '<50' },
        { id: 5, label: '100' },
        { id: 6, label: '200' },
        { id: 7, label: '300' },
        { id: 8, label: '>400' },
        { id: 9, label: 'Minutos' },
        { id: 10, label: 'Acciones de corrección' },
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
                    <h3 className="title">Planilla de Sanitización </h3>
                </div>
                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>PROCEDIMIENTO</p>
                </div>
                <ol>
                    <li>Seleccionar las unidades/hojas que no cuenten con características organolépticas acordes alproducto.</li>
                    <li>Lavado inicial: sumergir y remover los productos en una bacha con agua potable durante 5 minutos (Paso esencial para disminuir carga orgánica).</li>
                    <li>Sanitización: Colocar los vegetales/frutas previamente lavados en solución clorada durante 10 minutosde exposiciónpara vegetales.Recambiar la solución clorada en cada operación.</li>
                    <li>Enjuague final: todos los vegetales y frutas deben ser enjuagados durante 5 minutos.</li>
                    <li>Acondicionamiento post-sanitización:se deben disponer en recipientes limpios (canastos o bolsas cristal), rotulados y protegidos. Los vegetales,una vez sanitizados, deben ser tratados como alimentos listos para consumo, refrigerados <b> a menos de 5ºC</b>(4ºC para contratos certificados con IRAM BPM)y con vida útil <b>máxima de 24 horas</b>. </li>
                    <li>Deben registrarse en esta planilla2 vegetales por turno:el primer producto que se sanitiza, previo a su control con tiras reactivas de cloroy otro al azar seleccionado en el turno.</li>
                </ol>
                <br />
                <div className={styles.limites}>
                    <img src={imageLimite} className={styles.limitesImg} />
                </div>
                <br />
                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>ACCIONES DE CORRECCIÓN</p>
                </div>

                <p>Verificar   el   correcto   funcionamiento   de   equipos   dosificadores   con   el proveedor.</p>
                <p>Si la concentración es mayor, diluir con agua potable hasta llegar a la concentración deseada.</p>
                <p>Si la concentración es menor, dosificar manualmente con un medidor establecido en relación al volumen de la bacha.</p>
                <ul>
                    <li>Para XY12, 1ml/ lt de agua.</li>
                </ul>

                <div className="table">
                    <div className={styles.contTitTabla}>
                         <div className={styles.subtituloTable}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>LAVADO INICIAL</p>
                            </div>
                        </div>

                        <div className={styles.subtituloTableSextuple}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>DESINFECCIÓN </p>
                            </div>
                            <div className={styles.subtituloTable2}>
                                <p className={styles.subtituloTableTextCuadruple}>Concentración</p>
                                <p className={styles.subtituloTableText}>Tiemp. inmersión</p>
                            </div>
                        </div>
                        <div className={styles.subtituloTable}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>ENJUAGUE FINAL</p>
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
                    <TextField id="outlined-basic" label="Responsable" variant="outlined" />
                    <TextField id="outlined-basic" label="Fecha/hora" variant="outlined" />
                </div>
                <div className="btn">
                    <Button variant="contained">Generar PDF</Button>
                </div>

            </div>
        </div>
    )
}

export default Sanitizacion