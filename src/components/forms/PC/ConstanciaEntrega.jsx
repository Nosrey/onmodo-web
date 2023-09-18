import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import React, { useState,useEffect } from 'react'
import styles from './ConstanciaEntrega.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckboxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { useSelector} from 'react-redux';
import Alert from '../../shared/components/Alert/Alert';
import { entregaRopa } from '../../../services/FormsRequest';

function ConstanciaEntrega() {
    //** ALERTA */
    const [textAlert, setTextAlert] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [showAlert, setShowlert] = useState(false);

    const prueba = useSelector(state=>state.constanciaEntregaR.inputsValues)
    console.log("holi",prueba)
    const [inputs] = useState([
        { id: 1, label: 'Producto' },
        { id: 2, label: 'Tipo/modelo' },
        { id: 3, label: 'Marca' },
        { id: 4, label: 'Posee certificacion' },
        { id: 5, label: 'Cantidad' },
        { id: 6, label: 'Fecha de entrega' },
        { id: 7, label: 'Firma del trabajador' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [showTextField, setShowTextField] = useState(false);
    const [values,setValues] = useState({
        nombre:"",
        contrato:"",
        dni:"",
        direccion:"",
        localidad:"",
        cp:"",
        provincia:"",
        descripcion:"",
        infoAdicional:"",
        inputs : [{
        }],
        checkboxes:[],
        date: "",
        idUser:"643ea98d5b44dd9765966ae7"
    })
    const [objValues,setObjValues] = useState({producto:"",tipo:"",marca:"",certificacion:"",cantidad:"",fecha:"",firma:""})
    const [inputValues,setInputValues]= useState([])
    const [check,setCheck]=useState([{
        check0:false,
        check1:false,
        check2:false,
        check3:false,
        check4:false,
        check5:false
    }])
    const [checkValues,setCheckValues]=useState({
        check0:false,
        check1:false,
        check2:false,
        check3:false,
        check4:false,
        check5:false
    })
    const [trigger,setTrigger] = useState(false)
    useEffect(()=>{
        if(replicas === 1 && objValues.producto !== "" && objValues.tipo !== "" && objValues.marca !== "" && objValues.certificacion !== "" && objValues.cantidad !== "" &&objValues.fecha !== "" && objValues.firma !== ""&& objValues.id !=="") {
            setInputValues([objValues])
        }else if (replicas > 1 && objValues.producto !== "" && objValues.tipo !== "" && objValues.marca !== "" && objValues.certificacion !== "" && objValues.cantidad !== "" &&objValues.fecha !== ""&& objValues.firma !== "" && objValues.id !=="") {
            setInputValues([...inputValues,objValues])
        }
    },[trigger])
    useEffect(()=>{
        setValues({...values,inputs:inputValues,checkboxes:check})
    },[inputValues,check])
    useEffect(()=>{
        if (objValues.producto !== "" && objValues.tipo !== "" && objValues.marca !== "" && objValues.certificacion !== "" && objValues.cantidad !== "" && objValues.fecha !== "" && objValues.firma !== ""){
            setTrigger(true)
        }
    },[objValues])
   useEffect(()=>{
    setCheck([checkValues])
   },[checkValues])
    const inputsValuesConstructor = (id,label,index) => {
        const inputTarget = document.getElementById(id)
        label === 'Producto' ?  setObjValues({...objValues,producto:inputTarget.value, id:index}) :
        label === 'Tipo/modelo' ? setObjValues({...objValues,tipo:inputTarget.value}) :
        label === 'Marca' ? setObjValues({...objValues,marca:inputTarget.value}):
        label === 'Posee certificacion' ? setObjValues({...objValues,certificacion:inputTarget.value}):
        label === 'Cantidad' ? setObjValues({...objValues,cantidad:inputTarget.value}):
        label === 'Fecha de entrega' ? setObjValues({...objValues,fecha:inputTarget.value}):
        label === 'Firma del trabajador' && setObjValues({...objValues,firma:inputTarget.value})
    }
    const handleCheck = (n,v) => {
        setCheckValues({...checkValues,[n]:v})
        /* setCheck(check.pop()) */
    }
    const handleClick = () => {
        setReplicas(replicas + 1);
        setObjValues({producto:"",tipo:"",marca:"",certificacion:"",cantidad:"",fecha:"",firma:""})
        setTrigger(false)
    };
    const handleClickRemove = () => {
        const inputsArrFiltered = inputValues.filter(input=>input.id !== replicas - 1)
        setInputValues(inputsArrFiltered)
        setReplicas(replicas - 1);
    }

    const handleCheckboxChange = (event) => {
        setShowTextField(event.target.checked);
    };

    const handleSubmit = () => {
        entregaRopa(values).then((resp)=> {
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

    return (
        <>
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Constancia de Entrega de Ropa de Trabajo y de E.P.P</h3>
                </div>
                <div className={styles.personal}>
                    <TextField onChange={(e)=>{setValues({...values,nombre:e.target.value})}} id="outlined-basic" label="Apellido y nombre" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,contrato:e.target.value})}} id="outlined-basic" label="Contrato" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,dni:e.target.value})}} id="outlined-basic" label="DNI/Legajo" variant="outlined" />
                </div>
                <div className={styles.personal}>
                    <TextField onChange={(e)=>{setValues({...values,direccion:e.target.value})}} id="outlined-basic" label="Direccion" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,localidad:e.target.value})}} id="outlined-basic" label="Localidad" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,cp:e.target.value})}} id="outlined-basic" label="CP" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,provincia:e.target.value})}} id="outlined-basic" label="Provincia" variant="outlined" />
                </div>
                <div className={styles.personalText}>
                    <TextField onChange={(e)=>{setValues({...values,descripcion:e.target.value})}} fullWidth id="outlined-basic" label="Descripcion breve de las tareas a realizar" variant="outlined" />
                </div>
                <div className={styles.personal}>
                    <FormControlLabel control={<Checkbox checked = {check[0].check0} onChange={(e)=>{handleCheck("check0",e.target.checked)} }/>} label="Ropa de trabajo" />
                    <FormControlLabel control={<Checkbox checked = {check[0].check1} onChange={(e)=>{handleCheck("check1",e.target.checked)} }/>} label="Guantes" />
                    <FormControlLabel control={<Checkbox checked = {check[0].check2} onChange={(e)=>{handleCheck("check2",e.target.checked)} }/>} label="Calzado de seguridad" />
                    <FormControlLabel control={<Checkbox checked = {check[0].check3} onChange={(e)=>{handleCheck("check3",e.target.checked)} }/>} label="Antiparras" />
                    <FormControlLabel control={<Checkbox checked = {check[0].check4} onChange={(e)=>{handleCheck("check4",e.target.checked)} }/>} label="Barbijo" />
                    <FormControlLabel control={<Checkbox checked = {check[0].check5} onChange={(e)=>{handleCheck("check5",e.target.checked)} } />} label="Cofia" />
                    <div>

                        <FormControlLabel control={<Checkbox
                            id="showTextField"
                            name="showTextField"
                            onChange={handleCheckboxChange} />} label="Otros" />
                        <label htmlFor="showTextField"></label>

                    </div>
                </div>
                
                <div className={styles.personal}>
                    {showTextField && (
                        <TextField id="outlined-basic" name="textField" variant="outlined" label="Otros" />
                    )}
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
                                        {input.label === "Fecha de entrega" ? (
                                            <TextField
                                                onBlur={(e) => {
                                                    inputsValuesConstructor(`input-${input.id}-${index}`, input.label, index);
                                                }}
                                                id={`input-${input.id}-${index}`}
                                                name={`input-${input.id}-${index}`}
                                                label={`${input.label}`}
                                                value={values.inputs[index]?.diagnostico || ''}
                                                variant="outlined"
                                                type="date"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        ) : (
                                            <TextField onKeyUp={(e)=>{
                                            inputsValuesConstructor(`input-${input.id}-${index}`,input.label, index);
                                            }} className='input'  id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} label={`${input.label}`} variant="outlined" />
                                        )}
                                        </div>
                                    ))}
                                    <div className="icon">
                                    {
                                        (index == 0 || index > Array(replicas).fill(0).length) ? 
                                        <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick} />
                                        :  <IndeterminateCheckboxIcon style={{ color: 'grey' }} onClick={handleClickRemove} />
                                    }
                                    </div>
                                </div>
                            ))}

                    </div>
                </div>
                
                <div className={styles.personal}>
                    <TextField onChange={(e)=>{setValues({...values,infoAdicional:e.target.value})}} fullWidth id="outlined-basic" label="Informacion adicional" variant="outlined" />
                </div>
                <div className="btn">
                    <Button onClick={handleSubmit} variant="contained">Guardar</Button>

                </div>

            </div>
        </div>
        { showAlert && <Alert type={typeAlert} text={textAlert}></Alert> }
        </>
        
    )
}

export default ConstanciaEntrega