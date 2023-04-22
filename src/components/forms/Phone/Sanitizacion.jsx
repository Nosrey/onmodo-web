import { Button,  TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './Sanitizacion.module.css'
import Modal from '../../shared/Modal';
import SanitizacionInfo from '../../modales/SanitizacionInfo';
import { useSelector,useDispatch } from 'react-redux';
import sanitizacionActions from '../../../redux/actions/sanitizacionActions';

function Sanitizacion() {
    const dispatch = useDispatch()
    const prueba = useSelector(state=>state.sanitizacionR.inputsValues)
    console.log(prueba)
    const [inputs] = useState([
        { id: 1, label: 'Fecha' },
        { id: 2, label: 'Vegetal a desinfectar' },
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
    const [showModal, setShowModal] = useState(false);
    const [values,setValues] = useState({
        inputs : [{
        }],
        responsable: "",
        fechaHora: "",
        idUser:"643ea98d5b44dd9765966ae7"
    })
    const [objValues,setObjValues] = useState({fecha:"",vegetal:"",siNo:"","<50":"","100":"","200":"","300":"",">400":"",minutos:"",accionesCorreccion:"",responsable:""})
    const [inputValues,setInputValues]= useState([])
    const [trigger,setTrigger] = useState(false)
    
    useEffect(()=>{
        if(replicas === 1 && objValues.fecha !== "" && objValues.vegetal !== "" && objValues.siNo !== "" && objValues["<50"] !== "" && objValues["100"] !== "" && objValues["200"] !== "" && objValues["300"] !== "" && objValues[">400"] !== "" && objValues.minutos !== "" && objValues.accionesCorreccion !== "" && objValues.responsable !== "" && objValues.id !=="") {
            setInputValues([objValues])
        }else if (replicas > 1 && objValues.fecha !== "" && objValues.vegetal !== "" && objValues.siNo !== "" && objValues["<50"] !== "" && objValues["100"] !== "" && objValues["200"] !== "" && objValues["300"] !== "" && objValues[">400"] !== "" && objValues.minutos !== "" && objValues.accionesCorreccion !== "" && objValues.responsable !== "" && objValues.id !=="") {
            setInputValues([...inputValues,objValues])
        }
    },[trigger])
    useEffect(()=>{
        setValues({...values,inputs:inputValues})
    },[inputValues])
    useEffect(()=>{
        if (objValues.fecha !== "" && objValues.vegetal !== "" && objValues.siNo !== "" && objValues["<50"] !== "" && objValues["100"] !== "" && objValues["200"] !== "" && objValues["300"] !== "" && objValues[">400"] !== "" && objValues.minutos !== "" && objValues.accionesCorreccion !== "" && objValues.responsable !== ""){
            setTrigger(true)
        }
    },[objValues])

    const inputsValuesConstructor = (id,label,index) => {
        const inputTarget = document.getElementById(id)
        label === 'Fecha' ?  setObjValues({...objValues,fecha:inputTarget.value, id:index}) :
        label === 'Vegetal a desinfectar' ? setObjValues({...objValues,vegetal:inputTarget.value}) :
        label === 'SI/NO' ? setObjValues({...objValues,siNo:inputTarget.value}):
        label === '<50' ? setObjValues({...objValues,"<50":inputTarget.value}):
        label === '100' ? setObjValues({...objValues,"100":inputTarget.value}):
        label === '200' ? setObjValues({...objValues,"200":inputTarget.value}):
        label === '300' ? setObjValues({...objValues,"300":inputTarget.value}):
        label === '>400' ? setObjValues({...objValues,">400":inputTarget.value}):
        label === 'Minutos' ? setObjValues({...objValues,minutos:inputTarget.value}):
        label === 'Acciones de corrección' ? setObjValues({...objValues,accionesCorreccion:inputTarget.value}):
        label === 'Responsable' && setObjValues({...objValues,responsable:inputTarget.value})
    }

    const handleClick = () => {
        setReplicas(replicas + 1);
        setObjValues({fecha:"",vegetal:"",siNo:"","<50":"","100":"","200":"","300":"",">400":"",minutos:"",accionesCorreccion:"",responsable:""})
        setTrigger(false)
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Planilla de Sanitización </h3>
                </div>
                { showModal ? (
                    <Modal
                    content={<SanitizacionInfo/>}
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
                                            <TextField onKeyUp={(e)=>{
                                            inputsValuesConstructor(`input-${input.id}-${index}`,input.label, index);
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
                    <TextField onChange={(e)=>{setValues({...values,responsable:e.target.value})}} id="outlined-basic" label="Responsable" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,fechaHora:e.target.value})}} id="outlined-basic" label="Fecha/hora" variant="outlined" />
                </div>
                <div className="btn">
                    <Button onClick={()=>{
                        dispatch(sanitizacionActions.logIn(values))}} variant="contained">Generar PDF</Button>
                </div>
            </div>
        </div>
    )
}

export default Sanitizacion