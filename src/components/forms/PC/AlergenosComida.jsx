import { Button, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import styles from './AlergenosComida.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckboxIcon from '@mui/icons-material/IndeterminateCheckBox';
import axios from 'axios';
import Alert from '../../shared/components/Alert/Alert';
import { controlAlergenos } from '../../../services/FormsRequest';
import { useLocation } from 'react-router';

function AlergenosComida() {
    //** ALERTA */
    const [textAlert, setTextAlert] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [showAlert, setShowlert] = useState(false);

    const formValue = useSelector(state => state.comensalesR.inputsValues)
    var idUser = localStorage.getItem("idUser");
    console.log(formValue)
    const [inputs] = useState([
        { id: 1, label: 'Fecha' },
        { id: 2, label: 'Nombre Comensal' },
        { id: 3, label: 'Diagnóstico' },
        { id: 4, label: 'Listado de ingredientes' },
        { id: 5, label: 'Responsable' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [values, setValues] = useState()
    const [objValues, setObjValues] = useState({ fecha: "", nombre: "", diagnostico: "", listado: "", responsable: "" })
    const [inputValues, setInputValues] = useState([])
    const [trigger, setTrigger] = useState(false)
    useEffect(() => {
        if (replicas === 1 && objValues.fecha !== "" && objValues.nombre !== "" && objValues.diagnostico !== "" && objValues.listado !== "" && objValues.responsable !== "" && objValues.id !== "") {
            setInputValues([objValues])
        } else if (replicas > 1 && objValues.fecha !== "" && objValues.nombre !== "" && objValues.diagnostico !== "" && objValues.listado !== "" && objValues.responsable !== "" && objValues.id !== "") {
            setInputValues([...inputValues, objValues])
        }
    }, [trigger])
    useEffect(() => {
        setValues({ ...values, inputs: inputValues })
    }, [inputValues])
    useEffect(() => {
        if (objValues.fecha !== "" && objValues.nombre !== "" && objValues.diagnostico !== "" && objValues.listado !== "" && objValues.responsable !== "") {
            setTrigger(true)
        }
    }, [objValues])

    const inputsValuesConstructor = (id, label, index) => {
        const inputTarget = document.getElementById(id)
        label === 'Fecha' ? setObjValues({ ...objValues, fecha: inputTarget.value, id: index }) :
            label === 'Nombre Comensal' ? setObjValues({ ...objValues, nombre: inputTarget.value }) :
                label === 'Diagnóstico' ? setObjValues({ ...objValues, diagnostico: inputTarget.value }) :
                    label === 'Listado de ingredientes' ? setObjValues({ ...objValues, listado: inputTarget.value }) :
                        label === 'Responsable' && setObjValues({ ...objValues, responsable: inputTarget.value })
    }
    const handleClick = () => {
        setReplicas(replicas + 1);
        setObjValues({ fecha: "", nombre: "", diagnostico: "", listado: "", responsable: "" })
        setTrigger(false)
    };

    const handleClickRemove = (index) => {
        /* const inputsArrFiltered = inputValues.filter(inputs=>inputs.id !== index) */ //dejo comentado esperando respuestas de los audios jeje
        const inputsArrFiltered = inputValues.filter(input => input.id !== replicas - 1)
        setInputValues(inputsArrFiltered)
        setReplicas(replicas - 1);
    }

    const handleSubmit = () => {
        controlAlergenos(values).then((resp)=> {
            if (resp.error) {
                setTextAlert("Ocurrió un error")
                setTypeAlert("error");
            } else {
                setTextAlert("¡Formulario cargado exitosamente!");
                setTypeAlert("success");
                setInputValues([]);
                setReplicas(1); // Reiniciamos el estado replicas para evitar el input adicional vacío
            }
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
    const location = useLocation();
    useEffect(() => {
        const infoPrecargada = location.state?.objeto;
        if (infoPrecargada) { // muestro un form del historial
            console.log("infoPrecargada", infoPrecargada)
            console.log("sepudo")
            setValues({
                comedor: infoPrecargada.comedor,
                inputs: [infoPrecargada.inputs
            ],
                verified: infoPrecargada.verified,
                date: infoPrecargada.date,
                idUser: idUser
            })
            console.log("values", values)
        } else { // creo un form desde cero
            console.log("error")
            setValues({
                comedor: "",
                inputs: [{
                }],
                verified: "",
                date: "",
                idUser: idUser
            })
        }
    }, [])
    console.log("values", values)



return (
    <>
    {
        values &&
    <div>
        <div className="form">
            <div className="titleContainer">
                <h3 className="title">Control de comensales con dietas especiales</h3>
            </div>
            <div className={styles.personal}>
                <TextField
                    onChange={(e) => { setValues({ ...values, comedor: e.target.value }) }}
                    value={values.comedor || ""}
                    fullWidth
                    id="outlined-basic"
                    label="Comedor"
                    variant="outlined"
                />
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
                                        {input.label === "Fecha" ? (
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
                                            <TextField
                                                onBlur={(e) => {
                                                    inputsValuesConstructor(`input-${input.id}-${index}`, input.label, index);
                                                }}
                                                id={`input-${input.id}-${index}`}
                                                name={`input-${input.id}-${index}`}
                                                label={`${input.label}`}
                                                value={values.inputs[index].fecha || ''}
                                                variant="outlined"
                                            />
                                        )}
                                    </div>
                                ))}

                                <div className="icon">
                                    {
                                        (index === 0 || index >= replicas) ?
                                            <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick} />
                                            : <IndeterminateCheckboxIcon style={{ color: 'grey' }} onClick={() => { handleClickRemove(index) }} />
                                    }
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className={styles.personal}>
                <TextField
                    onChange={(e) => { setValues({ ...values, verified: e.target.value }) }}
                    value={values.verified || ""}
                    id="outlined-basic"
                    label="Verificado por"
                    variant="outlined"
                />
                <TextField
                    onChange={(e) => { setValues({ ...values, date: e.target.value }) }}
                    value={values.date || ""}
                    id="outlined-basic"
                    label="Fecha"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>

            <div className="btn">
                <Button onClick={handleSubmit} variant="contained">Guardar</Button>
            </div>
        </div>
    </div>
    }
   { showAlert && <Alert type={typeAlert} text={textAlert}></Alert> }
    </>
)

}

export default AlergenosComida