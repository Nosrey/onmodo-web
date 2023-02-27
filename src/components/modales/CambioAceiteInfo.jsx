import React from 'react'
import styles from '../forms/Phone/UsoCambioAceite.module.css'

function CambioAceiteInfo() {

    return (
        
        <>
          <div className={styles.responsableCont}>
                    <div className={styles.subtitleCont}>
                        <p className={styles.subtitle}>Instrucciones</p>
                    </div>
                    <p>Tildar las actividades realizadas diariamente.Los Responsables deben aclarar su Apellido y Nombre con sus iniciales.</p>
                </div>
                
                <div className={styles.responsableCont}>
                    <div className={styles.subtitleCont}>
                        <p className={styles.subtitle}>Precauciones</p>
                    </div>
                    <ul>
                    <li>No sobrecalentar las grasas y aceites por encima de los 180 °C.</li>
                    <li>Filtrar las grasas y aceites luego de su uso.</li>
                    <li>Verificar la calidad de las grasas y aceites en forma regular.</li>
                    <li>Desechar las grasas y aceites con cambios evidentes de color, olor y sabor.</li>
                    <li>No utilizar el aceite más de 5 veces (el Registro permite llevar cuenta del uso de la freidora).</li>
                    </ul>                    
                </div>
        </>
    )
 }

 
export default CambioAceiteInfo