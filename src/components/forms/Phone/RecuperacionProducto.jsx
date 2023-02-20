import { Button, TextField } from '@mui/material'
import React from 'react'
import styles from './RecuperacionProducto.module.css'

function RecuperacionProducto() {
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
                    <TextField id="outlined-basic" label="Fecha de Alerta" variant="outlined" />
                    <TextField id="outlined-basic" label="Fecha de Recuperación" variant="outlined" />
                    <TextField style={{width:"50%"}} id="outlined-basic" label="Responsables" variant="outlined" />
                </div>
                <div className={styles.personal}>
                    <TextField id="outlined-basic" label="Producto" variant="outlined" />
                    <TextField id="outlined-basic" label="Marca" variant="outlined" />
                    <TextField id="outlined-basic" label="Lote/Vencimiento" variant="outlined" />
                </div>
                <div className={styles.personal}>
                    <TextField id="outlined-basic" label="Cantidad de Producto" variant="outlined" />
                    <TextField id="outlined-basic" label="Destino del Producto" variant="outlined" />
                    <TextField id="outlined-basic" label="Fecha de disposición final" variant="outlined" />
                </div>

                <div className="btn">
                    <Button variant="contained">Generar PDF</Button>

                </div>

            </div>
        </div>
    )
}

export default RecuperacionProducto