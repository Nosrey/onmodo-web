import { Button, TextField, Checkbox, FormControlLabel, } from '@mui/material'
import React, { useState } from 'react'
import styles from './ControlEquiposDeFrio.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

function ControlEquiposDeFrio() {
    const [inputs] = useState([
        { id: 1, label: 'Día' },
        { id: 2, label: 'Hora' },
        { id: 3, label: 'Temp.Equipo' },
        { id: 4, label: 'Alimento' },
        { id: 5, label: 'Temperatura Alim.' },
        { id: 6, label: 'Acción de corrección' },
        { id: 7, label: 'Responsable' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [month, setMonth] = React.useState('');
    const [turno, setTurno] = React.useState('');

    const handleClick = () => {
        setReplicas(replicas + 1);
    };

    const handleChange = (event) => {
      setMonth(event.target.value);
    };
    const handleChangeTurno = (event) => {
        setTurno(event.target.value);
      };

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Control de Equipos de Frío</h3>
                    {/* <h4 className="formNumber">Q/SOP-02-R01</h4> */}
                </div>


                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>Límite de control</p>
                </div>

                <b>Temperaturas de cámaras:</b>
                <p>menor a 5ºC.</p>

                <b>Temperatura de ante-cámaras y heladeras  para  descongelamiento  o  de tránsito  (menor  a  4 horas)  o  expositora:</b>
                <p>menor a  10ºC.</p>

                <b>Temperaturas de freezer:</b>
                <p>Menor a -18ºC.</p>

                <b>Contratos    certificados    con    IRAM    BPM: </b>
                <p>Temperatura  de  equipos  de  frío  refrigerados menor a 4ºC.</p>


                <p>Según   los   turnos   de   producciónse   debe controlar   la   temperatura   de   cámaras   y heladeras, distando entre un control y el otro entre 8 y 10 horas(mínimo 2 veces).</p>

                <p>Un alimento correspondiente a cada cámara, seleccionado  al  azar,  debe  ser  registrado. Alimentos críticos: postres, productos cocidos, vegetales desinfectados.</p>


                <br />
                <br />


                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>Acciones de corrección</p>
                </div>
                <b>Equipos refrigerados:</b>
                <ol>
                    <li>Sila T° de los equipos supera el límite, controlar la temperatura de alimentos en distintas zonas del equipo. Re chequear la temperatura de los alimentos habiendo mantenido cerrada la puerta de cámara.</li>
                    <li>Luego de la hora, si los alimentos se encuentran dentro del límite, ninguna otra acción es requerida, si la lectura del termómetro del equipo es correcta</li>
                    <li>Luego  de  la  hora,  si  los  alimentos  se  encuentran  a  más  del  límite,  chequear  alimentos  en  distintas  zonas  del equipo:</li>

                    <ul>
                        <li>Si la temperatura de los alimentos supera los 7°Cen cámara o los 10°C en heladera de tránsito (IRAMBPM  mayor a 4ºC): trasladarlos a otro equipo. </li>
                        <li>Si la temperatura de los alimentos supera los 13°C  (IRAM BPM  mayor a 7ºC): deben ser DESECHADOS.</li>
                    </ul>
                </ol>

                <br />
                <b>Equipos congelados:</b>
                <ol>
                    <li>Si  el  freezer  se  encuentra  con  temperaturas  superiores  a -12°C,  chequear  la  dureza  al  tacto  y  signos  de descongelamiento.</li>
                    <li>Si hay signos de descongelamiento, los alimentos deben descongelarse en cámara y ser tratados como  producto fresco, con una vida útil de 24 hs. una vez descongelado. Deben rotularse: -fecha de inicio del descongelamiento y hora –fecha final de descongelamiento y hora.</li>
                    <li>Si los alimentos no pierden dureza al tacto y no presentan signos de descongelamiento,se vuelvena monitorear los mismos alimentos a la hora.</li>
                    <li>Si  los  alimentos  NO  reflejan  cambios  en  la  dureza  superficial  y  el  equiposigue  indicando  una  T°  mayor  a -12°C, trasladar los alimentos a otro equipo o utilizar la mercadería como producto fresco. </li>
                    <li>Si el equipo ahora indica entre -12°C y -18°C, ninguna otra acción es requerida.</li>
                </ol>

<br />
<br />
<br />
                <div className={styles.personalNro}>
                    <p>Coloque número y nombre de cámara:</p>
                    <TextField id="outlined-basic" label="Equipo Nro:" variant="outlined" />
                </div>

                <div className={styles.personal}>
                    <FormControlLabel control={<Checkbox />} label="HELADERA" />
                    <FormControlLabel control={<Checkbox />} label="CÁMARA REFRIGERADOS" />
                    <FormControlLabel control={<Checkbox />} label="CÁMARA CONGELADOS" />
                </div>

                <div className={styles.personalSelects}> 
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

                    <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label">Turno</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={turno}
                        label="turno"
                        onChange={handleChangeTurno}
                        >
                        <MenuItem value={"tm"}>Turno Mañana</MenuItem>
                        <MenuItem value={"tt"}>Turno Tarde</MenuItem>
                        <MenuItem value={"tn"}>Turno Noche</MenuItem>
                        </Select>
                    </FormControl>
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
                    <TextField id="outlined-basic" label="Verificado por" variant="outlined" />
                    <TextField id="outlined-basic" label="Fecha" variant="outlined" />
                </div>
                <div className="btn">
                    <Button variant="contained">Generar PDF</Button>
                </div>

            </div>
        </div>
    )
}

export default ControlEquiposDeFrio