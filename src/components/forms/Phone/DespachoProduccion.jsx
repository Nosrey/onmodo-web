import { Button, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import styles from './DespachoProduccion.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import despachoProduccionActions from '../../../redux/actions/despachoProduccionActions';
import { useSelector,useDispatch } from 'react-redux';

function DespachoProduccion() {
    const dispatch = useDispatch()
    const prueba = useSelector(state=>state.despachoProduccionR.inputsValues)
    console.log("holi",prueba)
    const [inputs] = useState([
        { id: 1, label: 'Producto' },
        { id: 2, label: 'Cantidad Planificada' },
        { id: 3, label: 'Cantidad Real' },
        { id: 4, label: 'Proveedor' },
        { id: 5, label: 'Lote' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [values,setValues] = useState({
        inputsValues : [{
        }],
        date: "",
        idUser:"643ea98d5b44dd9765966ae7"
    })
    const [objValues,setObjValues] = useState({producto:"",cantidadPlanificada:"",cantidadReal:"",proveedor:"",lote:""})
    const [inputValues,setInputValues]= useState([])
    const [trigger,setTrigger] = useState(false)

    useEffect(()=>{
        if(replicas === 1 && objValues.producto !== "" && objValues.cantidadPlanificada !== "" && objValues.cantidadReal !== "" && objValues.proveedor !== "" && objValues.lote !== "" && objValues.id !=="") {
            setInputValues([objValues])
        }else if (replicas > 1 && objValues.producto !== "" && objValues.cantidadPlanificada !== "" && objValues.cantidadReal !== "" && objValues.proveedor !== "" && objValues.lote !== "" && objValues.id !=="") {
            setInputValues([...inputValues,objValues])
        }
    },[trigger])
    useEffect(()=>{
        setValues({...values,inputsValues:inputValues})
    },[inputValues])
    useEffect(()=>{
        if (objValues.producto !== "" && objValues.cantidadPlanificada !== "" && objValues.cantidadReal !== "" && objValues.proveedor !== "" && objValues.lote !== ""){
            setTrigger(true)
        }
    },[objValues])

    const inputsValuesConstructor = (id,label,index) => {
        const inputTarget = document.getElementById(id)
        label === 'Producto' ?  setObjValues({...objValues,producto:inputTarget.value, id:index}) :
        label === 'Cantidad Planificada' ? setObjValues({...objValues,cantidadPlanificada:inputTarget.value}) :
        label === 'Cantidad Real' ? setObjValues({...objValues,cantidadReal:inputTarget.value}):
        label === 'Proveedor' ? setObjValues({...objValues,proveedor:inputTarget.value}):
        label === 'Lote' && setObjValues({...objValues,lote:inputTarget.value})
    }

    const handleClick = () => {
        setReplicas(replicas + 1);
        setObjValues({producto:"",cantidadPlanificada:"",cantidadReal:"",proveedor:"",lote:""})
        setTrigger(false)
    };
    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Planilla de Despacho a Producción</h3>
                    {/* <h4 className="formNumber">Q/SOP-12-R01</h4> */}
                </div>

                <p>Los productos que deben registrarse en la siguiente planilla son:</p>
                <ul>
                    <li>Carnes vacunas</li>
                    <li>Pollo</li>
                    <li>Pescado</li>
                    <li>Cerdo</li>
                    <li>Huevo pasteurizado (líquido, barra, salmuera)</li>
                </ul>

                <p className={styles.frecuencia}>Frecuencia: Diaria</p>
              


                <div className={styles.personal}>
                    <TextField onChange={(e)=>{setValues({...values,date:e.target.value})}} id="outlined-basic" label="Fecha" variant="outlined" />
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
                                            }} className='' id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} label={`${input.label}`} variant="outlined" />

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
                        dispatch(despachoProduccionActions.logIn(values))}} variant="contained">Guardar</Button>

                </div>

            </div>
        </div>
    )
}

export default DespachoProduccion