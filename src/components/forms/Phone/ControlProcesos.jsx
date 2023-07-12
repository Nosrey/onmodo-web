import { Button,  TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './ControlProcesos.module.css'
import Modal from '../../shared/Modal';
import ProcesosInfo from '../../modales/Proceso';
import { useSelector,useDispatch } from 'react-redux';
import controlProcesosActions from '../../../redux/actions/controlProcesosActions';

function ControlProcesos() {
    const dispatch = useDispatch()
    const prueba = useSelector(state=>state.controlProcesosR.inputsValues)
    console.log("holi", prueba)
    const [inputs] = useState([
        { id: 1, label: 'Alimento' },
        { id: 2, label: 'Fecha / Hora' },
        { id: 3, label: 'Temp.' },
        { id: 4, label: 'Hora' },
        { id: 5, label: 'Temp.' },
        { id: 6, label: 'Temp.' },
        { id: 7, label: 'Temp.' },
        { id: 8, label: 'Temp.' },
        { id: 9, label: 'Fecha / Hora' },
        { id: 10, label: 'Temp.' },
        { id: 11, label: 'Temp.' },
        { id: 12, label: 'Temp.' },
        { id: 13, label: 'Temp.' },
        { id: 14, label: 'Acciones Correción' },
        { id: 15, label: 'Responsable' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [values,setValues] = useState({
        inputs : [{
        }],
        verified: "",
        fechaHora: "",
        idUser:"643ea98d5b44dd9765966ae7"
    })
    const [objValues,setObjValues] = useState({alimento:"",fechaCoccion:"",tempCoccion:"",horaInicio:"",tempInicio:"",temp2hs:"",temp4hs:"",temp6hs:"",fechaRegFinal:"",tempRegFinal:"", tempMantInicio:"",tempMant1hs:"",tempMant2hs:"",accionesCorrectivas:"",responsable:""})
    const [inputValues,setInputValues]= useState([])
    const [trigger,setTrigger] = useState(false)

    useEffect(()=>{
        if(replicas === 1 && objValues.alimento !== "" && objValues.fechaCoccion !== "" && objValues.tempCoccion !== "" && objValues.horaInicio !== "" && objValues.tempInicio !== "" && objValues.temp2hs !== "" && objValues.temp4hs !== "" && objValues.temp6hs !== "" && objValues.fechaRegFinal !== "" && objValues.tempRegFinal !== "" && objValues.tempMantInicio !== "" && objValues.tempMant1hs !== "" && objValues.tempMant2hs !== "" && objValues.accionesCorrectivas !== "" && objValues.responsable !== "" && objValues.id !=="") {
            setInputValues([objValues])
        }else if (replicas > 1 && objValues.alimento !== "" && objValues.fechaCoccion !== "" && objValues.tempCoccion !== "" && objValues.horaInicio !== "" && objValues.tempInicio !== "" && objValues.temp2hs !== "" && objValues.temp4hs !== "" && objValues.temp6hs !== "" && objValues.fechaRegFinal !== "" && objValues.tempRegFinal !== "" && objValues.tempMantInicio !== "" && objValues.tempMant1hs !== "" && objValues.tempMant2hs !== "" && objValues.accionesCorrectivas !== "" && objValues.responsable !== "" && objValues.id !=="") {
            setInputValues([...inputValues,objValues])
        }
    },[trigger])
    useEffect(()=>{
        setValues({...values,inputs:inputValues})
    },[inputValues])
    useEffect(()=>{
        if (objValues.alimento !== "" && objValues.fechaCoccion !== "" && objValues.tempCoccion !== "" && objValues.horaInicio !== "" && objValues.tempInicio !== "" && objValues.temp2hs !== "" && objValues.temp4hs !== "" && objValues.temp6hs !== "" && objValues.fechaRegFinal !== "" && objValues.tempRegFinal !== "" && objValues.tempMantInicio !== "" && objValues.tempMant1hs !== "" && objValues.tempMant2hs !== "" && objValues.accionesCorrectivas !== "" && objValues.responsable !== ""){
            setTrigger(true)
        }
    },[objValues])

    const inputsValuesConstructor = (id,label,index,inputID) => {
        const inputTarget = document.getElementById(id)
        label === 'Alimento' ?  setObjValues({...objValues,alimento:inputTarget.value, id:index}) :
        (label === 'Fecha / Hora' && inputID === 2) ? setObjValues({...objValues,fechaCoccion:inputTarget.value}) :
        (label === 'Temp.' && inputID === 3) ? setObjValues({...objValues,tempCoccion:inputTarget.value}):
        label === 'Hora' ? setObjValues({...objValues,horaInicio:inputTarget.value}):
        (label === 'Temp.' && inputID === 5) ? setObjValues({...objValues,tempInicio:inputTarget.value}):
        (label === 'Temp.' && inputID === 6) ? setObjValues({...objValues,temp2hs:inputTarget.value}):
        (label === 'Temp.' && inputID === 7) ? setObjValues({...objValues,temp4hs:inputTarget.value}):
        (label === 'Temp.' && inputID === 8) ? setObjValues({...objValues,temp6hs:inputTarget.value}):
        (label === 'Fecha / Hora' && inputID === 9) ? setObjValues({...objValues,fechaRegFinal:inputTarget.value}) :
        (label === 'Temp.' && inputID === 10) ? setObjValues({...objValues,tempRegFinal:inputTarget.value}):
        (label === 'Temp.' && inputID === 11) ? setObjValues({...objValues,tempMantInicio:inputTarget.value}):
        (label === 'Temp.' && inputID === 12) ? setObjValues({...objValues,tempMant1hs:inputTarget.value}):
        (label === 'Temp.' && inputID === 13) ? setObjValues({...objValues,tempMant2hs:inputTarget.value}):
        label === 'Acciones Correción' ? setObjValues({...objValues,accionesCorrectivas:inputTarget.value}):
        label === 'Responsable' && setObjValues({...objValues,responsable:inputTarget.value})
    }

    const handleClick = () => {
        setReplicas(replicas + 1);
        setObjValues({alimento:"",fechaCoccion:"",tempCoccion:"",horaInicio:"",tempInicio:"",temp2hs:"",temp4hs:"",temp6hs:"",fechaRegFinal:"",tempRegFinal:"", tempMantInicio:"",tempMant1hs:"",tempMant2hs:"",accionesCorrectivas:"",responsable:""})
        setTrigger(false)
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Planilla de Control de Procesos</h3>
                </div>
                { showModal ? (
                    <Modal
                    content={<ProcesosInfo/>}
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
       

                <div className="table">
                    <div className={styles.contTitTabla}>
                         <div className={styles.subtituloTableDoble}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Cocción </p>
                            </div>
                            <div className={styles.subtituloTable2}>
                                <p className={styles.subtituloTableTextDoble}>Final</p>
                            </div>
                        </div>

                        <div className={styles.subtituloTableCuadruple}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Enfriamiento</p>
                            </div>
                            <div className={styles.subtituloTable2}>
                                <p className={styles.subtituloTableTextDoble}>Inicio</p>
                                <p className={styles.subtituloTableText}>2 hs.</p>
                                <p className={styles.subtituloTableText}>4 hs.</p>
                                <p className={styles.subtituloTableText}>6 hs.</p>
                            </div>
                        </div>

                        <div className={styles.subtituloTableDoble}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Regeneración </p>
                            </div>
                            <div className={styles.subtituloTable2}>
                                <p className={styles.subtituloTableTextDoble}>Final</p>
                            </div>
                        </div>
                        
                        <div className={styles.subtituloTableTriple}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Mantenimiento en caliente </p>
                            </div>
                            <div className={styles.subtituloTable2}>
                                 <p className={styles.subtituloTableText}>Inicio</p>
                                <p className={styles.subtituloTableText}>1 hs.</p>
                                <p className={styles.subtituloTableText}>2 hs.</p>
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
                    <TextField onChange={(e)=>{setValues({...values,verified:e.target.value})}} id="outlined-basic" label="Verificado por" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,fechaHora:e.target.value})}} id="outlined-basic" label="Fecha/hora" variant="outlined" />
                </div>
                <div className="btn">
                    <Button onClick={()=>{
                        dispatch(controlProcesosActions.logIn(values))}} variant="contained">Guardar</Button>
                </div>

            </div>
        </div>
    )
}

export default ControlProcesos