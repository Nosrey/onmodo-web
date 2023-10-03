import React from 'react'
import styles from '../forms/Phone/Sanitizacion.module.css'
import imageLimite from "../../assets/img/forms/critico.png";

function SanitizacionInfo() {

    return (
        
        <>
                        <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>PROCEDIMIENTO</p>
                </div>
                <ol>
                    <li>Seleccionar las unidades/hojas que no cuenten con características organolépticas apropiadas..</li>
                    <li>Lavado inicial: sumergir y remover los productos en una bacha con agua potable durante 5 minutos.</li>
                    <li>Sanitización: Colocar los vegetales/frutas previamente lavados en solución clorada (15 ml de lavandina o cloro cada 5 litros de agua) durante 5 minutos. Recambiar la solución clorada en cada operación.</li>
                    <li>Enjuague final: todos los vegetales y frutas deben ser enjuagados.</li>
                    <li>Acondicionamiento post-sanitización:se deben disponer en recipientes limpios (canastos o bolsas cristal), rotulados y protegidos. Los vegetales,una vez sanitizados, deben ser tratados como alimentos listos para consumo, refrigerados a menos de 5ºC.</li>
                </ol>
                <br />
                <div>
                    <div className={styles.subtitleCont}>
                        <p className={styles.subtitle}>LÍMITE CRÍTICO</p>
                    </div>
                    <ul>
                        <li>Concentración deseada entre 100 y 200 ppm" (medir con tiras reactivas).</li>
                        <li>Tiempo de contacto 5 minutos.</li>
                    </ul>
                </div>
                <br />
                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>ACCIONES DE CORRECCIÓN</p>
                </div>

            
                <ul>
                    <li>Si la concentración es mayor, diluir con agua potable hasta llegar a la concentración deseada.</li>
                    <li>Si la concentración es menor, dosificar manualmente en relación al volumen de la bacha.</li>
                </ul>

        </>
    )
 }

 
export default SanitizacionInfo