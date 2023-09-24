import { Button, TextField, Checkbox, FormControlLabel } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from './InformeInternoAccidente.module.css'
import { useSelector } from 'react-redux';
import { informeIntAccidente } from '../../../services/FormsRequest';
import Alert from '../../shared/components/Alert/Alert';
import { useLocation } from 'react-router';

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
            setShowTextField1(event.target.checked);
            checkboxesAccidenteValues[2].check = event.target.checked
            setValues({ ...values, checkboxesAccidente: checkboxesAccidenteValues })
        }
        if (id === 2) {
            setShowTextField2(event.target.checked);
            checkboxesAccidenteValues[3].check = event.target.checked
            setValues({ ...values, checkboxesAccidente: checkboxesAccidenteValues })
        }
        if (id === 3) {
            setShowTextField3(event.target.checked);
            checkboxesAccidenteValues[4].check = event.target.checked
            setValues({ ...values, checkboxesAccidente: checkboxesAccidenteValues })
        }
    };

    const handleSubmit = () => {
        informeIntAccidente(values).then((resp)=> {
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
    const location = useLocation();
    useEffect(() => {
        const infoPrecargada = location.state?.objeto;
        if (infoPrecargada) { // muestro un form del historial
            console.log("infoPrecargada", infoPrecargada)
            setValues({
                comedor: infoPrecargada.comedor,
                fecha: infoPrecargada.fecha,
                tipo: infoPrecargada.tipo,
                checkboxes: [infoPrecargada.checkboxes],
                nombreApellido: infoPrecargada.nombreApellido,
                cuil: infoPrecargada.cuil,
                fechaIngreso: infoPrecargada.fechaIngreso,
                puesto: infoPrecargada.puesto,
                hora: infoPrecargada.hora,
                lugar: infoPrecargada.lugar,
                descripcion: infoPrecargada.descripcion,
                checkboxesAccidente: [infoPrecargada.checkboxesAccidente],
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

    return (
        <>
        {values &&
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Informe Interno de Accidente</h3>
                    {/* <h4 className="formNumber"> HS-01-R04</h4> */}
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
                    <TextField onChange={(e) => { setValues({ ...values, tipo: e.target.value }) }} value={values.tipo} id="outlined-basic" label="Tipo de accidente" variant="outlined" />
                </div>

                <div className={styles.personal}>
                    <FormControlLabel control={<Checkbox onChange={(e) => { checkboxValuesConstructor('CDR', e.target.checked) }} />} label="CDR" />
                    <FormControlLabel control={<Checkbox onChange={(e) => { checkboxValuesConstructor('CMS', e.target.checked) }} />} label="CMS" />
                    <FormControlLabel control={<Checkbox onChange={(e) => { checkboxValuesConstructor('Laboral', e.target.checked) }} />} label="Laboral" />
                    <FormControlLabel control={<Checkbox onChange={(e) => { checkboxValuesConstructor('In Itinere', e.target.checked) }} />} label="In Itinere" />
                    <FormControlLabel control={<Checkbox onChange={(e) => { checkboxValuesConstructor('Se adjunta denuncia policial', e.target.checked) }} />} label="Se adjunta denuncia policial" />
                </div>


                <div className={styles.responsableCont}>
                    <div className={styles.subtitleCont}>
                        <p className={styles.subtitle}>DATOS DEL ACCIDENTADO</p>
                    </div>
                    <div className={styles.personal}>
                        <TextField onChange={(e) => { setValues({ ...values, nombreApellido: e.target.value }) }}  value={values.nombreApellido} id="outlined-basic" label="Nombre y Apellido" variant="outlined" />
                        <TextField onChange={(e) => { setValues({ ...values, cuil: e.target.value }) }}  value={values.cuil} id="outlined-basic" label="Nº de CUIL" variant="outlined" />
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
                        value={values.fechaIngreso} 
                        />
                    </div>
                    <div className={styles.personal}>
                        <TextField onChange={(e) => { setValues({ ...values, puesto: e.target.value }) }} value={values.puesto}  id="outlined-basic" label="Puesto de trabajo" variant="outlined" />
                      
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
                        <TextField onChange={(e) => { setValues({ ...values, lugar: e.target.value }) }}  value={values.lugar} id="outlined-basic" label="Lugar del accidente" variant="outlined" />
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
                        />
                    </div>

                    <div className={styles.listContainer}>
                        <FormControlLabel control={<Checkbox onChange={(e) => { checkboxValuesConstructor('¿Era su trabajo habitual?', e.target.checked) }} />} label="¿Era su trabajo habitual?" />
                        <FormControlLabel control={<Checkbox onChange={(e) => { checkboxValuesConstructor('¿Conocía la tarea asignada?', e.target.checked) }} />} label="¿Conocía la tarea asignada?" />


                        <FormControlLabel control={<Checkbox
                            id="showTextField"
                            name="showTextField"
                            onChange={($event) => handleCheckboxChange($event, 1)} />} label="¿Una máquina le causó la lesión?" />
                        <label htmlFor="showTextField"></label>

                        {showTextField1 && (
                            <div className={styles.personal}>
                                <TextField onChange={(e) => { checkboxValuesConstructor("Cual Maquina", e.target.value) }} id="outlined-basic" multiline style={{ width: "50%" }}
                                    rows={2} name="textField" variant="outlined" label="¿Cuál?" />
                            </div>
                        )}


                        <FormControlLabel control={<Checkbox
                            id="showTextField"
                            name="showTextField"
                            onChange={($event) => handleCheckboxChange($event, 2)} />} label="¿Hubo alguna acción o condición insegura que fuera la causante del accidente?" />
                        <label htmlFor="showTextField"></label>

                        {showTextField2 && (
                            <div className={styles.personal}>
                                <TextField onChange={(e) => { checkboxValuesConstructor("Cual Accion", e.target.value) }} id="outlined-basic" multiline style={{ width: "50%" }}
                                    rows={2} name="textField" variant="outlined" label="¿Cuál?" />
                            </div>
                        )}



                        <FormControlLabel control={<Checkbox
                            id="showTextField"
                            name="showTextField"
                            onChange={($event) => handleCheckboxChange($event, 3)} />} label="¿Estaba usando su E.P.P.?" />
                        <label htmlFor="showTextField"></label>

                        {!showTextField3 && (
                            <div className={styles.personal}>
                                <TextField onChange={(e) => { setValues({ ...values, razon: e.target.value }) }}  value={values.razon} id="outlined-basic" multiline style={{ width: "50%" }}
                                    rows={2} name="textField" variant="outlined" label=" ¿Por qué razón no lo usaba?" />
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
                        />
                    </div>
                </div>


                <div className={styles.personal}>
                    <TextField onChange={(e) => { setValues({ ...values, firmaEmpleado: e.target.value }) }}  value={values.firmaEmpleado}  id="outlined-basic" label="Firma del Empleado" variant="outlined" />
                    <TextField onChange={(e) => { setValues({ ...values, firmaAdm: e.target.value }) }}  value={values.firmaAdm} id="outlined-basic" label="Firma del Administrador o Encargado Contrato" variant="outlined" />
                    <TextField onChange={(e) => { setValues({ ...values, encargado: e.target.value }) }}  value={values.encargado} id="outlined-basic" label="Encargado ContratoRevisado por" variant="outlined" />
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

export default InformeInternoAccidente