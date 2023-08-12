import { Button,  TextField } from '@mui/material'
import React, { useState,useEffect } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './VerificacionTermometros.module.css'
import Termometros from '../modales/Termometros';
import Modal from '../shared/Modal';
import Alert from '../shared/components/Alert/Alert';
import { verificacionTermometros } from '../../services/FormsRequest';
import { useLocation } from 'react-router-dom';

function VerificacionTermometros() {
     //** ALERTA */
     const [textAlert, setTextAlert] = useState("");
     const [typeAlert, setTypeAlert] = useState("");
     const [showAlert, setShowlert] = useState(false);

    var idUser = localStorage.getItem("idUser");
    const [values,setValues] = useState()
    const [inputs] = useState([
        { id: 1, label: 'Código' },
        { id: 2, label: 'Tipo (PIN/IR)' },
        { id: 3, label: 'Responsable del uso' },
        { id: 4, label: 'Área' },
        { id: 5, label: 'Punto 0' },
        { id: 6, label: 'Desvío' },
        { id: 7, label: 'Punto 100' },
        { id: 8, label: 'Desvío' },
        { id: 9, label: 'Acciones de corrección' },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [objValues1,setObjValues1] = useState({codigo:"",tipo:"",responsable:"",area:"",punto0:"",desvio0:"",punto100:"",desvio100:"",acciones:""})
    const [inputValues1,setInputValues1]= useState([])
    const [trigger1,setTrigger1] = useState(false)
    const [replicas, setReplicas] = useState(1);

    useEffect(()=>{
        if(replicas === 1 && objValues1.codigo !== "" && objValues1.tipo !== "" && objValues1.responsable !== "" && objValues1.area !== "" && objValues1.punto0 !== "" && objValues1.desvio0 !== "" && objValues1.punto100 !== "" && objValues1.desvio100 !== "" && objValues1.acciones !== "" && objValues1.id !=="") {
            setInputValues1([objValues1])
        }else if (replicas > 1 && objValues1.codigo !== "" && objValues1.tipo !== "" && objValues1.responsable !== "" && objValues1.area !== "" && objValues1.punto0 !== "" && objValues1.desvio0 !== "" && objValues1.punto100 !== "" && objValues1.desvio100 !== "" && objValues1.acciones !== "" && objValues1.id !=="") {
            setInputValues1([...inputValues1,objValues1])
        }
    },[trigger1])

    useEffect(()=>{
        setValues({...values,inputsTrimestral:inputValues1})
    },[inputValues1])

    useEffect(()=>{
        if (objValues1.codigo !== "" && objValues1.tipo !== "" && objValues1.responsable !== "" && objValues1.area !== "" && objValues1.punto0 !== "" && objValues1.desvio0 !== "" && objValues1.punto100 !== "" && objValues1.desvio100 !== "" && objValues1.acciones !== "" ){
            setTrigger1(true)
        }
    },[objValues1])

    const [inputs2] = useState([
        { id: 1, label: 'Código' },
        { id: 2, label: 'Área' },
        { id: 3, label: 'Temp. termóm referencia' },
        { id: 4, label: 'Temp. termóm evaluado'  },
        { id: 5, label: 'Desvío' },
        { id: 6, label: 'Acciones de corrección' },
    ]);
    const [replicas2, setReplicas2] = useState(1);
    const [objValues2,setObjValues2] = useState({codigo:"",area:"",termoReferencia:"",termoEvaluado:"",desvio:"",acciones:""})
    const [inputValues2,setInputValues2]= useState([])
    const [trigger2,setTrigger2] = useState(false)

    useEffect(()=>{
        if(replicas2 === 1 && objValues2.codigo !== "" && objValues2.area !== "" && objValues2.termoReferencia !== "" && objValues2.termoEvaluado !== "" && objValues2.desvio !== "" && objValues2.acciones !== "" && objValues2.id !=="") {
            setInputValues2([objValues2])
        }else if (replicas2 > 1 && objValues2.codigo !== "" && objValues2.area !== "" && objValues2.termoReferencia !== "" && objValues2.termoEvaluado !== "" && objValues2.desvio !== "" && objValues2.acciones !== "" && objValues2.id !=="") {
            setInputValues2([...inputValues2,objValues2])
        }
    },[trigger2])

    useEffect(()=>{
        setValues({...values,inputsSemestral:inputValues2})
    },[inputValues2])

    useEffect(()=>{
        if (objValues2.codigo !== "" && objValues2.area !== "" && objValues2.termoReferencia !== "" && objValues2.termoEvaluado !== "" && objValues2.desvio !== "" && objValues2.acciones !== ""){
            setTrigger2(true)
        }
    },[objValues2])

    const inputsValuesConstructor = (id,label,index,input,inputID,value) => {
        const inputTarget = document.getElementById(id)
        if(input === "input1"){
            label === 'Código' ?  setObjValues1({...objValues1,codigo:inputTarget.value, id:index}) :
            label === 'Tipo (PIN/IR)' ? setObjValues1({...objValues1,tipo:inputTarget.value}) :
            label === 'Responsable del uso' ? setObjValues1({...objValues1,responsable:inputTarget.value}):
            label === 'Área' ? setObjValues1({...objValues1,area:inputTarget.value}): 
            label === 'Punto 0' ? setObjValues1({...objValues1,punto0:inputTarget.value}):
            (label === 'Desvío' && inputID===6) ? setObjValues1({...objValues1,desvio0:inputTarget.value}):
            label === 'Punto 100' ? setObjValues1({...objValues1,punto100:inputTarget.value}):
            (label === 'Desvío' && inputID===8) ? setObjValues1({...objValues1,desvio100:inputTarget.value}):
            label === 'Acciones de corrección' && setObjValues1({...objValues1,acciones:inputTarget.value})  
        }else{
            label === 'Código' ?  setObjValues2({...objValues2,codigo:value, id:index == 0 ? 100 : (index+1)*100}) :
            label === 'Área' ? setObjValues2({...objValues2,area:value}) :
            label === 'Temp. termóm referencia' ? setObjValues2({...objValues2,termoReferencia:value}):
            label === 'Temp. termóm evaluado' ? setObjValues2({...objValues2,termoEvaluado:value}):
            label === 'Desvío' ? setObjValues2({...objValues2,desvio:value}):
            label === 'Acciones de corrección' && setObjValues2({...objValues2,acciones:value})
        }
    }
    
    const handleClick = () => {
        setReplicas(replicas + 1);
        setObjValues1({codigo:"",tipo:"",responsable:"",area:"",punto0:"",desvio0:"",punto100:"",desvio100:"",acciones:""})
        setTrigger1(false)
    };
    const handleClick2 = () => {
        setReplicas2(replicas2 + 1);
        setObjValues2({codigo:"",area:"",termoReferencia:"",termoEvaluado:"",desvio:"",acciones:""})
        setTrigger2(false);
    };

    const handleSubmit = () => {
        verificacionTermometros(values).then((resp)=> {
            setTextAlert("¡Formulario cargado exitosamente!");
            setTypeAlert("success");
        }).catch((resp)=> {
            setTextAlert("Ocurrió un error")
            setTypeAlert("error");
        }).finally(()=> {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            setShowlert(true);
            setTimeout(() => {
                setShowlert(false);

            }, 7000);
        }
        )
    };

    const location = useLocation();
    useEffect(() => {
        const infoPrecargada = location.state?.objeto;
        if (infoPrecargada) { // muestro un form del historial
            console.log(infoPrecargada)
            setValues({
                fecha:infoPrecargada.fecha,
                responsable:infoPrecargada.responsable,
                inputsTrimestral : infoPrecargada.inputsTrimestral,
                inputsSemestral : infoPrecargada.inputsSemestral,
                verified: infoPrecargada.verified,
                fechaHora:infoPrecargada.fechaHora,
                date: infoPrecargada.date,
                idUser: idUser
            })
        } else { // creo un form desde cero
            setValues({
                fecha:"",
                responsable:"",
                inputsTrimestral : [{
                }],
                inputsSemestral : [{
                }],
                verified: "",
                fechaHora:"",
                date: "",
                idUser: idUser
            })
        }
    }, [])
    

    return (
        <>
        {
            values && 
            <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Verificación de Instrumentos de Medición: Termometros</h3>
                </div>

                { showModal ? (
                    <Modal
                    content={<Termometros/>}
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
                    type="date"
                    onChange={(e) => {
                        setValues({ ...values, fecha: e.target.value });
                    }}
                    id="fecha"
                    name="fecha"
                    value={values.fecha}

                    />
                    <TextField value={values.responsable} onChange={(e)=>{setValues({...values,responsable:e.target.value})}} id="outlined-basic" placeholder="Responsable de validación" variant="outlined" />
                </div>
        
                <br />

                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>TERMÓMETROS DE PINCHE/INFRARROJOS </p>
                </div>

                <b>   FRECUENCIA: TRIMESTRAL</b>

                <div className="table">
                    <div className={styles.contTitTabla}>
                        <div className={styles.subtituloTable}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Identificación Termómetro  </p>
                            </div>
                        </div>
                    </div>
                
                    <div className="tableSection">
                        {Array(replicas)
                            .fill(0)
                            .map((_, index) => (
                                <div className="tableRow" key={index}>
                                    <p className="index">{index + 1} </p>

                                    {inputs.map((input, i) => (
                                        <div key={input.id}>
                                            <TextField onBlur={(e)=>{
                                            inputsValuesConstructor(`input-${input.id}-${index}`,input.placeholder, index, "input1",input.id,e.target.value);
                                            }} value={values.inputsTrimestral[i]} className="input" id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} placeholder={`${input.label}`} variant="outlined" />

                                        </div>
                                    ))}
                                    <div className="icon">
                                        <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick} />
                                    </div>
                                </div>
                            ))}

                    </div>
                </div>


                <br />
                <br />
                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>TERMÓMETROS DE CÁMARAS, ANTECAMARAS, HELADERAS Y FREEZER </p>
                </div>

                <b>   FRECUENCIA: SEMESTRAL</b>
          

                <div className="table">
                    <div className={styles.contTitTabla2}>
                        <div className={styles.subtituloTable2}>
                            <div>
                                <p style={{textAlign: 'center', fontWeight:'bold'}}>Identificación Termómetro  </p>
                            </div>
                        </div>
                    </div>
                
                    <div className="tableSection">
                        {Array(replicas2)
                            .fill(0)
                            .map((_, index) => (
                                <div className="tableRow" key={index}>
                                    <p className="index">{index + 1} </p>

                                    {inputs2.map((input) => (
                                        <div key={input.id}>
                                            <TextField onBlur={(e)=>{
                                            inputsValuesConstructor(`input-${input.id}-${index}`,input.placeholder, index,"input2",input.id,e.target.value);
                                            }} id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} placeholder={`${input.label}`} variant="outlined" />

                                        </div>
                                    ))}
                                    <div className="icon">
                                        <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick2} />
                                    </div>
                                </div>
                            ))}

                    </div>
                </div>
    

                <br />
                <br />
                
                <div className={styles.personal}>
                    <TextField value={values.verified} onChange={(e)=>{setValues({...values,verified:e.target.value})}} id="outlined-basic" placeholder="Verificado por" variant="outlined" />
                    <TextField value={values.fechaHora} onChange={(e)=>{setValues({...values,fechaHora:e.target.value})}} id="outlined-basic" placeholder="Fecha/hora" variant="outlined" />
                </div>
                <span><b>*</b> PIN(Termómetro de pinche) - IR (Termómetro infrarrojo)</span>

                <div className="btn">
                    <Button onClick={handleSubmit} variant="contained">Guardar</Button>
                </div>

            </div>
        </div>
        }
        
        { showAlert && <Alert type={typeAlert} text={textAlert}></Alert> }
        </>

    )
}

export default VerificacionTermometros