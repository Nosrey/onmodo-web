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
                    <li>Seleccionar las unidades/hojas que no cuenten con características organolépticas acordes alproducto.</li>
                    <li>Lavado inicial: sumergir y remover los productos en una bacha con agua potable durante 5 minutos (Paso esencial para disminuir carga orgánica).</li>
                    <li>Sanitización: Colocar los vegetales/frutas previamente lavados en solución clorada durante 10 minutosde exposiciónpara vegetales.Recambiar la solución clorada en cada operación.</li>
                    <li>Enjuague final: todos los vegetales y frutas deben ser enjuagados durante 5 minutos.</li>
                    <li>Acondicionamiento post-sanitización:se deben disponer en recipientes limpios (canastos o bolsas cristal), rotulados y protegidos. Los vegetales,una vez sanitizados, deben ser tratados como alimentos listos para consumo, refrigerados <b> a menos de 5ºC</b>(4ºC para contratos certificados con IRAM BPM)y con vida útil <b>máxima de 24 horas</b>. </li>
                    <li>Deben registrarse en esta planilla2 vegetales por turno:el primer producto que se sanitiza, previo a su control con tiras reactivas de cloroy otro al azar seleccionado en el turno.</li>
                </ol>
                <br />
                <div className={styles.limites}>
                    <img src={imageLimite} className={styles.limitesImg} />
                </div>
                <br />
                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>ACCIONES DE CORRECCIÓN</p>
                </div>

                <p>Verificar   el   correcto   funcionamiento   de   equipos   dosificadores   con   el proveedor.</p>
                <p>Si la concentración es mayor, diluir con agua potable hasta llegar a la concentración deseada.</p>
                <p>Si la concentración es menor, dosificar manualmente con un medidor establecido en relación al volumen de la bacha.</p>
                <ul>
                    <li>Para XY12, 1ml/ lt de agua.</li>
                </ul>

        </>
    )
 }

 
export default SanitizacionInfo