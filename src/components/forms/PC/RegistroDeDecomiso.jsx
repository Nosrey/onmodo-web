import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './RegistroDeDecomiso.module.css'
import { useSelector } from 'react-redux';
import Alert from '../../shared/components/Alert/Alert';
import { registroDecomiso } from '../../../services/FormsRequest';
import { useLocation } from 'react-router-dom';

function RegistroDeDecomiso() {
    //** ALERTA */
    const [textAlert, setTextAlert] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [showAlert, setShowlert] = useState(false);
    const location = useLocation();
    const infoPrecargada = location.state?.objeto;
    
    const prueba = useSelector(state => state.registroDecomisosR.inputsValues)

    var idUser = localStorage.getItem("idUser");
    const [inputs] = useState([
        { id: 1, label: 'Fecha' },
        { id: 2, label: 'Turno' },
        { id: 3, label: 'Producto decomisado' },
        { id: 4, label: 'Cantidad' },
        { id: 5, label: 'Causa' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [values, setValues] = useState({
        inputs: [{
        }],
        idUser: idUser
    })
    const [objValues, setObjValues] = useState({ fecha: "", turno: "", productoDecomisado: "", cantidad: "", causa:"" })
    const [inputValues, setInputValues] = useState([])
    const [trigger, setTrigger] = useState(false)

    useEffect(() => {
        if (replicas === 1 && objValues.fecha !== "" && objValues.turno !== "" && objValues.productoDecomisado !== "" && objValues.cantidad !== "" && objValues.causa !== ""  ) {

            setInputValues([objValues])
        }
        else if (replicas > 1 && objValues.fecha !== "" && objValues.turno !== "" && objValues.productoDecomisado !== "" && objValues.cantidad !== "" && objValues.causa !== ""  ) {

            setInputValues([...inputValues, objValues])
        }
    }, [trigger])

    useEffect(() => {
        setValues({ ...values, inputs: inputValues })
    }, [inputValues])

    useEffect(() => {
        if (objValues.fecha !== "" && objValues.turno !== "" && objValues.productoDecomisado !== "" && objValues.cantidad !== "" && objValues.causa !== "") {
            setTrigger(true)
        }
    }, [objValues])

    const inputsValuesConstructor = (id, label, index, value) => {
        const inputTarget = document.getElementById(id)
        label === 'Fecha' ? setObjValues({ ...objValues, fecha: inputTarget.value, id: index }) :
            label === 'Turno' ? setObjValues({ ...objValues, turno:value }) :
                label === 'Producto decomisado' ? setObjValues({ ...objValues, productoDecomisado: inputTarget.value }) :
                    label === 'Cantidad' ? setObjValues({ ...objValues, cantidad: inputTarget.value }) :
                        label === 'Causa' && setObjValues({ ...objValues, causa: value }) 
                                   
    }

    const handleClick = () => {
        setReplicas(replicas + 1);
        setObjValues({ fecha: "", turno: "", productoDecomisado: "", cantidad: "", causa: "" })
        setTrigger(false)
    };

    const handleSubmit = () => {
        console.log(objValues)
        registroDecomiso(values).then((resp) => {
            setTextAlert("¡Formulario cargado exitosamente!");
            setTypeAlert("success");
        }).catch((resp) => {
            setTextAlert("Ocurrió un error")
            setTypeAlert("error");
        }).finally(() => {
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
    useEffect(() => {
        console.log(infoPrecargada)
        if (infoPrecargada)  { // muestro un form del historial
             setReplicas(infoPrecargada.inputs.length);

            setObjValues(infoPrecargada.inputs)
            setValues({
                inputs: infoPrecargada.inputs,
                idUser: idUser
            })
            console.log("objValues", objValues)
            console.log("values", values)
        } else { // creo un form desde cero
            
            
        }
    }, [location.state?.objeto])
    return (
        <>
            <div>
                <div className="form">
                    <div className="titleContainer">
                        <h3 className="title">Registros de decomisos de materias primas</h3>
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
                                                {input.label === 'Fecha' ? (
                                                    <TextField
                                                    type="date"
                                                    value={values.inputs[index]?.fecha || ''}
                                                        className='input'
                                                       
                                                        onChange={(e) => {
                                                            inputsValuesConstructor(`input-${input.id}-${index}`, input.label, index);
                                                        }}
                                                        id={`input-${input.id}-${index}`}
                                                        name={`input-${input.id}-${index}`}
                                                        
                                                        disabled={!!location.state?.objeto} 
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                ) : (
                                                    input.label === "Causa" ? (
                                                        <FormControl variant="outlined" className={`${styles.selectField} `}>
                                                            <InputLabel id="causa">Causa</InputLabel>
                                                            <Select
                                                                labelId="causa"
                                                                 className='input'
                                                                 id={`input-${input.id}-${index}`}
                                                                 name={`input-${input.id}-${index}`}

                                                                value={objValues[index]?.otrasCausas || ''}
                                                                disabled={!!location.state?.objeto} 

                                                                onChange={(e) => {
                                                                    inputsValuesConstructor(`input-${input.id}-${index}`, input.label, index,e.target.value );
                                                                }}
                                                                label="Causa"
                                                            >
                                                                <MenuItem value="Recal">Recall</MenuItem>
                                                                <MenuItem value="Desvíos de Proceso">Desvíos de Proceso</MenuItem>
                                                                <MenuItem value="Fuera fecha de vida útil">Fuera fecha de vida útil</MenuItem>
                                                                <MenuItem value="Fuera de aptitud">Fuera de aptitud</MenuItem>
                                                                <MenuItem value="Otras Causas">Otras Causas</MenuItem>

                                                            </Select>
                                                        </FormControl>
                                                    ): (
                                                        input.label === "Turno" ? (
                                                            <FormControl variant="outlined" className={`${styles.selectField} `}>
                                                                <InputLabel id="turno">Turno</InputLabel>
                                                                <Select
                                                                    labelId="turno"
                                                                    disabled={!!location.state?.objeto} 
                                                                     className='input'
                                                                     id={`input-${input.id}-${index}`}
                                                                     name={`input-${input.id}-${index}`}

                                                                     value={objValues[index]?.turno || ''}

                                                                    onChange={(e) => {
                                                                        inputsValuesConstructor(`input-${input.id}-${index}`, input.label, index, e.target.value);
                                                                    }}
                                                                    label="Turno"
                                                                >
                                                                    <MenuItem value="Mañana">Mañana</MenuItem>
                                                                    <MenuItem value="Tarde">Tarde</MenuItem>
                                                                    <MenuItem value="Noche">Noche</MenuItem>
    
                                                                </Select>
                                                            </FormControl>
                                                        ): (
                                                            <TextField
                                                            className='input'
                                                            onKeyUp={(e) => {
                                                                inputsValuesConstructor(`input-${input.id}-${index}`, input.label, index);
                                                            }}
                                                            id={`input-${input.id}-${index}`}
                                                            name={`input-${input.id}-${index}`}
                                                            disabled={!!location.state?.objeto} 
                                                            label={`${input.label}`}
                                                            variant="outlined"
                                                            value={
                                                                input.label === 'Producto decomisado'
                                                                    ? objValues[index]?.productoDecomisado 
                                                                    : input.label === 'Cantidad'
                                                                    ? objValues[index]?.cantidad 
                                                                    : ''
                                                            }
                                                             />
                                                        )
                                                   )
                                                )}
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
                        <Button onClick={handleSubmit} variant="contained">Guardar</Button>
                    </div>
                </div>
            </div>
            {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}
        </>
    );
}


export default RegistroDeDecomiso;