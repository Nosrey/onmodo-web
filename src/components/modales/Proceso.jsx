import React from 'react'
import styles from '../forms/Phone/ControlProcesos.module.css'
import imageCoccion from "../../assets/img/forms/coccion.png";
import imageEnfriamiento from "../../assets/img/forms/enfriamiento.png";
import imageRegeneracion from "../../assets/img/forms/regeneracion.png";
function ProcesosInfo() {

    return (
        
        <>
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

 
export default ProcesosInfo