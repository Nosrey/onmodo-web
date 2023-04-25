import { Button, TextField, Checkbox, FormControlLabel } from '@mui/material'
import React, { useState }  from 'react'
import styles from './InformeInternoAccidente.module.css'
import { useSelector,useDispatch } from 'react-redux';
import informeAccidenteActions from '../../../redux/actions/informeAccidenteActions';

function InformeInternoAccidente() {
    const dispatch = useDispatch()
    const prueba = useSelector(state=>state.informeAccidenteR.inputsValues)
    console.log(prueba)
    const [showTextField1, setShowTextField1] = useState(false);
    const [showTextField2, setShowTextField2] = useState(false);
    const [showTextField3, setShowTextField3] = useState(false);

    const [values,setValues] = useState({
        comedor:"",
        fecha:"",
        tipo:"",
        checkboxes:[{}],
        nombreApellido:"",
        cuil:"",
        fechaIngreso:"",
        puesto:"",
        hora: "",
        lugar:"",
        descripcion:"",
        checkboxesAccidente:[{}],
        lugarLesion:"",
        medidas:"",
        razon:"",
        firmaEmpleado:"",
        firmaAdm:"",
        encargado:"",
        date:"",
        idUser:"643ea98d5b44dd9765966ae7"
    })
    const [checkboxesValues]=useState([
        {label:"CDR",check:false},
        {label:"CMS",check:false},
        {label:"Laboral",check:false},
        {label:"In Itinere",check:false},
        {label:"Se adjunta denuncia policial",check:false},
    ])
    const [checkboxesAccidenteValues]=useState([
        {label:"¿Era su trabajo habitual?",check:false},
        {label:"¿Conocía la tarea asignada?",check:false},
        {label:"¿Una máquina le causó la lesión?",check:false,cualMaquina:""},
        {label:"¿Hubo alguna acción o condición insegura que fuera la causante del accidente?",check:false,cualAccion:""},
        {label:"¿Estaba usando su E.P.P.?",check:false}
    ])

    
    const checkboxValuesConstructor = (label,value)=>{
        console.log(value)
        if (label === 'CDR'){
            checkboxesValues[0].check = value
            setValues({...values,checkboxes:checkboxesValues})
        }
        else if (label === "CMS") {
            checkboxesValues[1].check = value
            setValues({...values,checkboxes:checkboxesValues})
        }
        else if (label === "Laboral") {
            checkboxesValues[2].check = value
            setValues({...values,checkboxes:checkboxesValues})
        }
        else if (label === "In Itinere") {
            checkboxesValues[3].check = value
            setValues({...values,checkboxes:checkboxesValues})
        }
        else if (label === "Se adjunta denuncia policial") {
            checkboxesValues[4].check = value
            setValues({...values,checkboxes:checkboxesValues})
        }
        else if (label === "¿Era su trabajo habitual?") {
            checkboxesAccidenteValues[0].check = value
            setValues({...values,checkboxesAccidente:checkboxesAccidenteValues})
        }
        else if (label === "¿Conocía la tarea asignada?") {
           checkboxesAccidenteValues[1].check = value
            setValues({...values,checkboxesAccidente:checkboxesAccidenteValues})
        }
        else if (label === "Cual Maquina") {
            checkboxesAccidenteValues[2].cualMaquina = value
             setValues({...values,checkboxesAccidente:checkboxesAccidenteValues})
         }
         else if (label === "Cual Accion") {
            checkboxesAccidenteValues[3].cualAccion = value
             setValues({...values,checkboxesAccidente:checkboxesAccidenteValues})
         }
         else if (label === "Razon") {
            checkboxesAccidenteValues[4].razon = value
             setValues({...values,checkboxesAccidente:checkboxesAccidenteValues})
         }
         
    }

    const handleCheckboxChange = (event, id) => {
        if (id === 1) {
            setShowTextField1(event.target.checked);
            checkboxesAccidenteValues[2].check = event.target.checked
            setValues({...values,checkboxesAccidente:checkboxesAccidenteValues})
        } 
        if (id === 2) {
            setShowTextField2(event.target.checked);
            checkboxesAccidenteValues[3].check = event.target.checked
            setValues({...values,checkboxesAccidente:checkboxesAccidenteValues})
        } 
        if (id === 3) {
            setShowTextField3(event.target.checked);
            checkboxesAccidenteValues[4].check = event.target.checked
            setValues({...values,checkboxesAccidente:checkboxesAccidenteValues})
        } 
    };
    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Informe Interno de Accidente</h3>
                    {/* <h4 className="formNumber"> HS-01-R04</h4> */}
                </div>

                <div className={styles.personal}>
                    <TextField onChange={(e)=>{setValues({...values,comedor:e.target.value})}} id="outlined-basic" style={{width:"50%"}} label="Comedor donde ocurrió" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,fecha:e.target.value})}} id="outlined-basic" label="Fecha" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,tipo:e.target.value})}} id="outlined-basic"  label="Tipo de accidente" variant="outlined" />
                </div>

                <div className={styles.personal}>
                    <FormControlLabel control={<Checkbox onChange={(e)=>{checkboxValuesConstructor('CDR',e.target.checked)}} />} label="CDR" />
                    <FormControlLabel control={<Checkbox onChange={(e)=>{checkboxValuesConstructor('CMS',e.target.checked)}} />} label="CMS" />
                    <FormControlLabel control={<Checkbox onChange={(e)=>{checkboxValuesConstructor('Laboral',e.target.checked)}} />} label="Laboral" />
                    <FormControlLabel control={<Checkbox onChange={(e)=>{checkboxValuesConstructor('In Itinere',e.target.checked)}} />} label="In Itinere" />
                    <FormControlLabel control={<Checkbox onChange={(e)=>{checkboxValuesConstructor('Se adjunta denuncia policial',e.target.checked)}} />} label="Se adjunta denuncia policial" />
                </div>
                

                <div className={styles.responsableCont}>
                    <div className={styles.subtitleCont}>
                        <p className={styles.subtitle}>DATOS DEL ACCIDENTADO</p>
                    </div>
                    <div className={styles.personal}>
                        <TextField onChange={(e)=>{setValues({...values,nombreApellido:e.target.value})}} id="outlined-basic" label="Nombre y Apellido" variant="outlined" />
                        <TextField onChange={(e)=>{setValues({...values,cuil:e.target.value})}} id="outlined-basic" label="Nº de CUIL" variant="outlined" />
                        <TextField onChange={(e)=>{setValues({...values,fechaIngreso:e.target.value})}} id="outlined-basic" label="Fecha de ingreso" variant="outlined" />
                    </div>
                    <div className={styles.personal}>
                        <TextField onChange={(e)=>{setValues({...values,puesto:e.target.value})}} id="outlined-basic" label="Puesto de trabajo" variant="outlined" />
                        <TextField onChange={(e)=>{setValues({...values,hora:e.target.value})}} id="outlined-basic" label="Hora del accidente" variant="outlined" />
                        <TextField onChange={(e)=>{setValues({...values,lugar:e.target.value})}} id="outlined-basic" label="Lugar del accidente" variant="outlined" />
                    </div>

                    <div className={styles.personalText}>
                    <TextField
                        onChange={(e)=>{setValues({...values,descripcion:e.target.value})}}
                        fullWidth
                        id="outlined-multiline-static"
                        label="Descripción del Accidente"
                        multiline
                        rows={4}
                    />          
                    </div>

                    <div className={styles.listContainer}>
                        <FormControlLabel control={<Checkbox onChange={(e)=>{checkboxValuesConstructor('¿Era su trabajo habitual?',e.target.checked)}}/>} label="¿Era su trabajo habitual?" />
                        <FormControlLabel control={<Checkbox onChange={(e)=>{checkboxValuesConstructor('¿Conocía la tarea asignada?',e.target.checked)}} />} label="¿Conocía la tarea asignada?"/>

                      
                        <FormControlLabel control={<Checkbox
                            id="showTextField"
                            name="showTextField"
                            onChange={($event) => handleCheckboxChange($event, 1)} />} label="¿Una máquina le causó la lesión?" />
                        <label htmlFor="showTextField"></label>
                        
                        {showTextField1 && (
                            <div className={styles.personal}>
                            <TextField onChange={(e)=>{checkboxValuesConstructor("Cual Maquina",e.target.value)}} id="outlined-basic"   multiline style={{width:"50%"}}
                            rows={2} name="textField" variant="outlined" label="¿Cuál?" />
                            </div>   
                        )}
                
                          
                        <FormControlLabel control={<Checkbox
                            id="showTextField"
                            name="showTextField"
                            onChange={($event) => handleCheckboxChange($event, 2)} />} label="¿Hubo alguna acción o condición insegura que fuera la causante del accidente?" />
                        <label htmlFor="showTextField"></label>
                        
                        {showTextField2 && (
                            <div className={styles.personal}>
                            <TextField onChange={(e)=>{checkboxValuesConstructor("Cual Accion",e.target.value)}} id="outlined-basic"   multiline style={{width:"50%"}}
                            rows={2} name="textField" variant="outlined" label="¿Cuál?" />
                            </div>   
                        )}


                          
                        <FormControlLabel control={<Checkbox
                            id="showTextField"
                            name="showTextField"
                            onChange={($event) => handleCheckboxChange($event, 3)} />} label="¿Estaba usando su E.P.P.?" />
                        <label htmlFor="showTextField"></label>
                        
                        {!showTextField3 && (
                            <div className={styles.personal}>
                            <TextField onChange={(e)=>{setValues({...values,razon:e.target.value})}} id="outlined-basic"   multiline style={{width:"50%"}}
                            rows={2} name="textField" variant="outlined" label=" ¿Por qué razón no lo usaba?" />
                            </div>   
                        )}

                    </div>

                    <div className={styles.personalText}>
                        <TextField
                            onChange={(e)=>{setValues({...values,lugarLesion:e.target.value})}}
                            fullWidth
                            id="outlined-multiline-static"
                            label="¿En qué lugar del cuerpo se produjo la lesión?"
                            multiline
                            rows={2}
                        />      
                    </div>
                    <div className={styles.personalText}>
                   
                        <TextField
                            onChange={(e)=>{setValues({...values,medidas:e.target.value})}}
                            fullWidth
                            id="outlined-multiline-static"
                            label="¿Qué medidas cree conveniente adoptar para evitar futuros accidentes de este tipo?"
                            multiline
                            rows={4}
                        />          
                    </div>
                </div>

                <p  className={styles.boldLegend}>Enviar dentro de las 24 hs. de ocurrido el accidente a Administración de RRHH –Of. Central</p>


                <div className={styles.personal}>
                    <TextField onChange={(e)=>{setValues({...values,firmaEmpleado:e.target.value})}} id="outlined-basic" label="Firma del Empleado" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,firmaAdm:e.target.value})}} id="outlined-basic" label="Firma del Administrador o Encargado Contrato" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,encargado:e.target.value})}} id="outlined-basic" label="Encargado ContratoRevisado por" variant="outlined" />
                </div>

        

                <div className="btn">
                    <Button onClick={()=>{
                        dispatch(informeAccidenteActions.logIn(values))
                    }} variant="contained">Generar PDF</Button>

                </div>

            </div>
        </div>
    )
}

export default InformeInternoAccidente