import { Button,  TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './Recepcion.module.css'
import Modal from '../../shared/Modal';
import RecepcionInfo from '../../modales/Recepcion';
import recepcionActions from '../../../redux/actions/recepcionActions';
import { useSelector,useDispatch } from 'react-redux';

function Recepcion() {
    const dispatch = useDispatch()
    const prueba = useSelector(state => state.recepcionR.inputsValues)
    console.log("holi",prueba)
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
    const [showModal, setShowModal] = useState(false);
    const [values,setValues] = useState({
        inputsValues : [{
        }],
        verified: "",
        fechaHora: "",
        idUser:"643ea98d5b44dd9765966ae7"
    })
    const [objValues,setObjValues] = useState({fecha:"",proveedor:"",producto:"",comprada:"",recibida:"",alimento:"",cajaCamion:"",vidaUtil:"",nroLote:"",fechaVencimiento:"",recibido:"",motivoRechazo:""})
    const [inputValues,setInputValues]= useState([])
    const [trigger,setTrigger] = useState(false)

    useEffect(()=>{
        if(replicas === 1 && objValues.fecha !== "" && objValues.proveedor !== "" && objValues.producto !== "" && objValues.comprada !== "" && objValues.recibida !== "" && objValues.alimento !== "" && objValues.cajaCamion !== "" && objValues.vidaUtil !== "" && objValues.nroLote !== "" && objValues.fechaVencimiento !== "" && objValues.recibido !== "" && objValues.motivoRechazo !== "" && objValues.id !=="") {
            setInputValues([objValues])
        }else if (replicas > 1 && objValues.fecha !== "" && objValues.proveedor !== "" && objValues.producto !== "" && objValues.comprada !== "" && objValues.recibida !== "" && objValues.alimento !== "" && objValues.cajaCamion !== "" && objValues.vidaUtil !== "" && objValues.nroLote !== "" && objValues.fechaVencimiento !== "" && objValues.recibido !== "" && objValues.motivoRechazo !== "" && objValues.id !=="") {
            setInputValues([...inputValues,objValues])
        }
    },[trigger])
    useEffect(()=>{
        setValues({...values,inputsValues:inputValues})
    },[inputValues])
    useEffect(()=>{
        if (objValues.fecha !== "" && objValues.proveedor !== "" && objValues.producto !== "" && objValues.comprada !== "" && objValues.recibida !== "" && objValues.alimento !== "" && objValues.cajaCamion !== "" && objValues.vidaUtil !== "" && objValues.nroLote !== "" && objValues.fechaVencimiento !== "" && objValues.recibido !== "" && objValues.motivoRechazo !== ""){
            setTrigger(true)
        }
    },[objValues])

    const inputsValuesConstructor = (id,label,index) => {
        const inputTarget = document.getElementById(id)
        label === 'Fecha' ?  setObjValues({...objValues,fecha:inputTarget.value, id:index}) :
        label === 'Proveedor' ? setObjValues({...objValues,proveedor:inputTarget.value}) :
        label === 'Producto' ? setObjValues({...objValues,producto:inputTarget.value}):
        label === 'Comprada' ? setObjValues({...objValues,comprada:inputTarget.value}):
        label === 'Recibida' ? setObjValues({...objValues,recibida:inputTarget.value}) :
        label === 'Alimento' ? setObjValues({...objValues,alimento:inputTarget.value}):
        label === 'Caja camión' ? setObjValues({...objValues,cajaCamion:inputTarget.value}):
        label === 'Dentro de vida útil' ? setObjValues({...objValues,vidaUtil:inputTarget.value}) :
        label === 'Nro. lote' ? setObjValues({...objValues,nroLote:inputTarget.value}):
        label === 'Fecha Vto.' ? setObjValues({...objValues,fechaVencimiento:inputTarget.value}):
        label === 'Recibido' ? setObjValues({...objValues,recibido:inputTarget.value}):
        label === 'Motivo del rechazo' && setObjValues({...objValues,motivoRechazo:inputTarget.value})
    }

    const handleClick = () => {
        setReplicas(replicas + 1);
        setObjValues({fecha:"",proveedor:"",producto:"",comprada:"",recibida:"",alimento:"",cajaCamion:"",vidaUtil:"",nroLote:"",fechaVencimiento:"",recibido:"",motivoRechazo:""})
        setTrigger(false)
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Recepción</h3>
                </div>

                { showModal ? (
                    <Modal
                    content={<RecepcionInfo/>}
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
                    <TextField onChange={(e)=>{setValues({...values,verified:e.target.value})}} id="outlined-basic" label="Verificado por" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,fechaHora:e.target.value})}} id="outlined-basic" label="Fecha/hora" variant="outlined" />
                </div>
                <div className="btn">
                    <Button onClick={()=>{
                        dispatch(recepcionActions.logIn(values))}} variant="contained">Guardar</Button>
                </div>

            </div>
        </div>
    )
}

export default Recepcion