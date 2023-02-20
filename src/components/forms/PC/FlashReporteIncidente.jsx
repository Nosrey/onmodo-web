import { Button, TextField } from '@mui/material'
import React from 'react'
import styles from './FlashReporteIncidente.module.css'

function FlashReporteIncidente() {

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Flash Reporte de Incidente</h3>
                    {/* <h4 className="formNumber"> HSEQ-07-R01</h4> */}
                </div>

                <div className={styles.personal}>
                    <TextField id="outlined-basic" label="Alcance" variant="outlined" />
                    <TextField id="outlined-basic" label="Línea de negocios" variant="outlined" />
                    <TextField id="outlined-basic" label="Fecha del Incidente" variant="outlined" />
                    <TextField id="outlined-basic" label="Hora del Incidente" variant="outlined" />
                </div>
                <div className={styles.personal}>
                    <TextField id="outlined-basic" label="Comedor" variant="outlined" />
                    <TextField id="outlined-basic" label="Responsable del contrato" variant="outlined" />
                    <TextField id="outlined-basic" label="Incidente Potencial/Real" variant="outlined" />
                </div>
                
                <div className={styles.personalText}>
                    <TextField fullWidth id="outlined-basic" label="Tipo de Incidente" variant="outlined" />
                </div>

                <div className={styles.personalText}>
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="Descripción del Incidente:  (quién, qué, cómo, cuándo)"
                        multiline
                        rows={4}
                    />           
                    <TextField id="outlined-basic" label="Fotografía" variant="outlined" />
     
                </div>

                <div className={styles.personalText}>
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="Acciones Inmediatas"
                        multiline
                        rows={4}
                    />                
                </div>

                <div className={styles.responsableCont}>
                    <div className={styles.subtitleCont}>
                        <p className={styles.subtitle}>Responsable (Accountable)</p>
                    </div>
                    <div className={styles.personal}>
                        <p  className={styles.tableLabel}>Asesor HSEQ</p>
                        <TextField id="outlined-basic" label="Nombre" variant="outlined" />
                        <TextField id="outlined-basic" label="Firma" variant="outlined" />
                    </div>
                    
                    <div className={styles.personal}>
                        <p className={styles.tableLabel}>Supervisor Directo</p>
                        <TextField id="outlined-basic" label="Nombre" variant="outlined" />
                        <TextField id="outlined-basic" label="Firma" variant="outlined" />
                    </div>

                    <div className={styles.personal}>
                        <p className={styles.tableLabel}>Gerente del Área</p>
                        <TextField id="outlined-basic" label="Nombre" variant="outlined" />
                        <TextField id="outlined-basic" label="Firma" variant="outlined" />
                    </div>
                </div>

                <div className="btn">
                    <Button variant="contained">Generar PDF</Button>

                </div>

            </div>
        </div>
    )
}

export default FlashReporteIncidente