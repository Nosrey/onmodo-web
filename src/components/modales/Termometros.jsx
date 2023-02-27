import React from 'react'
import styles from '../forms/VerificacionTermometros.module.css'
import imageCoccion from "../../assets/img/forms/temometros.png";

function Termometros() {

    return (
        
        <>
        <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>PROCEDIMIENTO</p>
                </div>

                <br />

                <div className={styles.limites}>
                    <img src={imageCoccion} className={styles.limitesImg} />
                </div>
                <span><b>*</b> PIN(Termómetro de pinche) - IR (Termómetro infrarrojo)</span>

        </>
    )
 }

 
export default Termometros