import React from 'react'
import styles from '../forms/Phone/DistribucionExpedicion.module.css'

function DisrtibucionExp() {

    return (
        
        <>
        <p>Llegado al punto de distribución los alimentos deben consumirse <b>dentro de las 2 horas de entrega</b> o mantenerse en refrigeración hasta el momento de su regeneración.</p>
                <br />
                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>ALIMENTOS CALIENTES</p>
                </div>
                <p>Las preparaciones calientes deben mantenerse a temperaturas mayores a 65ºC durante el transporte y la recepción.</p>
                
                <br />
                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>ALIMENTOS FRÍOS</p>
                </div>
                <p>Las preparaciones servidas en frio, entradas, postres y ensaladas deben mantenerse a temperaturas inferiores  a 10ºC</p>

        </>
    )
 }

 
export default DisrtibucionExp