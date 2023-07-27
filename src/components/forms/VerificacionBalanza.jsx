import { Button,  TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './VerificacionBalanza.module.css'
import Modal from '../shared/Modal';
import Balanzas from '../modales/Balanzas';
import verificacionBalanzaActions from '../../redux/actions/verificacionBalanzaActions';
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';

function VerificacionBalanza() {
    const dispatch = useDispatch()
    const prueba = useSelector(state=>state.verificacionBalanzaR.inputsValues)
    console.log("holi",prueba)
    const [inputs] = useState([
        { id: 1, label: 'Código' },
        { id: 2, label: 'Tipo (BP/BR)' },
        { id: 3, label: 'Responsable del uso' },
        { id: 4, label: 'Área' },
        { id: 5, label: 'Peso Masa ref/Pto balanza' },
        { id: 6, label: 'Peso real' },
        { id: 7, label: 'Desvío' },
        { id: 8, label: 'Acciones de corrección' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [showModal, setShowModal] = useState(false);
    var idUser = localStorage.getItem("idUser");
    const [values,setValues] = useState({
        fecha:"",
        responsable:"",
        balanza:"",
        inputsValues : [{
        }],
        verified: "",
        fechaHora: "",
        idUser: idUser
    })
    const [objValues,setObjValues] = useState({codigo:"",tipo:"",responsableUso:"",area:"",pesoMasa:"",pesoReal:"",desvio:"",accionesCorrecion:""})
    const [inputValues,setInputValues]= useState([])
    const [trigger,setTrigger] = useState(false)

    useEffect(()=>{
        if(replicas === 1 && objValues.codigo !== "" && objValues.tipo !== "" && objValues.responsableUso !== "" && objValues.area !== "" && objValues.pesoMasa !== "" && objValues.pesoReal !== "" && objValues.desvio !== "" && objValues.accionesCorrecion !== "" && objValues.id !=="") {
            setInputValues([objValues])
        }else if (replicas > 1 && objValues.codigo !== "" && objValues.tipo !== "" && objValues.responsableUso !== "" && objValues.area !== "" && objValues.pesoMasa !== "" && objValues.pesoReal !== "" && objValues.desvio !== "" && objValues.accionesCorrecion !== "" && objValues.id !=="") {
            setInputValues([...inputValues,objValues])
        }
    },[trigger])
    useEffect(()=>{
        setValues({...values,inputsValues:inputValues})
    },[inputValues])
    useEffect(()=>{
        if (objValues.codigo !== "" && objValues.tipo !== "" && objValues.responsableUso !== "" && objValues.area !== "" && objValues.pesoMasa !== "" && objValues.pesoReal !== "" && objValues.desvio !== "" && objValues.accionesCorrecion !== ""){
            setTrigger(true)
        }
    },[objValues])

    const inputsValuesConstructor = (id,label,index) => {
        const inputTarget = document.getElementById(id)
        label === 'Código' ?  setObjValues({...objValues,codigo:inputTarget.value, id:index}) :
        label === 'Tipo (BP/BR)' ? setObjValues({...objValues,tipo:inputTarget.value}) :
        label === 'Responsable del uso' ? setObjValues({...objValues,responsableUso:inputTarget.value}):
        label === 'Área' ? setObjValues({...objValues,area:inputTarget.value}):
        label === 'Peso Masa ref/Pto balanza' ? setObjValues({...objValues,pesoMasa:inputTarget.value}) :
        label === 'Peso real' ? setObjValues({...objValues,pesoReal:inputTarget.value}):
        label === 'Desvío' ? setObjValues({...objValues,desvio:inputTarget.value}):
        label === 'Acciones de corrección' && setObjValues({...objValues,accionesCorrecion:inputTarget.value})
    }

    const handleClick = () => {
        setReplicas(replicas + 1);
        setObjValues({codigo:"",tipo:"",responsableUso:"",area:"",pesoMasa:"",pesoReal:"",desvio:"",accionesCorrecion:""})
        setTrigger(false)
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Verificación de Instrumentos de Medición: Balanzas</h3>
                </div>
                { showModal ? (
                    <Modal
                    content={<Balanzas/>}
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
                <input
  onChange={(e) => { setValues({ ...values, fecha: e.target.value }) }}
  type="date"
  id="fecha"
  name="fecha"
  required
/>

                    <TextField onChange={(e)=>{setValues({...values,responsable:e.target.value})}} id="outlined-basic" label="Responsable de validación" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,balanza:e.target.value})}} id="outlined-basic" label="Balanza/Báscula" variant="outlined" />

                </div>

                <div className="table">
                    <div className={styles.contTitTabla}>
                        <div className={styles.subtituloTable}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Identificación Balanza </p>
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
                <span><b>*</b> BP(Balanza de producción) - BR (Balanza de recepción)</span>
                <br />
                <br />
                <div className={styles.personal}>
                    <TextField onChange={(e)=>{setValues({...values,verified:e.target.value})}} id="outlined-basic" label="Verificado por" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,fechaHora:e.target.value})}} id="outlined-basic" label="Fecha/hora" variant="outlined" />
                </div>
                <div className="btn">
                    <Button onClick={async()=>{
                         await axios.post('https://api.onmodoapp.com/api/verificacionbalanza', values)}} variant="contained">Guardar</Button>
                </div>

            </div>
        </div>
    )
}

export default VerificacionBalanza