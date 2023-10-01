import React, { useState } from 'react';
import styles from './CreacionRecordatorio.module.css';
import { Button, FormControl,  InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Alert from '../../../../components/shared/components/Alert/Alert';


function CreacionRecordatorio({updateRecordatorios}) {
  //** ALERTA */
  const [textAlert, setTextAlert] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [showAlert, setShowlert] = useState(false);

  const [values, setValues] = useState(
    {
      titulo: "" ,
      descripcion: "",
      link:"",
      linkTitle:"",
      frecuencia : "",
      fechaEspecífica: "",
    }
  )

  const handleSubmit = () => {
    console.log(values)
    // entregaRopa(values).then((resp)=> {
    //     setTextAlert("¡Formulario cargado exitosamente!");
    //     setTypeAlert("success");
    // }).catch((resp)=> {
    //     setTextAlert("Ocurrió un error")
    //     setTypeAlert("error");
    // }).finally(()=> {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth',
    //       });
    //     setShowlert(true);
    //     setTimeout(() => {
    //         setShowlert(false);

    //     }, 7000);
    // }
    // )
    
    if (values.titulo === "" || values.frecuencia === ""  ) {
      setTextAlert("Título y Frecuencia son datos obligatorios")
      setTypeAlert("error");
      showAlertAnimation();
    } else {
      updateRecordatorios(values)
      setTextAlert("Recordatorio creado con éxito")
      setTypeAlert("success");
      showAlertAnimation();
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
      <TextField 
        onChange={(e)=>{values.titulo.length < 30 && setValues({...values, titulo:e.target.value})}}
        id="outlined-basic"
        value={values.titulo}
        label="Título"
        variant="outlined"
        fullWidth
        style={{marginBottom: "17px"}}
        />
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
          <FormControl  variant="outlined" className={styles.input}>
            <InputLabel   id="metodo-evaluacion-label">Frecuencia</InputLabel>
            <Select
                value={values.frecuencia}
                onChange={(e) => setValues({ ...values, frecuencia: e.target.value })}
                label="Frecuencia"
                
            >
                <MenuItem value="Mensual">Mensual</MenuItem>
                <MenuItem value="Trimestral">Trimestral</MenuItem>
                <MenuItem value="Semestral">Semestral</MenuItem>
                <MenuItem value="Anual">Anual</MenuItem>
                <MenuItem value="Fecha específica">En fecha específica</MenuItem>
            </Select>
          </FormControl>

            <TextField
              onChange={(e) => setValues({ ...values, fechaEspecífica: e.target.value })}
              disabled={values.frecuencia !== "Fecha específica"}
              label="Fecha específica"
              variant="outlined"
              type="date"
              InputLabelProps={{
                  shrink: true,
              }}
              className={styles.input}
            />
          </div>

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
