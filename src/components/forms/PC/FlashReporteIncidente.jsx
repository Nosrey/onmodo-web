import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import styles from './FlashReporteIncidente.module.css'
import Alert from '../../shared/components/Alert/Alert';
import { flashIncidente } from '../../../services/FormsRequest';

function FlashReporteIncidente() {
     //** ALERTA */
     const [textAlert, setTextAlert] = useState("");
     const [typeAlert, setTypeAlert] = useState("");
     const [showAlert, setShowlert] = useState(false);
 
    var idUser = localStorage.getItem("idUser");
    const [values,setValues] = useState({
       alcance:"",
       linea:"",
       fecha:"",
       hora:"",
       comedor:"",
       responsable:"",
       incidentePotencial:"",
       tipo:"",
       descripcion:"",
       fotografia:"",
       acciones:"",
       nombreAsesor:"",
       firmaAsesor:"",
       nombreSupervisor:"",
       firmaSupervisor:"",
       nombreGerente:"",
       firmaGerente:"",
       idUser: idUser
    })

    const handleSubmit = () => {
        flashIncidente(values).then((resp)=> {
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
        <>
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Flash Reporte de Incidente</h3>
                </div>

                <div className={styles.personal}>
                    <TextField onChange={(e)=>{setValues({...values,alcance:e.target.value})}} id="outlined-basic" label="Alcance" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,linea:e.target.value})}} id="outlined-basic" label="Línea de negocios" variant="outlined" />
                    <input
            type="date"
            onChange={(e) => {
              setValues({ ...values, fecha: e.target.value });
            }}
            value={values.fecha}
          />
          <input
            type="time"
            onChange={(e) => {
              setValues({ ...values, hora: e.target.value });
            }}
            value={values.hora}
          />
                </div>
                <div className={styles.personal}>
                    <TextField onChange={(e)=>{setValues({...values,comedor:e.target.value})}} id="outlined-basic" label="Comedor" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,responsable:e.target.value})}} id="outlined-basic" label="Responsable del contrato" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,incidentePotencial:e.target.value})}} id="outlined-basic" label="Incidente Potencial/Real" variant="outlined" />
                </div>
                
                <div className={styles.personalText}>
                    <TextField onChange={(e)=>{setValues({...values,tipo:e.target.value})}} fullWidth id="outlined-basic" label="Tipo de Incidente" variant="outlined" />
                </div>

                <div className={styles.personalText}>
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="Descripción del Incidente:  (quién, qué, cómo, cuándo)"
                        multiline
                        rows={4}
                        onChange={(e)=>{setValues({...values,descripcion:e.target.value})}}
                    />           
                    <TextField onChange={(e)=>{setValues({...values,fotografia:e.target.value})}} id="outlined-basic" label="Fotografía" variant="outlined" />
     
                </div>

                <div className={styles.personalText}>
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="Acciones Inmediatas"
                        multiline
                        rows={4}
                        onChange={(e)=>{setValues({...values,acciones:e.target.value})}}
                    />                
                </div>

                <div className={styles.responsableCont}>
                    <div className={styles.subtitleCont}>
                        <p className={styles.subtitle}>Responsable (Accountable)</p>
                    </div>
                    <div className={styles.personal}>
                        <p  className={styles.tableLabel}>Asesor HSEQ</p>
                        <TextField onChange={(e)=>{setValues({...values,nombreAsesor:e.target.value})}} id="outlined-basic" label="Nombre" variant="outlined" />
                        <TextField onChange={(e)=>{setValues({...values,firmaAsesor:e.target.value})}} id="outlined-basic" label="Firma" variant="outlined" />
                    </div>
                    
                    <div className={styles.personal}>
                        <p className={styles.tableLabel}>Supervisor Directo</p>
                        <TextField onChange={(e)=>{setValues({...values,nombreSupervisor:e.target.value})}} id="outlined-basic" label="Nombre" variant="outlined" />
                        <TextField onChange={(e)=>{setValues({...values,firmaSupervisor:e.target.value})}} id="outlined-basic" label="Firma" variant="outlined" />
                    </div>

                    <div className={styles.personal}>
                        <p className={styles.tableLabel}>Gerente del Área</p>
                        <TextField onChange={(e)=>{setValues({...values,nombreGerente:e.target.value})}} id="outlined-basic" label="Nombre" variant="outlined" />
                        <TextField onChange={(e)=>{setValues({...values,firmaGerente:e.target.value})}} id="outlined-basic" label="Firma" variant="outlined" />
                    </div>
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

export default FlashReporteIncidente