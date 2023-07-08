import { Button,  TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './CargaRecepcion.module.css'
import Modal from '../../shared/Modal';
import CargaInfo from '../../modales/CargaInfo';
import { useSelector,useDispatch } from 'react-redux';
import cargaRecepcionActions from '../../../redux/actions/cargaRecepcionActions';

function CargaRecepcion() {
    const dispatch = useDispatch()
    const prueba = useSelector(state=>state.cargaRecepcionR.inputsValues)
    console.log("holi",prueba)
    const [inputs] = useState([
        { id: 1, label: 'Carga' },
        { id: 2, label: 'Recepción' },
        { id: 3, label: 'Proveedor' },
        { id: 4, label: 'Producto' },
        { id: 5, label: 'Comprada' },
        { id: 6, label: 'Recibida' },
        { id: 7, label: 'Carga' },
        { id: 8, label: 'Recepción' },
        { id: 9, label: 'Carga' },
        { id: 10, label: 'Recepción' },
        { id: 11, label: 'Dentro de vida útil' },
        { id: 12, label: 'Nro. lote' },
        { id: 13, label: 'Fecha vto.' },
        { id: 14, label: 'Recibido' },
        { id: 15, label: 'Motivo del rechazo' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [values,setValues] = useState({
        patenteTermico:"",
        habSenasa:"",
        nPrecintoLateral:"",
        nPrecintoTrasero:"",
        respPrecinto:"",
        observacionesPrecinto:"",
        respTermografo:"",
        observacionesTermografo:"",
        inputs : [{
        }],
        verificado: "",
        fechaHora: "",
        idUser:"643ea98d5b44dd9765966ae7",
    })
    const [objValues,setObjValues] = useState({cargaFecha:"",recepcionFecha:"",proveedor:"",producto:"",comprada:"",recibida:"",cargaTempAlimento:"",recepcionTempAlimento:"",cargaTempCamion:"",recepcionTempCamion:"", vidaUtil:"", nroLote:"",fechaVto:"",recibidoAcciones:"",motivoRechazo:""})
    const [inputValues,setInputValues]= useState([])
    const [trigger,setTrigger] = useState(false)

    useEffect(()=>{
        if(replicas === 1 && objValues.cargaFecha !== "" && objValues.recepcionFecha !== "" && objValues.proveedor !== "" && objValues.producto !== "" && objValues.comprada !== "" && objValues.recibida !== "" && objValues.cargaTempAlimento !== "" && objValues.recepcionTempAlimento !== "" && objValues.cargaTempCamion !== "" && objValues.recepcionTempCamion !== "" && objValues.vidaUtil !== "" && objValues.nroLote !== "" && objValues.fechaVto !== "" && objValues.recibidoAcciones !== "" && objValues.motivoRechazo !== "" && objValues.id !=="") {
            setInputValues([objValues])
        }else if (replicas > 1 && objValues.cargaFecha !== "" && objValues.recepcionFecha !== "" && objValues.proveedor !== "" && objValues.producto !== "" && objValues.comprada !== "" && objValues.recibida !== "" && objValues.cargaTempAlimento !== "" && objValues.recepcionTempAlimento !== "" && objValues.cargaTempCamion !== "" && objValues.recepcionTempCamion !== "" && objValues.vidaUtil !== "" && objValues.nroLote !== "" && objValues.fechaVto !== "" && objValues.recibidoAcciones !== "" && objValues.motivoRechazo !== "" && objValues.id !=="") {
            setInputValues([...inputValues,objValues])
        }
    },[trigger])
    useEffect(()=>{
        setValues({...values,inputs:inputValues})
    },[inputValues])
    useEffect(()=>{
        if (objValues.cargaFecha !== "" && objValues.recepcionFecha !== "" && objValues.proveedor !== "" && objValues.producto !== "" && objValues.comprada !== "" && objValues.recibida !== "" && objValues.cargaTempAlimento !== "" && objValues.recepcionTempAlimento !== "" && objValues.cargaTempCamion !== "" && objValues.recepcionTempCamion !== "" && objValues.vidaUtil !== "" && objValues.nroLote !== "" && objValues.fechaVto !== "" && objValues.recibidoAcciones !== "" && objValues.motivoRechazo !== ""){
            setTrigger(true)
        }
    },[objValues])

    const inputsValuesConstructor = (id,label,index,inputID) => {
        console.log(id)
        const inputTarget = document.getElementById(id);
        (label === 'Carga' && inputID === 1) ?  setObjValues({...objValues,cargaFecha:inputTarget.value, id:index}) :
        (label === 'Recepción' && inputID === 2) ? setObjValues({...objValues,recepcionFecha:inputTarget.value}) :
        label === 'Proveedor' ? setObjValues({...objValues,proveedor:inputTarget.value}):
        label === 'Producto' ? setObjValues({...objValues,producto:inputTarget.value}):
        label === 'Comprada' ? setObjValues({...objValues,comprada:inputTarget.value}):
        label === 'Recibida' ? setObjValues({...objValues,recibida:inputTarget.value}):
        (label === 'Carga' && inputID === 7) ? setObjValues({...objValues,cargaTempAlimento:inputTarget.value}):
        (label === 'Recepción' && inputID === 8) ? setObjValues({...objValues,recepcionTempAlimento:inputTarget.value}):
        (label === 'Carga' && inputID === 9) ? setObjValues({...objValues,cargaTempCamion:inputTarget.value}):
        (label === 'Recepción' && inputID === 10) ? setObjValues({...objValues,recepcionTempCamion:inputTarget.value}):
        label === 'Dentro de vida útil' ? setObjValues({...objValues,vidaUtil:inputTarget.value}):
        label === 'Nro. lote' ? setObjValues({...objValues,nroLote:inputTarget.value}):
        label === 'Fecha vto.' ? setObjValues({...objValues,fechaVto:inputTarget.value}):
        label === 'Recibido' ? setObjValues({...objValues,recibidoAcciones:inputTarget.value}):
        label === 'Motivo del rechazo' && setObjValues({...objValues,motivoRechazo:inputTarget.value})
    }

    const handleClick = () => {
        setReplicas(replicas + 1);
        setObjValues({cargaFecha:"",recepcionFecha:"",proveedor:"",producto:"",comprada:"",recibida:"",cargaTempAlimento:"",recepcionTempAlimento:"",cargaTempCamion:"",recepcionTempCamion:"", vidaUtil:"", nroLote:"",fechaVto:"",recibidoAcciones:"",motivoRechazo:""})
        setTrigger(false)
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Carga/ Recepción</h3>
                </div>
                { showModal ? (
                    <Modal
                    content={<CargaInfo/>}
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
                        <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>DATOS TRANSPORTE</p>
                </div>
               <p>Estado sanitario: Cumple/no cumple.</p>
               <div className={styles.personal}>
                    <TextField onChange={(e)=>{setValues({...values,patenteTermico:e.target.value})}} id="outlined-basic" label="Patente del térmico" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,habSenasa:e.target.value})}} id="outlined-basic" label="Habilitación SENASA" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,nPrecintoLateral:e.target.value})}} id="outlined-basic" label="Nº Precinto lateral" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,nPrecintoTrasero:e.target.value})}} id="outlined-basic" label="Nº Precinto trasero" variant="outlined" />
                </div>
                <div className={styles.personal}>
                    <TextField onChange={(e)=>{setValues({...values,respPrecinto:e.target.value})}} id="outlined-basic" label="Resp. control precintos" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,observacionesPrecinto:e.target.value})}} fullWidth id="outlined-basic" label="Observaciones" variant="outlined" />
                    
                </div>
            
               <p>Termógrafo:   SI     NO</p>
               <div className={styles.personal}>
                    <TextField onChange={(e)=>{setValues({...values,respTermografo:e.target.value})}} id="outlined-basic" label="Resp. lectura termógrafo" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,observacionesTermografo:e.target.value})}} fullWidth id="outlined-basic" label="Observaciones" variant="outlined" />
                    
                </div>
               <br />
               <br />

                <div className="table">
                    <div className={styles.contTitTabla}>
                         <div className={styles.subtituloTableDoble}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Fecha </p>
                            </div>
                        </div>
                        <div className={styles.subtituloTableEspacio}>
                            <div>
                            </div>
                        </div>

                      
                        <div className={styles.subtituloTableDoble}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Cantidad (Kg-Un) </p>
                            </div>
                        </div>
                        <div className={styles.subtituloTableDoble}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Temperatura Alimento (ºC)</p>
                            </div>
                        </div>
                        <div className={styles.subtituloTableDoble}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Temperatura Caja Camión (ºC) </p>
                            </div>
                        </div>
      
                        <div className={styles.subtituloTableTriple}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Rotulación </p>
                            </div>
                        </div>

                        <div className={styles.subtituloTableDoble}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Acciones de corrección tomadas </p>
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
                        dispatch(cargaRecepcionActions.logIn(values))}} variant="contained">Guardar</Button>
                </div>

            </div>
        </div>
    )
}

export default CargaRecepcion