import { Button, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import styles from './AlergenosComida.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';


function AlergenosComida() {
    const [inputs] = useState([
        { id: 1, label: 'Fecha' },
        { id: 2, label: 'Nombre Comensal' },
        { id: 3, label: 'Preparación' },
        { id: 4, label: 'Listado de ingredientes' },
        { id: 5, label: 'Responsable' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [values,setValues] = useState({
        comedor:"",
        inputsV : [{
        }],
        verificado: "",
        fecha: ""
    })
    /* useEffect(()=>{
        setValues({...values,inputsV:[objValues]})
    },[objValues]) */
    const [objValues,setObjValues] = useState({fecha:"",nombre:"",preparacion:"",listado:"",responsable:""})
    const prueba = (id,label) => {
        const inputTarget = document.getElementById(id)
        label === 'Fecha' ?  setObjValues({...objValues,fecha:inputTarget.value}) /* ({...values,inputsV:[{...values.inputsV,fecha:inputTarget.value}]}) */:
        label === 'Nombre Comensal' ? setObjValues({...objValues,nombre:inputTarget.value}) /* setValues({...values,inputsV:[...values.inputsV,{nombre:inputTarget.value}]}) */:
        label === 'Preparación' ? setObjValues({...objValues,preparacion:inputTarget.value})/* setValues({...values,inputsV:[{preparacion:inputTarget.value}]}) */:
        label === 'Listado de ingredientes' ? setObjValues({...objValues,listado:inputTarget.value})/* setValues({...values,inputsV:[{listado:inputTarget.value}]}) */:
        label === 'Responsable' && setObjValues({...objValues,responsable:inputTarget.value})/* setValues({...values,inputsV:[{responsable:inputTarget.value}]}) */
    }
    const lastValues = (value)=>{
        console.log(value)
        setValues({...values,fecha:value});
        /* setValues({...values,inputsV:[objValues]}) */
    }
    const handleClick = () => {
        setReplicas(replicas + 1);
    };
    console.log(values)
    console.log(objValues)
    console.log(inputs)
    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Control de Alérgenos en las Comidas</h3>
                    {/* <h4 className="formNumber">Q/SOP-10-R02</h4> */}
                </div>
                <div className={styles.personal}>
                    <TextField onChange={(e)=>{setValues({...values,comedor:e.target.value})}} fullWidth id="outlined-basic" label="Comedor" variant="outlined" />
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
                                        <TextField onChange={(e)=>{prueba(`input-${input.id}-${index}`,input.label) /* setValues({...values, inputs:[...inputs,]}) */}} id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} label={`${input.label}`} variant="outlined" />

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
                    <TextField onChange={(e)=>{
                        lastValues(e.target.value)
                    }} onBlur={()=>{setValues({...values,inputsV:[objValues]});}} id="outlined-basic" label="Fecha" variant="outlined" />
                </div>
                <div className="btn">
                    <Button variant="contained">Generar PDF</Button>
                </div>

            </div>
        </div>
    )
}

export default AlergenosComida