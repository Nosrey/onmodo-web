import { Button,  TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './Descongelamiento.module.css'
import Modal from '../../shared/Modal';
import DescongelamientoInfo from '../../modales/DescongelamientoInfo';
import { useSelector,useDispatch } from 'react-redux';
import descongelamientoActions from '../../../redux/actions/descongelamientoActions';

function Descongelamiento() {
    const dispatch = useDispatch()
    const prueba = useSelector(state=>state.descongelamientoR.inputsValues)
    console.log("holi",prueba)
    const [inputs] = useState([
        { id: 1, label: 'Fecha' },
        { id: 2, label: 'Alimento' },
        { id: 3, label: 'Nro. lote' },
        { id: 4, label: 'Método* (C/A/M)' },
        { id: 5, label: 'Fecha/ Hora' },
        { id: 6, label: 'Temp' },
        { id: 7, label: 'Fecha/ Hora' },
        { id: 8, label: 'Temp' },
        { id: 9, label: 'Fecha/ Hora' },
        { id: 10, label: 'Temp' },
        { id: 11, label: 'Fecha/ Hora' },
        { id: 12, label: 'Temp' },
        { id: 13, label: 'Acciones de correción' },
        { id: 14, label: 'Responsable' },
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
    const [objValues,setObjValues] = useState({fecha:"",alimento:"",nroLote:"",metodo:"",fechaHoraInicio:"",tempInicio:"",fechaHoraM1:"",tempM1:"",fechaHoraM2:"",tempM2:"",fechaHoraFinal:"",tempFinal:"",accionesCorreccion:"",responsable:""})
    const [inputValues,setInputValues]= useState([])
    const [trigger,setTrigger] = useState(false)

    useEffect(()=>{
        if(replicas === 1 && objValues.fecha !== "" && objValues.alimento !== "" && objValues.nroLote !== "" && objValues.metodo !== "" && objValues.fechaHoraInicio !== "" && objValues.tempInicio !== "" && objValues.fechaHoraM1 !== "" && objValues.tempM1 !== "" && objValues.fechaHoraM2 !== "" && objValues.tempM2 !== "" && objValues.fechaHoraFinal !== "" && objValues.tempFinal !== "" && objValues.accionesCorreccion !== "" && objValues.responsable !== "" && objValues.id !=="") {
            setInputValues([objValues])
        }else if (replicas > 1 && objValues.fecha !== "" && objValues.alimento !== "" && objValues.nroLote !== "" && objValues.metodo !== "" && objValues.fechaHoraInicio !== "" && objValues.tempInicio !== "" && objValues.fechaHoraM1 !== "" && objValues.tempM1 !== "" && objValues.fechaHoraM2 !== "" && objValues.tempM2 !== "" && objValues.fechaHoraFinal !== "" && objValues.tempFinal !== "" && objValues.accionesCorreccion !== "" && objValues.responsable !== "" && objValues.id !=="") {
            setInputValues([...inputValues,objValues])
        }
    },[trigger])
    useEffect(()=>{
        setValues({...values,inputs:inputValues})
    },[inputValues])
    useEffect(()=>{
        if (objValues.fecha !== "" && objValues.alimento !== "" && objValues.nroLote !== "" && objValues.metodo !== "" && objValues.fechaHoraInicio !== "" && objValues.tempInicio !== "" && objValues.fechaHoraM1 !== "" && objValues.tempM1 !== "" && objValues.fechaHoraM2 !== "" && objValues.tempM2 !== "" && objValues.fechaHoraFinal !== "" && objValues.tempFinal !== "" && objValues.accionesCorreccion !== "" && objValues.responsable !== ""){
            setTrigger(true)
        }
    },[objValues])

    const inputsValuesConstructor = (id,label,index,inputID) => {
        const inputTarget = document.getElementById(id)
        label === 'Fecha' ?  setObjValues({...objValues,fecha:inputTarget.value, id:index}) :
        label === 'Alimento' ? setObjValues({...objValues,alimento:inputTarget.value}) :
        label === 'Nro. lote' ? setObjValues({...objValues,nroLote:inputTarget.value}):
        label === 'Método* (C/A/M)' ? setObjValues({...objValues,metodo:inputTarget.value}):
        (label === 'Fecha/ Hora' && inputID === 5) ? setObjValues({...objValues,fechaHoraInicio:inputTarget.value}):
        (label === 'Temp' && inputID === 6) ? setObjValues({...objValues,tempInicio:inputTarget.value}):
        (label === 'Fecha/ Hora' && inputID === 7) ? setObjValues({...objValues,fechaHoraM1:inputTarget.value}):
        (label === 'Temp' && inputID === 8) ? setObjValues({...objValues,tempM1:inputTarget.value}):
        (label === 'Fecha/ Hora' && inputID === 9) ? setObjValues({...objValues,fechaHoraM2:inputTarget.value}):
        (label === 'Temp' && inputID === 10) ? setObjValues({...objValues,tempM2:inputTarget.value}):
        (label === 'Fecha/ Hora' && inputID === 11) ? setObjValues({...objValues,fechaHoraFinal:inputTarget.value}):
        (label === 'Temp' && inputID === 12) ? setObjValues({...objValues,tempFinal:inputTarget.value}):
        label === 'Acciones de correción' ? setObjValues({...objValues,accionesCorreccion:inputTarget.value}):
        label === 'Responsable' && setObjValues({...objValues,responsable:inputTarget.value})
    }

    const handleClick = () => {
        setReplicas(replicas + 1);
        setObjValues({fecha:"",alimento:"",nroLote:"",metodo:"",fechaHoraInicio:"",tempInicio:"",fechaHoraM1:"",tempM1:"",fechaHoraM2:"",tempM2:"",fechaHoraFinal:"",tempFinal:"",accionesCorreccion:"",responsable:""})
        setTrigger(false)
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Descongelamiento</h3>
                </div>
                { showModal ? (
                    <Modal
                    content={<DescongelamientoInfo/>}
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
                        <div className={styles.subtituloTable}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Inicio</p>
                            </div>
                        </div>
                        <div className={styles.subtituloTable}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Monitoreo 1</p>
                            </div>
                        </div>
                        <div className={styles.subtituloTable}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Monitoreo 2</p>
                            </div>
                        </div>
                        <div className={styles.subtituloTable}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Final</p>
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
                                            }} className="input" id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} label={`${input.label}`} variant="outlined" />

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
                    <Button onClick={()=>{
                        dispatch(descongelamientoActions.logIn(values))}} variant="contained">Guardar</Button>
                </div>

            </div>
        </div>
    )
}

export default Descongelamiento