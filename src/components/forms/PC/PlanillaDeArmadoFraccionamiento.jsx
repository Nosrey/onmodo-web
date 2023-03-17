import { Button, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import styles from './PlanillaDeArmadoFraccionamiento.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import Modal from '../../shared/Modal';

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
    const [showModal, setShowModal] = useState(false);
    const [values,setValues] = useState({
        inputsValues : [{
        }],
        verificado: "",
        fecha: "",
    })
    const [objValues,setObjValues] = useState({fecha:"",producto:"",horaInicio:"",tempInternaInicio:"",horaFinal:"",tempInternaFinal:"",accionesCorreccion:"",responsable:""})
    const [inputValues,setInputValues]= useState([])
    const [trigger,setTrigger] = useState(false)

    useEffect(()=>{
        console.log("QUE PASAAAAA")
        if(replicas === 1 && objValues.fecha !== "" && objValues.producto !== "" && objValues.horaInicio !== "" && objValues.tempInternaInicio !== "" && objValues.horaFinal !== "" && objValues.tempInternaFinal !== "" && objValues.accionesCorreccion !== "" && objValues.responsable !== "" && objValues.id !=="") {
            console.log("entro?")
            setInputValues([objValues])
        }else if (replicas > 1 && objValues.fecha !== "" && objValues.producto !== "" && objValues.horaInicio !== "" && objValues.tempInternaInicio !== "" && objValues.horaFinal !== "" && objValues.tempInternaFinal !== "" && objValues.accionesCorreccion !== "" && objValues.responsable !== "" && objValues.id !=="") {
            console.log("entro2?")
            setInputValues([...inputValues,objValues])
        }
    },[trigger])
    useEffect(()=>{
        setValues({...values,inputsValues:inputValues})
    },[inputValues])
    useEffect(()=>{
        if (objValues.fecha !== "" && objValues.producto !== "" && objValues.horaInicio !== "" && objValues.tempInternaInicio !== "" && objValues.horaFinal !== "" && objValues.tempInternaFinal !== "" && objValues.accionesCorreccion !== "" && objValues.responsable !== ""){
            console.log("asdasdasdasd")
            setTrigger(true)
        }
    },[objValues])

    const inputsValuesConstructor = (id,label,index,inputID) => {
        console.log(typeof inputID, inputID)
        const inputTarget = document.getElementById(id)
        label === 'Fecha' ?  setObjValues({...objValues,fecha:inputTarget.value, id:index}) :
        label === 'Producto' ? setObjValues({...objValues,producto:inputTarget.value}) :
        (label === 'Hora' && inputID === 3) ? setObjValues({...objValues,horaInicio:inputTarget.value}):
        (label === 'Temp. Interna' && inputID === 4) ? setObjValues({...objValues,tempInternaInicio:inputTarget.value}):
        (label === 'Hora' && inputID === 5) ? setObjValues({...objValues,horaFinal:inputTarget.value}):
        (label === 'Temp. Interna' && inputID === 6) ? setObjValues({...objValues,tempInternaFinal:inputTarget.value}):
        label === 'Acciones Correcion' ? setObjValues({...objValues,accionesCorreccion:inputTarget.value}):
        label === 'Responsable' && setObjValues({...objValues,responsable:inputTarget.value})
    }
    console.log(objValues)
    const handleClick = () => {
        setReplicas(replicas + 1);
        setObjValues({fecha:"",producto:"",horaInicio:"",tempInternaInicio:"",horaFinal:"",tempInternaFinal:"",accionesCorreccion:"",responsable:""})
        setTrigger(false)
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Planilla de Armado/Fraccionamiento</h3>
                </div>
                {
                    showModal ? (
                    <Modal
                    content={<><div>
                                    <p className={styles.subtitle}>LÍMITE CRÍTICO</p>
                                    <p>TEMPERATURA INTERNA: Menor a 13ºC</p>
                                </div><div>
                                        <p className={styles.subtitle}>PROCEDIMIENTO</p>
                                        <p>1. Se prepara el primer plato (plato testigo)como muestra de referencia para armar el resto de los platos, teniendo en cuenta gramajes, ingredientes, formas, tamaños, presentación, entre otros.<br />2. Se registra en esta planillala temperatura inicial del alimento del plato testigo y se deja el termómetro colocado en él durante todo el proceso. El uso de porcionadores es mandatorio para la estandarización del producto final y uso racional de la materia prima.<br />3. El primer plato permanece a un lado conel termómetro mientras se continúa con la producción de todo el lote, siguiendo el plato testigo.<br />4. Del plato testigo se monitorea su temperatura, estando correcto el procedimiento si el alimento se encuentra a menos de 13ºC en el centro del alimento.<br />5. Finalizado  el  último  plato,  se  efectúa  la  lectura  del  termómetro  del  plato  testigo  y  se  registra  en esta  planillala  temperatura  final.  El armado de platos no debe superar los 45 minutos de exposición a temperatura ambiente.</p>
                                    </div><div>
                                        <p className={styles.subtitle}>ACCIONES DE CORRECCIÓN</p>
                                        <p>Si la temperatura interna del alimento:<br />-Está entre 13ºC y 15ºC, refrigerar el lote inmediatamente.<br />-Supera los 15ºC, desechar el lote.</p>
                                    </div></>}
                    closeModal={() => setShowModal(false)}
                    />
                
                    )
                    : (
                    <div className='cont-btn'>
                        <Button  size="small" onClick={() => setShowModal(true)}>
                            <i className="ri-information-line" style={{marginRight: "8px", fontSize:"22px"}}></i> Ver Más
                        </Button>
                    </div>
                    )
                }
       
               <br />
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
                                            <TextField onKeyUp={(e)=>{
                                            inputsValuesConstructor(`input-${input.id}-${index}`,input.label, index,input.id);
                                            }} className='input' id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} label={`${input.label}`} variant="outlined" />

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
                    <TextField onChange={(e)=>{setValues({...values,verificado:e.target.value})}} id="outlined-basic" label="Verificado por" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,fecha:e.target.value})}} id="outlined-basic" label="Fecha" variant="outlined" />
                </div>
                <div className="btn">
                    <Button onClick={()=>{
                        console.log(values)}} variant="contained">Generar PDF</Button>
                </div>
                </div>
            <div>

            </div>
        </div>
    )
}

export default PlanillaDeArmadoFraccionamiento