import { Button,  TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './DistribucionExpedicion.module.css'
import Modal from '../../shared/Modal';
import DisrtibucionExp from '../../modales/DisrtibucionExp';
function DistribucionExpedicion() {
    const [inputs] = useState([
        { id: 1, label: 'Servicio' },
        { id: 2, label: 'Preparación' },
        { id: 3, label: 'Hora' },
        { id: 4, label: 'Temp.' },
        { id: 5, label: 'Hora' },
        { id: 6, label: 'Temp.' },
        { id: 7, label: 'Acciones correctivas' },
        { id: 8, label: 'Responsable' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [showModal, setShowModal] = useState(false);

    const [values,setValues] = useState({
        fecha:"",
        inputsValues : [{
        }],
        verificado: "",
        fechaHora: "",
    })
    const [objValues,setObjValues] = useState({servicio:"",preparacion:"",horaDespacho:"",tempDespacho:"",horaRecepcion:"",tempRecepcion:"",accionesCorrectivas:"",responsable:""})
    const [inputValues,setInputValues]= useState([])
    const [trigger,setTrigger] = useState(false)

    useEffect(()=>{
        if(replicas === 1 && objValues.servicio !== "" && objValues.preparacion !== "" && objValues.horaDespacho !== "" && objValues.tempDespacho !== "" && objValues.horaRecepcion !== "" && objValues.tempRecepcion !== "" && objValues.accionesCorrectivas !== "" && objValues.responsable !== "" && objValues.id !=="") {
            setInputValues([objValues])
        }else if (replicas > 1 && objValues.servicio !== "" && objValues.preparacion !== "" && objValues.horaDespacho !== "" && objValues.tempDespacho !== "" && objValues.horaRecepcion !== "" && objValues.tempRecepcion !== "" && objValues.accionesCorrectivas !== "" && objValues.responsable !== "" && objValues.id !=="") {
            setInputValues([...inputValues,objValues])
        }
    },[trigger])
    useEffect(()=>{
        setValues({...values,inputsValues:inputValues})
    },[inputValues])
    useEffect(()=>{
        if (objValues.servicio !== "" && objValues.preparacion !== "" && objValues.horaDespacho !== "" && objValues.tempDespacho !== "" && objValues.horaRecepcion !== "" && objValues.tempRecepcion !== "" && objValues.accionesCorrectivas !== "" && objValues.responsable !== ""){
            setTrigger(true)
        }
    },[objValues])

    const inputsValuesConstructor = (id,label,index,inputID) => {
        const inputTarget = document.getElementById(id)
        label === 'Servicio' ?  setObjValues({...objValues,servicio:inputTarget.value, id:index}) :
        label === 'Preparación' ? setObjValues({...objValues,preparacion:inputTarget.value}):
        (label === 'Hora' && inputID === 3) ? setObjValues({...objValues,horaDespacho:inputTarget.value}) :
        (label === 'Temp.' && inputID === 4) ? setObjValues({...objValues,tempDespacho:inputTarget.value}):
        (label === 'Hora' && inputID === 5) ? setObjValues({...objValues,horaRecepcion:inputTarget.value}) :
        (label === 'Temp.' && inputID === 6) ? setObjValues({...objValues,tempRecepcion:inputTarget.value}):
        label === 'Acciones correctivas' ? setObjValues({...objValues,accionesCorrectivas:inputTarget.value}):
        label === 'Responsable' && setObjValues({...objValues,responsable:inputTarget.value})
    }

    const handleClick = () => {
        setReplicas(replicas + 1);
        setObjValues({servicio:"",preparacion:"",horaDespacho:"",tempDespacho:"",horaRecepcion:"",tempRecepcion:"",accionesCorrectivas:"",responsable:""})
        setTrigger(false)
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Planilla de Distribución/Expedición</h3>
                </div>
                { showModal ? (
                    <Modal
                    content={<DisrtibucionExp/>}
                    closeModal={() => setShowModal(false)}
                    />
                
                    )
                    : (
                    <div className='cont-btn'>
                        <Button  size="small" onClick={() => setShowModal(true)}>
                            <i class="ri-information-line" style={{marginRight: "8px", fontSize:"22px"}}></i> Ver Más
                        </Button>
                    </div>
                    )
                }

                <div className={styles.personal}>
                    <TextField onChange={(e)=>{setValues({...values,fecha:e.target.value})}} id="outlined-basic" label="Fecha" variant="outlined" />
                </div>
                <div className="table">
                    <div className={styles.contTitTabla}>
                        <div className={styles.subtituloTable}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Distribución/Expedición </p>
                            </div>
                            <div className={styles.subtituloTable2}>
                                <p className={styles.subtituloTableText}>Despacho</p>
                                <p className={styles.subtituloTableText}>Recepción</p>
                            </div>
                        </div>
                        
                        <div className={styles.subtituloTableDerecha}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>En caso de desvíos </p>
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
                    <TextField onChange={(e)=>{setValues({...values,fechaHora:e.target.value})}} id="outlined-basic" label="Fecha/hora" variant="outlined" />
                </div>
                <div className="btn">
                    <Button onClick={()=>{
                        console.log(values)}} variant="contained">Generar PDF</Button>
                </div>

            </div>
        </div>
    )
}

export default DistribucionExpedicion