import React from 'react'
import styles from './Placeholder.module.css'
import image from "../../assets/svg.jpg";
function Placeholder() {

    return (
      <div className={styles.containerPlaceholder}>
         <img className={styles.svg} src={image} />
         <h5 className={styles.caption}>Elige y completa el formulario que necesites para luego descargarlo</h5>
      </div>
    )
 }

 
export default Placeholder