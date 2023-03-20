import { Button, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';

function EntregaBidonesAceiteUsado() {
    const [inputs] = useState([
        { id: 1, label: 'Fecha' },
        { id: 2, label: 'Cantidad de Litros entregados' },
        { id: 3, label: 'Responsable de Entrega' },
        { id: 4, label: 'Responsable de Retiro' },
        { id: 5, label: 'Certificado de Transporte' },
        { id: 6, label: 'Certificado de Disposición final' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [values, setValues] = useState({
        inputsValues : [{
        }]
    })
    const [objValues,setObjValues] = useState({fecha:"",cantidad:"",firmaEmisor:"",firmaReceptor:""})
    const [inputValues,setInputValues]= useState([])
    const [trigger,setTrigger] = useState(false)

    useEffect(()=>{
        if(replicas === 1 && objValues.fecha !== "" && objValues.cantidad !== "" && objValues.firmaEmisor !== "" && objValues.firmaReceptor !== "") {
            setInputValues([objValues])
        }else if (replicas > 1 && objValues.fecha !== "" && objValues.cantidad !== "" && objValues.firmaEmisor !== "" && objValues.firmaReceptor !== "") {
            setInputValues([...inputValues,objValues])
        }
    },[trigger])

    useEffect(()=>{
        setValues({...values,inputsValues:inputValues})
    },[inputValues])

    useEffect(()=>{
        if (objValues.fecha !== "" && objValues.cantidad !== "" && objValues.firmaEmisor !== "" && objValues.firmaReceptor !== ""){
            setTrigger(true)
        }
    },[objValues])

    const inputsValuesConstructor = (id,label,index) => {
        const inputTarget = document.getElementById(id)
        label === 'Fecha' ?  setObjValues({...objValues,fecha:inputTarget.value, id:index}) :
        label === 'Cantidad de Bidones entregados' ? setObjValues({...objValues,cantidad:inputTarget.value}) :
        label === 'Firma Emisor (ARAMARK)' ? setObjValues({...objValues,firmaEmisor:inputTarget.value}):
        label === 'Firma Receptor (Cliente)' && setObjValues({...objValues,firmaReceptor:inputTarget.value})
    }

    const handleClick = () => {
        setReplicas(replicas + 1);
        setObjValues({fecha:"",cantidad:"",firmaEmisor:"",firmaReceptor:""})
        setTrigger(false)
    };

    return (
        <div>
        <div className="form">
            <div className="titleContainer">
                <h3 className="title">Circuito de Aceite Usado</h3>
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
                                            }} id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} label={`${input.label}`}  variant="outlined" />

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
                        console.log(values)}} variant="contained">Generar PDF</Button>
            </div>

        </div>
    </div>
    )
}

export default EntregaBidonesAceiteUsado