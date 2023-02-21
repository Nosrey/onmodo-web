import { Button, TextField, Checkbox, FormControlLabel } from '@mui/material'
import React, { useState }  from 'react'
import styles from './InformeInternoAccidente.module.css'

function InformeInternoAccidente() {

    const [showTextField1, setShowTextField1] = useState(false);
    const [showTextField2, setShowTextField2] = useState(false);
    const [showTextField3, setShowTextField3] = useState(false);

    const handleCheckboxChange = (event, id) => {
        if (id === 1) {
            setShowTextField1(event.target.checked);
        } 
        if (id === 2) {
            setShowTextField2(event.target.checked);
        } 
        if (id === 3) {
            setShowTextField3(event.target.checked);
        } 
    };
    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Informe Interno de Accidente</h3>
                    {/* <h4 className="formNumber"> HS-01-R04</h4> */}
                </div>

                <div className={styles.personal}>
                    <TextField id="outlined-basic" style={{width:"50%"}} label="Comedor donde ocurrió" variant="outlined" />
                    <TextField id="outlined-basic" label="Fecha" variant="outlined" />
                    <TextField id="outlined-basic"  label="Tipo de accidente" variant="outlined" />
                </div>

                <div className={styles.personal}>
                    <FormControlLabel control={<Checkbox />} label="CDR" />
                    <FormControlLabel control={<Checkbox />} label="CMS" />
                    <FormControlLabel control={<Checkbox />} label="Laboral" />
                    <FormControlLabel control={<Checkbox />} label="In Itinere" />
                    <FormControlLabel control={<Checkbox />} label="Se adjunta denuncia policial" />
                </div>
                

                <div className={styles.responsableCont}>
                    <div className={styles.subtitleCont}>
                        <p className={styles.subtitle}>DATOS DEL ACCIDENTADO</p>
                    </div>
                    <div className={styles.personal}>
                        <TextField id="outlined-basic" label="Nombre y Apellido" variant="outlined" />
                        <TextField id="outlined-basic" label="Nº de CUIL" variant="outlined" />
                        <TextField id="outlined-basic" label="Fecha de ingreso" variant="outlined" />
                    </div>
                    <div className={styles.personal}>
                        <TextField id="outlined-basic" label="Puesto de trabajo" variant="outlined" />
                        <TextField id="outlined-basic" label="Hora del accidente" variant="outlined" />
                        <TextField id="outlined-basic" label="Lugar del accidente" variant="outlined" />
                    </div>

                    <div className={styles.personalText}>
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="Descripción del Accidente"
                        multiline
                        rows={4}
                    />          
                    </div>

                    <div className={styles.listContainer}>
                        <FormControlLabel control={<Checkbox />} label="¿Era su trabajo habitual?" />
                        <FormControlLabel control={<Checkbox />} label="¿Conocía la tarea asignada?" />

                      
                        <FormControlLabel control={<Checkbox
                            id="showTextField"
                            name="showTextField"
                            onChange={($event) => handleCheckboxChange($event, 1)} />} label="¿Una máquina le causó la lesión? " />
                        <label htmlFor="showTextField"></label>
                        
                        {showTextField1 && (
                            <div className={styles.personal}>
                            <TextField id="outlined-basic"   multiline style={{width:"50%"}}
                            rows={2} name="textField" variant="outlined" label="¿Cuál?" />
                            </div>   
                        )}
                
                          
                        <FormControlLabel control={<Checkbox
                            id="showTextField"
                            name="showTextField"
                            onChange={($event) => handleCheckboxChange($event, 2)} />} label="¿Hubo alguna acción o condición insegura que fuera la causante del accidente? " />
                        <label htmlFor="showTextField"></label>
                        
                        {showTextField2 && (
                            <div className={styles.personal}>
                            <TextField id="outlined-basic"   multiline style={{width:"50%"}}
                            rows={2} name="textField" variant="outlined" label="¿Cuál?" />
                            </div>   
                        )}


                          
                        <FormControlLabel control={<Checkbox
                            id="showTextField"
                            name="showTextField"
                            onChange={($event) => handleCheckboxChange($event, 3)} />} label="¿Estaba usando su E.P.P.? " />
                        <label htmlFor="showTextField"></label>
                        
                        {!showTextField3 && (
                            <div className={styles.personal}>
                            <TextField id="outlined-basic"   multiline style={{width:"50%"}}
                            rows={2} name="textField" variant="outlined" label=" ¿Por qué razón no lo usaba?" />
                            </div>   
                        )}

                    </div>

                    <div className={styles.personalText}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="¿En qué lugar del cuerpo se produjo la lesión?"
                            multiline
                            rows={2}
                        />      
                    </div>
                    <div className={styles.personalText}>
                   
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="¿Qué medidas cree conveniente adoptar para evitar futuros accidentes de este tipo?"
                            multiline
                            rows={4}
                        />          
                    </div>
                </div>

                <p  className={styles.boldLegend}>Enviar dentro de las 24 hs. de ocurrido el accidente a Administración de RRHH –Of. Central</p>


                <div className={styles.personal}>
                    <TextField id="outlined-basic" label="Firma del Empleado" variant="outlined" />
                    <TextField id="outlined-basic" label="Firma del Administrador o Encargado Contrato" variant="outlined" />
                    <TextField id="outlined-basic" label="Encargado ContratoRevisado por" variant="outlined" />
                </div>

        

                <div className="btn">
                    <Button variant="contained">Generar PDF</Button>

                </div>

            </div>
        </div>
    )
}

export default InformeInternoAccidente