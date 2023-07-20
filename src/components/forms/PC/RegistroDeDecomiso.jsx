import { Button,  TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './RegistroDeDecomiso.module.css'
import { useSelector,useDispatch } from 'react-redux';
import registroDecomisosActions from '../../../redux/actions/registroDecomisosActions';
import axios from 'axios';

function RegistroDeDecomiso() {
    const dispatch = useDispatch()
    const prueba = useSelector(state=>state.registroDecomisosR.inputsValues)
    var idUser = localStorage.getItem("idUser");
    console.log("holi",prueba)
    const [inputs] = useState([
        { id: 1, label: 'Fecha' },
        { id: 2, label: 'Turno' },
        { id: 3, label: 'Producto decomisado' },
        { id: 4, label: 'Cantidad' },
        { id: 5, label: 'Fuera fecha vida util' },
        { id: 6, label: 'Fuera de aptitud' },
        { id: 7, label: 'Otras causas' },
        { id: 8, label: 'Destino final' },
        { id: 9, label: 'Responsable' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [values,setValues] = useState({
        inputs : [{
        }],
        idUser: idUser
    })
    const [objValues,setObjValues] = useState({fecha:"",turno:"",productoDecomisado:"",cantidad:"",fueraFecha:"",fueraAptitud:"",otrasCausas:"",destinoFinal:"",responsable:""})
    const [inputValues,setInputValues]= useState([])
    const [trigger,setTrigger] = useState(false)

    useEffect(()=>{
        if(replicas === 1 && objValues.fecha !== "" && objValues.turno !== "" && objValues.productoDecomisado !== "" && objValues.cantidad !== "" && objValues.fueraFecha !== "" && objValues.fueraAptitud !== "" && objValues.otrasCausas !== "" && objValues.destinoFinal !== "" && objValues.responsable !== ""  && objValues.id !=="") {

            setInputValues([objValues])
        }
        else if (replicas > 1 && objValues.fecha !== "" && objValues.turno !== "" && objValues.productoDecomisado !== "" && objValues.cantidad !== "" && objValues.fueraFecha !== "" && objValues.fueraAptitud !== "" && objValues.otrasCausas !== "" && objValues.destinoFinal !== "" && objValues.responsable !== ""&& objValues.id !=="") {

            setInputValues([...inputValues,objValues])
        }
    },[trigger])

    useEffect(()=>{
        setValues({...values,inputs:inputValues})
    },[inputValues])

    useEffect(()=>{
        if (objValues.fecha !== "" && objValues.turno !== "" && objValues.productoDecomisado !== "" && objValues.cantidad !== "" &&  objValues.fueraFecha !== "" && objValues.fueraAptitud !== "" && objValues.otrasCausas !== "" && objValues.destinoFinal !== "" && objValues.responsable !== ""){
            setTrigger(true)
        }
    },[objValues])

    const inputsValuesConstructor = (id,label,index) => {
        const inputTarget = document.getElementById(id)
        label === 'Fecha' ?  setObjValues({...objValues,fecha:inputTarget.value, id:index}) :
        label === 'Turno' ? setObjValues({...objValues,turno:inputTarget.value}) :
        label === 'Producto decomisado' ? setObjValues({...objValues,productoDecomisado:inputTarget.value}):
        label === 'Cantidad' ? setObjValues({...objValues,cantidad:inputTarget.value}):
        label === 'Fuera fecha vida util' ? setObjValues({...objValues,fueraFecha:inputTarget.value}):
        label === 'Fuera de aptitud' ? setObjValues({...objValues,fueraAptitud:inputTarget.value}):
        label === 'Otras causas' ? setObjValues({...objValues,otrasCausas:inputTarget.value}):
        label === 'Destino final' ? setObjValues({...objValues,destinoFinal:inputTarget.value}):
        label === 'Responsable' && setObjValues({...objValues,responsable:inputTarget.value})
    }

    const handleClick = () => {
        setReplicas(replicas + 1);
        setObjValues({fecha:"",turno:"",productoDecomisado:"",cantidad:"",fueraFecha:"",fueraAptitud:"",otrasCausas:"",destinoFinal:"",responsable:""})
        setTrigger(false)
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Registros de decomisos de materias primas</h3>
                    {/* <h4 className="formNumber">Q/SOP-03-R02</h4> */}
                </div>
                <div className="table">
                <div className={styles.subtituloTable}>
                    <p style={{textAlign: 'center', fontWeight:'bold'}}>Causa de decomiso</p>
                </div>
                <div className="tableSection">
                    {Array(replicas)
                        .fill(0)
                        .map((_, index) => (
                            <div className="tableRow" key={index}>
                                <p className="index">{index + 1} </p>

                                {inputs.map((input) => (
                                    <div key={input.id}>
                                        <TextField className='input' onKeyUp={(e)=>{
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
                

                <div className="btn">
                    <Button onClick={async()=>{
                         await axios.post('http://localhost:4000/api/registrodecomiso', values)
                       }} variant="contained">Guardar</Button>
                </div>

            </div>
        </div>
    )
}

export default RegistroDeDecomiso