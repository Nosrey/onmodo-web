import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import styles from './RegistroCapacitacion.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import Alert from '../../shared/components/Alert/Alert';
import { registroCapacitacion } from '../../../services/FormsRequest';
import { useLocation } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

function RegistroCapacitacion() {

    //** ALERTA */
    const [textAlert, setTextAlert] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [showAlert, setShowlert] = useState(false);
    const [file, setFile] = useState(null);
    var idUser = localStorage.getItem("idUser");
    const [inputs] = useState([
        { id: 1, label: 'DNI' },
        { id: 2, label: 'Nombre y Apellido' },
        { id: 3, label: 'Area/Lugar de trabajo' },
        { id: 5, label: 'Resultado Evaluación' },
        { id: 4, label: 'Metodo de Evaluacion' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [metodo, setMetodo] = useState([]);
    const [showTextField1, setShowTextField1] = useState(false);
    const [showTextField2, setShowTextField2] = useState(false);
    const [otro1, setOtro1] = useState(false);
    const [otro2, setOtro2] = useState(false);

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
        cargo: file,
        date: "",
        idUser: idUser,
        metodo: ""

    })
    const handleMetodoChange = (value, index) => {
        const updatedMetodo = [...metodo];
        updatedMetodo[index] = value;
        setMetodo(updatedMetodo);

    };
    const [objValues, setObjValues] = useState({ dni: "", nombre: "", area: "", resultado: "", metodo: "" })
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
        { label: "Procedimiento", check: false },
        { label: "Otros1", check: false, desc: "" }
    ])
    const [materialExpuestoValues] = useState([
        { label: "Video", check: false },
        { label: "Filminas", check: false },
        { label: "Disertación", check: false },
        { label: "Otros2", check: false, desc: "" }
    ])
    const [inputValues, setInputValues] = useState([])
    const [trigger, setTrigger] = useState(false)
    useEffect(() => {
        if (replicas === 1 && objValues.metodo !== "" && objValues.dni !== "" && objValues.nombre !== "" && objValues.area !== "" && objValues.resultado !== "" && objValues.id !== "") {
            setInputValues([objValues])
        } else if (replicas > 1 && objValues.metodo !== "" && objValues.dni !== "" && objValues.nombre !== "" && objValues.area !== "" && objValues.resultado !== "" && objValues.id !== "") {
            setInputValues([...inputValues, objValues])
        }
    }, [trigger])


    useEffect(() => {
        setValues({ ...values, asistentes: inputValues })
    }, [inputValues])

    useEffect(() => {
        if (objValues.dni !== "" && objValues.metodo !== "" && objValues.nombre !== "" && objValues.area !== "" && objValues.resultado !== "") {
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
            metodo: label === "Metodo de Evaluacion" ? inputTarget.value : objValues.metodo,
            resultado: label === "Resultado Evaluación" ? inputTarget.value : objValues.resultado,
            id: label === "DNI" ? index : objValues.id,
        }));
    }
    const checkboxValuesConstructor = (label, value, desc) => {
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
        else if (label === "Otros1") {
            materialExpuestoValues[3].check = value
            materialExpuestoValues[3].desc = desc
            setValues({ ...values, materialExpuesto: materialExpuestoValues })
        }
        else if (label === "Otros2") {
            materialEntregadoValues[3].check = value
            materialEntregadoValues[3].desc = desc
            setValues({ ...values, materialEntregado: materialEntregadoValues })
        }
        
        else {
            materialExpuestoValues[2].check = value
            setValues({ ...values, materialExpuesto: materialExpuestoValues })
        }
    }

    const handleClick = () => {
        setReplicas(replicas + 1);
        // setInputValues([...inputValues, objValues]);
        setObjValues({
            dni: "",
            nombre: "",
            area: "",
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
        console.log(values)
        registroCapacitacion(values).then((resp) => {
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
            console.log("infoPrecargada", infoPrecargada);
            setReplicas(infoPrecargada.asistentes.length);
            setValues({
                fecha: infoPrecargada.fecha,
                tiempoDuracion: infoPrecargada.tiempoDuracion,
                checkboxes: infoPrecargada.checkboxes,
                temas: infoPrecargada.temas,
                materialEntregado: infoPrecargada.materialEntregado,
                materialExpuesto: infoPrecargada.materialExpuesto,
                asistentes: infoPrecargada.asistentes,
                observaciones: infoPrecargada.observaciones,
                instructor: infoPrecargada.instructor,
                cargo: infoPrecargada.cargo,
                date: infoPrecargada.date,
                idUser: idUser,
                metodo: infoPrecargada.metodo
            });
            setObjValues(infoPrecargada.asistentes);
            console.log("objValues", objValues);
            console.log("values", values);
           
        } else { // creo un form desde cero

        }
    }, [location.state?.objeto]);

    
   

    const onDrop = (acceptedFiles) => {
        // Solo toma el primer archivo si hay varios
        setFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    useEffect(() => {
        if(infoPrecargada){
            values.materialEntregado[3]?.check === true ? setShowTextField1(true) : setShowTextField1(true)
            values.materialExpuesto[3]?.check === true ? setShowTextField2(true) : setShowTextField2(true)
        }
    }, [])
 
    return (
        <><div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Registro de Capacitación</h3>
                </div>
                <div className={styles.personalRight}>

                    <TextField
                        type="date"
                        value={values.fecha || ''}
                        onChange={(e) => setValues({ ...values, fecha: e.target.value })}
                        id="outlined-basic"
                        label="Fecha"
                        variant="outlined"
                        disabled={!!location.state?.objeto}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        onChange={(e) => { setValues({ ...values, tiempoDuracion: e.target.value }); }}
                        type="time"
                        value={values.tiempoDuracion || ''}
                        id="tiempo-duracion"
                        name="tiempo-duracion"
                        disabled={!!location.state?.objeto}
                    />


                </div>

                <h4>Tipo de capacitación </h4>
                <p>Selecciona la opción que corresponda:</p>

                <div className={styles.listContainer}>
                    <FormControlLabel disabled={!!location.state?.objeto} control={<Checkbox checked={values.checkboxes[0]?.check || false} onChange={(e) => { checkboxValuesConstructor("Inducción", e.target.checked); }} />} label="Inducción" className={styles.listItem} />
                    <FormControlLabel disabled={!!location.state?.objeto} control={<Checkbox checked={values.checkboxes[1]?.check || false} onChange={(e) => { checkboxValuesConstructor("Campaña", e.target.checked); }} />} className={styles.listItem} label="Campaña" />
                    <FormControlLabel disabled={!!location.state?.objeto} control={<Checkbox checked={values.checkboxes[2]?.check || false} onChange={(e) => { checkboxValuesConstructor("Entrenamiento Puesto de trabajo", e.target.checked); }} />} className={styles.listItem} label="Entrenamiento Puesto de trabajo" />
                    <FormControlLabel disabled={!!location.state?.objeto} control={<Checkbox checked={values.checkboxes[3]?.check || false} onChange={(e) => { checkboxValuesConstructor("Capacitaciones gubernamentales", e.target.checked); }} />} className={styles.listItem} label="Capacitaciones gubernamentales" />
                    <FormControlLabel disabled={!!location.state?.objeto} control={<Checkbox checked={values.checkboxes[4]?.check || false} onChange={(e) => { checkboxValuesConstructor("Capacitación sobre Normas o Certificaciones", e.target.checked); }} />} className={styles.listItem} label="Capacitación sobre Normas o Certificaciones" />
                    <FormControlLabel disabled={!!location.state?.objeto} control={<Checkbox checked={values.checkboxes[5]?.check || false} onChange={(e) => { checkboxValuesConstructor("Cierre Auditoría", e.target.checked); }} />} className={styles.listItem} label="Cierre Auditoría" />
                </div>

                <div className={styles.personalText}>
                    <TextField
                        onChange={(e) => { setValues({ ...values, temas: e.target.value }); }}
                        fullWidth
                        id="outlined-multiline-static"
                        label="Temas dados"
                        multiline
                        value={values.temas || ''}
                        rows={4}
                        disabled={!!location.state?.objeto}
                    />

                </div>

                <div className={styles.matDidacticoSection}>
                    <div>
                        <div className={styles.listTitle}>
                            <h4>Material didáctico Entregado</h4>
                            <p> (Selecciona la opción que corresponda)</p>
                        </div>

                        <div className={styles.listContainer}>
                            <FormControlLabel checked={values.materialEntregado[0]?.check || false} disabled={!!location.state?.objeto} control={<Checkbox onChange={(e) => { checkboxValuesConstructor("Manual /instructivo", e.target.checked); }} />} className={styles.listItem} label="Manual /instructivo" />
                            <FormControlLabel checked={values.materialEntregado[1]?.check || false} disabled={!!location.state?.objeto} control={<Checkbox onChange={(e) => { checkboxValuesConstructor("Folleto", e.target.checked); }} />} className={styles.listItem} label="Folleto" />
                            <FormControlLabel checked={values.materialEntregado[2]?.check || false} disabled={!!location.state?.objeto} control={<Checkbox onChange={(e) => { checkboxValuesConstructor("Procedimiento", e.target.checked); }} />} className={styles.listItem} label="Procedimiento" />
                            <div>

                                <FormControlLabel checked={values.materialEntregado[3]?.check || otro1} onClick={ e=> setOtro1(e.target.checked)} control={<Checkbox
                                    id="showTextField"
                                    name="showTextField"
                                    
                                    disabled={!!location.state?.objeto}
                                    onChange={($event) => handleCheckboxChange($event, 1)} />} label="Otros" />
                                <label htmlFor="showTextField"></label>

                            </div>
                        </div>
                        <div className={styles.personal}>
                            {showTextField1 && (
                                <TextField value={values.materialEntregado[3]?.desc} disabled={!!location.state?.objeto}  onChange={e => checkboxValuesConstructor("Otros2", true, e.target.value)}  id="outlined-basic" name="textField" variant="outlined" label="Otros" />
                            )}
                        </div>
                    </div>

                    <div>
                        <div className={styles.listTitle}>
                            <h4>Material didáctico Expuesto</h4>
                            <p>(Selecciona las opciónes que correspondan)</p>
                        </div>

                        <div className={styles.listContainer}>
                            <FormControlLabel checked={values.materialExpuesto[0]?.check || false} disabled={!!location.state?.objeto} control={<Checkbox onChange={(e) => { checkboxValuesConstructor("Video", e.target.checked); }} />} className={styles.listItem} label="Video" />
                            <FormControlLabel checked={values.materialExpuesto[1]?.check || false} disabled={!!location.state?.objeto} control={<Checkbox onChange={(e) => { checkboxValuesConstructor("Filminas", e.target.checked); }} />} className={styles.listItem} label="Filminas" />
                            <FormControlLabel checked={values.materialExpuesto[2]?.check || false} disabled={!!location.state?.objeto} control={<Checkbox onChange={(e) => { checkboxValuesConstructor("Disertación", e.target.checked); }} />} className={styles.listItem} label="Disertación" />

                            <div>
                                <FormControlLabel checked={values.materialExpuesto[3]?.check || otro2} onClick={e=> setOtro2(e.target.checked)} control={<Checkbox
                                    id="showTextField"
                                    name="showTextField"
                                    disabled={!!location.state?.objeto}
                                    onChange={($event) => handleCheckboxChange($event, 2)} />} label="Otros" />
                                <label htmlFor="showTextField"></label>
                            </div>
                        </div>

                        <div className={styles.personal}>
                            
                            {showTextField2 && (
                                <TextField id="outlined-basic" disabled={!!location.state?.objeto} value={values.materialExpuesto[3]?.desc} onChange={e => checkboxValuesConstructor("Otros1", true, e.target.value)} name="textField" variant="outlined" label="Otros" />
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
                                            {input.label !==  "Metodo de Evaluacion" ? (
                                                 <TextField
                                                 onKeyUp={(e) => {
                                                     inputsValuesConstructor(`input-${input.id}-${index}`, input.label, index);
                                                 }}
                                                 id={`input-${input.id}-${index}`}
                                                 name={`input-${input.id}-${index}`}
                                                 label={`${input.label}`}
                                                 variant="outlined"
                                                 disabled={!!location.state?.objeto}
                                                 value={
                                                     input.label === 'Nombre y Apellido'
                                                         ? objValues[index]?.nombre
                                                         : input.label === 'Area/Lugar de trabajo'
                                                             ? objValues[index]?.area
                                                             : input.label === 'Resultado Evaluación'
                                                                 ? objValues[index]?.resultado
                                                                 : input.label === 'DNI'
                                                                     ? objValues[index]?.dni
                                                                     : ''
                                                 }
                                             />
                                        
                                            ) : (
                                                <>
                                                    <FormControl variant="outlined" className={`${styles.selectField} `}>
                                                        <InputLabel id={`metodo-evaluacion-label-${index}`}>Método de Evaluación</InputLabel>
                                                        <Select
                                                            disabled={!!location.state?.objeto}
                                                            labelId={`metodo-evaluacion-label-${index}`}
                                                            id={`metodo-evaluacion-${index}`}
                                                            value={objValues[index]?.metodo || metodo[index]}
                                                            onChange={e => {setObjValues({...objValues, metodo: e.target.value}); handleMetodoChange(e.target.value, index)}}
                                                            label="Método de Evaluación"
                                                            className={styles.largeSelectInput}
                                                        >
                                                            <MenuItem value="Oral">Oral</MenuItem>
                                                            <MenuItem value="Escrito">Escrito</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                 
                                                    
                                                </>
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
                    <TextField value={values.observaciones || ''} disabled={!!location.state?.objeto} onChange={(e) => { setValues({ ...values, observaciones: e.target.value }); }} fullWidth id="outlined-basic" label="Observaciones" variant="outlined" />
                </div>


                <div className={styles.firma}>
                    <TextField value={values.instructor || ''} disabled={!!location.state?.objeto} onChange={(e) => { setValues({ ...values, instructor: e.target.value }); }} id="outlined-basic" label="Instructor" variant="outlined" />
                    <div   {...getRootProps()} className={styles.file} >
                        <input disabled={!!location.state?.objeto} {...getInputProps()} />
                        <h6 >Arrastra y suelta la firma aqui, o haz clic para seleccionarla</h6>
                        {file && <h6>Archivo seleccionado: {file.name}</h6>}
                    </div>
                </div>

                <div className="btn">
                    <Button disabled={!!location.state?.objeto} onClick={handleSubmit} variant="contained">Guardar</Button>

                </div>

            </div>
        </div>
            {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}
        </>
    )
}

export default RegistroCapacitacion