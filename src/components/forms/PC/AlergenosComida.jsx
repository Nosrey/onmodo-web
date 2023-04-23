import { Button, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import controlComensalesActions from '../../../redux/actions/controlComensalesActions';
import styles from './AlergenosComida.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckboxIcon from '@mui/icons-material/IndeterminateCheckBox';

function AlergenosComida() {
    const dispatch = useDispatch();
    const formValue = useSelector(state=>state.comensalesR.inputsValues)
    console.log(formValue)
    const [inputs] = useState([
        { id: 1, label: 'Fecha' },
        { id: 2, label: 'Nombre Comensal' },
        { id: 3, label: 'Diagnóstico' },
        { id: 4, label: 'Listado de ingredientes' },
        { id: 5, label: 'Responsable' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [values,setValues] = useState({
        comedor:"",
        inputs : [{
        }],
        verified: "",
        date: "",
        idUser:"643ea98d5b44dd9765966ae7"
    })
    const [objValues,setObjValues] = useState({fecha:"",nombre:"",diagnostico:"",listado:"",responsable:""})
    const [inputValues,setInputValues]= useState([])
    const [trigger,setTrigger] = useState(false)
    useEffect(()=>{
        if(replicas === 1 && objValues.fecha !== "" && objValues.nombre !== "" && objValues.diagnostico !== "" && objValues.listado !== "" && objValues.responsable !== "" && objValues.id !=="") {
            setInputValues([objValues])
        }else if (replicas > 1 && objValues.fecha !== "" && objValues.nombre !== "" && objValues.diagnostico !== "" && objValues.listado !== "" && objValues.responsable !== "" && objValues.id !=="") {
            setInputValues([...inputValues,objValues])
        }
    },[trigger])
    useEffect(()=>{
        setValues({...values,inputs:inputValues})
    },[inputValues])
    useEffect(()=>{
        if (objValues.fecha !== "" && objValues.nombre !== "" && objValues.diagnostico !== "" && objValues.listado !== "" && objValues.responsable !== ""){
            setTrigger(true)
        }
    },[objValues])
   
    const inputsValuesConstructor = (id,label,index) => {
        const inputTarget = document.getElementById(id)
        label === 'Fecha' ?  setObjValues({...objValues,fecha:inputTarget.value, id:index}) :
        label === 'Nombre Comensal' ? setObjValues({...objValues,nombre:inputTarget.value}) :
        label === 'Diagnóstico' ? setObjValues({...objValues,diagnostico:inputTarget.value}):
        label === 'Listado de ingredientes' ? setObjValues({...objValues,listado:inputTarget.value}):
        label === 'Responsable' && setObjValues({...objValues,responsable:inputTarget.value})
    }
    const handleClick = () => {
        setReplicas(replicas + 1);
        setObjValues({fecha:"",nombre:"",diagnostico:"",listado:"",responsable:""})
        setTrigger(false)
    };
    const handleClickRemove = (index) => {
        /* const inputsArrFiltered = inputValues.filter(inputs=>inputs.id !== index) */ //dejo comentado esperando respuestas de los audios jeje
        const inputsArrFiltered = inputValues.filter(input=>input.id !== replicas - 1)
        setInputValues(inputsArrFiltered)
        setReplicas(replicas - 1);
    }

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Control de comensales con dietas especiales</h3>
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
                                        <TextField onBlur={(e)=>{
                                            inputsValuesConstructor(`input-${input.id}-${index}`,input.label, index);
                                            }} id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} label={`${input.label}`} variant="outlined" />
                                    </div>
                                ))}
                                <div className="icon">
                                    {
                                        (index == 0 || index > Array(replicas).fill(0).length) ? 
                                        <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick} />
                                        :  <IndeterminateCheckboxIcon style={{ color: 'grey' }} onClick={()=>{handleClickRemove(index)}} />
                                    }
                                </div>
                            </div>
                        ))}
                </div>
                </div>
                <div className={styles.personal}>
                    <TextField onChange={(e)=>{setValues({...values,verified:e.target.value})}} id="outlined-basic" label="Verificado por" variant="outlined" />
                    <TextField onChange={(e)=>{
                        setValues({...values,date:e.target.value})
                    }} id="outlined-basic" label="Fecha" variant="outlined" />
                </div>
                <div className="btn">
                    <Button onClick={()=>{
                        dispatch(controlComensalesActions.logIn(values))}} variant="contained">Generar PDF</Button>
                </div>

            </div>
        </div>
    )
}

export default AlergenosComida