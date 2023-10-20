import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import styles from './AlergenosComida.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckboxIcon from '@mui/icons-material/IndeterminateCheckBox';
import Alert from '../../shared/components/Alert/Alert';
import { controlAlergenos } from '../../../services/FormsRequest';
import { useLocation } from 'react-router';
import { useDropzone } from 'react-dropzone';

function AlergenosComida() {
    const location = useLocation();
    const infoPrecargada = location.state?.objeto;
    var idUser = localStorage.getItem("idUser");
    useEffect(() => {
        console.log(infoPrecargada)
        if (infoPrecargada) { // muestro un form del historial
            setReplicas(infoPrecargada.inputs.length);
            setObjValues(infoPrecargada.inputs)
            setValues({
                comedor: infoPrecargada.comedor,

                idUser: idUser,

            })
            console.log("objValues", objValues)
            console.log("values", values)
        } else { // creo un form desde cero
            console.log("error")
            setReplicas(1);
            setValues({
                comedor: "",
                inputs: [{}
                ],
                idUser: idUser,
            })

        }
    }, [])
    //** ALERTA */
    const [textAlert, setTextAlert] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [showAlert, setShowlert] = useState(false);
    const [renovacion, setRenovacion] = useState("")
    const [fotografia, setFotografia] = useState({});
    const formValue = useSelector(state => state.comensalesR.inputsValues)

    console.log(formValue)
    const [inputs] = useState([
        { id: 1, label: 'Fecha' },
        { id: 2, label: 'Nombre Comensal' },
        { id: 3, label: 'Diagnóstico' },
        { id: 4, label: 'Requiere renovación' },
        { id: 5, label: 'Fecha Renovación' },
        { id: 6, label: 'Ingredientes/ Alimentos excluidos' },
        { id: 7, label: 'Presenta Certificado' },
        { id: 8, label: 'Fotografia' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [values, setValues] = useState({ idUser: idUser })
    const [objValues, setObjValues] = useState({ fecha: "", nombre: "", diagnostico: "", fechaRenovacion: "", requiereRenovacion: "NO", presentaCertificado: "NO", listado: "" })
    const [inputValues, setInputValues] = useState([])
    const [trigger, setTrigger] = useState(false)
    useEffect(() => {
        if (replicas === 1 && objValues.fecha !== "" && objValues.nombre !== "" && objValues.diagnostico !== "" && objValues.requiereRenovacion !== "" || objValues.fechaRenovacion !== "" && objValues.listado !== "" && objValues.presentaCertificado !== "" && objValues.id !== "") {
            setInputValues([objValues])
        } else if (replicas > 1 && objValues.fecha !== "" && objValues.nombre !== "" && objValues.diagnostico !== "" && objValues.requiereRenovacion !== "" || objValues.fechaRenovacion !== "" && objValues.listado !== "" && objValues.presentaCertificado !== "" && objValues.id !== "") {
            setInputValues([...inputValues, objValues])
        }
    }, [trigger])

    useEffect(() => {
        setValues({ ...values, inputs: inputValues })
    }, [inputValues])

    useEffect(() => {
        if (objValues.fecha !== "" && objValues.nombre !== "" && objValues.diagnostico !== "" && objValues.requiereRenovacion !== "" && objValues.listado !== "" && objValues.presentaCertificado !== "") {
            setTrigger(true)
        }
    }, [objValues])

    const inputsValuesConstructor = (id, label, index, value) => {
        const inputTarget = document.getElementById(id)
        label === 'Fecha' ? setObjValues({ ...objValues, fecha: inputTarget.value, id: index }) :
            label === 'Nombre Comensal' ? setObjValues({ ...objValues, nombre: inputTarget.value }) :
                label === 'Diagnóstico' ? setObjValues({ ...objValues, diagnostico: inputTarget.value }) :
                    label === 'Requiere renovación' ? setObjValues({ ...objValues, requiereRenovacion: value }) :
                        label === 'Fecha Renovación' ? setObjValues({ ...objValues, fechaRenovacion: value }) :
                            label === 'Ingredientes/ Alimentos excluidos' ? setObjValues({ ...objValues, listado: inputTarget.value }) :
                                label === 'Presenta Certificado' && setObjValues({ ...objValues, presentaCertificado: value });
                                 setFotografia((prevFotografia) => ({
                                    ...prevFotografia,
                                    [index]: value,
                                }));
    }

    const handleClick = () => {
        setReplicas(replicas + 1);
        setObjValues({ fecha: "", nombre: "", diagnostico: "", listado: "", responsable: "", requiereRenovacion: "", fechaRenovacion: "", presentaCertificado: "" })
        setTrigger(false)

    };

    const handleClickRemove = (index) => {
        const inputsArrFiltered = inputValues.filter(input => input.id !== replicas - 1)
        setInputValues(inputsArrFiltered)
        setReplicas(replicas - 1);
        if (replicas === 0) {
            setFotografia([...fotografia, index.target.value]);
        } else {
            setFotografia([...fotografia, ""]); // Agrega un valor vacío en el nuevo índice
        }
    }

    const handleSubmit = () => {
        console.log("objValues", objValues)
        console.log("values:", values)

        controlAlergenos(values).then((resp) => {
            if (resp.error) {
                setTextAlert("Ocurrió un error")
                setTypeAlert("error");
            } else {
                setTextAlert("¡Formulario cargado exitosamente!");
                setTypeAlert("success");
                setInputValues([]);
                setReplicas(1); // Reiniciamos el estado replicas para evitar el input adicional vacío
            }
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

    const [certificadoFile, setCertificadoFile] = useState(null);
    const onDrop = (acceptedFiles) => {
        // Solo permitir un archivo, puedes ajustar según tus necesidades
        const file = acceptedFiles[0];
        setCertificadoFile(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });


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

                                fullWidth
                                id="outlined-basic"
                                label="Comedor"
                                variant="outlined"
                                value={infoPrecargada?.comedor}
                                disabled={!!location.state?.objeto}
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
                                                            variant="outlined"
                                                            type="date"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            className='input'
                                                            value={objValues[index]?.fecha}
                                                            disabled={!!location.state?.objeto}

                                                        />
                                                    ) : input.label === "Fecha Renovación" ? (
                                                        <TextField
                                                            onBlur={(e) => {
                                                                inputsValuesConstructor(`input-${input.id}-${index}`, input.label, index, e.target.value);
                                                            }}
                                                            id={`input-${input.id}-${index}`}
                                                            name={`input-${input.id}-${index}`}
                                                            label={`${input.label}`}

                                                            variant="outlined"
                                                            type="date"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            className='input'
                                                            disabled={renovacion === "NO" || !!location.state?.objeto}
                                                            value={objValues[index]?.fechaRenovacion}


                                                        />) : (
                                                        input.label === "Presenta Certificado" ? (

                                                            <FormControl variant="outlined" className={`${styles.selectField} `}>
                                                                <InputLabel id="select">{input.label}</InputLabel>
                                                                <Select
                                                                    labelId="select"
                                                                    className='input'
                                                                    id={`input-${input.id}-${index}`}
                                                                    name={`input-${input.id}-${index}`}
                                                                    onChange={(e) => {

                                                                        inputsValuesConstructor(`input-${input.id}-${index}`, input.label, index, e.target.value);

                                                                    }}
                                                                    label={`${input.label}`}
                                                                    value={objValues[index]?.presentaCertificado}
                                                                    disabled={!!location.state?.objeto}
                                                                >
                                                                    <MenuItem value="SI">SI</MenuItem>
                                                                    <MenuItem value="NO">NO</MenuItem>
                                                                </Select>
                                                            </FormControl>


                                                        ) : input.label === "Requiere renovación" ? (
                                                            <FormControl variant="outlined" className={`${styles.selectField} `}>
                                                                <InputLabel id="select">{input.label}</InputLabel>
                                                                <Select
                                                                    labelId="select"
                                                                    className='input'
                                                                    id={`input-${input.id}-${index}`}
                                                                    name={`input-${input.id}-${index}`}
                                                                    onChange={(e) => {

                                                                        inputsValuesConstructor(`input-${input.id}-${index}`, input.label, index, e.target.value);
                                                                        console.log(e.target.value)

                                                                        setRenovacion(e.target.value);
                                                                    }}
                                                                    label={`${input.label}`}
                                                                    value={objValues[index]?.requiereRenovacion}
                                                                    disabled={!!location.state?.objeto}
                                                                >
                                                                    <MenuItem value="SI">SI</MenuItem>
                                                                    <MenuItem value="NO">NO</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        ) : input.label === "Fotografia" && fotografia[index] === "SI" ? (
                                                            <div {...getRootProps()} className={styles.border}>
                                                                <input {...getInputProps()} />
                                                                {!certificadoFile && <h6 style={{ fontSize: "12px" }}>Suelta el certificado aquí, o haz clic para seleccionar uno.</h6>}
                                                                {certificadoFile && <h6 style={{ fontSize: "12px", width: "100%" }} className={styles.select}>Archivo seleccionado: <span style={{ fontSize: "12px", fontWeight: "bold" }}>{certificadoFile.name.substring(0, 25)}</span> </h6>}
                                                            </div>
                                                        ) : input.label !== "Fotografia" ?
                                                            (
                                                                <TextField
                                                                    onBlur={(e) => {
                                                                        inputsValuesConstructor(`input-${input.id}-${index}`, input.label, index);
                                                                    }}
                                                                    id={`input-${input.id}-${index}`}
                                                                    name={`input-${input.id}-${index}`}
                                                                    label={`${input.label}`}
                                                                    variant="outlined"
                                                                    className='input'
                                                                    onKeyUp={(e) => {
                                                                        inputsValuesConstructor(`input-${input.id}-${index}`, input.label, index);
                                                                    }}
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    value={
                                                                        input.label === 'Diagnóstico'
                                                                            ? objValues[index]?.diagnostico
                                                                            : input.label === 'Ingredientes/ Alimentos excluidos'
                                                                                ? objValues[index]?.listado
                                                                                : input.label === 'Nombre Comensal'
                                                                                    ? objValues[index]?.nombre
                                                                                    : ''
                                                                    }
                                                                    disabled={!!location.state?.objeto}
                                                                />
                                                            ) : null
                                                    )}
                                                </div>
                                            ))}

                                            {infoPrecargada ? <div></div> : <div className="icon">
                                                {
                                                    (index === 0 || index >= replicas) ?
                                                        <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick} />
                                                        : <IndeterminateCheckboxIcon style={{ color: 'grey' }} onClick={() => { handleClickRemove(index) }} />
                                                }
                                            </div>}
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div className="btn">
                            <Button disabled={!!location.state?.objeto} onClick={handleSubmit} variant="contained">Guardar</Button>
                        </div>
                    </div>
                </div>
            }
            {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}
        </>
    )

}

export default AlergenosComida

