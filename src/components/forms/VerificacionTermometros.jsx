import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from './VerificacionTermometros.module.css'
import Termometros from '../modales/Termometros';
import Modal from '../shared/Modal';
import Alert from '../shared/components/Alert/Alert';
import { verificacionTermometros } from '../../services/FormsRequest';
import { useLocation } from 'react-router-dom';

function VerificacionTermometros() {
    //** ALERTA */
    const [textAlert, setTextAlert] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [showAlert, setShowlert] = useState(false);
    const initialInputsValue = { codigo: "", tipo: "", responsable: "", area: "", punto0: "", desvio0: "", punto100: "", desvio100: "", acciones: "" };
    const initialInputs2Value = { codigo: "", area: "", termoReferencia: "", termoEvaluado: "", desvio: "", acciones: "" };

    var idUser = localStorage.getItem("idUser");
    const [values, setValues] = useState()
    const [inputs] = useState([
        { id: 1, label: 'Código', prop:  'codigo'},
        { id: 2, label: 'Tipo (PIN/IR)', prop: 'tipo'},
        { id: 3, label: 'Responsable del uso', prop: 'responsable'},
        { id: 4, label: 'Área', prop: 'area'},
        { id: 5, label: 'Punto 0', prop: 'punto0'},
        { id: 6, label: 'Desvío', prop: 'desvio0'},
        { id: 7, label: 'Punto 100', prop: 'punto100'},
        { id: 8, label: 'Desvío', prop: 'desvio100'},
        { id: 9, label: 'Acciones de corrección', prop: 'acciones'},
    ]);
    const [showModal, setShowModal] = useState(false);
    const [objValues1, setObjValues1] = useState([initialInputsValue]);

    const [inputs2] = useState([
        { id: 1, label: 'Código', prop: 'codigo'},
        { id: 2, label: 'Área', prop: 'area'},
        { id: 3, label: 'Temp. termóm referencia', prop: 'termoReferencia'},
        { id: 4, label: 'Temp. termóm evaluado', prop: 'termoEvaluado'},
        { id: 5, label: 'Desvío', prop: 'desvio'},
        { id: 6, label: 'Acciones de corrección', prop: 'acciones'},
    ]);
    const [objValues2, setObjValues2] = useState([initialInputs2Value])

    const handleInputChange = (index, event, values, setValues) => {
        const { name, value } = event.target;
        const newValues = [...values];
        newValues[index][name] = value;
        setValues(newValues);
    };

    const addRow = (kind) => {
        switch (kind) {
            case 1:
                setObjValues1([...objValues1, initialInputsValue]);
                break;
            case 2: 
                setObjValues2([...objValues2, initialInputs2Value]);
                break;
            default:
                return;
        }
    };

    const handleClick = (row) => {
        addRow(row);
    };

    const handleSubmit = () => {
        const valuesToSend = {...values, inputsTrimestral: objValues2, inputsSemestral: objValues1}
        verificacionTermometros(valuesToSend).then((resp) => {
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
    useEffect(() => {
        const infoPrecargada = location.state?.objeto;
        if (infoPrecargada) { // muestro un form del historial
            console.log("infoPrecargada", infoPrecargada)
            setValues({
                fecha: infoPrecargada.fecha,
                responsable: infoPrecargada.responsable,
                inputsTrimestral: infoPrecargada.inputsTrimestral,
                inputsSemestral: infoPrecargada.inputsSemestral,
                idUser: idUser
            })
        } else { // creo un form desde cero
            setValues({
                fecha: "",
                responsable: "",
                inputsTrimestral: [initialInputsValue],
                inputsSemestral: [initialInputs2Value],
                idUser: idUser
            })
        }
    }, [])

    return (
        <>
            {
                values &&
                <div>
                    <div className="form">
                        <div className="titleContainer">
                            <h3 className="title">Verificación de Instrumentos de Medición: Termometros</h3>
                        </div>

                        {showModal ? (
                            <Modal
                                content={<Termometros />}
                                closeModal={() => setShowModal(false)}
                            />

                        )
                            : (
                                <div className='cont-btn'>
                                    <Button size="small" onClick={() => setShowModal(true)}>
                                        <i className="ri-information-line" style={{ marginRight: "8px", fontSize: "22px" }}></i> Ver Más
                                    </Button>
                                </div>
                            )
                        }

                        <div className={styles.personal}>
                            <TextField
                                type="date"
                                onChange={(e) => {
                                    setValues({ ...values, fecha: e.target.value });
                                }}
                                id="fecha"
                                name="fecha"
                                value={values.fecha}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField value={values.responsable} onChange={(e) => { setValues({ ...values, responsable: e.target.value }) }} id="outlined-basic" placeholder="Responsable de validación" label="Responsable de validación" variant="outlined" InputLabelProps={{
                                shrink: true,
                            }}/>
                        </div>

                        <br />

                        <div className={styles.subtitleCont}>
                            <p className={styles.subtitle}>TERMÓMETROS DE PINCHE/INFRARROJOS </p>
                        </div>

                        {/* <b>   FRECUENCIA: TRIMESTRAL</b> */}

                        <div className="table">
                            <div className={styles.contTitTabla}>
                                <div className={styles.subtituloTable}>
                                    <div>
                                        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Identificación Termómetro  </p>
                                    </div>
                                </div>
                            </div>

                            <div className="tableSection">
                                {objValues1.map((input, index) => (
                                        <div className="tableRow" key={index}>
                                            <p className="index">{index + 1} </p>
                                            {inputs.map((config, i) => (
                                                <div key={i}>
                                                    {config.label === 'Tipo (PIN/IR)' ? 
                                                        <FormControl variant="outlined" className={`${styles.selectField} `}>
                                                            <InputLabel id="select">{config.label}</InputLabel>                                                   
                                                            <Select
                                                                labelId="select"
                                                                className='input'
                                                                id={`config-${config.id}-${index}`}
                                                                name={`${config.prop}`}
                                                                onChange={(e) => handleInputChange(index, e, objValues1, setObjValues1)}
                                                                label={`${config.label}`}
                                                                value={input[config.prop]}
                                                                >
                                                                    <MenuItem value="PIN">PIN</MenuItem>
                                                                    <MenuItem value="IR">IR</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    : <TextField 
                                                        onChange={(e) => handleInputChange(index, e, objValues1, setObjValues1)}
                                                        className="input"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        name={`${config.prop}`}
                                                        label={config.label}
                                                        id={`config-${config.id}-${index}`} 
                                                        placeholder={`${config.label}`} variant="outlined" />
                                                    }
                                                </div>
                                            ))}
                                            <div className="icon">
                                                <AddBoxIcon style={{ color: 'grey' }} onClick={() => handleClick(1)} />
                                            </div>
                                        </div>
                                    ))}

                            </div>
                        </div>


                        <br />
                        <br />
                        <div className={styles.subtitleCont}>
                            <p className={styles.subtitle}>TERMÓMETROS DE CÁMARAS, ANTECAMARAS, HELADERAS Y FREEZER </p>
                        </div>

                        {/* <b>   FRECUENCIA: SEMESTRAL</b> */}


                        <div className="table">
                            <div className={styles.contTitTabla2}>
                                <div className={styles.subtituloTable2}>
                                    <div>
                                        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Identificación Termómetro  </p>
                                    </div>
                                </div>
                            </div>

                            <div className="tableSection">
                                {objValues2.map((input, index) => (
                                        <div className="tableRow" key={index}>
                                            <p className="index">{index + 1} </p>

                                            {inputs2.map((config, i) => (
                                                <div key={i}>
                                                    <TextField 
                                                    onChange={(e) => handleInputChange(index, e, objValues2, setObjValues2)}
                                                    id={`config-${config.id}-${index}`}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    className="input"
                                                    label={config.label}
                                                    name={`${config.prop}`}
                                                    placeholder={`${config.label}`} 
                                                    variant="outlined" />

                                                </div>
                                            ))}
                                            <div className="icon">
                                                <AddBoxIcon style={{ color: 'grey' }} onClick={() => handleClick(2)} />
                                            </div>
                                        </div>
                                    ))}

                            </div>
                        </div>


                        <br />
                        <br />

                        <span><b>*</b> PIN(Termómetro de pinche) - IR (Termómetro infrarrojo)</span>

                        <div className="btn">
                            <Button onClick={handleSubmit} variant="contained">Guardar</Button>
                        </div>

                    </div>
                </div>
            }

            {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}
        </>

    )
}

export default VerificacionTermometros