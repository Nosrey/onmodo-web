import React from 'react'
import styles from '../forms/Phone/Descongelamiento.module.css'

function DescongelamientoInfo() {

    return (
        
        <>
        <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>PROCEDIMIENTO</p>
                </div>
                <b>En equipos de frío:</b>
            <ol>
                <li> Se retiran del freezer los alimentos a descongelar, eliminando los contenedores de cartón u otros materiales aislantes.</li>
                <li> Se dispone el alimento en un recipiente limpio y sanitizado con una bandeja adecuada. Se rotula con fecha de inicio del proceso.</li>
                <li> Se colocan dichos recipientes en cámaras, antecámaras o heladeras a temperaturas entre 5ºC y 12ºC.</li>
                <li>  Al finalizar el proceso, se rotula el alimento con la fecha del día.</li>
                <li>  Mantener refrigerado hasta el final de su vida útil.</li>

            </ol>
<br />
<br />
        <b>Sumergido en agua no contacto directo :</b>
            <ol>
                <li>  Se dispone del producto en un contenedor o bacha previamente sanitizada y cubrir con agua caliente (si es posible utilizar agua hirviendo).</li>
                <li>  El recambio de esta agua se hace cada 30 minutos y el tiempo máximo que se establece para mantener esta 
                operación es de 4 horas.</li>
                <li>  Al finalizar el proceso, se rotula el alimento con la fecha del día. Vida útil: 24 hs.</li>
                <li>  Mantener refrigerado hasta el final de su vida útil.</li>

            </ol>

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
                <p>Si la temperatura interna del alimento es hasta 13ºC, cocinar. Si es mayor a 13ºC, descartar.</p>
        </>
    )
 }

 
export default DescongelamientoInfo