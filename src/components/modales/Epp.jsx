import React from 'react'
import styles from '../forms/Phone/EPP.module.css'

function EppInfo() {

    return (
        
        <>
        
        <div className={styles.responsableCont}>
                    <div className={styles.subtitleCont}>
                        <p className={styles.subtitle}>Instrucciones</p>
                    </div>
                    <p>Tildar el uso de EPP de cada empleado según los que corresponden con su puesto de trabajo.</p>
                    <p>El incumplimiento en el uso de EPP genera la observación proactiva al empleado y su posterior registro STOP.</p>

                </div>
        </>
    )
 }

 
export default EppInfo