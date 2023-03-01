import React from 'react'
import styles from '../forms/Phone/Descongelamiento.module.css'

function DescongelamientoInfo() {

    return (
        
        <>
        <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>LÍMITE CRÍTICO</p>
                </div>
                <b>
                TEMPERATURA INTERNA:     Menor a 5ºC
                </b>

                <p>Cuando la temperatura del núcleo del alimento se encuentre entre 0 y 5ºC, el alimento debe culminar el 
                proceso en cámara de refrigeración o antecámara.</p>

              <b>Contratos certificados con IRAM BPM: <br/>TEMPERATURA INTERNA: menor a 4ºC</b>
                <b>Tiempo máximo proceso:</b>
                <ul>
                    <li>Bloques/Piezas mayores a 3 cm.: <b>72 hs.</b> </li>
                    <li>Bloques /Piezas menores a 3 cm.: <b> 24-
48 hs.</b> </li>

                    <li>Piezas más finas:<b>24 hs.</b> </li>

                </ul>
      <br />
      <br />
        <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>PROCEDIMIENTO</p>
                </div>
                <b>En equipos de frío (ALIMENTOS CRUDOS Y COCIDOS):</b>
            <ol>
                <li> Se retiran del freezer los alimentos a descongelar, eliminando los contenedores de cartón u otros materiales aislantes.</li>
                <li> Se dispone el alimento en un recipiente limpio y sanitizado con una bandeja adecuada. Se rotula con fecha de inicio del proceso.</li>
                <li> Se colocan dichos recipientes en cámaras de refrigeración (5ºC) o ante cámaras (10ºC).</li>
                <li>  Al finalizar el proceso, se rotula el alimento con la fecha del día. Vida útil: 24 hs.</li>
                <li>  Mantener refrigerado hasta el final de su vida útil.</li>

            </ol>
<span>Excepción Pto. 3: Contratos certificados con IRAM BPM la temperatura de las cámaras debe ser menor a 4ºC</span>
<br />
<br />
        <b>Sumergido en agua no contacto directo (ALIMENTOS CRUDOS):</b>
            <ol>
                <li>  Se dispone del producto en un contenedor limpio, sanitizado y adecuado a su tamaño en una pileta 
                    en el sector de producción.</li>
                <li>  El recambio de esta agua se hace cada 30 minutos y el tiempo máximo que se establece para mantener esta 
                operación es de 4 horas.</li>
                <li>  Al finalizar el proceso, se rotula el alimento con la fecha del día. Vida útil: 24 hs.</li>
                <li>  Mantener refrigerado hasta el final de su vida útil.</li>

            </ol>
        <span>Excepción Pto. 2: Contratos certificados con IRAM BPM se deja correr el agua mantenida a 21ºC durante 4 hs máximo.</span>

<br />
<br />
<b>MICROONDAS:</b>
            <ol>
                <li>   Se retira el envoltorio externo del producto.</li>
                <li>   Se dispone de la pieza en un contenedor limpio y sanitizado, apto para microondas.
</li>
                <li>  Se selecciona la función de “descongelar”, y se programa el nivel de potencia y tiempo según lo establecido en el manual del equipo.</li>
                <li>  Todos los alimentos crudos descongelados en microondas se cocinan dentro de las 12 horas de finalizado 
el descongelamiento.</li>

            </ol>
            <br />
            <br />

                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>ACCIONES DE CORRECCIÓN</p>
                </div>
                <b>Cuando la temperatura del núcleo del alimento sea:</b>

                <ul>
                    <li><b> Mayor a 5ºC y hasta 13ºC, procesar rápidamente (Cocción).</b></li>
                    <li><b> Mayor a 13ºC, descartar el producto.</b></li>
                </ul>

                <br />
                <b>Contratos certificados con IRAM BPM:</b>
                <ul>
                    <li><b> Mayor a 4ºC y hasta 7ºC, procesar rápidamente (Cocción).</b></li>
                    <li><b>Mayor a 7ºC, descartar el producto.</b></li>
                </ul>
        </>
    )
 }

 
export default DescongelamientoInfo