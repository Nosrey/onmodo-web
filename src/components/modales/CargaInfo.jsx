import React from 'react'
import styles from '../forms/Phone/CargaRecepcion.module.css'
import imageCoccion from "../../assets/img/forms/limites1.png";
import imageEnfriamiento from "../../assets/img/forms/limites2.png";
import imageRegeneracion from "../../assets/img/forms/acciones.png";

function CargaInfo() {

    return (
        
        <>
                 <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>LÍMITES CRÍTICOS PARA EL INGRESO DE MERCADERÍAS</p>
                </div>
                <div className={styles.limites}>
                    <img src={imageCoccion} className={styles.limitesImg} />
                    <img src={imageEnfriamiento}  className={styles.limitesImg} />
                </div>
                <br />
                <div className={styles.limites}>
                    <img src={imageRegeneracion} className={styles.limitesImg} />
                </div>
        </>
    )
 }

 
export default CargaInfo