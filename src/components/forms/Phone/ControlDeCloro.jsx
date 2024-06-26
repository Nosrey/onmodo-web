import { Button, Chip, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import styles from './ControlDeCloro.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useSelector,useDispatch } from 'react-redux';
import controlCloroActions from '../../../redux/actions/controlCloroActions';

function ControlDeCloro() {
    const dispatch = useDispatch()
    const prueba = useSelector(state=>state.controlCloroR.inputsValues)
    console.log("holi",prueba)
    const [inputs] = useState([
        { id: 1, label: 'Fecha' },
        { id: 2, label: 'Punto de toma de agua evaluado' },
        { id: 3, label: 'Punto de Corte' },
        { id: 4, label: 'Acciones de correcion' },
        { id: 5, label: 'Responsable' },
    ]);

    const [replicas, setReplicas] = useState(1);
    const [values,setValues] = useState({
        inputs : [{
        }],
        verificado: "",
        idUser:"643ea98d5b44dd9765966ae7"
    })
    const [objValues,setObjValues] = useState({fecha:"", puntoToma:"", "menor0,2":"", "0,2-0,5":"", "0,5-0,8":"", "mayor0,8":"", acciones:"", responsable:""})
    const [inputValues,setInputValues]= useState([])
    const [trigger,setTrigger] = useState(false)

    useEffect(()=>{
        if(replicas === 1 && objValues.fecha !== "" && objValues.puntoToma !== "" && objValues['menor0,2'] !== "" && objValues["0,2-0,5"] !== "" && objValues["0,5-0,8"] !== "" && objValues["mayor0,8"] !== "" && objValues.responsable !== "" && objValues.id !=="") {
            setInputValues([objValues])
        }else if (replicas > 1 && objValues.fecha !== "" && objValues.puntoToma !== "" && objValues['menor0,2'] !== "" && objValues["0,2-0,5"] !== "" && objValues["0,5-0,8"] !== "" && objValues["mayor0,8"] !== "" && objValues.responsable !== "" && objValues.id !=="") {
            setInputValues([...inputValues,objValues])
        }
    },[trigger])

    useEffect(()=>{
        setValues({...values,inputs:inputValues})
    },[inputValues])

    useEffect(()=>{
        if (objValues.fecha !== "" && objValues.puntoToma !== "" && objValues['menor0,2'] !== "" && objValues["0,2-0,5"] !== "" && objValues["0,5-0,8"] !== "" && objValues["mayor0,8"] !== "" && objValues.responsable !== ""){
            setTrigger(true)
        }
    },[objValues])

    const inputsValuesConstructor = (id,label,index) => {
        const inputTarget = document.getElementById(id)
        label === 'Fecha' ?  setObjValues({...objValues,fecha:inputTarget.value, id:index}) :
        label === 'Punto de toma de agua evaluado' ? setObjValues({...objValues,puntoToma:inputTarget.value}) :
        label === 'Menor 0,2 (Valor ppm)' ? setObjValues({...objValues,"menor0,2":inputTarget.value}):
        label === '0,2 - 0,5 (Valor ppm)' ? setObjValues({...objValues,"0,2-0,5":inputTarget.value}):
        label === '0,5 - 0,8 (Valor ppm)' ? setObjValues({...objValues,"0,5-0,8":inputTarget.value}):
        label === 'Mayor a 0,8 (Valor ppm)' ? setObjValues({...objValues,"mayor0,8":inputTarget.value}):
        label === 'Acciones de correcion' ? setObjValues({...objValues,acciones:inputTarget.value}):
        label === 'Responsable' && setObjValues({...objValues,responsable:inputTarget.value})
    }

    const handleClick = () => {
        setReplicas(replicas + 1);
        setObjValues({fecha:"", puntoToma:"", "menor0,2":"", "0,2-0,5":"", "0,5-0,8":"", "mayor0,8":"", acciones:"", responsable:""})
        setTrigger(false)
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Control de cloro activo residual</h3>
                    {/* <h4 className="formNumber">Q/SOP-07-R02</h4> */}
                </div>

                <div className={styles.chipContainer}>
                    <div>
                        <div className={styles.chipIntern}>
                            <Chip label="Valor mínimo: 0,2 ppm." />

                        </div>
                        <Chip label="Instrumento: Test Kit de cloro activo total." />
                    </div>
                    <div className={styles.chipAction}>
                        <div className={styles.chipOnly}>
                            <Chip label="Acciones de corrección:" />

                        </div>
                        <div className={styles.chipOnly}>
                            <Chip label="1- Dar aviso escrito al cliente." />

                        </div>
                        <div>
                            <Chip label="2-Definir fecha inmediata de lavado y desinfección de reservorios de agua." />

                        </div>  

                        <div>
                            <Chip label="2-Sin Acción Correctiva." />
                        </div>
                    </div>
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
              

                <div className={styles.verified}>
                    <TextField onChange={(e)=>{setValues({...values,verificado:e.target.value})}} fullWidth id="outlined-basic" label="Verificado por:" variant="outlined" />
                </div>

                <div className="btn">
                    <Button onClick={()=>{
                        dispatch(controlCloroActions.logIn(values))}} variant="contained">Guardar</Button>
                </div>

            </div>
        </div>
    )
}

export default ControlDeCloro