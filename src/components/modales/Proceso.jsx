import React from 'react'
import styles from '../forms/Phone/ControlProcesos.module.css'
import imageCoccion from "../../assets/img/forms/coccion.png";
function ProcesosInfo() {

    return (
        
        <>
            <div className={styles.subtitleCont}>
                <p className={styles.subtitle}>TEMPERATURAS CRÍTICAS Y ACCIONES CORRECTIVAS PARA LA COCCIÓN</p>
            </div>
            <div>
            <b>LÍMITE CRÍTICO</b>
                <ul>
                 <li>Carne vacuna, cerdo, cordero: Mayor o igual 65°C .</li>
                 <li>Pollo y otras aves de corral: Mayor o igual a 74°C .</li>
                 <li>Pescado: Mayor o igual a 63°C .</li>
                 <li>Pescado: Mayor o igual a 63°C .</li>
                 <li>Pastas rellenas: Mayor o igual a 74°C.</li>
                 <li>Huevos y alimentos preparados: Mayor o igual a 74°C.</li>
                 
                 </ul>
                 <br />
                 <b>ACCIONES DE CORRECCIÓN </b>
                <ol>
                    <li>Continuar la cocción.</li>
                    <li>Si no se alcanza la temperatura descartar el alimento.</li>
                </ol>
                
            </div>
            <br />
            <br />
            <br />

            <div className={styles.subtitleCont}>
                <p className={styles.subtitle}>TEMPERATURAS CRÍTICAS Y ACCIONES CORRECTIVAS PARA EL ENFRIAMIENTO</p>
            </div>
            <b>LÍMITE CRÍTICO</b>
            <p> Temperatura interna: </p>
            <ul>
                <li>
                En las primeras 2 horas: menor a 21ºC.
                </li>
                <li>Luego, en las siguientes 4 horas:  menor a 6ºC.</li>
            </ul>
            
            <b>ACCIONES DE CORRECCIÓN </b>
            <ul>
                <li> Si el alimento no llega a 21ºC pasadas las 2 hs., refrigerar.</li>
                <li>Si no se cumple, regenerar a más de 74ºC y volver a realizar el enfriado.</li>
                <ul>
                    <li> Si se cumplen las temperaturas, ninguna otra acción es requerida.</li>
                    <li> Si no se cumplen, descartar el alimento.</li>
                </ul>
                <li>Si pasadas las 6 hs. no se llega a 6ºC, desechar.</li>
                
            </ul>
                <br />
                <br />
                <br />
                <div className={styles.subtitleCont}>
                <p className={styles.subtitle}>TEMPERATURAS CRÍTICAS Y ACCIONES CORRECTIVAS PARA LA REGENERACIÓN Y MANT. EN CALIENTE</p>
            </div>
            <b>LÍMITE CRÍTICO</b>
            <p>Regeneración: Temperatura interna superior a 74ºC.</p>
            <p>Mantenimiento en caliente:Temperatura interna superior a 65ºC.</p>
            
            <b>ACCIONES DE CORRECCIÓN </b>
            <p>Regeneración:</p>
            <ul>
                <li>Si el alimento no se ha retermatilizado correctamente prolongar el tiempo de calentamiento hasta llegar a 74ºC.</li>
                <li>Si no se logra, descartar.</li>
            </ul>
            <p>Mantenimiento en caliente:</p>
            <ul>
                <li>Mantener por encima de 60 ºC.</li>
                <li> Si no se logra, descartar.</li>
            </ul>
        </>
    )
 }

 
export default ProcesosInfo