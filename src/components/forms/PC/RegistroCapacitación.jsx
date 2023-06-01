import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import React, { useState,useEffect } from 'react'
import styles from './RegistroCapacitacion.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useDispatch,useSelector } from 'react-redux';
import registroCapacitacionActions from '../../../redux/actions/registroCapacitacionActions';

function RegistroCapacitacion() {
    const dispatch = useDispatch()
    const prueba = useSelector(state=>state.registroCapacitacionR.inputsValues)
    console.log("holi",prueba)
    const [inputs] = useState([
        { id: 1, label: 'DNI' },
        { id: 2, label: 'Nombre y Apellido' },
        { id: 3, label: 'Area/Lugar de trabajo' },
        { id: 4, label: 'Firma' },
        { id: 5, label: 'Resultado Evaluación' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [showTextField1, setShowTextField1] = useState(false);
    const [showTextField2, setShowTextField2] = useState(false);

    const [values,setValues] = useState({
        fecha:"",
        tiempoDuracion:"",
        checkboxes:[{}],
        temas:"",
        materialEntregado:[{}],
        materialExpuesto:[{}],
        asistentes : [{
        }],
        observaciones: "",
        instructor:"",
        cargo:"",
        firma:"",
        date: "",
        idUser:"643ea98d5b44dd9765966ae7"
    })
    const [objValues,setObjValues] = useState({dni:"",nombre:"",area:"",firma:"",resultado:""})
    const [checkboxesValues]=useState([
        {label:"Inducción",check:false},
        {label:"Campaña",check:false},
        {label:"Entrenamiento Puesto de trabajo",check:false},
        {label:"Capacitaciones gubernamentales",check:false},
        {label:"Capacitación sobre Normas o Certificaciones",check:false},
        {label:"Cierre Auditoría",check:false}
    ])
    const [materialEntregadoValues]=useState([
        {label:"Manual /instructivo",check:false},
        {label:"Folleto",check:false},
        {label:"Procedimiento",check:false}
    ])
    const[materialExpuestoValues]=useState([
        {label:"Video",check:false},
        {label:"Filminas",check:false},
        {label:"Disertación",check:false}
    ])
    const [inputValues,setInputValues]= useState([])
    const [trigger,setTrigger] = useState(false)
    useEffect(()=>{
        if(replicas === 1 && objValues.dni !== "" && objValues.nombre !== "" && objValues.area !== "" && objValues.firma !== "" && objValues.resultado !== "" && objValues.id !=="") {
            setInputValues([objValues])
        }else if (replicas > 1 && objValues.dni !== "" && objValues.nombre !== "" && objValues.area !== "" && objValues.firma !== "" && objValues.resultado !== "" && objValues.id !=="") {
            setInputValues([...inputValues,objValues])
        }
    },[trigger])
    useEffect(()=>{
        setValues({...values,asistentes:inputValues})
    },[inputValues])
    useEffect(()=>{
        if (objValues.dni !== "" && objValues.nombre !== "" && objValues.area !== "" && objValues.firma !== "" && objValues.resultado !== ""){
            setTrigger(true)
        }
    },[objValues])
   
    const inputsValuesConstructor = (id,label,index) => {
        const inputTarget = document.getElementById(id)
        label === 'DNI' ?  setObjValues({...objValues,dni:inputTarget.value, id:index}) :
        label === 'Nombre y Apellido' ? setObjValues({...objValues,nombre:inputTarget.value}) :
        label === 'Area/Lugar de trabajo' ? setObjValues({...objValues,area:inputTarget.value}):
        label === 'Firma' ? setObjValues({...objValues,firma:inputTarget.value}):
        label === 'Resultado Evaluación' && setObjValues({...objValues,resultado:inputTarget.value})
    }

    const checkboxValuesConstructor = (label,value)=>{
        console.log(value)
        if (label === 'Inducción'){
            checkboxesValues[0].check = value
            setValues({...values,checkboxes:checkboxesValues})
        }
        else if (label === "Campaña") {
            checkboxesValues[1].check = value
            setValues({...values,checkboxes:checkboxesValues})
        }
        else if (label === "Entrenamiento Puesto de trabajo") {
            checkboxesValues[2].check = value
            setValues({...values,checkboxes:checkboxesValues})
        }
        else if (label === "Capacitaciones gubernamentales") {
            checkboxesValues[3].check = value
            setValues({...values,checkboxes:checkboxesValues})
        }
        else if (label === "Capacitación sobre Normas o Certificaciones") {
            checkboxesValues[4].check = value
            setValues({...values,checkboxes:checkboxesValues})
        }
        else if (label === "Cierre Auditoría") {
            checkboxesValues[5].check = value
            setValues({...values,checkboxes:checkboxesValues})
        }
        else if (label === "Manual /instructivo") {
            materialEntregadoValues[0].check = value
            setValues({...values,materialEntregado:materialEntregadoValues})
        }
        else if (label === "Folleto") {
            materialEntregadoValues[1].check = value
            setValues({...values,materialEntregado:materialEntregadoValues})
        }
        else if (label === "Procedimiento") {
            materialEntregadoValues[2].check = value
            setValues({...values,materialEntregado:materialEntregadoValues})
        }
        else if (label === "Video") {
            materialExpuestoValues[0].check = value
            setValues({...values,materialExpuesto:materialExpuestoValues})
        }
        else if (label === "Filminas") {
            materialExpuestoValues[1].check = value
            setValues({...values,materialExpuesto:materialExpuestoValues})
        }
        else {
            materialExpuestoValues[2].check = value
            setValues({...values,materialExpuesto:materialExpuestoValues})
        }
    }

    const handleClick = () => {
        setReplicas(replicas + 1);
        setObjValues({dni:"",nombre:"",area:"",firma:"",resultado:""})
        setTrigger(false)
    };


    const handleCheckboxChange = (event, id) => {
        if (id === 1) {
            setShowTextField1(event.target.checked);
        } 
        if (id === 2) {
            setShowTextField2(event.target.checked);
        } 
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Registro de Capacitación</h3>
                    {/* <h4 className="formNumber">HSEQ-04-R02</h4> */}
                </div>
                <div className={styles.personalRight}>
                    <TextField onChange={(e)=>{setValues({...values,fecha:e.target.value})}} id="outlined-basic" label="Fecha" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,tiempoDuracion:e.target.value})}} id="outlined-basic" label="Tiempo de duración" variant="outlined" />
                </div>

                <h4>Tipo de capacitación </h4>
                <p >Selecciona la opción que corresponda:</p>
                    
                    <div className={styles.listContainer}>
                        <FormControlLabel control={<Checkbox onChange={(e)=>{checkboxValuesConstructor("Inducción",e.target.checked)}} />}  label="Inducción" className={styles.listItem}/>
                        <FormControlLabel control={<Checkbox onChange={(e)=>{checkboxValuesConstructor("Campaña",e.target.checked)}} />}  className={styles.listItem} label="Campaña" />
                        <FormControlLabel control={<Checkbox onChange={(e)=>{checkboxValuesConstructor("Entrenamiento Puesto de trabajo",e.target.checked)}} />}  className={styles.listItem} label="Entrenamiento Puesto de trabajo" />
                        <FormControlLabel control={<Checkbox onChange={(e)=>{checkboxValuesConstructor("Capacitaciones gubernamentales",e.target.checked)}} />}  className={styles.listItem} label="Capacitaciones gubernamentales" />
                        <FormControlLabel control={<Checkbox onChange={(e)=>{checkboxValuesConstructor("Capacitación sobre Normas o Certificaciones",e.target.checked)}} />}  className={styles.listItem} label="Capacitación sobre Normas o Certificaciones" />
                        <FormControlLabel control={<Checkbox onChange={(e)=>{checkboxValuesConstructor("Cierre Auditoría",e.target.checked)}} />}  className={styles.listItem} label="Cierre Auditoría" />
                    </div>

                <div className={styles.personalText}>
                    <TextField
                        onChange={(e)=>{setValues({...values,temas:e.target.value})}}
                        fullWidth
                        id="outlined-multiline-static"
                        label="Temas dados"
                        multiline
                        rows={4}
                    />                
                </div>

                <div className={styles.matDidacticoSection}>
                    <div>
                        <div className={styles.listTitle}>
                            <h4>Material didáctico Entregado</h4>
                            <p> (Selecciona la opción que corresponda)</p>
                        </div>
                        
                        <div className={styles.listContainer}>
                            <FormControlLabel control={<Checkbox onChange={(e)=>{checkboxValuesConstructor("Manual /instructivo",e.target.checked)}} />}  className={styles.listItem} label="Manual /instructivo" />
                            <FormControlLabel control={<Checkbox onChange={(e)=>{checkboxValuesConstructor("Folleto",e.target.checked)}} />}  className={styles.listItem} label="Folleto" />
                            <FormControlLabel control={<Checkbox onChange={(e)=>{checkboxValuesConstructor("Procedimiento",e.target.checked)}} />}  className={styles.listItem} label="Procedimiento" />
                            <div>

                            <FormControlLabel control={<Checkbox
                                id="showTextField"
                                name="showTextField"
                                onChange={($event) => handleCheckboxChange($event, 1)} />} label="Otros" />
                            <label htmlFor="showTextField"></label>

                            </div>                    
                        </div>
                        <div className={styles.personal}>
                            {showTextField1 && (
                                <TextField id="outlined-basic" name="textField" variant="outlined" label="Otros" />
                            )}
                        </div>
                    </div>
                    
                    <div>
                        <div className={styles.listTitle}>
                            <h4>Material didáctico Expuesto</h4>
                            <p >(Selecciona las opciónes que correspondan)</p>
                        </div>
                        
                        <div className={styles.listContainer}>
                            <FormControlLabel control={<Checkbox onChange={(e)=>{checkboxValuesConstructor("Video",e.target.checked)}} />}  className={styles.listItem} label="Video" />
                            <FormControlLabel control={<Checkbox onChange={(e)=>{checkboxValuesConstructor("Filminas",e.target.checked)}} />}  className={styles.listItem} label="Filminas" />
                            <FormControlLabel control={<Checkbox onChange={(e)=>{checkboxValuesConstructor("Disertación",e.target.checked)}} />}  className={styles.listItem} label="Disertación" />
                            
                            <div>
                                <FormControlLabel control={<Checkbox
                                    id="showTextField"
                                    name="showTextField"
                                    onChange={($event) => handleCheckboxChange($event, 2)} />} label="Otros" />
                                <label htmlFor="showTextField"></label>
                            </div>   
                        </div>
                        
                        <div className={styles.personal}>
                            {showTextField2 && (
                                <TextField id="outlined-basic" name="textField" variant="outlined" label="Otros" />
                            )}
                        </div>
                    </div>
                </div>

                    


                

                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>ASISTENTES</p>
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
               
                <div className={styles.personal}>
                    <TextField onChange={(e)=>{setValues({...values,observaciones:e.target.value})}} fullWidth id="outlined-basic" label="Observaciones" variant="outlined" />
                </div>


                <div className={styles.firma}>
                    <TextField onChange={(e)=>{setValues({...values,instructor:e.target.value})}} id="outlined-basic" label="Instructor" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,cargo:e.target.value})}} id="outlined-basic" label="Cargo / Función" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,firma:e.target.value})}} id="outlined-basic" label="Firma" variant="outlined" />
                </div>

                <div className="btn">
                    <Button onClick={()=>{
                        dispatch(registroCapacitacionActions.logIn(values))
                    }} variant="contained">Generar PDF</Button>

                </div>

            </div>
        </div>
    )
}

export default RegistroCapacitacion