import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import styles from './ConstanciaEntrega.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';

function ConstanciaEntrega() {
    const [inputs] = useState([
        { id: 1, label: 'Producto' },
        { id: 2, label: 'Tipo/modelo' },
        { id: 3, label: 'Marca' },
        { id: 4, label: 'Posee certificacion' },
        { id: 5, label: 'Cantidad' },
        { id: 6, label: 'Fecha de entrega' },
        { id: 7, label: 'Firma del trabajador' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [showTextField, setShowTextField] = useState(false);


    const handleClick = () => {
        setReplicas(replicas + 1);
    };


    const handleCheckboxChange = (event) => {
        setShowTextField(event.target.checked);
    };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Constancia de Entrega de Ropa de Trabajo y de E.P.P</h3>
                    {/* <h4 className="formNumber"> HS-01-R01</h4> */}
                </div>
                <div className={styles.personal}>
                    <TextField id="outlined-basic" label="Apellido y nombre" variant="outlined" />
                    <TextField id="outlined-basic" label="Contrato" variant="outlined" />
                    <TextField id="outlined-basic" label="DNI" variant="outlined" />
                </div>
                <div className={styles.personal}>
                    <TextField id="outlined-basic" label="Direccion" variant="outlined" />
                    <TextField id="outlined-basic" label="Localidad" variant="outlined" />
                    <TextField id="outlined-basic" label="CP" variant="outlined" />
                    <TextField id="outlined-basic" label="Provincia" variant="outlined" />
                </div>
                <div className={styles.personalText}>
                    <TextField fullWidth id="outlined-basic" label="Descripcion breve de las tareas a realizar" variant="outlined" />
                </div>
                <div className={styles.personal}>
                    <FormControlLabel control={<Checkbox />} label="Ropa de trabajo" />
                    <FormControlLabel control={<Checkbox />} label="Guantes" />
                    <FormControlLabel control={<Checkbox />} label="Calzado de seguridad" />
                    <FormControlLabel control={<Checkbox />} label="Antiparras" />
                    <FormControlLabel control={<Checkbox />} label="Mascara" />
                    <FormControlLabel control={<Checkbox />} label="Cofia" />
                    <div>

                        <FormControlLabel control={<Checkbox
                            id="showTextField"
                            name="showTextField"
                            onChange={handleCheckboxChange} />} label="Otros" />
                        <label htmlFor="showTextField"></label>

                    </div>
                </div>
                
                <div className={styles.personal}>
                    {showTextField && (
                        <TextField id="outlined-basic" name="textField" variant="outlined" label="Otros" />
                    )}
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
                                            <TextField className='input' id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} label={`${input.label}`} variant="outlined" />

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
                    <TextField fullWidth id="outlined-basic" label="Informacion adicional" variant="outlined" />
                </div>
                <div className="btn">
                    <Button variant="contained">Generar PDF</Button>

                </div>

            </div>
        </div>
    )
}

export default ConstanciaEntrega