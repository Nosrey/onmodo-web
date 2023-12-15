import { Button, TextField, Checkbox, FormControlLabel, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from './InformeInternoAccidente.module.css'
import { useSelector } from 'react-redux';
import { informeIntAccidente, informeIntAccidenteEdit } from '../../../services/FormsRequest';
import Alert from '../../shared/components/Alert/Alert';
import { useLocation, useNavigate } from 'react-router';
import { useDropzone } from 'react-dropzone';
import { current } from 'immer';

function InformeInternoAccidente() {
    const navigate = useNavigate();
    const location = useLocation();
    const infoPrecargada = location.state?.objeto;
    const currentStatus = location.state?.status; // ('view' o 'edit' segun si vengo del icono del ojito o  de editar)
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
            nombreapellido: "",
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
    const [showTextField1, setShowTextField1] = useState(false);
    const [showTextField2, setShowTextField2] = useState(false);
    const [showTextField3, setShowTextField3] = useState(false);
    const [files, setFiles] = useState(false);

    var idUser = localStorage.getItem("idUser");
    const [values, setValues] = useState()
    const [checkboxesValues] = useState([
        { label: "Se adjunta denuncia policial", check: false },
    ])
    const [checkboxesAccidenteValues, setCheckboxesAccidenteValues] = useState(
        [
            {
                label: "¿Era su trabajo habitual?", check: false
            },
            {
                label: "¿Conocía la tarea asignada?", check: false
            },
            {
                label: "¿Una máquina le causó la lesión?", check: false, cualMaquina: ''
            },
            {
                label: "¿Hubo alguna acción o condición insegura que fuera la causante del accidente?", check: false, cualAccion: ''
            },
            {
                label: "¿Estaba usando su E.P.P.?", check: false, razon: ''
            }
        ]
    )


    const checkboxValuesConstructor = (label, value) => {
         if (label === "Se adjunta denuncia policial") {
            checkboxesValues[0].check = value
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
        let eppCheck = false
        if (values.checkboxesAccidente[4]?.check === true) eppCheck = true

        let objetoFinal = {
            comedor: values?.comedor,
            fecha: values?.fecha,
            tipo: values?.tipo,
            checkboxes: [
                {
                    label: checkboxesValues[0]?.label,
                    check: values?.checkboxes[0]?.check
                },
                {
                    label: checkboxesValues[1]?.label,
                    check: values?.checkboxes[1]?.check
                },
                {
                    label: checkboxesValues[2]?.label,
                    check: values?.checkboxes[2]?.check
                },
                {
                    label: checkboxesValues[3]?.label,
                    check: values?.checkboxes[3]?.check
                },
                {
                    label: checkboxesValues[4]?.label,
                    check: values?.checkboxes[4]?.check,

                }
            ],
            denuncia: values?.denuncia,
            nombreapellido: values?.nombreapellido,
            cuil: values?.cuil,
            fechaIngreso: values?.fechaIngreso,
            puesto: values?.puesto,
            hora: values?.hora,
            lugar: values?.lugar,
            descripcion: values?.descripcion,
            razon: checkboxesAccidenteValues[4]?.razon,
            checkboxesAccidente: [
                {
                    label: checkboxesAccidenteValues[0]?.label,
                    check: values?.checkboxesAccidente[0]?.check
                },
                {
                    label: checkboxesAccidenteValues[1]?.label,
                    check: values?.checkboxesAccidente[1]?.check
                },
                {
                    label: checkboxesAccidenteValues[2]?.label,
                    check: values?.checkboxesAccidente[2]?.check,
                    cualMaquina: values?.checkboxesAccidente[2]?.cualMaquina
                },
                {
                    label: checkboxesAccidenteValues[3].label,
                    check: values?.checkboxesAccidente[3]?.check,
                    cualAccion: values?.checkboxesAccidente[3]?.cualAccion
                },
                {
                    label: checkboxesAccidenteValues[4].label,
                    check: eppCheck,
                    razon: checkboxesAccidenteValues[4]?.razon,
                }
            ],
            lugarLesion: values?.lugarLesion,
            medidas: values?.medidas,
            firma: values?.firma,
            date: values?.date,
            idUser: values?.idUser,
        }

        // si no se han cargado files , no se envia la propiedad directamente 
        if (objetoFinal.firma === '' || objetoFinal.firma === undefined) {
            delete objetoFinal.firma;
        }
        if (objetoFinal.denuncia === '' || objetoFinal.denuncia === undefined) {
            delete objetoFinal.denuncia;
        }

        informeIntAccidente(objetoFinal).then((resp) => {
            if (resp.error) {
                setTextAlert('Ocurrió un error');
                setTypeAlert('error');
            } else {
                setTextAlert('¡Formulario cargado exitosamente!');
                setTypeAlert('success');
                // limpiar fomr
                window.location.href = window.location.href;
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

    const handleEdit = () => {
        let eppCheck = false
        if (values.checkboxesAccidente[4]?.check === true) eppCheck = true

        let objetoFinal = {
            comedor: values?.comedor,
            fecha: values?.fecha,
            tipo: values?.tipo,
            checkboxes: [
                {
                    label: checkboxesValues[0]?.label,
                    check: values?.checkboxes[0]?.check
                },
                {
                    label: checkboxesValues[1]?.label,
                    check: values?.checkboxes[1]?.check
                },
                {
                    label: checkboxesValues[2]?.label,
                    check: values?.checkboxes[2]?.check
                },
                {
                    label: checkboxesValues[3]?.label,
                    check: values?.checkboxes[3]?.check
                },
                {
                    label: checkboxesValues[4]?.label,
                    check: values?.checkboxes[4]?.check,

                }
            ],
            denuncia: values?.denuncia,
            nombreapellido: values?.nombreapellido,
            cuil: values?.cuil,
            fechaIngreso: values?.fechaIngreso,
            puesto: values?.puesto,
            hora: values?.hora,
            lugar: values?.lugar,
            razon: checkboxesAccidenteValues[4]?.razon,
            descripcion: values?.descripcion,
            checkboxesAccidente: [
                {
                    label: checkboxesAccidenteValues[0]?.label,
                    check: values?.checkboxesAccidente[0]?.check
                },
                {
                    label: checkboxesAccidenteValues[1]?.label,
                    check: values?.checkboxesAccidente[1]?.check
                },
                {
                    label: checkboxesAccidenteValues[2]?.label,
                    check: values?.checkboxesAccidente[2]?.check,
                    cualMaquina: values?.checkboxesAccidente[2]?.cualMaquina
                },
                {
                    label: checkboxesAccidenteValues[3].label,
                    check: values?.checkboxesAccidente[3]?.check,
                    cualAccion: values?.checkboxesAccidente[3]?.cualAccion
                },
                {
                    label: checkboxesAccidenteValues[4].label,
                    check: eppCheck,
                    razon: checkboxesAccidenteValues[4]?.razon,
                }
            ],
            lugarLesion: values?.lugarLesion,
            medidas: values?.medidas,
            firma: values?.firma,
            date: values?.date,
            idUser: values?.idUser,
        }

        // si no se han cargado files , no se envia la propiedad directamente 
        if (objetoFinal.firma === '' || objetoFinal.firma === undefined) {
            delete objetoFinal.firma;
        }
        if (objetoFinal.denuncia === '' || objetoFinal.denuncia === undefined) {
            delete objetoFinal.denuncia;
        }

        informeIntAccidenteEdit(objetoFinal, infoPrecargada._id).then((resp) => {
            if (resp.error) {
                setTextAlert('Ocurrió un error');
                setTypeAlert('error');
            } else {
                setTextAlert('¡Formulario cargado exitosamente!');
                setTypeAlert('success');
                navigate('/formularios-cargados/informeintaccidente', { replace: true })
            }
        }).catch((resp) => {
            setTextAlert("Ocurrió un error")
            setTypeAlert("error");
        }).finally(() => {
            // window.scrollTo({
            //     top: 0,
            //     behavior: 'smooth',
            // });
            // setShowlert(true);
            // setTimeout(() => {
            //     setShowlert(false);

            // }, 7000);
            // voy a /formularios-cargados/informeintaccidente
        }
        )
    };

    useEffect(() => {
        console.log('infoPrecargada', infoPrecargada)
        console.log('currentStatus es view: ', currentStatus === 'view')
        if (infoPrecargada) { // muestro un form del historial
            setValues({
                comedor: infoPrecargada.comedor,
                fecha: infoPrecargada.fecha,
                tipo: infoPrecargada.tipo,
                // parseo checkboxes
                checkboxes: JSON.parse(infoPrecargada.checkboxes),
                nombreapellido: infoPrecargada.nombreapellido,
                cuil: infoPrecargada.cuil,
                fechaIngreso: infoPrecargada.fechaIngreso,
                puesto: infoPrecargada.puesto,
                hora: infoPrecargada.hora,
                lugar: infoPrecargada.lugar,
                descripcion: infoPrecargada.descripcion,
                checkboxesAccidente: JSON.parse(infoPrecargada.checkboxesAccidente),
                lugarLesion: infoPrecargada.lugarLesion,
                medidas: infoPrecargada.medidas,
                razon: infoPrecargada?.razon,
                denuncia: infoPrecargada.denuncia,
                firma: infoPrecargada.firma,
                encargado: infoPrecargada.encargado,
                date: infoPrecargada.date,
                idUser: idUser
            })
            setFiles(JSON.parse(infoPrecargada?.checkboxes)?.[4]?.check)
            setUploadedFile1(infoPrecargada?.denuncia)
            setUploadedFile2(infoPrecargada?.firma)

            let checkAccidenteArray = JSON.parse(infoPrecargada?.checkboxesAccidente)
            setCheckboxesAccidenteValues([
                {
                    label: "¿Era su trabajo habitual?", check: checkAccidenteArray[0]?.check
                },
                {
                    label: "¿Conocía la tarea asignada?", check: checkAccidenteArray[1]?.check
                },
                {
                    label: "¿Una máquina le causó la lesión?", check: checkAccidenteArray[2]?.check, cualMaquina: checkAccidenteArray[2]?.cualMaquina
                },
                {
                    label: "¿Hubo alguna acción o condición insegura que fuera la causante del accidente?", check: checkAccidenteArray[3]?.check, cualAccion: checkAccidenteArray[3]?.cualAccion
                },
                {
                    label: "¿Estaba usando su E.P.P.?", check: checkAccidenteArray[4]?.check, razon: infoPrecargada?.razon
                }
            ])

            // seteo los handleCheckboxChange
            if (JSON.parse(infoPrecargada?.checkboxesAccidente)?.[2]?.check) {
                setShowTextField1(true)
            }
            if (JSON.parse(infoPrecargada?.checkboxesAccidente)?.[3]?.check) {
                setShowTextField2(true)
            }
            if (JSON.parse(infoPrecargada?.checkboxesAccidente)?.[4]?.check) {
                setShowTextField3(true)
            }

        } else { // creo un form desde cero
            setValues({
                comedor: "",
                fecha: "",
                tipo: "",
                checkboxes: [{}],
                nombreapellido: "",
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


    const [uploadedFile1, setUploadedFile1] = useState();
    const [uploadedFile2, setUploadedFile2] = useState();

    const { getRootProps: getRootProps1, getInputProps: getInputProps1 } = useDropzone({
        onDrop: acceptedFiles => {
            setUploadedFile1(acceptedFiles[0]);
            setValues({ ...values, denuncia: acceptedFiles[0] });
        }
    });

    const { getRootProps: getRootProps2, getInputProps: getInputProps2 } = useDropzone({
        onDrop: acceptedFiles => {
            setUploadedFile2(acceptedFiles[0]);
            setValues({ ...values, firma: acceptedFiles[0] })
        }
    });


    return (
        <>
            {values &&
                <div>
                    <div className="form">
                        <div className="titleContainer">
                            <h3 className="title">Informe Interno de Accidente</h3>
                            {(currentStatus === 'view' || currentStatus === 'edit') &&
                                <span style={{ marginLeft: '20px', fontSize: '20px' }}>
                                    <i className={currentStatus === 'view' ? 'ri-eye-line' : 'ri-pencil-line'}></i>
                                </span>
                            }
                        </div>

                        <div className={styles.personal}>

                            <TextField disabled={currentStatus === 'view'} onChange={(e) => { setValues({ ...values, comedor: e.target.value }) }} value={values.comedor} id="outlined-basic" style={{ width: "50%" }} label="Comedor donde ocurrió" variant="outlined" />

                            <TextField
                                label="Fecha"
                                disabled={currentStatus === 'view'}
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
                            {/* <TextField disabled={currentStatus === 'view'} onChange={(e) => { setValues({ ...values, tipo: e.target.value }) }} value={values.tipo} id="outlined-basic" label="Tipo de accidente" variant="outlined" /> */}
                            <FormControl disabled={currentStatus === 'view'} style={{  width: "20%" }}>
                                    <InputLabel id="select-label-1">Tipo de accidente</InputLabel>
                                    <Select
                                        labelId="select-label-1"
                                        id="select-1"
                                        InputLabelProps={{
                                            shrink: true,
                                          }}
                                        onChange={(e) => { setValues({ ...values, tipo: e.target.value }) }}
                                        value={values.tipo} 
                                    >
                                        <MenuItem value={'Laboral'}>Laboral</MenuItem>
                                        <MenuItem value={'In itinere'}>In itinere</MenuItem>
                                    </Select>
                                </FormControl>
                        </div>

                        <div className={styles.personal}>
                            {/* <FormControlLabel checked={values.checkboxes[0]?.check} disabled={currentStatus === 'view'} control={<Checkbox onChange={(e) => { checkboxValuesConstructor('CDR', e.target.checked) }} />} label="CDR" />
                            <FormControlLabel checked={values.checkboxes[1]?.check} disabled={currentStatus === 'view'} control={<Checkbox onChange={(e) => { checkboxValuesConstructor('CMS', e.target.checked) }} />} label="CMS" />
                            <FormControlLabel checked={values.checkboxes[2]?.check} disabled={currentStatus === 'view'} control={<Checkbox onChange={(e) => { checkboxValuesConstructor('Laboral', e.target.checked) }} />} label="Laboral" />
                            <FormControlLabel checked={values.checkboxes[3]?.check} disabled={currentStatus === 'view'} control={<Checkbox onChange={(e) => { checkboxValuesConstructor('In Itinere', e.target.checked) }} />} label="In Itinere" /> */}
                            <FormControlLabel checked={values.checkboxes[4]?.check} disabled={currentStatus === 'view'} control={<Checkbox onChange={(e) => { checkboxValuesConstructor('Se adjunta denuncia policial', e.target.checked); setFiles(e.target.checked) }} />} label="Se adjunta denuncia policial" />
                            {files ? (
                                currentStatus === 'view' ?
                                    (
                                        <div className={styles.fileInput}>
                                            {uploadedFile1 && (
                                                <img style={{ width: '30%', marginLeft: "8rem" }} src={(infoPrecargada && (currentStatus === 'view' || (currentStatus === 'edit' && typeof values.denuncia === 'string')) ? values.denuncia : URL.createObjectURL(values.denuncia))} alt="Previsualización" />
                                            )}
                                        </div>
                                    ) :
                                    <div {...getRootProps1()} className={styles.fileInput}>
                                        <input {...getInputProps1()} />
                                        <h6>Arrastra y suelta una imagen aquí, o haz clic para seleccionarla</h6>
                                        {uploadedFile1 && (
                                            <img style={{ width: '30%', marginLeft: "8rem" }} src={(infoPrecargada && (currentStatus === 'view' || (currentStatus === 'edit' && typeof values.denuncia === 'string')) ? values.denuncia : URL.createObjectURL(values.denuncia))} alt="Previsualización" />
                                        )}
                                    </div>
                            ) :
                                null
                            }

                        </div>


                        <div className={styles.responsableCont}>
                            <div className={styles.subtitleCont}>
                                <p className={styles.subtitle}>DATOS DEL ACCIDENTADO</p>
                            </div>
                            <div className={styles.personal}>

                                <TextField disabled={currentStatus === 'view'} onChange={(e) => { setValues({ ...values, nombreapellido: e.target.value }) }} value={values.nombreapellido} id="outlined-basic" label="Nombre y Apellido" variant="outlined" />

                                <TextField disabled={currentStatus === 'view'} onChange={(e) => { setValues({ ...values, cuil: e.target.value }) }} value={values.cuil} id="outlined-basic" label="Nº de CUIL" variant="outlined" />


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
                                    disabled={currentStatus === 'view'}
                                    value={values.fechaIngreso}
                                />
                            </div>
                            <div className={styles.personal}>

                                <TextField disabled={currentStatus === 'view'} onChange={(e) => { setValues({ ...values, puesto: e.target.value }) }} value={values.puesto} id="outlined-basic" label="Puesto de trabajo" variant="outlined" />
                                <TextField
                                    label="Hora"
                                    variant="outlined"
                                    type="time"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    disabled={(currentStatus === 'view') ? true : false}
                                    onChange={(e) => { setValues({ ...values, hora: e.target.value }) }}
                                    id="hora-accidente"
                                    name="hora-accidente"
                                    value={values.hora}
                                />

                                <TextField disabled={currentStatus === 'view'} onChange={(e) => { setValues({ ...values, lugar: e.target.value }) }} value={values.lugar} id="outlined-basic" label="Lugar del accidente" variant="outlined" />



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
                                    disabled={currentStatus === 'view'}
                                />
                            </div>

                            <div className={styles.listContainer}>
                                <FormControl disabled={currentStatus === 'view'} style={{ marginBottom: "1rem", width: "20%", paddingTop: "0.4rem" }}>
                                    <InputLabel id="select-label-1">¿Era su trabajo habitual?</InputLabel>
                                    <Select
                                        labelId="select-label-1"
                                        id="select-1"
                                        InputLabelProps={{
                                            shrink: true,
                                          }}
                                        value={values.checkboxesAccidente[0]?.check ? 'SI' : 'NO'}
                                        onChange={(e) => { checkboxValuesConstructor('¿Era su trabajo habitual?', e.target.value === "SI" ? true : false) }}
                                    >
                                        <MenuItem value={'SI'}>SI</MenuItem>
                                        <MenuItem value={'NO'}>NO</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl disabled={currentStatus === 'view'} style={{ marginBottom: "1rem", width: "20%", paddingTop: "0.4rem" }}>
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


                                <FormControl disabled={currentStatus === 'view'} style={{ marginBottom: "1rem", width: "20%", paddingTop: "0.4rem" }}>
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
                                        disabled={currentStatus === 'view'}
                                    >
                                        <MenuItem value={"SI"}>SI</MenuItem>
                                        <MenuItem value={"NO"}>NO</MenuItem>
                                    </Select>
                                </FormControl>

                                {showTextField1 && (
                                    <div className={styles.personal}>
                                        <TextField
                                            disabled={currentStatus === 'view'}
                                            onChange={(e) => {
                                                checkboxValuesConstructor("Cual Maquina", e.target.value);
                                            }}
                                            value={
                                                values.checkboxesAccidente[2]?.cualMaquina
                                            }
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



                                <FormControl disabled={currentStatus === 'view'} style={{ marginBottom: "1rem", width: "20%", paddingTop: "0.4rem" }}>
                                    <label className={styles.label} id="select-label-condition">
                                        ¿Hubo alguna acción o condición insegura que fuera la causante del accidente?
                                    </label>
                                    <Select
                                        labelId="select-label-condition"
                                        id="select-condition"
                                        value={values.checkboxesAccidente[3]?.check ? "SI" : "NO"}
                                        onChange={(e) => {
                                            handleCheckboxChange(e.target.value === "SI" ? true : false, 2);
                                            checkboxValuesConstructor("¿Hubo alguna acción o condición insegura que fuera la causante del accidente?", e.target.value === 'SI' ? true : false);
                                        }}
                                        disabled={currentStatus === 'view'}
                                    >
                                        <MenuItem value={"SI"}>SI</MenuItem>
                                        <MenuItem value={"NO"}>NO</MenuItem>
                                    </Select>
                                </FormControl>

                                {showTextField2 && (
                                    <div className={styles.personal}>
                                        <TextField
                                            disabled={currentStatus === 'view'}
                                            onChange={(e) => {
                                                checkboxValuesConstructor("Cual Accion", e.target.value);
                                            }}
                                            value={
                                                values.checkboxesAccidente[3]?.cualAccion
                                            }
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



                                <FormControl disabled={currentStatus === 'view'} style={{ marginBottom: "1rem", width: "20%", paddingTop: "0.4rem" }}>
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
                                        disabled={currentStatus === 'view'}
                                    >
                                        <MenuItem value={"SI"}>SI</MenuItem>
                                        <MenuItem value={"NO"}>NO</MenuItem>
                                    </Select>
                                </FormControl>

                                {!showTextField3 && (
                                    <div className={styles.personal}>
                                        <TextField
                                            disabled={currentStatus === 'view'}
                                            onChange={(e) => {
                                                checkboxValuesConstructor("Razon", e.target.value);
                                            }}
                                            value={
                                                values.checkboxesAccidente[4]?.razon
                                            }
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
                                    disabled={currentStatus === 'view'}
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
                                    disabled={currentStatus === 'view'}
                                />
                            </div>
                        </div>

                        {(currentStatus !== 'view') ?
                            <div className={styles.responsableCont}>
                                <div className={styles.subtitleCont}>
                                    <p className={styles.subtitle}>Firma de involucrados</p>
                                </div>
                                <p>Una vez guardada esta planilla ,  es necesario imprimirla desde la sección Formularios Cargados para ser firmada por las partes involucradas. Con todas las firmas listas, desde la misma sección de Formularios Cargados, edite esta planilla adjuntando en el siguiente campo el documento firmado. </p>
                                <div className={styles.firma}>
                                    {(currentStatus === 'view') ?
                                        <div className={styles.file} >
                                            <input disabled={currentStatus === 'view'} {...getInputProps2()} />
                                        </div>
                                        :
                                        <div {...getRootProps2()} className={styles.file} >
                                            <input disabled={currentStatus === 'view'} {...getInputProps2()} />
                                            <h6 >Arrastra y suelta la firma aqui, o haz clic para seleccionarla</h6>

                                            {values.firma &&
                                                <h6>{(typeof values?.firma !== 'string' ? "Archivo seleccionado:" : '')} {
                                                    typeof values?.firma === 'string' ?
                                                        <img
                                                            src={values?.firma}
                                                            alt="planilla"
                                                            srcSet=""
                                                            style={{ marginTop: '30px', width: 'fit-content', maxWidth: '60%', minWidth: '250px' }}
                                                        />
                                                        :
                                                        values?.firma?.name
                                                }</h6>}
                                        </div>
                                    }
                                </div>

                            </div>
                            :
                            <div className={styles.responsableCont}>
                                <div className={styles.subtitleCont}>
                                    <p className={styles.subtitle}>Firma de involucrados</p>
                                </div>

                                <div className={styles.firma}>
                                    <div style={{ marginTop: '10px' }} >
                                        {values?.firma ?
                                            <h6>
                                                {typeof values?.firma === 'string' && <a href={values?.firma} target="_blank" rel="noopener noreferrer"> Descargar Archivo</a>}
                                            </h6>
                                            :
                                            <h6>No se han cargado documentos.</h6>
                                        }
                                    </div>

                                </div>

                                {
                                    typeof values?.firma === 'string' && // ste seria el caso en que tengo la url de amazon
                                    <a href={values?.firma} target="_blank" rel="noopener noreferrer">
                                        <img src={values?.firma} alt="planilla" srcSet="" style={{ marginTop: '30px', width: 'fit-content', maxWidth: '60%', minWidth: '250px' }} />
                                    </a>
                                }

                            </div>
                        }

                        {
                            (infoPrecargada === undefined) &&
                            <div className='btn'>
                                <Button
                                    onClick={handleSubmit}
                                    variant='contained'
                                >
                                    Guardar
                                </Button>
                            </div>
                        }
                        {
                            (currentStatus === 'edit') &&
                            <div className='btn'>
                                <Button
                                    onClick={handleEdit}
                                    variant='contained'
                                >
                                    Editar
                                </Button>
                            </div>
                        }

                    </div>
                </div>
            }
            {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}

        </>

    )
}

export default InformeInternoAccidente