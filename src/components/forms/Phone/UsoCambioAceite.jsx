import { Button, TextField , Checkbox} from '@mui/material'
import React, { useState } from 'react'
import styles from './UsoCambioAceite.module.css'
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '../../shared/Modal';
import CambioAceiteInfo from '../../modales/CambioAceiteInfo';
import { useSelector,useDispatch } from 'react-redux';
import cambioAceiteActions from '../../../redux/actions/cambioAceiteActions';
function UsoCambioAceite() {
    const dispatch = useDispatch()
    const prueba = useSelector(state=>state.cambioAceiteR.inputsValues)
    console.log("holi",prueba)
    const [month, setMonth] = React.useState('');
    const [showModal, setShowModal] = useState(false);

    const [renglones] = useState([
        { id: 1, label: 'Uso' },
        { id: 2, label: 'Filtración' },
        { id: 3, label: 'Cambio Aceite' },
        { id: 4, label: 'Limpieza de freidora' },
        { id: 5, label: 'Responsable' },
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
    const [checksUso] = useState([
        { id: 1, label: '1' , check:false},
        { id: 2, label: '2' , check:false},
        { id: 3, label: '3' , check:false},
        { id: 4, label: '4' , check:false},
        { id: 5, label: '5' , check:false},
        { id: 6, label: '6' , check:false},
        { id: 7, label: '7' , check:false},
        { id: 8, label: '8' , check:false},
        { id: 9, label: '9' , check:false},
        { id: 10, label: '10', check:false },
        { id: 11, label: '11', check:false },
        { id: 12, label: '12', check:false },
        { id: 13, label: '13', check:false },
        { id: 14, label: '14', check:false },
        { id: 15, label: '15', check:false },
        { id: 16, label: '16', check:false },
        { id: 17, label: '17', check:false },
        { id: 18, label: '18', check:false },
        { id: 19, label: '19', check:false },
        { id: 20, label: '20', check:false },
        { id: 21, label: '21', check:false },
        { id: 22, label: '22', check:false },
        { id: 23, label: '23', check:false },
        { id: 24, label: '24', check:false },
        { id: 25, label: '25', check:false },
        { id: 26, label: '26', check:false },
        { id: 27, label: '27', check:false },
        { id: 28, label: '28', check:false },
        { id: 29, label: '29', check:false },
        { id: 30, label: '30', check:false },
        { id: 31, label: '31', check:false },
    ]);
    const [checksFiltracion] = useState([
        { id: 1, label: '1' , check:false},
        { id: 2, label: '2' , check:false},
        { id: 3, label: '3' , check:false},
        { id: 4, label: '4' , check:false},
        { id: 5, label: '5' , check:false},
        { id: 6, label: '6' , check:false},
        { id: 7, label: '7' , check:false},
        { id: 8, label: '8' , check:false},
        { id: 9, label: '9' , check:false},
        { id: 10, label: '10', check:false },
        { id: 11, label: '11', check:false },
        { id: 12, label: '12', check:false },
        { id: 13, label: '13', check:false },
        { id: 14, label: '14', check:false },
        { id: 15, label: '15', check:false },
        { id: 16, label: '16', check:false },
        { id: 17, label: '17', check:false },
        { id: 18, label: '18', check:false },
        { id: 19, label: '19', check:false },
        { id: 20, label: '20', check:false },
        { id: 21, label: '21', check:false },
        { id: 22, label: '22', check:false },
        { id: 23, label: '23', check:false },
        { id: 24, label: '24', check:false },
        { id: 25, label: '25', check:false },
        { id: 26, label: '26', check:false },
        { id: 27, label: '27', check:false },
        { id: 28, label: '28', check:false },
        { id: 29, label: '29', check:false },
        { id: 30, label: '30', check:false },
        { id: 31, label: '31', check:false },
    ]);
    const [checksCambio] = useState([
        { id: 1, label: '1' , check:false},
        { id: 2, label: '2' , check:false},
        { id: 3, label: '3' , check:false},
        { id: 4, label: '4' , check:false},
        { id: 5, label: '5' , check:false},
        { id: 6, label: '6' , check:false},
        { id: 7, label: '7' , check:false},
        { id: 8, label: '8' , check:false},
        { id: 9, label: '9' , check:false},
        { id: 10, label: '10', check:false },
        { id: 11, label: '11', check:false },
        { id: 12, label: '12', check:false },
        { id: 13, label: '13', check:false },
        { id: 14, label: '14', check:false },
        { id: 15, label: '15', check:false },
        { id: 16, label: '16', check:false },
        { id: 17, label: '17', check:false },
        { id: 18, label: '18', check:false },
        { id: 19, label: '19', check:false },
        { id: 20, label: '20', check:false },
        { id: 21, label: '21', check:false },
        { id: 22, label: '22', check:false },
        { id: 23, label: '23', check:false },
        { id: 24, label: '24', check:false },
        { id: 25, label: '25', check:false },
        { id: 26, label: '26', check:false },
        { id: 27, label: '27', check:false },
        { id: 28, label: '28', check:false },
        { id: 29, label: '29', check:false },
        { id: 30, label: '30', check:false },
        { id: 31, label: '31', check:false },
    ]);
    const [checksLimpieza] = useState([
        { id: 1, label: '1' , check:false},
        { id: 2, label: '2' , check:false},
        { id: 3, label: '3' , check:false},
        { id: 4, label: '4' , check:false},
        { id: 5, label: '5' , check:false},
        { id: 6, label: '6' , check:false},
        { id: 7, label: '7' , check:false},
        { id: 8, label: '8' , check:false},
        { id: 9, label: '9' , check:false},
        { id: 10, label: '10', check:false },
        { id: 11, label: '11', check:false },
        { id: 12, label: '12', check:false },
        { id: 13, label: '13', check:false },
        { id: 14, label: '14', check:false },
        { id: 15, label: '15', check:false },
        { id: 16, label: '16', check:false },
        { id: 17, label: '17', check:false },
        { id: 18, label: '18', check:false },
        { id: 19, label: '19', check:false },
        { id: 20, label: '20', check:false },
        { id: 21, label: '21', check:false },
        { id: 22, label: '22', check:false },
        { id: 23, label: '23', check:false },
        { id: 24, label: '24', check:false },
        { id: 25, label: '25', check:false },
        { id: 26, label: '26', check:false },
        { id: 27, label: '27', check:false },
        { id: 28, label: '28', check:false },
        { id: 29, label: '29', check:false },
        { id: 30, label: '30', check:false },
        { id: 31, label: '31', check:false },
    ]);
    const [checksResponsable] = useState([
        { id: 1, label: '1' , check:false},
        { id: 2, label: '2' , check:false},
        { id: 3, label: '3' , check:false},
        { id: 4, label: '4' , check:false},
        { id: 5, label: '5' , check:false},
        { id: 6, label: '6' , check:false},
        { id: 7, label: '7' , check:false},
        { id: 8, label: '8' , check:false},
        { id: 9, label: '9' , check:false},
        { id: 10, label: '10', check:false },
        { id: 11, label: '11', check:false },
        { id: 12, label: '12', check:false },
        { id: 13, label: '13', check:false },
        { id: 14, label: '14', check:false },
        { id: 15, label: '15', check:false },
        { id: 16, label: '16', check:false },
        { id: 17, label: '17', check:false },
        { id: 18, label: '18', check:false },
        { id: 19, label: '19', check:false },
        { id: 20, label: '20', check:false },
        { id: 21, label: '21', check:false },
        { id: 22, label: '22', check:false },
        { id: 23, label: '23', check:false },
        { id: 24, label: '24', check:false },
        { id: 25, label: '25', check:false },
        { id: 26, label: '26', check:false },
        { id: 27, label: '27', check:false },
        { id: 28, label: '28', check:false },
        { id: 29, label: '29', check:false },
        { id: 30, label: '30', check:false },
        { id: 31, label: '31', check:false },
    ]);
    const [values,setValues] = useState({
        mes:"",
        uso:[{}],
        filtracion:[{}],
        cambioAceite:[{}],
        limpieza:[{}],
        responsable:[{}],
        observaciones:"",
        date: "",
        idUser:"643ea98d5b44dd9765966ae7"
    })

    const checkboxValuesConstructor = (label,value,id)=>{
        if (label === 0){
            checksUso[id-1].check = value
            setValues({...values,uso:checksUso})
        }
        if(label===1){
            checksFiltracion[id-1].check = value
            setValues({...values,filtracion:checksFiltracion})
        }
        if(label===2){
            checksCambio[id-1].check = value
            setValues({...values,cambioAceite:checksCambio})
        }
        if(label===3){
            checksLimpieza[id-1].check = value
            setValues({...values,limpieza:checksLimpieza})
        }
        if(label===4){
            checksResponsable[id-1].check = value
            setValues({...values,responsable:checksResponsable})
        }        
    }
    const handleChange = (event) => {
        setMonth(event.target.value)
        setValues({...values,mes:event.target.value})
      };
    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Uso y Cambio de Aceite de Freidora</h3>
                </div>
                { showModal ? (
                    <Modal
                    content={<CambioAceiteInfo/>}
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

              

                <div className={styles.personal}>
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

                <div className='contMonthTable'>
                    <div className='optionList'>
                    <div className='optionTableTitle'>
                            <p></p>
                        </div>
                        <div className='optionTable'>
                            <p>Uso</p>
                        </div>
                        <div className='optionTable'>
                            <p>Filtración</p>
                        </div>
                        <div className='optionTable'>
                            <p>Cambio Aceite</p>
                        </div>
                        <div className='optionTable'>
                            <p>Limpieza de freidora</p>
                        </div>
                        <div className='optionTable'>
                            <p>Responsable</p>
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
                                            <Checkbox onChange={(e)=>{checkboxValuesConstructor(index,e.target.checked,input.id)}} className='check' id={`input-${input.id}-${index}`} name={`input-${input.id}-${index}`} label={`${input.label}`}/>

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
                        onChange={(e)=>{
                            setValues({...values,observaciones:e.target.value})
                        }}
                        fullWidth
                        id="outlined-multiline-static"
                        label="Observaciones"
                        multiline
                        rows={4}
                    />                
                </div>

                <div className="btn">
                    <Button onClick={(e)=>{
                        dispatch(cambioAceiteActions.logIn(values))
                    }} variant="contained">Guardar</Button>

                </div>

            </div>
        </div>
    )
}

export default UsoCambioAceite