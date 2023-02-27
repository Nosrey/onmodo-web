import { Button, TextField , Checkbox} from '@mui/material'
import React, { useState } from 'react'
import styles from './EPP.module.css'
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import EppInfo from '../../modales/Epp';
import Modal from '../../shared/Modal';

function EPP() {
    const [month, setMonth] = React.useState('');
    const [showModal, setShowModal] = useState(false);
    const [renglones] = useState([
        { id: 1, label: 'Ropa de trabajo' },
        { id: 2, label: 'Calzado de Seguridad' },
        { id: 3, label: 'Guantes' },
        { id: 4, label: 'Protección Ocular' },
        { id: 5, label: 'Protección facial' },
        { id: 6, label: 'Protección auditiva' },
        { id: 7, label: 'Protección Respiratoria' },
        { id: 8, label: 'Protección de tronco' },
        { id: 9, label: 'Otro' },
    ]);
    const [checks] = useState([
        { id: 1, label: '1' },
        { id: 2, label: '2' },
        { id: 3, label: '3' },
        { id: 4, label: '4' },
        { id: 5, label: '5' },
        { id: 6, label: '6' },
        { id: 7, label: '7' },
        { id: 8, label: '8' },
        { id: 9, label: '9' },
        { id: 10, label: '10' },
        { id: 11, label: '11' },
        { id: 12, label: '12' },
        { id: 13, label: '13' },
        { id: 14, label: '14' },
        { id: 15, label: '15' },
        { id: 16, label: '16' },
        { id: 17, label: '17' },
        { id: 18, label: '18' },
        { id: 19, label: '19' },
        { id: 20, label: '20' },
        { id: 21, label: '21' },
        { id: 22, label: '22' },
        { id: 23, label: '23' },
        { id: 24, label: '24' },
        { id: 25, label: '25' },
        { id: 26, label: '26' },
        { id: 27, label: '27' },
        { id: 28, label: '28' },
        { id: 29, label: '29' },
        { id: 30, label: '30' },
        { id: 31, label: '31' },
    ]);
    const handleChange = (event) => {
        setMonth(event.target.value);
      };
    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Lista para chequeo de uso E.P.P</h3>
                </div>

                { showModal ? (
                    <Modal
                    content={<EppInfo/>}
                    closeModal={() => setShowModal(false)}
                    />
                
                    )
                    : (
                    <div className='cont-btn'>
                        <Button  size="small" onClick={() => setShowModal(true)}>
                            <i class="ri-information-line" style={{marginRight: "8px", fontSize:"22px"}}></i> Ver Más
                        </Button>
                    </div>
                    )
                }


                <div className={styles.personalMonth}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Mes</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={month}
                        label="Mes"
                        onChange={handleChange}
                        >
                        <MenuItem value={"enero"}>Enero</MenuItem>
                        <MenuItem value={"febrero"}>Febrero</MenuItem>
                        <MenuItem value={"marzo"}>Marzo</MenuItem>
                        <MenuItem value={"abril"}>Abril</MenuItem>
                        <MenuItem value={"mayo"}>Mayo</MenuItem>
                        <MenuItem value={"junio"}>Junio</MenuItem>
                        <MenuItem value={"julio"}>Julio</MenuItem>
                        <MenuItem value={"agosto"}>Agosto</MenuItem>
                        <MenuItem value={"septiembre"}>Septiembre</MenuItem>
                        <MenuItem value={"octubre"}>Octubre</MenuItem>
                        <MenuItem value={"noviembre"}>Noviembre</MenuItem>
                        <MenuItem value={"diciembre"}>Diciembre</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className={styles.personal}>
                    <TextField id="outlined-basic" label="Nombre Del Empleado" variant="outlined" />
                    <TextField id="outlined-basic" label="Sector" variant="outlined" />
                    <TextField id="outlined-basic" label="Puesto" variant="outlined" />
                </div>

                <div className='contMonthTable'>
                    <div className='optionList'>
                    <div className='optionTableTitle'>
                            <p></p>
                        </div>
                        <div className='optionTable'>
                            <p>Ropa de trabajo</p>
                        </div>
                        <div className='optionTable'>
                            <p>Calzado de Seguridad</p>
                        </div>
                        <div className='optionTable'>
                            <p>Guantes</p>
                        </div>
                        <div className='optionTable'>
                            <p>Protección Ocular</p>
                        </div>
                        <div className='optionTable'>
                            <p>Protección Facial</p>
                        </div>
                        <div className='optionTable'>
                            <p>Protección Auditiva</p>
                        </div>
                        <div className='optionTable'>
                            <p>Protección Respiratoria</p>
                        </div>
                        <div className='optionTable'>
                            <p>Protección de Tronco</p>
                        </div>
                        <div className='optionTable'>
                            <p>Otro</p>
                        </div>
                    </div>
                    <div className="tableSectionCheck">
                        <div className='tableRowCheckTitle'>
                            <span className='dayTitle'>1</span><span className='dayTitle'>2</span><span className='dayTitle'>3</span><span className='dayTitle'>4</span><span className='dayTitle'>5</span><span className='dayTitle'>6</span>
                            <span className='dayTitle'>7</span><span className='dayTitle'>8</span><span className='dayTitle'>9</span><span className='dayTitle'>10</span><span className='dayTitle'>11</span>
                            <span className='dayTitle'>12</span><span className='dayTitle'>13</span><span className='dayTitle'>14</span><span className='dayTitle'>15</span><span className='dayTitle'>16</span>
                            <span className='dayTitle'>17</span><span className='dayTitle'>18</span><span className='dayTitle'>19</span><span className='dayTitle'>20</span><span className='dayTitle'>21</span>
                            <span className='dayTitle'>22</span><span className='dayTitle'>23</span><span className='dayTitle'>24</span><span className='dayTitle'>25</span><span className='dayTitle'>26</span>
                            <span className='dayTitle'>27</span><span className='dayTitle'>28</span><span className='dayTitle'>29</span><span className='dayTitle'>30</span><span className='dayTitle'>31</span>
                        </div>
                        {renglones
                            .map((_, index) => (
                                <div className="tableRowCheck" key={index}>
                                    {checks.map((input) => (
                                        <div key={input.id}>
                                            <Checkbox className='check' id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} label={`${input.label}`}/>

                                        </div>
                                    ))}
                                </div>
                            ))}

                    </div>
                </div>
                <br />
                <br />
                <br />
                <div className={styles.personalText}>
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="Observaciones"
                        multiline
                        rows={4}
                    />                
                </div>
                <br />
                <br />
                <div className={styles.personal}>
                    <TextField id="outlined-basic" label="Firma Responsable Comedor" variant="outlined" />
                </div>

                <div className="btn">
                    <Button variant="contained">Generar PDF</Button>

                </div>

            </div>
        </div>
    )
}

export default EPP