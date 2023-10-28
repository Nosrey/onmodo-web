import React, { useState } from 'react';
import styles from './CreacionRecordatorio.module.css';
import { Button, FormControl,  InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Alert from '../../../../components/shared/components/Alert/Alert';
import { RECORDATORIOS_INFO } from '../../../../components/shared/constants/recordatoriosInfo';
import { createReminder } from '../../../../services/Request';
import { generarFechas } from '../../../../services/SharedService';


function CreacionRecordatorio({updateRecordatorios}) {
  const today = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato "yyyy-mm-dd"

  //** ALERTA */
  const [textAlert, setTextAlert] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [showAlert, setShowlert] = useState(false);

  const [values, setValues] = useState(
    {
      tarea: "" ,
      descripcion: "",
      link:"",
      linkTitle:"",
      frecuencia : "",
      fechaInicio: "",
      status: "En curso",
    }
  )

  const handleSubmit = () => {
    if (values.tarea === "") {
      setTextAlert("Tarea es un dato obligatorio");
      setTypeAlert("error");
      showAlertAnimation();
    } else if (values.status === "En curso" && (values.frecuencia === "" || values.fechaInicio === "")) {
      setTextAlert("Frecuencia y Fecha obligatorias");
      setTypeAlert("error");
      showAlertAnimation();
    } else {
      if (values.status === "En curso") {
        const fechasGeneradas = generarFechas(values.fechaInicio, values.frecuencia);
        values.fechas = fechasGeneradas;
      }
      createReminder(values).then((resp)=> {
        setValues({
          tarea: "" ,
          descripcion: "",
          link:"",
          linkTitle:"",
          frecuencia : "",
          fechaInicio: "",
          status: "En curso",
        })
        updateRecordatorios();
        setTextAlert("Recordatorio creado con éxito");
        setTypeAlert("success");
      }).catch((resp)=> {
          setTextAlert("Ocurrió un error")
          setTypeAlert("error");
      }).finally(()=> {
        showAlertAnimation();  
      })
    }
  };

  const showAlertAnimation = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    setShowlert(true);
    setTimeout(() => {
        setShowlert(false);

    }, 7000);
  }

  return (
    <>
    <div className={styles.formNewRecordatorio}>
      <h4 className={styles.title}>Agregar nuevo recordatorio</h4>

      <div className={styles.containerForm}>
        <FormControl  fullWidth  variant="outlined" style={{marginBottom: "17px"}}>
            <InputLabel   id="metodo-evaluacion-label">Tarea</InputLabel>
            <Select
                value={values.tarea}
                onChange={(e) => setValues({ ...values, tarea: e.target.value })}
                label="Tarea"
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 350, // Establece la altura máxima del menú
                    },
                  },
                }}
            >
              {
                RECORDATORIOS_INFO.map((item, index) => (
                  <MenuItem key={index} value={index}>{item}</MenuItem>
                ))
              }
                
            </Select>
          </FormControl>
        <TextField
          onChange={(e)=>{values.descripcion.length < 150 && setValues({...values, descripcion:e.target.value})}}
          label={"Descripción"}
          variant="outlined"
          multiline
          fullWidth
          value={values.descripcion}
          rows={3}
          style={{marginBottom: "17px"}}
        />
        <div className={styles.linkInfo}  style={{marginBottom: "17px"}}>
          <TextField 
          id="outlined-basic"
          label="Link"
          variant="outlined"
          className={styles.input}
          onChange={(e) => {
            let linkValue = e.target.value;
            // Verificar si el valor comienza con "https://"
            if (!linkValue.startsWith("https://")) {
              // Si no comienza con "https://", agregarlo al principio
              linkValue = linkValue === "https:/" ? "" : "https://" + linkValue;
            }
            // Actualizar el estado con el nuevo valor
            setValues({ ...values, link: linkValue });
          }}
          value={values.link}
          />
          <TextField 
           onChange={(e)=>{values.linkTitle.length < 40 && setValues({...values, linkTitle:e.target.value})}}
          id="outlined-basic"
          value={values.linkTitle}
          label="Título del Link"
          variant="outlined"
          className={styles.input}
          />
        </div>
        <div className={styles.linkInfo}  style={{marginBottom: "17px"}}>
          <FormControl fullWidth variant="outlined" className={styles.input}>
            <InputLabel   id="metodo-evaluacion-label">Status</InputLabel>
            <Select
                value={values.status}
                onChange={(e) => setValues({ ...values, status: e.target.value })}
                label="Status"
                
            >
                <MenuItem value="Aún no desarrollado">Aún no desarrollado</MenuItem>
                <MenuItem value="En proceso de desarrollo">En proceso de desarrollo</MenuItem>
                <MenuItem value="En curso">En curso</MenuItem>
                <MenuItem value="Desestimado Transitoriamente">Desestimado Transitoriamente</MenuItem>
                <MenuItem value="Resuelto">Resuelto</MenuItem>
            </Select>
          </FormControl>
          </div>
        <div className={styles.linkInfo}  style={{marginBottom: "7px"}}>
          <FormControl  variant="outlined" className={styles.input}>
            <InputLabel   id="metodo-evaluacion-label">Frecuencia</InputLabel>
            <Select
                value={values.frecuencia}
                onChange={(e) => setValues({ ...values, frecuencia: e.target.value })}
                label="Frecuencia"
                disabled={values.status !== "En curso"}
            >
                <MenuItem value="Mensual">Mensual</MenuItem>
                <MenuItem value="Bimestral">Bimestral</MenuItem>
                <MenuItem value="Trimestral">Trimestral</MenuItem>
                <MenuItem value="Semestral">Semestral</MenuItem>
                <MenuItem value="Anual">Anual</MenuItem>
                <MenuItem value="Cada 2 años">Cada 2 años</MenuItem>
            </Select>
          </FormControl>

            <TextField
              onChange={(e) => setValues({ ...values, fechaInicio: e.target.value })}
              label="Fecha 1er Evento"
              variant="outlined"
              type="date"
              InputLabelProps={{
                  shrink: true,
              }}
               inputProps={{
                min: today, // Establece la fecha mínima como la fecha de hoy
              }}
              className={styles.input}
              disabled={values.status !== "En curso"}

            />
          </div>
          {
            values.status !== "En curso" && 
          <span style={{fontSize:"12px", color:"grey", marginBottom: "17px"}}>*Para establecer una frecuencia y fecha de recordatorio es necesario que la tarea esté con Status: En curso</span>
          }
          
          <div className="btn" style={{marginTop:"40px"}}>
            <Button onClick={handleSubmit} variant="contained">Crear</Button>
          </div>
        
      
      </div>

    </div>
    { showAlert && <Alert type={typeAlert} text={textAlert}></Alert> }
    </>
  );
}

export default CreacionRecordatorio;
