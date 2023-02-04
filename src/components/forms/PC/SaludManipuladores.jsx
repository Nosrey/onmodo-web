import { Button, TextField , Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'
import styles from './SaludManipuladores.module.css'


function SaludManipuladores() {

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Formulario de Salud para Manipuladores</h3>
                    <h4 className="formNumber">Q/SOP-04-R01</h4>
                </div>
                <div className={styles.personalText}>
                    <TextField fullWidth id="outlined-basic" label="Nombre del empleado" variant="outlined" />
                </div>

                <div className={styles.personal}>
                    <TextField id="outlined-basic" label="Dirección" variant="outlined" />
                    <TextField id="outlined-basic" label="Teléfono" variant="outlined" />
                    <TextField id="outlined-basic" label="Nro. Legajo" variant="outlined" />
                    <TextField id="outlined-basic" label="Puesto de trabajo" variant="outlined" />
                </div>

                <div className={styles.responsableCont}>
                    <div className={styles.subtitleCont}>
                        <p className={styles.subtitle}>ENTREVISTA PRE-OCUPACIONAL</p>
                    </div>
                    <p >Usted ha sufrido en los últimos 10 días de:</p>
                    
                    <div className={styles.listContainer}>
                        <FormControlLabel control={<Checkbox />}  label="Diarrea" className={styles.listItem}/>
                        <FormControlLabel control={<Checkbox />}  className={styles.listItem} label="Vómitos" />
                        <FormControlLabel control={<Checkbox />}  className={styles.listItem} label="Dolor Gastrointestinal" />
                        <FormControlLabel control={<Checkbox />}  className={styles.listItem} label="Fiebre mayor a 38ºC" />
                        <FormControlLabel control={<Checkbox />}  className={styles.listItem} label="Dolor de Garganta" />
                        <FormControlLabel control={<Checkbox />}  className={styles.listItem} label="Gripe-resfríos" />
                        <FormControlLabel control={<Checkbox />}  className={styles.listItem} label="Secreciones en los ojos" />
                        <FormControlLabel control={<Checkbox />}  className={styles.listItem} label="¿Lesiones con pus en manos, muñecas o en otra parte expuesta del cuerpo?(Como serrasguños, quemaduras u otrasheridas infectadas)" />
                    </div>

                    <hr />
                    <br />
                    <br />
                    <br />
                    <p className={styles.subtitle}>ACUERDO CON EL EMPLEADO</p>

                    <p>Acepto reportar inmediatamente al empleador en caso de estar sufriendo algunos de los síntomas antes mencionados. Ya sea a través de este formulario o bien si se presentaran en los días subsiguientes.</p>

                    <p>Acepto realizar los estudios pertinentes si fuera necesario.</p>

                    <p>Estoy de acuerdo con reportar a mi superior antes de comenzar mi trabajo en caso de haber sufrido alguna de los síntomas antes mencionados.</p>
                    <br />
                    <br />

                    <div className={styles.personal}>
                        <TextField id="outlined-basic" label="Fecha" variant="filled" />
                    </div>

                    <br />
                    <br />

                    <div className={styles.personal}>
                        <div className={styles.half}>
                            <TextField  fullWidth id="outlined-basic" label="Firma y Aclaración del empleado" variant="outlined" />
                        </div>
                        <div className={styles.half}>
                            <TextField  fullWidth id="outlined-basic" label="Firma y Aclaración del Representante de ARAMARK" variant="outlined" />
                        </div>
                    </div>

                </div>

         





                 
                <div className="btn">
                    <Button variant="contained">Generar PDF</Button>
                </div>

            </div>
        </div>
    )
}

export default SaludManipuladores