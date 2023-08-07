import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import styles from './RegistroCapacitacion.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import Alert from '../../shared/components/Alert/Alert';
import { registroCapacitacion } from '../../../services/FormsRequest';

function RegistroCapacitacion() {
    
    //** ALERTA */
    const [textAlert, setTextAlert] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [showAlert, setShowlert] = useState(false);

    var idUser = localStorage.getItem("idUser");
    const [inputs] = useState([
        { id: 1, label: 'DNI' },
        { id: 2, label: 'Nombre y Apellido' },
        { id: 3, label: 'Area/Lugar de trabajo' },
        { id: 4, label: 'Firma' },
        { id: 5, label: 'Metodo de Evaluacion' },
        { id: 6, label: 'Resultado Evaluación' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [showTextField1, setShowTextField1] = useState(false);
    const [showTextField2, setShowTextField2] = useState(false);


    const [values, setValues] = useState({
        fecha: "",
        tiempoDuracion: "",
        checkboxes: [{}],
        temas: "",
        materialEntregado: [{}],
        materialExpuesto: [{}],
        asistentes: [{
        }],
        observaciones: "",
        instructor: "",
        cargo: "",
        firma: "",
        date: "",
        idUser: idUser,
        metodo:""

    })
    const [objValues, setObjValues] = useState({ dni: "", nombre: "", area: "", firma: "", resultado: "", metodo: "" })
    const [checkboxesValues] = useState([
        { label: "Inducción", check: false },
        { label: "Campaña", check: false },
        { label: "Entrenamiento Puesto de trabajo", check: false },
        { label: "Capacitaciones gubernamentales", check: false },
        { label: "Capacitación sobre Normas o Certificaciones", check: false },
        { label: "Cierre Auditoría", check: false }
    ])
    const [materialEntregadoValues] = useState([
        { label: "Manual /instructivo", check: false },
        { label: "Folleto", check: false },
        { label: "Procedimiento", check: false }
    ])
    const [materialExpuestoValues] = useState([
        { label: "Video", check: false },
        { label: "Filminas", check: false },
        { label: "Disertación", check: false }
    ])
    const [inputValues, setInputValues] = useState([])
    const [trigger, setTrigger] = useState(false)
    useEffect(() => {
        if (replicas === 1 && objValues.metodo !== "" && objValues.dni !== "" && objValues.nombre !== "" && objValues.area !== "" && objValues.firma !== "" && objValues.resultado !== "" && objValues.id !== "") {
            setInputValues([objValues])
        } else if (replicas > 1 && objValues.metodo !== "" && objValues.dni !== "" && objValues.nombre !== "" && objValues.area !== "" && objValues.firma !== "" && objValues.resultado !== "" && objValues.id !== "") {
            setInputValues([...inputValues, objValues])
        }
    }, [trigger])


    useEffect(() => {
        setValues({ ...values, asistentes: inputValues })
    }, [inputValues])
    
    useEffect(() => {
        if (objValues.dni !== "" && objValues.metodo !== "" && objValues.nombre !== "" && objValues.area !== "" && objValues.firma !== "" && objValues.resultado !== "") {
            setTrigger(true)
        }
    }, [objValues])

    const inputsValuesConstructor = (id, label, index) => {
        const inputTarget = document.getElementById(id)
        setObjValues((prevObjValues) => ({
            ...prevObjValues,
            dni: label === "DNI" ? inputTarget.value : objValues.dni,
            nombre: label === "Nombre y Apellido" ? inputTarget.value : objValues.nombre,
            area: label === "Area/Lugar de trabajo" ? inputTarget.value : objValues.area,
            firma: label === "Firma" ? inputTarget.value : objValues.firma,
            metodo: label === "Metodo de Evaluacion" ? inputTarget.value : objValues.metodo,
            resultado: label === "Resultado Evaluación" ? inputTarget.value : objValues.resultado,
            id: label === "DNI" ? index : objValues.id,
        }));
    }
    const checkboxValuesConstructor = (label, value) => {
        console.log(value)
        if (label === 'Inducción') {
            checkboxesValues[0].check = value
            setValues({ ...values, checkboxes: checkboxesValues })
        }
        else if (label === "Campaña") {
            checkboxesValues[1].check = value
            setValues({ ...values, checkboxes: checkboxesValues })
        }
        else if (label === "Entrenamiento Puesto de trabajo") {
            checkboxesValues[2].check = value
            setValues({ ...values, checkboxes: checkboxesValues })
        }
        else if (label === "Capacitaciones gubernamentales") {
            checkboxesValues[3].check = value
            setValues({ ...values, checkboxes: checkboxesValues })
        }
        else if (label === "Capacitación sobre Normas o Certificaciones") {
            checkboxesValues[4].check = value
            setValues({ ...values, checkboxes: checkboxesValues })
        }
        else if (label === "Cierre Auditoría") {
            checkboxesValues[5].check = value
            setValues({ ...values, checkboxes: checkboxesValues })
        }
        else if (label === "Manual /instructivo") {
            materialEntregadoValues[0].check = value
            setValues({ ...values, materialEntregado: materialEntregadoValues })
        }
        else if (label === "Folleto") {
            materialEntregadoValues[1].check = value
            setValues({ ...values, materialEntregado: materialEntregadoValues })
        }
        else if (label === "Procedimiento") {
            materialEntregadoValues[2].check = value
            setValues({ ...values, materialEntregado: materialEntregadoValues })
        }
        else if (label === "Video") {
            materialExpuestoValues[0].check = value
            setValues({ ...values, materialExpuesto: materialExpuestoValues })
        }
        else if (label === "Filminas") {
            materialExpuestoValues[1].check = value
            setValues({ ...values, materialExpuesto: materialExpuestoValues })
        }
        else {
            materialExpuestoValues[2].check = value
            setValues({ ...values, materialExpuesto: materialExpuestoValues })
        }
    }

    const handleClick = () => {
        setReplicas(replicas + 1);
        setInputValues([...inputValues, objValues]);
        setObjValues({
            dni: "",
            nombre: "",
            area: "",
            firma: "",
            resultado: "",
            metodo: ""
        });
        setTrigger(false);
    };


    const handleCheckboxChange = (event, id) => {
        if (id === 1) {
            setShowTextField1(event.target.checked);
        }
        if (id === 2) {
            setShowTextField2(event.target.checked);
        }
    };

    const handleSubmit = () => {
        registroCapacitacion(values).then((resp)=> {
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
        <><div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Registro de Capacitación</h3>
                </div>
                <div className={styles.personalRight}>

                    <input
                        type="date"
                        value={values.fecha}
                        onChange={(e) => setValues({ ...values, fecha: e.target.value })}
                        id="outlined-basic"
                        label="Fecha"
                        variant="outlined" />
                    <input
                        onChange={(e) => { setValues({ ...values, tiempoDuracion: e.target.value }); } }
                        type="time"
                        id="tiempo-duracion"
                        name="tiempo-duracion" />

                </div>

                <h4>Tipo de capacitación </h4>
                <p>Selecciona la opción que corresponda:</p>

                <div className={styles.listContainer}>
                    <FormControlLabel control={<Checkbox onChange={(e) => { checkboxValuesConstructor("Inducción", e.target.checked); } } />} label="Inducción" className={styles.listItem} />
                    <FormControlLabel control={<Checkbox onChange={(e) => { checkboxValuesConstructor("Campaña", e.target.checked); } } />} className={styles.listItem} label="Campaña" />
                    <FormControlLabel control={<Checkbox onChange={(e) => { checkboxValuesConstructor("Entrenamiento Puesto de trabajo", e.target.checked); } } />} className={styles.listItem} label="Entrenamiento Puesto de trabajo" />
                    <FormControlLabel control={<Checkbox onChange={(e) => { checkboxValuesConstructor("Capacitaciones gubernamentales", e.target.checked); } } />} className={styles.listItem} label="Capacitaciones gubernamentales" />
                    <FormControlLabel control={<Checkbox onChange={(e) => { checkboxValuesConstructor("Capacitación sobre Normas o Certificaciones", e.target.checked); } } />} className={styles.listItem} label="Capacitación sobre Normas o Certificaciones" />
                    <FormControlLabel control={<Checkbox onChange={(e) => { checkboxValuesConstructor("Cierre Auditoría", e.target.checked); } } />} className={styles.listItem} label="Cierre Auditoría" />
                </div>

                <div className={styles.personalText}>
                    <TextField
                        onChange={(e) => { setValues({ ...values, temas: e.target.value }); } }
                        fullWidth
                        id="outlined-multiline-static"
                        label="Temas dados"
                        multiline
                        rows={4} />
                </div>

                <div className={styles.matDidacticoSection}>
                    <div>
                        <div className={styles.listTitle}>
                            <h4>Material didáctico Entregado</h4>
                            <p> (Selecciona la opción que corresponda)</p>
                        </div>

                        <div className={styles.listContainer}>
                            <FormControlLabel control={<Checkbox onChange={(e) => { checkboxValuesConstructor("Manual /instructivo", e.target.checked); } } />} className={styles.listItem} label="Manual /instructivo" />
                            <FormControlLabel control={<Checkbox onChange={(e) => { checkboxValuesConstructor("Folleto", e.target.checked); } } />} className={styles.listItem} label="Folleto" />
                            <FormControlLabel control={<Checkbox onChange={(e) => { checkboxValuesConstructor("Procedimiento", e.target.checked); } } />} className={styles.listItem} label="Procedimiento" />
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
                            <p>(Selecciona las opciónes que correspondan)</p>
                        </div>

                        <div className={styles.listContainer}>
                            <FormControlLabel control={<Checkbox onChange={(e) => { checkboxValuesConstructor("Video", e.target.checked); } } />} className={styles.listItem} label="Video" />
                            <FormControlLabel control={<Checkbox onChange={(e) => { checkboxValuesConstructor("Filminas", e.target.checked); } } />} className={styles.listItem} label="Filminas" />
                            <FormControlLabel control={<Checkbox onChange={(e) => { checkboxValuesConstructor("Disertación", e.target.checked); } } />} className={styles.listItem} label="Disertación" />

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
                                            {input.id !== 5 ? (
                                                <TextField
                                                    onKeyUp={(e) => {
                                                        inputsValuesConstructor(`input-${input.id}-${index}`, input.label, index);
                                                    } }
                                                    id={`input-${input.id}-${index}`}
                                                    name={`input-${input.id}-${index}`}
                                                    label={`${input.label}`}
                                                    variant="outlined" />
                                            ) : (
                                                <FormControl variant="outlined" className={`${styles.selectField} `}>
                                                    <InputLabel id="metodo-evaluacion-label">Método de Evaluación</InputLabel>
                                                    <Select
                                                        labelId="metodo-evaluacion-label"
                                                        id="metodo-evaluacion"
                                                        value={values.metodo}
                                                        onChange={(e) => setValues({ ...values, metodo: e.target.value })}
                                                        label="Método de Evaluación"
                                                        className={styles.largeSelectInput}
                                                    >
                                                        <MenuItem value="Oral">Oral</MenuItem>
                                                        <MenuItem value="Escrito">Escrito</MenuItem>
                                                    </Select>
                                                </FormControl>
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


                <div className={styles.personal}>
                    <TextField onChange={(e) => { setValues({ ...values, observaciones: e.target.value }); } } fullWidth id="outlined-basic" label="Observaciones" variant="outlined" />
                </div>


                <div className={styles.firma}>
                    <TextField onChange={(e) => { setValues({ ...values, instructor: e.target.value }); } } id="outlined-basic" label="Instructor" variant="outlined" />
                    <TextField onChange={(e) => { setValues({ ...values, cargo: e.target.value }); } } id="outlined-basic" label="Cargo / Función" variant="outlined" />
                    <TextField onChange={(e) => { setValues({ ...values, firma: e.target.value }); } } id="outlined-basic" label="Firma" variant="outlined" />
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

export default RegistroCapacitacion