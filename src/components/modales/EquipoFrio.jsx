import React from 'react'
import styles from '../forms/Phone/ControlEquiposDeFrio.module.css'

function EquipoFrio() {

    return (
        
        <><div className={styles.subtitleCont}>
            <p className={styles.subtitle}>Límite de control</p>
        </div>
        <b>Temperaturas de cámaras:</b>
        <p>menor a 5ºC.</p>
        <b>Temperatura de ante-cámaras y heladeras  para  descongelamiento  o  de tránsito  (menor  a  4 horas)  o  expositora:</b><p>menor a  10ºC.</p><b>Temperaturas de freezer:</b><p>Menor a -18ºC.</p><b>Contratos    certificados    con    IRAM    BPM: </b><p>Temperatura  de  equipos  de  frío  refrigerados menor a 4ºC.</p><p>Según   los   turnos   de   producciónse   debe controlar   la   temperatura   de   cámaras   y heladeras, distando entre un control y el otro entre 8 y 10 horas(mínimo 2 veces).</p><p>Un alimento correspondiente a cada cámara, seleccionado  al  azar,  debe  ser  registrado. Alimentos críticos: postres, productos cocidos, vegetales desinfectados.</p><br /><br /><div className={styles.subtitleCont}>
                <p className={styles.subtitle}>Acciones de corrección</p>
            </div><b>Equipos refrigerados:</b><ol>
                <li>Sila T° de los equipos supera el límite, controlar la temperatura de alimentos en distintas zonas del equipo. Re chequear la temperatura de los alimentos habiendo mantenido cerrada la puerta de cámara.</li>
                <li>Luego de la hora, si los alimentos se encuentran dentro del límite, ninguna otra acción es requerida, si la lectura del termómetro del equipo es correcta</li>
                <li>Luego  de  la  hora,  si  los  alimentos  se  encuentran  a  más  del  límite,  chequear  alimentos  en  distintas  zonas  del equipo:</li>

                <ul>
                    <li>Si la temperatura de los alimentos supera los 7°Cen cámara o los 10°C en heladera de tránsito (IRAMBPM  mayor a 4ºC): trasladarlos a otro equipo. </li>
                    <li>Si la temperatura de los alimentos supera los 13°C  (IRAM BPM  mayor a 7ºC): deben ser DESECHADOS.</li>
                </ul>
            </ol><br /><b>Equipos congelados:</b><ol>
                <li>Si  el  freezer  se  encuentra  con  temperaturas  superiores  a -12°C,  chequear  la  dureza  al  tacto  y  signos  de descongelamiento.</li>
                <li>Si hay signos de descongelamiento, los alimentos deben descongelarse en cámara y ser tratados como  producto fresco, con una vida útil de 24 hs. una vez descongelado. Deben rotularse: -fecha de inicio del descongelamiento y hora –fecha final de descongelamiento y hora.</li>
                <li>Si los alimentos no pierden dureza al tacto y no presentan signos de descongelamiento,se vuelvena monitorear los mismos alimentos a la hora.</li>
                <li>Si  los  alimentos  NO  reflejan  cambios  en  la  dureza  superficial  y  el  equiposigue  indicando  una  T°  mayor  a -12°C, trasladar los alimentos a otro equipo o utilizar la mercadería como producto fresco. </li>
                <li>Si el equipo ahora indica entre -12°C y -18°C, ninguna otra acción es requerida.</li>
            </ol></>
    )
 }

 
export default EquipoFrio