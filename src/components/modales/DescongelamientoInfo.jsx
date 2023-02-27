import React from 'react'
import styles from '../forms/Phone/Descongelamiento.module.css'
import imageCrudos from "../../assets/img/forms/crudos.png";
import imageCrudosCocidos from "../../assets/img/forms/crudoscocidos.png";
import imageMicroondas from "../../assets/img/forms/micro.png";
import imageLimite from "../../assets/img/forms/interna.png";
import imageAcciones from "../../assets/img/forms/correccion.png";
function DescongelamientoInfo() {

    return (
        
        <>
        <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>PROCEDIMIENTO</p>
                </div>
                <div className={styles.limites}>
                    <img src={imageCrudosCocidos} className={styles.limitesImg} />
                    <img src={imageCrudos}  className={styles.limitesImg} />
                </div>
                <br />
                <div className={styles.limites}>
                    <img src={imageMicroondas} className={styles.limitesImg} />
                </div>
                <br />
                <br />
                <div className={styles.limites}>
                    <img src={imageLimite} className={styles.limitesImg} />
                    <img src={imageAcciones}  className={styles.limitesImg} />
                </div>
        </>
    )
 }

 
export default DescongelamientoInfo