import React from 'react'
import Nav from 'react-bootstrap/Nav';
import styles from './Menu.module.css'

function Menu() {

    return (
        <Nav defaultActiveKey="/dietas-especiales" className={styles.menu}>
            <Nav.Link href="/dietas-especiales">Control de comensales con dietas especiales</Nav.Link>
            <Nav.Link eventKey="link-1"  href="/ropa-de-trabajo">Entrega de Ropa de Trabajo y E.P.P</Nav.Link>
            <Nav.Link eventKey="link-2" href="/bidones-de-aceite">Circuito de Aceite Usado</Nav.Link>
            <Nav.Link eventKey="link-3" href="/reporte-incidente">Flash Reporte de Incidente</Nav.Link>
            <Nav.Link eventKey="link-4" href="/informe-accidente">Informe Interno de Accidente</Nav.Link>
            <Nav.Link eventKey="link-5" href="/registro-de-capacitacion">Registro de Capacitación</Nav.Link>
            <Nav.Link eventKey="link-6" href="/registro-decomisos-mp">Registros de decomisos de materias primas</Nav.Link>
            <Nav.Link eventKey="link-7" href="/registro-simulacro">Registro de Simulacro</Nav.Link>
            <Nav.Link eventKey="link-9" href="/control-cloro">Control de cloro activo residual</Nav.Link>
            <Nav.Link eventKey="link-10" href="/control-vidrios">Control de Vidrios</Nav.Link>
            <Nav.Link eventKey="link-11" href="/despacho-produccion">Despacho a Producción</Nav.Link>
            <Nav.Link eventKey="link-12" href="/recuperacion-de-producto">Recuperación de Producto</Nav.Link>
            <Nav.Link eventKey="link-13" href="/armado-fraccionamiento">Armado/Fraccionamiento</Nav.Link>
            <Nav.Link eventKey="link-14" href="/equipos-frio">Control de Equipos de Frío</Nav.Link>
            <Nav.Link eventKey="link-15" href="/servicios-en-linea">Servicios en Línea</Nav.Link>
            <Nav.Link eventKey="link-16" href="/distribucion-expedicion">Distribución/Expedición</Nav.Link>
            <Nav.Link eventKey="link-17" href="/verificacion-balanza">Verificación de Balanzas</Nav.Link>
            <Nav.Link eventKey="link-18" href="/verificacion-termometro">Verificación de Termómetros</Nav.Link>
            <Nav.Link eventKey="link-19" href="/recepcion">Recepción</Nav.Link>
            <Nav.Link eventKey="link-20" href="/descongelamiento">Descongelamiento</Nav.Link>
            <Nav.Link eventKey="link-21" href="/rechazo-mp">Reporte de Rechazo/ Devolución de Materias Primas</Nav.Link>
            <Nav.Link eventKey="link-22" href="/control-procesos">Control de Procesos</Nav.Link>
            <Nav.Link eventKey="link-23" href="/carga-recepcion">Carga/Recepción</Nav.Link>
            <Nav.Link eventKey="link-24" href="/sanitizacion">Sanitización</Nav.Link>
            <Nav.Link eventKey="link-25" href="/cambio-aceite">Uso y Cambio de Aceite de Freidora</Nav.Link>
            <Nav.Link eventKey="link-26" href="/uso-epp">Chequeo de uso E.P.P</Nav.Link>



        </Nav>
    )
 }

 
export default Menu