import React from 'react'
import styles from '../forms/PC/ReporteDeRechazoDevolucionMaterias.module.css'

function RechazoInfo() {

    return (
        
        <>
        <p className={styles.subtitle}>Procedimiento</p>
        <div>
          <div className={styles.subtitleCont}>
            <p className={styles.subtitle}>Rechazo de mercadería</p>
          </div>
          <p>Debe ser rechazado todo lote que:</p>
          <ul>
            <li>
              Exceda durante la recepción las temperaturas máximas definidas por
              tipo de producto.
            </li>
            <li>
              No informe claramente: Fecha de vencimiento, Habilitación
              (RNE/RNPA) y nombre de elaborador y producto.
            </li>
            <li>
              Evidencie características organolépticas no conformes vinculadas
              con la inocuidad del alimento.
            </li>
          </ul>
        </div>
        <div>
          <div className={styles.subtitleCont}>
            <p className={styles.subtitle}>Devolución de mercadería</p>
          </div>
          <p>
            Cuando en la línea de producción se detecta un producto/lote no
            conforme, es retirado e identificado como “Producto no conforme” y
            almacenados en un área exclusiva para “Productos para devolución” al
            proveedor.
          </p>
        </div>
        <div className={styles.subtitleCont}>
          <p>
            Por cada rechazo/devolución se debe registrar un “Reporte de
            rechazo” del cual se generan dos copias, firmadas por ambos
            responsables:
          </p>
          <ul>
            <li>Una constancia para el comedor.</li>
            <li>Otra para el proveedor.</li>
          </ul>
        </div>
        </>
    )
 }

 
export default RechazoInfo