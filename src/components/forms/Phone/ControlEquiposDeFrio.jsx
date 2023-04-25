import { Button, TextField, Checkbox, FormControlLabel, } from '@mui/material'
import React, { useState,useEffect } from 'react'
import styles from './ControlEquiposDeFrio.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import EquipoFrio from '../../modales/EquipoFrio';
import Modal from '../../shared/Modal';
import { useDispatch,useSelector } from 'react-redux';
import equiposFrioActions from '../../../redux/actions/equiposFrioActions';

function ControlEquiposDeFrio() {
    const dispatch = useDispatch()
    const prueba = useSelector(state=>state.equiposFrioR.inputsValue)
    console.log("holi",prueba)
    const [inputs] = useState([
        { id: 1, label: 'Día' },
        { id: 2, label: 'Hora' },
        { id: 3, label: 'Temp.Equipo' },
        { id: 4, label: 'Alimento' },
        { id: 5, label: 'Temperatura Alim.' },
        { id: 6, label: 'Acción de corrección' },
        { id: 7, label: 'Responsable' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [month, setMonth] = React.useState('');
    const [turno, setTurno] = React.useState('');
    const [values,setValues] = useState({
        equipoNro:"",
        checkboxes:[{}],
        mes:"",
        turno:"",
        inputs: [{
        }],
        verified: "",
        date: "",
        idUser:"643ea98d5b44dd9765966ae7"
    })
    const [checkboxesValues]=useState([
        {label:"HELADERA",check:false},
        {label:"CÁMARA REFRIGERADOS",check:false},
        {label:"CÁMARA CONGELADOS",check:false}
    ])
    const [objValues,setObjValues] = useState({dia:"",hora:"",tempEquipo:"",alimento:"",tempAlimento:"",accionCorreccion:"",responsable:""})
    const [inputValues,setInputValues]= useState([])
    const [trigger,setTrigger] = useState(false)
    
    useEffect(()=>{
        if(replicas === 1 && objValues.dia !== "" && objValues.hora !== "" && objValues.tempEquipo !== "" && objValues.alimento !== "" && objValues.tempAlimento !== "" && objValues.accionCorreccion !== "" && objValues.responsable !== "" && objValues.id !=="") {
            setInputValues([objValues])
        }else if (replicas > 1 && objValues.dia !== "" && objValues.hora !== "" && objValues.tempEquipo !== "" && objValues.alimento !== "" && objValues.tempAlimento !== "" && objValues.accionCorreccion !== "" && objValues.responsable !== "" && objValues.id !=="") {
            setInputValues([...inputValues,objValues])
        }
    },[trigger])
    useEffect(()=>{
        setValues({...values,inputs:inputValues})
    },[inputValues])
    useEffect(()=>{
        if (objValues.dia !== "" && objValues.hora !== "" && objValues.tempEquipo !== "" && objValues.alimento !== "" && objValues.tempAlimento !== "" && objValues.accionCorreccion !== "" && objValues.responsable !== "" ){
            setTrigger(true)
        }
    },[objValues])
    
    const inputsValuesConstructor = (id,label,index) => {
        const inputTarget = document.getElementById(id)
        label === 'Día' ?  setObjValues({...objValues,dia:inputTarget.value, id:index}) :
        label === 'Hora' ? setObjValues({...objValues,hora:inputTarget.value}) :
        label === 'Temp.Equipo' ? setObjValues({...objValues,tempEquipo:inputTarget.value}):
        label === 'Alimento' ? setObjValues({...objValues,alimento:inputTarget.value}):
        label === 'Temperatura Alim.' ? setObjValues({...objValues,tempAlimento:inputTarget.value}):
        label === 'Acción de corrección' ? setObjValues({...objValues,accionCorreccion:inputTarget.value}):
        label === 'Responsable' && setObjValues({...objValues,responsable:inputTarget.value})
    }
    const checkboxValuesConstructor = (label, value)=>{
        if (label === "HELADERA") {
            checkboxesValues[0].check = value
            setValues({...values,checkboxes:checkboxesValues})
        }
        else if (label === "CÁMARA REFRIGERADOS") {
            checkboxesValues[1].check = value
            setValues({...values,checkboxes:checkboxesValues})
        }
        else {
            checkboxesValues[2].check = value
            setValues({...values,checkboxes:checkboxesValues})
        }
    }

    const handleClick = () => {
        setReplicas(replicas + 1);
        setObjValues({dia:"",hora:"",tempEquipo:"",alimento:"",tempAlimento:"",accionCorreccion:"",responsable:""})
        setTrigger(false)
    };

    const handleChange = (event) => {
      setMonth(event.target.value);
      setValues({...values,mes:event.target.value})
    };
    const handleChangeTurno = (event) => {
        setTurno(event.target.value);
        setValues({...values,turno:event.target.value})
      };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Control de Equipos de Frío</h3>
                </div>


{
                    showModal ? (
                    <Modal
                    content={<EquipoFrio/>}
                    closeModal={() => setShowModal(false)}
                    />
                
                    )
                    : (
                    <div className='cont-btn'>
                        <Button  size="small" onClick={() => setShowModal(true)}>
                            <i class="ri-information-line" style={{marginRight: "8px", fontSize:"22px"}}></i> Ver Más
                        </Button>
                    </div>
                    )
                }

<br />
                <div className={styles.personalNro}>
                    <p>Nro y nombre de cámara:</p>
                    <TextField onChange={(e)=>{setValues({...values,equipoNro:e.target.value})}} id="outlined-basic" label="Equipo Nro:" variant="outlined" />
                </div>

                <div className={styles.personal}>
                    <FormControlLabel control={<Checkbox onChange={(e)=>{checkboxValuesConstructor("HELADERA",e.target.checked)}} />} label="HELADERA" />
                    <FormControlLabel control={<Checkbox onChange={(e)=>{checkboxValuesConstructor("CÁMARA REFRIGERADOS",e.target.checked)}} />} label="CÁMARA REFRIGERADOS" />
                    <FormControlLabel control={<Checkbox onChange={(e)=>{checkboxValuesConstructor("CÁMARA CONGELADOS",e.target.checked)}} />} label="CÁMARA CONGELADOS" />
                </div>

                <div className={styles.personalSelects}> 
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Mes</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={month}
                        label="Mes"
                        onChange={handleChange}
                        >
                        <MenuItem value={"enero"}>Enero</MenuItem>
                        <MenuItem value={"febrero"}>Febrero</MenuItem>
                        <MenuItem value={"marzo"}>Marzo</MenuItem>
                        <MenuItem value={"abril"}>Abril</MenuItem>
                        <MenuItem value={"mayo"}>Mayo</MenuItem>
                        <MenuItem value={"junio"}>Junio</MenuItem>
                        <MenuItem value={"julio"}>Julio</MenuItem>
                        <MenuItem value={"agosto"}>Agosto</MenuItem>
                        <MenuItem value={"septiembre"}>Septiembre</MenuItem>
                        <MenuItem value={"octubre"}>Octubre</MenuItem>
                        <MenuItem value={"noviembre"}>Noviembre</MenuItem>
                        <MenuItem value={"diciembre"}>Diciembre</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label">Turno</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={turno}
                        label="turno"
                        onChange={handleChangeTurno}
                        >
                        <MenuItem value={"tm"}>Turno Mañana</MenuItem>
                        <MenuItem value={"tt"}>Turno Tarde</MenuItem>
                        <MenuItem value={"tn"}>Turno Noche</MenuItem>
                        </Select>
                    </FormControl>
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
                


                 <div className={styles.personal}>
                    <TextField onChange={(e)=>{setValues({...values,verified:e.target.value})}} id="outlined-basic" label="Verificado por" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,date:e.target.value})}} id="outlined-basic" label="Fecha" variant="outlined" />
                </div>
                <div className="btn">
                    <Button onClick={()=>{
                        dispatch(equiposFrioActions.logIn(values))
                    }} variant="contained">Generar PDF</Button>
                </div>

            </div>
        </div>
    )
}

export default ControlEquiposDeFrio