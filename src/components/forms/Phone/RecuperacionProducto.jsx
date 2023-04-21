import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import styles from './RecuperacionProducto.module.css'
import { useSelector,useDispatch } from 'react-redux'
import recuperacionProductoActions from '../../../redux/actions/recuperacionProductoActions'

function RecuperacionProducto() {
    const dispatch = useDispatch()
    const prueba = useSelector(state=>state.recuperacionProductoR.inputsValues)
    console.log("esto anda?",prueba)
    const [values,setValues] = useState({
        fechaAlerta:"",
        fechaRecuperacion:"",
        responsables:"",
        producto:"",
        marca:"",
        loteVencimiento:"",
        cantidad:"",
        destino:"",
        fechaDisposicion:"",
        idUser:"643ea98d5b44dd9765966ae7"
    })

    return (
        <div>
            <div className="form">
                <div className="titleContainer">
                    <h3 className="title">Recuperación de Producto (Recall)</h3>
                    {/* <h4 className="formNumber">Q/SOP-11-R01</h4> */}
                </div>

                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>Registro para el comedor</p>
                </div>

                <div className={styles.personal}>
                    <TextField onChange={(e)=>{setValues({...values,fechaAlerta:e.target.value})}} id="outlined-basic" label="Fecha de Alerta" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,fechaRecuperacion:e.target.value})}} id="outlined-basic" label="Fecha de Recuperación" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,responsables:e.target.value})}} style={{width:"50%"}} id="outlined-basic" label="Responsables" variant="outlined" />
                </div>
                <div className={styles.personal}>
                    <TextField onChange={(e)=>{setValues({...values,producto:e.target.value})}} id="outlined-basic" label="Producto" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,marca:e.target.value})}} id="outlined-basic" label="Marca" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,loteVencimiento:e.target.value})}} id="outlined-basic" label="Lote/Vencimiento" variant="outlined" />
                </div>
                <div className={styles.personal}>
                    <TextField onChange={(e)=>{setValues({...values,cantidad:e.target.value})}} id="outlined-basic" label="Cantidad de Producto" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,destino:e.target.value})}} id="outlined-basic" label="Destino del Producto" variant="outlined" />
                    <TextField onChange={(e)=>{setValues({...values,fechaDisposicion:e.target.value})}} id="outlined-basic" label="Fecha de disposición final" variant="outlined" />
                </div>

                <div className="btn">
                    <Button onClick={()=>{
                        dispatch(recuperacionProductoActions.logIn(values))}} variant="contained">Generar PDF</Button>

                </div>

            </div>
        </div>
    )
}

export default RecuperacionProducto