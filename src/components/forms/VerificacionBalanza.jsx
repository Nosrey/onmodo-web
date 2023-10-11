import { Box, Button, InputLabel, MenuItem, Select, TextField, FormControl } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './VerificacionBalanza.module.css'
import Modal from '../shared/Modal';
import Balanzas from '../modales/Balanzas';
import axios from 'axios';
import { verificacionBalanza } from '../../services/FormsRequest';
import Alert from '../shared/components/Alert/Alert';
import { useLocation } from 'react-router-dom';


function VerificacionBalanza() {
    //** ALERTA */
    const [textAlert, setTextAlert] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [showAlert, setShowlert] = useState(false);

    const [inputs] = useState([
        { id: 1, label: 'Código' },
        { id: 2, label: 'Tipo (BP/BR)' },
        { id: 3, label: 'Responsable del uso' },
        { id: 4, label: 'Área' },
        { id: 5, label: 'Peso Masa ref/Pto balanza' },
        { id: 6, label: 'Peso real' },
        { id: 7, label: 'Desvío' },
        { id: 8, label: 'Acciones de corrección' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [showModal, setShowModal] = useState(false);
    var idUser = localStorage.getItem("idUser");
    const [values, setValues] = useState({
        fecha: "",
        responsable: "",
        balanza: "",
        inputs: [{}],
        idUser: idUser
    })
    const [objValues, setObjValues] = useState({
        codigo: "",
        tipo: "",
        responsableUso: "",
        area: "",
        pesoMasa: "",
        pesoReal: "",
        desvio: "",
        accionesCorrecion: ""
    })
    const [inputValues, setInputValues] = useState([])
    const [trigger, setTrigger] = useState(false)

    useEffect(() => {
        if (replicas === 1 && objValues.codigo !== "" && objValues.tipo !== "" && objValues.responsableUso !== "" && objValues.area !== "" && objValues.pesoMasa !== "" && objValues.pesoReal !== "" && objValues.desvio !== "" && objValues.accionesCorrecion !== "" && objValues.id !== "") {
            setInputValues([objValues])
        } else if (replicas > 1 && objValues.codigo !== "" && objValues.tipo !== "" && objValues.responsableUso !== "" && objValues.area !== "" && objValues.pesoMasa !== "" && objValues.pesoReal !== "" && objValues.desvio !== "" && objValues.accionesCorrecion !== "" && objValues.id !== "") {
            setInputValues([...inputValues, objValues])
        }
    }, [trigger])
    useEffect(() => {
        setValues({ ...values, inputs: inputValues })
    }, [inputValues])
    useEffect(() => {
        if (objValues.codigo !== "" && objValues.tipo !== "" && objValues.responsableUso !== "" && objValues.area !== "" && objValues.pesoMasa !== "" && objValues.pesoReal !== "" && objValues.desvio !== "" && objValues.accionesCorrecion !== "") {
            setTrigger(true)
        }
    }, [objValues])

    const inputsValuesConstructor = (id, label, index) => {
        const inputTarget = document.getElementById(id)
        label === 'Código' ? setObjValues({ ...objValues, codigo: inputTarget.value, id: index }) :
            label === 'Tipo (BP/BR)' ? setObjValues({ ...objValues, tipo: inputTarget.value }) :
                label === 'Responsable del uso' ? setObjValues({ ...objValues, responsableUso: inputTarget.value }) :
                    label === 'Área' ? setObjValues({ ...objValues, area: inputTarget.value }) :
                        label === 'Peso Masa ref/Pto balanza' ? setObjValues({ ...objValues, pesoMasa: inputTarget.value }) :
                            label === 'Peso real' ? setObjValues({ ...objValues, pesoReal: inputTarget.value }) :
                                label === 'Desvío' ? setObjValues({ ...objValues, desvio: inputTarget.value }) :
                                    label === 'Acciones de corrección' && setObjValues({ ...objValues, accionesCorrecion: inputTarget.value })
    }

    const handleClick = () => {
        setReplicas(replicas + 1);
        setObjValues({
            codigo: "",
            tipo: "",
            responsableUso: "",
            area: "",
            pesoMasa: "",
            pesoReal: "",
            desvio: "",
            accionesCorrecion: ""
        })
        setTrigger(false)
    };

    const handleSubmit = () => {
        console.log(values)
        verificacionBalanza(values).then((resp) => {
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
    const location = useLocation();
    const infoPrecargada = location.state?.objeto;
    useEffect(() => {
        if (infoPrecargada) { // muestro un form del historial
            console.log("infoPrecargada", infoPrecargada)
            console.log("sepudo")
            setValues({
                fecha: infoPrecargada.fecha,
                responsable: infoPrecargada.responsable,
                balanza: infoPrecargada.balanza,
                inputs: infoPrecargada.inputs,
                idUser: idUser

            })
            setReplicas(infoPrecargada.inputs.length)
            console.log("values", values)
        } else { // creo un form desde cero
            console.log("error")
            setValues({
                fecha: "",
                responsable: "",
                balanza: "",
                inputs: [{}],
                idUser: idUser
            })
        }
    }, [])
    return (
        <>
            <div>
                <div className="form">
                    <div className="titleContainer">
                        <h3 className="title">Verificación de Instrumentos de Medición: Balanzas</h3>
                    </div>
                    {showModal ? (
                        <Modal
                            content={<Balanzas />}
                            closeModal={() => setShowModal(false)}
                        />

                    ) : (
                        <div className='cont-btn'>
                            <Button size="small" onClick={() => setShowModal(true)}>
                                <i class="ri-information-line" style={{ marginRight: "8px", fontSize: "22px" }}></i> Ver Más
                            </Button>
                        </div>
                    )
                    }
                    
                    <div className={styles.personal}>

                        <TextField
                            type="date"
                            className='input'
                            onChange={(e) => { setValues({ ...values, fecha: e.target.value }) }}
                            id="fecha"
                            name="fecha"
                            value={values.fecha || ''}
                            disabled={!!location.state?.objeto}
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    <FormControl  disabled={!!location.state?.objeto}>
                        <InputLabel>Instrumento</InputLabel>
                        <Select
                            onChange={(e) => { setValues({ ...values, balanza: e.target.value }) }}
                            value={values.balanza}
                            defaultValue={"Báscula"}
                            className="input"
                            
                        >
                            <MenuItem value="Balanza">Balanza</MenuItem>
                            <MenuItem value="Báscula">Báscula</MenuItem>
                        </Select>
                    </FormControl>





                    </div>


                    <div className="table">
                        <div className={styles.contTitTabla}>
                            <div className={styles.subtituloTable}>
                                <div>
                                    <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Identificación Balanza </p>
                                </div>
                            </div>
                        </div>

                        <div className="tableSection">
                            {Array(replicas)
                                .fill(0)
                                .map((_, index) => (
                                    <div className="tableRow" key={index}>
                                        <p className="index">{index + 1} </p>

                                        {inputs.map((input) => (
    <div key={input.id}>
        {input.label === 'Tipo (BP/BR)' ? (
            <FormControl   variant="outlined" >
                <InputLabel >Tipo (BP/BR)</InputLabel>
                <Select
                    labelId={`label-tipo-${index}`}
                    id={`input-tipo-${index}`}
                    value={(values.inputs[index]?.tipo) || ''}
                    onChange={(e) => {
                        inputsValuesConstructor(`input-${input.id}-${index}`, input.label, index);
                    }}
                    variant="outlined"
                    className="input"
                    disabled={!!location.state?.objeto}
                >
                    <MenuItem value="BP">BP</MenuItem>
                    <MenuItem value="BR">BR</MenuItem>
                </Select>
            </FormControl>
        ) : (
            <TextField
                onKeyUp={(e) => {
                    inputsValuesConstructor(`input-${input.id}-${index}`, input.label, index);
                }}
                className="input"
                id={`input-${input.id}-${index}`}
                name={`input-${input.id}-${index}`}
                label={`${input.label}`}
                variant="outlined"
                disabled={!!location.state?.objeto}
                InputLabelProps={{
                    shrink: true,
                }}
                value={
                    input.label === 'Código'
                        ? values.inputs[index]?.codigo
                        : input.label === 'Responsable del uso'
                            ? values.inputs[index]?.responsableUso
                            : input.label === 'Área'
                                ? values.inputs[index]?.area
                                : input.label === 'Peso Masa ref/Pto balanza'
                                    ? values.inputs[index]?.pesoMasa
                                    : input.label === 'Peso real'
                                        ? values.inputs[index]?.pesoReal
                                        : input.label === 'Desvío'
                                            ? values.inputs[index]?.desvio
                                            : input.label === 'Acciones de corrección'
                                                ? values.inputs[index]?.accionesCorrecion
                                                : ''
                }
            />
        )}
    </div>
))}
                                        {infoPrecargada ? <div></div> : <div className="icon">
                                            <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick} />
                                        </div>}
                                    </div>
                                ))}

                        </div>
                    </div>
                    <span><b>*</b> BP(Balanza de producción) - BR (Balanza de recepción)</span>
                    <br />
                    <br />


                    <div className="btn">
                        <Button disabled={!!location.state?.objeto} onClick={handleSubmit} variant="contained">Guardar</Button>
                    </div>

                </div>
            </div>
            {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}

        </>

    )
}

export default VerificacionBalanza;
