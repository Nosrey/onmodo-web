import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
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
        { id: 1, label: 'Producto', prop: 'producto' },
        { id: 2, label: 'Tipo/modelo', prop: 'tipo' },
        { id: 3, label: 'Marca', prop: 'marca' },
        { id: 4, label: 'Posee certificacion', prop: 'certificacion' },
        { id: 5, label: 'Cantidad', prop: 'cantidad' },
        { id: 6, label: 'Fecha de entrega', prop: 'fecha' },
    ]);
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
    const initialObjValues = {producto:"",tipo:"",marca:"",certificacion:"",cantidad:"",fecha:""}
    const [objValues, setObjValues] = useState([initialObjValues])
    const [checkboxesValues, setCheckboxesValue] = useState([
        { label: "Ropa de trabajo", check: false },
        { label: "Guantes", check: false },
        { label: "Calzado de seguridad", check: false },
        { label: "Antiparras", check: false },
        { label: "Barbijo", check: false },
        { label: "Cofia", check: false },
        { label: "Otros", check: false, desc: "" }
    ])

   const handleInputChange = (index, event) => {
       const { name, value } = event.target;
       console.log('index? ', index, 'event? ', name, value)
       const newValues = objValues.map((oldValue, i) => {
            if (i === index) {
                console.log('entra')
              // Si el índice coincide, actualiza el objeto
              return { ...oldValue, [name]: value };
            } else {
              // Si no coincide, no hagas cambios
              return oldValue;
            }})
        setObjValues(newValues)
    };

    const handleCheckboxesChange = (e, i) => {
        const {checked, name} = e.target;
        const newValues = [...checkboxesValues];
        newValues[i].check = checked;
        if(name === 'Otros') handleCheckboxChange(checked);
        setCheckboxesValue(newValues);
    }

    const handleClick = () => {
        setObjValues([...objValues, initialObjValues]);
    };

    const handleClickRemove = (id) => {
        const objValuesFiltered = objValues.filter((_, index) => index !== id);
        setObjValues(objValuesFiltered);
    };
      
    // const handleClickRemove = () => {
    //     const inputsArrFiltered = inputValues.filter(input=>input.id !== replicas - 1)
    //     setInputValues(inputsArrFiltered)
    //     setReplicas(replicas - 1);
    // }

    const handleCheckboxChange = (checked) => {
        setShowTextField(checked);
    };

    const deleteEmptyRows = (inputs) => {
        return inputs.filter((row) => {
            Object.values(row).some((value) => value !== '')});
    }
    

    const handleSubmit = () => {
        const valuesToSend = {
            ...values,
            inputs: deleteEmptyRows(objValues),
            checkboxes: checkboxesValues
          };        
          console.log('valeus ', valuesToSend)
        // entregaRopa(values).then((resp)=> {
        //     setTextAlert("¡Formulario cargado exitosamente!");
        //     setTypeAlert("success");
        // }).catch((resp)=> {
        //     setTextAlert("Ocurrió un error")
        //     setTypeAlert("error");
        // }).finally(()=> {
        //     window.scrollTo({
        //         top: 0,
        //         behavior: 'smooth',
        //       });
        //     setShowlert(true);
        //     setTimeout(() => {
        //         setShowlert(false);

        //     }, 7000);
        // }
        // )
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
                    {checkboxesValues.map((checkbox, i) => (
                            <FormControlLabel key={i} control={<Checkbox name={checkbox.label} checked={checkbox.check} onChange={(e) => handleCheckboxesChange(e, i)}/>} label={checkbox.label}/>
                    ))}
                </div>
                
                <div className={styles.personal}>
                    {showTextField && (
                        <TextField id="outlined-basic" name="textField" variant="outlined" label="Otros" onChange={(e) => {checkboxesValues[6].desc = e.target.value}}/>
                    )}
                </div>
                <div className="table">
                    <div className="tableSection">
                        {objValues.map((_, index) => (
                                <div className="tableRow" key={index}>
                                    <p className="index">{index + 1} </p>
                                    {inputs.map((input) => (
                                        <div key={input.id}>
                                        {input.label === "Fecha de entrega" ? (
                                            <TextField
                                                onChange={(e) => handleInputChange(index, e)}
                                                id={`input-${input.id}-${index}`}
                                                name={input.prop}
                                                label={`${input.label}`}
                                                value={_[input.prop]}
                                                variant="outlined"
                                                type="date"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        ) : (
                                            <TextField 
                                            onChange={(e) => handleInputChange(index, e)}
                                            className='input'
                                            id={`input-${input.id}-${index}`}
                                            name={input.prop}
                                            label={`${input.label}`}
                                            variant="outlined"
                                            value={_[input.prop]}
                                             />
                                        )}
                                        </div>
                                    ))}
                                    <div className="icon">
                                    {
                                        index == 0 ? 
                                        <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick} />
                                        :  <IndeterminateCheckboxIcon id={index} style={{ color: 'grey' }} onClick={() => handleClickRemove(index)}/>
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
                {/* { !trigger && <span>*Completar todos los campos para poder  Guardar</span>} */}

                    <Button onClick={handleSubmit} variant="contained">Guardar</Button>

                </div>

            </div>
        </div>
        { showAlert && <Alert type={typeAlert} text={textAlert}></Alert> }
        </>
        
    )
}

export default ConstanciaEntrega