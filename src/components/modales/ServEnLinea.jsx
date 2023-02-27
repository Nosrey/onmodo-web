import React from 'react'
import styles from '../forms/Phone/ServiciosEnLinea.module.css'

function ServEnLinea() {

    return (
        
        <>
         <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>SERVICIO LÍNEA CALIENTE</p>
                </div>
                <p>Las preparaciones calientes deben mantenerse a temperaturas mayores a 65ºC, por un tiempo máximo de 2 horas.</p>
                <p>Los productos sobrantes deberán ser eliminados si fueron presentados en la línea.</p>
                
                <br />
                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>SERVICIO LÍNEA FRIA</p>
                </div>
                <p>Las preparaciones servidas en frio, entradas, postres y ensaladas deben mantenerse a temperaturas inferiores a 10ºCpor un máximo de 2 horas.</p>
                <p>Los productos sobrantes deberán ser eliminados si fueron presentados en la línea.</p>

                <p>Contratos certificados con IRAM BPM: mantener a menos de 4ºC.</p>
        </>
    )
 }

 
export default ServEnLinea