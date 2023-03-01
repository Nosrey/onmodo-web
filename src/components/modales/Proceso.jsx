import React from 'react'
import styles from '../forms/Phone/ControlProcesos.module.css'
import imageCoccion from "../../assets/img/forms/coccion.png";
function ProcesosInfo() {

    return (
        
        <>
            <div className={styles.subtitleCont}>
                <p className={styles.subtitle}> COCCIÓN</p>
            </div>
            <div className={styles.limites}>
                <img src={imageCoccion} className={styles.limitesImg} />
            </div>
            <br />
            <br />
            <br />

            <div className={styles.subtitleCont}>
                <p className={styles.subtitle}>ENFRIAMIENTO</p>
            </div>
            <b>LÍMITE CRÍTICO</b>
            <p>TEMP. INTERNA: de 60º a 21º en 2 hs.,y luego a 4ºC en 4 hs. siguientes.</p>
            <p>Contratos certificados con IRAM BPM: de 60º a 10º en 2 hs.,y luego debe almacenarse a 4ºC</p>
            
            <b>ACCIONES DE CORRECCIÓN </b>
            <ul>
                <li> Si el alimento no llega a 21ºC pasadas las 2 hs., refrigerar.</li>
                <li>Si no se cumple, regenerar a más de 74ºC y volver a realizar el enfriado.</li>
                <ul>
                    <li> Si se cumplen las temperaturas, ninguna otra acción es requerida.</li>
                    <li> Si no se cumplen, descartar el alimento.</li>
                </ul>
                <li>Si pasadas las 6 hs. no se llega a 4ºC, desechar.</li>
                <p>Contratos certificados con IRAM BPM:</p>
                <li>Si el alimento no llega a 10ºC pasadas las 2 hs., refrigerar.</li>
                <li> Si no se cumple, regenerar a más de 75ºC y volver a realizar el enfriado.</li>
                <ul>
                    <li>Si se cumplen las temperaturas, ninguna otra acción es requerida.</li>
                    <li> Si no se cumplen, descartar el alimento.</li>
                    <li> Si pasadas las 6 hs. no se llega a 4ºC, desechar.</li>
                </ul>
            </ul>
                <br />
                <br />
                <br />
                <div className={styles.subtitleCont}>
                <p className={styles.subtitle}> REGENERACIÓN Y MANT. EN CALIENTE</p>
            </div>
            <b>LÍMITE CRÍTICO</b>
            <p>Regeneración: TEMP. INTERNA: Superior a 74ºC.</p>
            <p>Contratos certificados con IRAM BPM: Superior a 75°C en una hora</p>
            <p>Mantenimiento en caliente:TEMP. INTERNA:Superior a 65ºC.</p>
            
            <b>ACCIONES DE CORRECCIÓN </b>
            <p>Regeneración:Si el alimento no se ha retermatilizado correctamente:</p>
            <ul>
                <li>Prolongar el tiempo de calentamiento hasta llegar a las temperaturas correctas (74ºC).</li>
                <li> Si no se logra, descartar.</li>
            </ul>
            <p>Mantenimiento en caliente:</p>
            <ul>
                <li>Regenerar a 74ºC.</li>
                <li> Si no se logra, descartar.</li>
            </ul>
        </>
    )
 }

 
export default ProcesosInfo