import { Button, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import styles from './FlashReporteIncidente.module.css'
import { useSelector,useDispatch } from 'react-redux'
import reporteIncidentesActions from '../../../redux/actions/reporteIncidentesActions'

function FlashReporteIncidente() {
    const dispatch = useDispatch()
    const prueba = useSelector(state=>state.reporteIncidentesR.inputsValues)
    console.log(prueba)
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
       idUser:"643ea98d5b44dd9765966ae7"
    })

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Flash Reporte de Incidente</h3>
                    {/* <h4 className="formNumber"> HSEQ-07-R01</h4> */}
                </div>

                <div className={styles.personal}>
                    <TextField onChange={(e)=>{setValues({...values,alcance:e.target.value})}} id="outlined-basic" label="Alcance" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,linea:e.target.value})}} id="outlined-basic" label="Línea de negocios" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,fecha:e.target.value})}} id="outlined-basic" label="Fecha del Incidente" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,hora:e.target.value})}} id="outlined-basic" label="Hora del Incidente" variant="outlined" />
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
                    <Button onClick={()=>{dispatch(reporteIncidentesActions.logIn(values))}} variant="contained">Generar PDF</Button>
                </div>

            </div>
        </div>
    )
}

export default FlashReporteIncidente