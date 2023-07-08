import { Button, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import styles from './RegistroSimulacro.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';

function RegistroSimulacro() {
    const [inputs] = useState([
        { id: 1, label: 'Apellido y Nombre' },
        { id: 2, label: 'Nro DNI' },
        { id: 3, label: 'Firma' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [values,setValues] = useState({
        razonSocial:"",
        ubicacion:"",
        localidad:"",
        fecha:"",
        inputsValues : [{
        }],
        firmaInstructor:""
    })
    const [objValues,setObjValues] = useState({nombreCompleto:"",dni:"",firma:""})
    const [inputValues,setInputValues]= useState([])
    const [trigger,setTrigger] = useState(false)

    useEffect(()=>{
        if(replicas === 1 && objValues.nombreCompleto !== "" && objValues.dni !== "" && objValues.firma !== "" ) {
            setInputValues([objValues])
        }else if (replicas > 1 && objValues.nombreCompleto !== "" && objValues.dni !== "" && objValues.firma !== "" ) {
            setInputValues([...inputValues,objValues])
        }
    },[trigger])

    useEffect(()=>{
        setValues({...values,inputsValues:inputValues})
    },[inputValues])

    useEffect(()=>{
        if (objValues.nombreCompleto !== "" && objValues.dni !== "" && objValues.firma !== ""){
            setTrigger(true)
        }
    },[objValues])

    const inputsValuesConstructor = (id,label,index) => {
        const inputTarget = document.getElementById(id)
        label === 'Apellido y Nombre' ?  setObjValues({...objValues,nombreCompleto:inputTarget.value, id:index}) :
        label === 'Nro DNI' ? setObjValues({...objValues,dni:inputTarget.value}) :
        label === 'Firma' && setObjValues({...objValues,firma:inputTarget.value})
    }

    const handleClick = () => {
        setReplicas(replicas + 1);
        setObjValues({nombreCompleto:"",dni:"",firma:""})
        setTrigger(false)
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Registro de Simulacro</h3>
                    {/* <h4 className="formNumber"> HS-02-R01</h4> */}
                </div>

                <div className={styles.personal}>
                    <p>Curso: Manejo Extintores –Plan Emergencia y Evacuación –Simulacro Evacuación“Según Ley 1346/04” –Sistema de alarma y señal de evacuación.</p>
                </div>
                <div className={styles.personalText}>
                    <TextField onChange={(e)=>{setValues({...values,razonSocial:e.target.value})}} fullWidth id="outlined-basic" label="Razón Social" variant="outlined" />
                </div>

                <div className={styles.personal}>
                    <TextField onChange={(e)=>{setValues({...values,ubicacion:e.target.value})}} id="outlined-basic" label="Ubicación" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,localidad:e.target.value})}} id="outlined-basic" label="Localidad" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,fecha:e.target.value})}} id="outlined-basic" label="Fecha:" variant="outlined" />
                </div>
        
             
                <div className="table"> 
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
                                            }} id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} label={`${input.label}`} variant="outlined" />

                                        </div>
                                    ))}
                                    <div className="icon">
                                        <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick} />
                                    </div>
                                </div>
                            ))}

                    </div>
                </div>
             

                <div className={styles.responsableCont}>
                    <div className={styles.subtitleCont}>
                        <p className={styles.subtitle}>CONTENIDO:</p>
                    </div>

                    <ul>
                        <li>Clase de fuegos.</li>
                        <li>Tipo de Extintores.</li>
                        <li>Manejo de extintores.</li>
                        <li>Sistema de alarma y señal de evacuación.</li>
                        <li>Presentación del plan de emergencias y evacuación.</li>
                        <li>Contenidos –Definiciones –Procedimiento de evacuación.</li>
                        <li>Recomendaciones prácticas y medidas de seguras –vías de evacuación –Roles.</li>
                    </ul>
                </div>

                <div className={styles.responsableCont}>
                    <div className={styles.subtitleCont}>
                        <p className={styles.subtitle}>OBSERVACIONES:</p>
                    </div>

                    <ul>
                        <li>Se entrega material didáctico.</li>
                    </ul>
                </div>

    
                <div className={styles.personal}>
                    <TextField onChange={(e)=>{setValues({...values,firmaInstructor:e.target.value})}} id="outlined-basic" label="Firma del Instructor" variant="outlined" />
                </div>
                <div className="btn">
                    <Button onClick={()=>{
                        console.log(values)}} variant="contained">Guardar</Button>

                </div>

            </div>
        </div>
    )
}

export default RegistroSimulacro