import { Button, TextField, Checkbox, FormControlLabel, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from './InformeInternoAccidente.module.css'
import { useSelector } from 'react-redux';
import { informeIntAccidente } from '../../../services/FormsRequest';
import Alert from '../../shared/components/Alert/Alert';
import { useLocation } from 'react-router';
import { useDropzone } from 'react-dropzone';

function InformeInternoAccidente() {
    //** ALERTA */
    const [textAlert, setTextAlert] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [showAlert, setShowlert] = useState(false);

    function resetFormState() {
        const idUser = localStorage.getItem("idUser");
        setValues({
            comedor: "",
            fecha: "",
            tipo: "",
            checkboxes: [{}],
            nombreApellido: "",
            cuil: "",
            fechaIngreso: "",
            puesto: "",
            hora: "",
            lugar: "",
            descripcion: "",
            checkboxesAccidente: [{}],
            lugarLesion: "",
            medidas: "",
            razon: "",
            firmaEmpleado: "",
            firmaAdm: "",
            encargado: "",
            date: "",
            idUser: idUser,
        });
    }

    const prueba = useSelector(state => state.informeAccidenteR.inputsValues)
    console.log(prueba)
    const [showTextField1, setShowTextField1] = useState(false);
    const [showTextField2, setShowTextField2] = useState(false);
    const [showTextField3, setShowTextField3] = useState(false);
    const [files, setFiles] = useState(false);

    var idUser = localStorage.getItem("idUser");
    const [values, setValues] = useState()
    const [checkboxesValues] = useState([
        { label: "CDR", check: false },
        { label: "CMS", check: false },
        { label: "Laboral", check: false },
        { label: "In Itinere", check: false },
        { label: "Se adjunta denuncia policial", check: false },
    ])
    const [checkboxesAccidenteValues] = useState([
        { label: "¿Era su trabajo habitual?", check: false },
        { label: "¿Conocía la tarea asignada?", check: false },
        { label: "¿Una máquina le causó la lesión?", check: false, cualMaquina: "" },
        { label: "¿Hubo alguna acción o condición insegura que fuera la causante del accidente?", check: false, cualAccion: "" },
        { label: "¿Estaba usando su E.P.P.?", check: false }
    ])


    const checkboxValuesConstructor = (label, value) => {
        console.log(value)
        if (label === 'CDR') {
            checkboxesValues[0].check = value
            setValues({ ...values, checkboxes: checkboxesValues })
        }
        else if (label === "CMS") {
            checkboxesValues[1].check = value
            setValues({ ...values, checkboxes: checkboxesValues })
        }
        else if (label === "Laboral") {
            checkboxesValues[2].check = value
            setValues({ ...values, checkboxes: checkboxesValues })
        }
        else if (label === "In Itinere") {
            checkboxesValues[3].check = value
            setValues({ ...values, checkboxes: checkboxesValues })
        }
        else if (label === "Se adjunta denuncia policial") {
            checkboxesValues[4].check = value
            setValues({ ...values, checkboxes: checkboxesValues })

        }
        else if (label === "¿Era su trabajo habitual?") {
            checkboxesAccidenteValues[0].check = value
            setValues({ ...values, checkboxesAccidente: checkboxesAccidenteValues })
        }
        else if (label === "¿Conocía la tarea asignada?") {
            checkboxesAccidenteValues[1].check = value
            setValues({ ...values, checkboxesAccidente: checkboxesAccidenteValues })
        }
        else if (label === "Cual Maquina") {
            checkboxesAccidenteValues[2].cualMaquina = value
            setValues({ ...values, checkboxesAccidente: checkboxesAccidenteValues })
        }
        else if (label === "Cual Accion") {
            checkboxesAccidenteValues[3].cualAccion = value
            setValues({ ...values, checkboxesAccidente: checkboxesAccidenteValues })
        }
        else if (label === "Razon") {
            checkboxesAccidenteValues[4].razon = value
            setValues({ ...values, checkboxesAccidente: checkboxesAccidenteValues })
        }

    }

    const handleCheckboxChange = (event, id) => {
        if (id === 1) {
            setShowTextField1(event);
            checkboxesAccidenteValues[2].check = event
            setValues({ ...values, checkboxesAccidente: checkboxesAccidenteValues })
        }
        if (id === 2) {
            setShowTextField2(event);
            checkboxesAccidenteValues[3].check = event
            setValues({ ...values, checkboxesAccidente: checkboxesAccidenteValues })
        }
        if (id === 3) {
            setShowTextField3(event);
            checkboxesAccidenteValues[4].check = event
            setValues({ ...values, checkboxesAccidente: checkboxesAccidenteValues })
        }
    };

    const handleSubmit = () => {
        console.log(values)
        // informeIntAccidente(values).then((resp) => {
        //     setTextAlert("¡Formulario cargado exitosamente!");
        //     setTypeAlert("success");
        // }).catch((resp) => {
        //     setTextAlert("Ocurrió un error")
        //     setTypeAlert("error");
        // }).finally(() => {
        //     window.scrollTo({
        //         top: 0,
        //         behavior: 'smooth',
        //     });
        //     setShowlert(true);
        //     setTimeout(() => {
        //         setShowlert(false);

        //     }, 7000);
        // }
        // )
    };
    const location = useLocation();
    useEffect(() => {
        const infoPrecargada = location.state?.objeto;
        if (infoPrecargada) { // muestro un form del historial
            console.log("infoPrecargada", infoPrecargada)
            setValues({
                comedor: infoPrecargada.comedor,
                fecha: infoPrecargada.fecha,
                tipo: infoPrecargada.tipo,
                checkboxes: infoPrecargada.checkboxes,
                nombreApellido: infoPrecargada.nombreApellido,
                cuil: infoPrecargada.cuil,
                fechaIngreso: infoPrecargada.fechaIngreso,
                puesto: infoPrecargada.puesto,
                hora: infoPrecargada.hora,
                lugar: infoPrecargada.lugar,
                descripcion: infoPrecargada.descripcion,
                checkboxesAccidente: infoPrecargada.checkboxesAccidente,
                lugarLesion: infoPrecargada.lugarLesion,
                medidas: infoPrecargada.medidas,
                razon: infoPrecargada.razon,
                firmaEmpleado: infoPrecargada.firmaEmpleado,
                firmaAdm: infoPrecargada.firmaAdm,
                encargado: infoPrecargada.encargado,
                date: infoPrecargada.date,
                idUser: idUser
            })
            console.log("value", values)
        } else { // creo un form desde cero

            setValues({
                comedor: "",
                fecha: "",
                tipo: "",
                checkboxes: [{}],
                nombreApellido: "",
                cuil: "",
                fechaIngreso: "",
                puesto: "",
                hora: "",
                lugar: "",
                descripcion: "",
                checkboxesAccidente: [{}],
                lugarLesion: "",
                medidas: "",
                razon: "",
                firmaEmpleado: "",
                firmaAdm: "",
                encargado: "",
                date: "",
                idUser: idUser
            })
        }
    }, [])


    const [uploadedFile, setUploadedFile] = useState(null);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            setUploadedFile(acceptedFiles[0]);
        },
    });



    return (
        <>
            {values &&
                <div>
                    <div className="form">
                        <div className="titleContainer">
                            <h3 className="title">Informe Interno de Accidente</h3>
                        </div>

                        <div className={styles.personal}>

                            <TextField onChange={(e) => { setValues({ ...values, comedor: e.target.value }) }} value={values.comedor} id="outlined-basic" style={{ width: "50%" }} label="Comedor donde ocurrió" variant="outlined" />

                            <TextField
                                label="Fecha"
                                variant="outlined"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => { setValues({ ...values, fecha: e.target.value }) }}
                                id="fecha"
                                value={values.fecha}
                                name="fecha"
                            />
                            <TextField disabled={!!location.state?.objeto} onChange={(e) => { setValues({ ...values, tipo: e.target.value }) }} value={values.tipo} id="outlined-basic" label="Tipo de accidente" variant="outlined" />

                        </div>

                        <div className={styles.personal}>
                            <FormControlLabel checked={values.checkboxes[0]?.check} disabled={!!location.state?.objeto} control={<Checkbox onChange={(e) => { checkboxValuesConstructor('CDR', e.target.checked) }} />} label="CDR" />
                            <FormControlLabel checked={values.checkboxes[1]?.check} disabled={!!location.state?.objeto} control={<Checkbox onChange={(e) => { checkboxValuesConstructor('CMS', e.target.checked) }} />} label="CMS" />
                            <FormControlLabel checked={values.checkboxes[2]?.check} disabled={!!location.state?.objeto} control={<Checkbox onChange={(e) => { checkboxValuesConstructor('Laboral', e.target.checked) }} />} label="Laboral" />
                            <FormControlLabel checked={values.checkboxes[3]?.check} disabled={!!location.state?.objeto} control={<Checkbox onChange={(e) => { checkboxValuesConstructor('In Itinere', e.target.checked) }} />} label="In Itinere" />
                            <FormControlLabel checked={values.checkboxes[4]?.check} disabled={!!location.state?.objeto} control={<Checkbox onChange={(e) => { checkboxValuesConstructor('Se adjunta denuncia policial', e.target.checked); setFiles(e.target.checked) }} />} label="Se adjunta denuncia policial" />
                            {files && (
                                <div {...getRootProps()} className={styles.fileInput}>
                                    <input {...getInputProps()} />
                                    <h6>Arrastra y suelta una imagen aquí, o haz clic para seleccionarla</h6>
                                    {uploadedFile && (
                                        <img style={{ width: '30%', marginLeft: "8rem" }} src={URL.createObjectURL(uploadedFile)} alt="Previsualización" />
                                    )}
                                </div>
                            )}
                        </div>


                        <div className={styles.responsableCont}>
                            <div className={styles.subtitleCont}>
                                <p className={styles.subtitle}>DATOS DEL ACCIDENTADO</p>
                            </div>
                            <div className={styles.personal}>

                                <TextField disabled={!!location.state?.objeto} onChange={(e) => { setValues({ ...values, nombreApellido: e.target.value }) }} value={values.nombreApellido} id="outlined-basic" label="Nombre y Apellido" variant="outlined" />
                                <TextField disabled={!!location.state?.objeto} onChange={(e) => { setValues({ ...values, cuil: e.target.value }) }} value={values.cuil} id="outlined-basic" label="Nº de CUIL" variant="outlined" />


                                <TextField
                                    label="Fecha de Ingreso"
                                    variant="outlined"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => { setValues({ ...values, fechaIngreso: e.target.value }) }}
                                    id="fecha-ingreso"
                                    name="fecha-ingreso"
                                    disabled={!!location.state?.objeto}
                                    value={values.fechaIngreso}
                                />
                            </div>
                            <div className={styles.personal}>

                                <TextField disabled={!!location.state?.objeto} onChange={(e) => { setValues({ ...values, puesto: e.target.value }) }} value={values.puesto} id="outlined-basic" label="Puesto de trabajo" variant="outlined" />
                                <TextField
                                    label="Hora"
                                    variant="outlined"
                                    type="time"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => { setValues({ ...values, hora: e.target.value }) }}
                                    id="hora-accidente"
                                    name="hora-accidente"
                                    value={values.hora}
                                />

                                <TextField disabled={!!location.state?.objeto} onChange={(e) => { setValues({ ...values, lugar: e.target.value }) }} value={values.lugar} id="outlined-basic" label="Lugar del accidente" variant="outlined" />



                            </div>

                            <div className={styles.personalText}>
                                <TextField
                                    onChange={(e) => { setValues({ ...values, descripcion: e.target.value }) }}
                                    fullWidth
                                    id="outlined-multiline-static"
                                    label="Descripción del Accidente"
                                    multiline
                                    rows={4}
                                    value={values.descripcion}
                                    disabled={!!location.state?.objeto}
                                />
                            </div>

                            <div className={styles.listContainer}>
                                <FormControl disabled={!!location.state?.objeto} style={{marginBottom : "1rem", width: "20%", paddingTop: "0.4rem"}}>
                                    <InputLabel id="select-label-1">¿Era su trabajo habitual?</InputLabel>
                                    <Select
                                        labelId="select-label-1"
                                        id="select-1"
                                        value={values.checkboxesAccidente[0]?.check ? 'SI' : 'NO'}
                                        onChange={(e) => { checkboxValuesConstructor('¿Era su trabajo habitual?', e.target.value === "SI" ? true : false) }}
                                    >
                                        <MenuItem value={'SI'}>SI</MenuItem>
                                        <MenuItem value={'NO'}>NO</MenuItem>
                                    </Select>
                                    </FormControl>
                                    
                                    <FormControl disabled={!!location.state?.objeto} style={{marginBottom : "1rem", width: "20%", paddingTop: "0.4rem"}}>
                                    <InputLabel id="select-label-2">¿Conocía la tarea asignada?</InputLabel>
                                    <Select
                                        labelId="select-label-2"
                                        id="select-2"
                                        value={values.checkboxesAccidente[1]?.check ? 'SI' : 'NO'}
                                        onChange={(e) => { checkboxValuesConstructor('¿Conocía la tarea asignada?', e.target.value === "SI" ? true : false) }}
                                    >
                                        <MenuItem value={'SI'}>SI</MenuItem>
                                        <MenuItem value={'NO'}>NO</MenuItem>
                                    </Select>
                                </FormControl>


                                <FormControl disabled={!!location.state?.objeto} style={{marginBottom : "1rem", width: "20%", paddingTop: "0.4rem"}}>
                                    <InputLabel id="select-label-machine">
                                        ¿Una máquina le causó la lesión?
                                    </InputLabel>
                                    <Select
                                        labelId="select-label-machine"
                                        id="select-machine"
                                        value={values.checkboxesAccidente[2]?.check ? "SI" : "NO"}
                                        onChange={(e) => {
                                            handleCheckboxChange(e.target.value === "SI" ? true : false, 1);
                                            checkboxValuesConstructor("¿Una máquina le causó la lesión?", e.target.value === 'SI' ? true : false);
                                        }}
                                        disabled={!!location.state?.objeto}
                                    >
                                        <MenuItem value={"SI"}>SI</MenuItem>
                                        <MenuItem value={"NO"}>NO</MenuItem>
                                    </Select>
                                </FormControl>

                                {showTextField1 && (
                                    <div className={styles.personal}>
                                        <TextField
                                            disabled={!!location.state?.objeto}
                                            onChange={(e) => {
                                                checkboxValuesConstructor("Cual Maquina", e.target.value);
                                            }}
                                            id="outlined-basic"
                                            multiline
                                            style={{ width: "50%" }}
                                            rows={2}
                                            name="textField"
                                            variant="outlined"
                                            label="¿Cuál?"
                                        />
                                    </div>
                                )}



                                <FormControl disabled={!!location.state?.objeto} style={{marginBottom : "1rem", width: "20%", paddingTop: "0.4rem"}}>
                                    <InputLabel id="select-label-condition">
                                        ¿Hubo alguna acción o condición insegura que fuera la causante del accidente?
                                    </InputLabel>
                                    <Select
                                        labelId="select-label-condition"
                                        id="select-condition"
                                        value={values.checkboxesAccidente[3]?.check ? "SI" : "NO"}
                                        onChange={(e) => {
                                            handleCheckboxChange(e.target.value === "SI" ? true : false, 2);
                                            checkboxValuesConstructor("¿Hubo alguna acción o condición insegura que fuera la causante del accidente?", e.target.value === 'SI' ? true : false);
                                        }}
                                        disabled={!!location.state?.objeto}
                                    >
                                        <MenuItem value={"SI"}>SI</MenuItem>
                                        <MenuItem value={"NO"}>NO</MenuItem>
                                    </Select>
                                </FormControl>

                                {showTextField2 && (
                                    <div className={styles.personal}>
                                        <TextField
                                            disabled={!!location.state?.objeto}
                                            onChange={(e) => {
                                                checkboxValuesConstructor("Cual Accion", e.target.value);
                                            }}
                                            id="outlined-basic"
                                            multiline
                                            style={{ width: "50%" }}
                                            rows={2}
                                            name="textField"
                                            variant="outlined"
                                            label="¿Cual Accion?"
                                        />
                                    </div>
                                )}



                                <FormControl disabled={!!location.state?.objeto} style={{marginBottom : "1rem", width: "20%", paddingTop: "0.4rem"}}>
                                    <InputLabel id="select-label-epp">
                                        ¿Estaba usando su E.P.P.?
                                    </InputLabel>
                                    <Select
                                        labelId="select-label-epp"
                                        id="select-epp"
                                        value={values.checkboxesAccidente[4]?.check ? "SI" : "NO"}
                                        onChange={(e) => {
                                            handleCheckboxChange(e.target.value === "SI" ? true : false, 3);
                                            checkboxValuesConstructor("¿Estaba usando su E.P.P.?", e.target.value === "SI" ? true : false);
                                        }}
                                        disabled={!!location.state?.objeto}
                                    >
                                        <MenuItem value={"SI"}>SI</MenuItem>
                                        <MenuItem value={"NO"}>NO</MenuItem>
                                    </Select>
                                </FormControl>

                                {!showTextField3 && (
                                    <div className={styles.personal}>
                                        <TextField
                                            disabled={!!location.state?.objeto}
                                            onChange={(e) => {
                                                setValues({ ...values, razon: e.target.value });
                                            }}
                                            value={values.razon}
                                            id="outlined-basic"
                                            multiline
                                            style={{ width: "50%" }}
                                            rows={2}
                                            name="textField"
                                            variant="outlined"
                                            label="¿Por qué razón no lo usaba?"
                                        />
                                    </div>
                                )}


                            </div>

                            <div className={styles.personalText}>
                                <TextField
                                    onChange={(e) => { setValues({ ...values, lugarLesion: e.target.value }) }}
                                    fullWidth
                                    id="outlined-multiline-static"
                                    label="¿En qué lugar del cuerpo se produjo la lesión?"
                                    multiline
                                    rows={2}
                                    value={values.lugarLesion}
                                    disabled={!!location.state?.objeto}
                                />
                            </div>
                            <div className={styles.personalText}>

                                <TextField
                                    onChange={(e) => { setValues({ ...values, medidas: e.target.value }) }}
                                    fullWidth
                                    id="outlined-multiline-static"
                                    label="¿Qué medidas cree conveniente adoptar para evitar futuros accidentes de este tipo?"
                                    multiline
                                    rows={4}
                                    value={values.medidas}
                                    disabled={!!location.state?.objeto}
                                />
                            </div>
                        </div>

                         <div className={styles.responsableCont}>
                            <div className={styles.subtitleCont}>
                                <p className={styles.subtitle}>Firma de involucrados</p>
                            </div>
                            <p>Una vez guardada esta planilla ,  es necesario imprimirla desde la sección Formularios Cargados para ser firmada por las partes involucradas. Con todas las firmas listas, desde la misma sección de Formularios Cargados, edite esta planilla adjuntando en el siguiente campo el documento firmado. </p>
                            <div className={styles.firma}>
                                <div   {...getRootProps()} className={styles.file} >
                                    <input disabled={!!location.state?.objeto} {...getInputProps()} />
                                    <h6 >Arrastra y suelta la firma aqui, o haz clic para seleccionarla</h6>
                                    {values.firma && <h6>Archivo seleccionado: {values.firma.name}</h6>}
                                </div>
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

export default InformeInternoAccidente