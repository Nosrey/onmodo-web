import React from 'react'
import styles from '../forms/VerificacionBalanza.module.css'

function Balanzas() {

    return (
        
        <>
        <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>PROCEDIMIENTO</p>
                </div>
                <p>Se tara la balanza y se coloca una masa patrón de 1 kg.(puede utilizarse algún producto envasado-lentejas,   azúcar)   en   cada   uno   de   los   puntos establecidos.</p>
                <p>Para  comedores  certificados,  usar  las  masas  de referencias.</p>
                <br />
                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>DESVÍO PERMITIDO</p>
                </div>
                <p>Balanza de producción:±10 gramos.</p>
                <p>Báscula de recepción:±200 gramos.</p>
                <br />

                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>ACCIONES DE CORRECCIÓN</p>
                </div>
                <p>Si  alguno  de  los  puntos  supera  el  desvío,  la balanza se debe enviar a calibrar.</p>
                <br />

                <b>FRECUENCIA: ANUAL</b>
        </>
    )
 }

 
export default Balanzas