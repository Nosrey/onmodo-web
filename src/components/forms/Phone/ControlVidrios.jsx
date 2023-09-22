import { Button, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import styles from './ControlVidrios.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import controlVidriosActions from '../../../redux/actions/controlVidriosActions';
import { useSelector,useDispatch } from 'react-redux';

function ControlVidrios() {
    const dispatch = useDispatch()
    const prueba = useSelector(state=>state.controlVidriosR.inputsValues)
    console.log("holi",prueba)
    const [inputs1] = useState([
        { id: 1, label: 'Fecha de Recepción' },
        { id: 2, label: 'Proveedor' },
        { id: 3, label: 'Alimento contenido en vidrio' },
        { id: 4, label: 'Responsable de control' },
    ]);
    const [replicas1, setReplicas1] = useState(1);
    const [values,setValues] = useState({
        inputs : [{
        }],
        inputsTwo : [{
        }],
        verificado: "",
        date: "",
        idUser:"643ea98d5b44dd9765966ae7"
    })
    const [objValues1,setObjValues1] = useState({fecha:"",proveedor:"",alimentoContenido:"",responsable:""})
    const [inputValues1,setInputValues1]= useState([])
    const [trigger1,setTrigger1] = useState(false)

    useEffect(()=>{
        if(replicas1 === 1 && objValues1.fecha !== "" && objValues1.proveedor !== "" && objValues1.alimentoContenido !== "" && objValues1.responsable !== "" && objValues1.id !=="") {
            setInputValues1([objValues1])
        }else if (replicas1 > 1 && objValues1.fecha !== "" && objValues1.proveedor !== "" && objValues1.alimentoContenido !== "" && objValues1.responsable !== "" && objValues1.id !=="") {
            setInputValues1([...inputValues1,objValues1])
        }
    },[trigger1])
    useEffect(()=>{
        setValues({...values,inputs:inputValues1})
    },[inputValues1])
    useEffect(()=>{
        if (objValues1.fecha !== "" && objValues1.proveedor !== "" && objValues1.alimentoContenido !== "" && objValues1.responsable !== ""){
            setTrigger1(true)
        }
    },[objValues1])

    const handleClick1 = () => {
        setReplicas1(replicas1 + 1);
        setObjValues1({fecha:"",proveedor:"",alimentoContenido:"",responsable:""})
        setTrigger1(false)
    };

    const [inputs2] = useState([
        { id: 100, label: 'Fecha' },
        { id: 200, label: 'Envase de vidrio roto' },
        { id: 300, label: 'Acción correctiva sobre el alimento potencialmente contaminado' },
        { id: 400, label: 'Responsable' },
    ]);
    const [replicas2, setReplicas2] = useState(1);
    const [objValues2,setObjValues2] = useState({fecha:"",envase:"",accionCorrectiva:"",responsable:""})
    const [inputValues2,setInputValues2]= useState([])
    const [trigger2,setTrigger2] = useState(false)

    useEffect(()=>{
        if(replicas2 === 1 && objValues2.fecha !== "" && objValues2.proveedor !== "" && objValues2.alimentoContenido !== "" && objValues2.responsable !== "" && objValues2.id !=="") {
            setInputValues2([objValues2])
        }else if (replicas2 > 1 && objValues2.fecha !== "" && objValues2.proveedor !== "" && objValues2.alimentoContenido !== "" && objValues2.responsable !== "" && objValues2.id !=="") {
            setInputValues2([...inputValues2,objValues2])
        }
    },[trigger2])
    useEffect(()=>{
        setValues({...values,inputsTwo:inputValues2})
    },[inputValues2])
    useEffect(()=>{
        if (objValues2.fecha !== "" && objValues2.proveedor !== "" && objValues2.alimentoContenido !== "" && objValues2.responsable !== ""){
            setTrigger2(true)
        }
    },[objValues2])
    const inputsValuesConstructor = (id,label,index,input) => {
        const inputTarget = document.getElementById(id)
        if(input === "input1"){
            label === 'Fecha de Recepción' ?  setObjValues1({...objValues1,fecha:inputTarget.value, id:index}) :
            label === 'Proveedor' ? setObjValues1({...objValues1,proveedor:inputTarget.value}) :
            label === 'Alimento contenido en vidrio' ? setObjValues1({...objValues1,alimentoContenido:inputTarget.value}):
            label === 'Responsable de control' && setObjValues1({...objValues1,responsable:inputTarget.value}) 
        }else{
            label === 'Fecha' ?  setObjValues2({...objValues2,fecha:inputTarget.value, id:index == 0 ? 100 : (index+1)*100}) :
            label === 'Envase de vidrio roto' ? setObjValues2({...objValues2,envase:inputTarget.value}) :
            label === 'Acción correctiva sobre el alimento potencialmente contaminado' ? setObjValues2({...objValues2,accionCorrectiva:inputTarget.value}):
            label === 'Responsable' && setObjValues2({...objValues2,responsable:inputTarget.value})
        }
    }

    const handleClick2 = () => {
        setReplicas2(replicas2 + 1);
        setObjValues2({fecha:"",envase:"",accionCorrectiva:"",responsable:""})
        setTrigger2(false);
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Control de Vidrios</h3>
                    {/* <h4 className="formNumber">Q/SOP-02-R01</h4> */}
                </div>

                <p>Registro de envases de vidrio y roturas</p>
                <span>Recepción</span>

                <div className="table">
                <div className="tableSection">
                    {Array(replicas1)
                        .fill(0)
                        .map((_, index) => (
                            <div className="tableRow" key={index}>
                                <p className="index">{index + 1} </p>

                                {inputs1.map((input) => (
                                    <div key={input.id}>
                                        <TextField onKeyUp={(e)=>{
                                            inputsValuesConstructor(`input-${input.id}-${index}`,input.label, index, "input1");
                                            }} id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} label={`${input.label}`} variant="outlined" />

                                    </div>
                                ))}
                                <div className="icon">
                                    <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick1} />
                                </div>
                            </div>
                        ))}

                </div>
                </div>
                <span>Daños</span>

                <div className="table">
                <div className="tableSection">
                    {Array(replicas2)
                        .fill(0)
                        .map((_, index) => (
                            <div className="tableRow" key={index}>
                                <p className="index">{index + 1} </p>

                                {inputs2.map((input) => (
                                    <div key={input.id}>
                                        <TextField onKeyUp={(e)=>{
                                            inputsValuesConstructor(`input-${input.id}-${index}`,input.label, index,"input2");
                                            }} id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} label={`${input.label}`} variant="outlined" />

                                    </div>
                                ))}
                                <div className="icon">
                                    <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick2} />
                                </div>
                            </div>
                        ))}

                </div>
                </div>
        
                <div className="btn">
                    <Button onClick={()=>{
                        dispatch(controlVidriosActions.logIn(values))}} variant="contained">Guardar</Button>
                </div>

            </div>
        </div>
    )
}

export default ControlVidrios