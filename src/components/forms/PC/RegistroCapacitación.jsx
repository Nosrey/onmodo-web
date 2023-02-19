import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import styles from './RegistroCapacitacion.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';

function RegistroCapacitacion() {
    const [inputs] = useState([
        { id: 1, label: 'DNI' },
        { id: 2, label: 'Nombre y Apellido' },
        { id: 3, label: 'Area/Lugar de trabajo' },
        { id: 4, label: 'Firma' },
        { id: 5, label: 'Resultado Evaluación' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [showTextField1, setShowTextField1] = useState(false);
    const [showTextField2, setShowTextField2] = useState(false);


    const handleClick = () => {
        setReplicas(replicas + 1);
    };


    const handleCheckboxChange = (event, id) => {
        if (id === 1) {
            setShowTextField1(event.target.checked);
        } 
        if (id === 2) {
            setShowTextField2(event.target.checked);
        } 
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Registro de Capacitación</h3>
                    <h4 className="formNumber">HSEQ-04-R02</h4>
                </div>
                <div className={styles.personalRight}>
                    <TextField id="outlined-basic" label="Fecha" variant="outlined" />
                    <TextField id="outlined-basic" label="Tiempo de duración" variant="outlined" />
                </div>

                <h4>Tipo de capacitación </h4>
                <p >Selecciona la opción que corresponda:</p>
                    
                    <div className={styles.listContainer}>
                        <FormControlLabel control={<Checkbox />}  label="Inducción" className={styles.listItem}/>
                        <FormControlLabel control={<Checkbox />}  className={styles.listItem} label="Campaña" />
                        <FormControlLabel control={<Checkbox />}  className={styles.listItem} label="Entrenamiento Puesto de trabajo" />
                        <FormControlLabel control={<Checkbox />}  className={styles.listItem} label="Capacitaciones gubernamentales " />
                        <FormControlLabel control={<Checkbox />}  className={styles.listItem} label="Capacitación sobre Normas o Certificaciones" />
                        <FormControlLabel control={<Checkbox />}  className={styles.listItem} label="Cierre Auditoría" />
                    </div>

                <div className={styles.personalText}>
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="Temas dados"
                        multiline
                        rows={4}
                    />                
                </div>

                <div className={styles.matDidacticoSection}>
                    <div>
                        <div className={styles.listTitle}>
                            <h4>Material didáctico Entregado</h4>
                            <p> (Selecciona la opción que corresponda)</p>
                        </div>
                        
                        <div className={styles.listContainer}>
                            <FormControlLabel control={<Checkbox />}  className={styles.listItem} label="Manual /instructivo" />
                            <FormControlLabel control={<Checkbox />}  className={styles.listItem} label="Folleto" />
                            <FormControlLabel control={<Checkbox />}  className={styles.listItem} label="Procedimiento" />
                            <div>

                            <FormControlLabel control={<Checkbox
                                id="showTextField"
                                name="showTextField"
                                onChange={($event) => handleCheckboxChange($event, 1)} />} label="Otros" />
                            <label htmlFor="showTextField"></label>

                            </div>                    
                        </div>
                        <div className={styles.personal}>
                            {showTextField1 && (
                                <TextField id="outlined-basic" name="textField" variant="outlined" label="Otros" />
                            )}
                        </div>
                    </div>
                    
                    <div>
                        <div className={styles.listTitle}>
                            <h4>Material didáctico Expuesto</h4>
                            <p >(Selecciona las opciónes que correspondan)</p>
                        </div>
                        
                        <div className={styles.listContainer}>
                            <FormControlLabel control={<Checkbox />}  className={styles.listItem} label="Video" />
                            <FormControlLabel control={<Checkbox />}  className={styles.listItem} label="Filminas" />
                            <FormControlLabel control={<Checkbox />}  className={styles.listItem} label="Disertación" />
                            
                            <div>
                                <FormControlLabel control={<Checkbox
                                    id="showTextField"
                                    name="showTextField"
                                    onChange={($event) => handleCheckboxChange($event, 2)} />} label="Otros" />
                                <label htmlFor="showTextField"></label>
                            </div>   
                        </div>
                        
                        <div className={styles.personal}>
                            {showTextField2 && (
                                <TextField id="outlined-basic" name="textField" variant="outlined" label="Otros" />
                            )}
                        </div>
                    </div>
                </div>

                    


                

                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>ASISTENTES</p>
                </div>
                <div className="table">
                    <div className="tableSection">
                        {Array(replicas)
                            .fill(0)
                            .map((_, index) => (
                                <div className="tableRow" key={index}>
                                    <p className="index">{index + 1} </p>

                                    {inputs.map((input) => (
                                        <div key={input.id}>
                                            <TextField  id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} label={`${input.label}`} variant="outlined" />

                                        </div>
                                    ))}
                                    <div className="icon">
                                        <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick} />
                                    </div>
                                </div>
                            ))}

                    </div>
                </div>
               
                <div className={styles.personal}>
                    <TextField fullWidth id="outlined-basic" label="Observaciones" variant="outlined" />
                </div>


                <div className={styles.firma}>
                    <TextField  id="outlined-basic" label="Instructor" variant="outlined" />
                    <TextField  id="outlined-basic" label="Cargo / Función" variant="outlined" />
                    <TextField  id="outlined-basic" label="Firma" variant="outlined" />
                </div>

                <div className="btn">
                    <Button variant="contained">Generar PDF</Button>

                </div>

            </div>
        </div>
    )
}

export default RegistroCapacitacion