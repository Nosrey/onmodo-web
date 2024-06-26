import React from 'react'
import styles from '../forms/Phone/Recepcion.module.css'

function RecepcionInfo() {

    return (
        
        <>
        <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>LÍMITES CRÍTICOS PARA EL INGRESO DE MERCADERÍAS</p>
                </div>
                <b>TEMPERATURA DE ALIMENTOS: </b>
                <br />
                <ul>
                    <li>
                        <b>Congelados:</b>
                        <span> Hasta -12ºC.</span>
                    </li>
                    <li>
                        <b>Carnes Frescas:</b>
                        <span>Hasta 5ºC .</span>
                    </li>
                    <li>
                        <b>Pollos:</b>
                        <span>Hasta 2ºC. recepción normal, hasta 7ºC con notificación al proveedor.</span>
                    </li>
                    <li>
                        <b>Lácteos:</b>
                        <span>  Hasta 5ºC recepción normal, hasta 7ºC con notificación al proveedor.</span>
                    </li>
                    <li>
                        <b>Fiambres:</b>
                        <span>Hasta 7ºC o según indicación en el envase.                        </span>
                    </li>
                    <li>
                        <b>Huevos:</b>
                        <span> Cascara: hasta 10°C.
                        </span>
                    </li>
                    <li>
                        <b>Frutas y verduras frescas:</b>
                        <span> Hasta 10°C.
                        </span>
                    </li>
                    <li>
                        <b>Otros alimentos no 
perecederos:</b>
                        <span> Ambiente.
                        </span>
                    </li>
                </ul>

                <br />
                <b>ADHERENCIA A LAS ESPECIFICACIONES POR PRODUCTO: </b>
                <br />
                <ul>
                    <li>
                        <b>Congelados:</b>
                        <span> RNE, RNPA, fecha de vencimiento y fecha de elaboración: N° SENASA si 
es de origen animal. Verificar dureza y ausencia de desecación por 
congelamiento. Envase íntegro. Sin signos de descongelamiento previo.</span>
                    </li>
                    <li>
                        <b>Carnes Frescas:</b>
                        <span>RNE, RNPA, Nº de SENASA, fecha de vencimiento y fecha de elaboración 
Olor característico</span>
                    </li>
                    <li>
                        <b>Pollos:</b>
                        <span> RNE, RNPA, Nº de SENASA, fecha de vencimiento y fecha de faena. 
Canastos plásticos limpios.</span>
                    </li>
                    <li>
                        <b>Lácteos:</b>
                        <span> RNE, RNPA, fecha de vencimiento y fecha de elaboración.
Puede tener Nº de SENASA. Envase íntegro y limpio.</span>
                    </li>
                    <li>
                        <b>Fiambres:</b>
                        <span> RNE, RNPA, fecha de vencimiento y fecha de elaboración.
Puede requerir Nº de SENASA. Envase íntegro y limpio.
                        </span>
                    </li>
                    <li>
                        <b>Huevos:</b>
                        <span>Nº SENASA, fecha de vencimiento.Huevos limpios y sin rajaduras, envases limpios.

                        </span>
                    </li>
                    <li>
                        <b>Frutas y verduras frescas:</b>
                        <span> Características organolépticas acordes al producto.Cajones plásticos limpios.


                        </span>
                    </li>
                    <li>
                        <b>Otros alimentos no 
perecederos:</b>
                        <span> RNE, RNPA, fecha de vencimiento y fecha de elaboración. Pueden 
Requerir Nº SENASA. Envases íntegros y limpios.
                        </span>
                    </li>
                </ul>

                <br />
                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>PROCEDIMIENTO</p>
                </div>
                <b>Los productos que se deben registrar en esta planilla son:</b>
                <p>Lácteos, carnes, vegetales listos para
                consumo, fiambres, embutidos, 
                productos de pastelería de alto riesgo, 
                productos frescos de retail, alimentos 
                congelados, pastas frescas y huevos 
                listos para consumo.</p>
                <b>Lácteos, carnes, vegetales listos para
                consumo, fiambres, embutidos, 
                productos de pastelería de alto riesgo, 
                productos frescos de retail, alimentos 
                congelados, pastas frescas y huevos 
                listos para consumo</b>

<br />
<br />
                <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>ACCIONES DE CORRECCIÓN</p>
                </div>
                <p>Si los alimentos no cumplen con las especificaciones deben ser <b>rechazados</b> en el momento de la recepción.</p>
                <p>Cada rechazo genera un “Reporte de rechazo/devolución de Materias Primas” del cual se generan dos copias firmadas:</p>
                <ul>
                    <li>Constancia para el establecimiento</li>
                    <li>Constancia para el proveedor</li>
                </ul>
                <p>Si en la recepción se han repetido más de 3 veces desvíos correspondientes a un mismo proveedor, debe evaluarse una no conformidad al proveedor / coordinar una reunión / evaluar su reemplazo.</p>

        </>
    )
 }

 
export default RecepcionInfo