import React from 'react'
import styles from '../forms/Phone/Recepcion.module.css'
import imageTemp from "../../assets/img/forms/temperatura.png";
import imageAd from "../../assets/img/forms/adherencia.png";
import imageProcedim from "../../assets/img/forms/procedim.png";
function RecepcionInfo() {

    return (
        
        <>
        <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>LÍMITES CRÍTICOS PARA EL INGRESO DE MERCADERÍAS</p>
                </div>
                <div className={styles.limites}>
                    <img src={imageTemp} className={styles.limitesImg} />
                    <img src={imageAd}  className={styles.limitesImg} />
                </div>
                <br />
                <div className={styles.limites}>
                    <img src={imageProcedim} className={styles.limitesImg} />
                </div>
        </>
    )
 }

 
export default RecepcionInfo