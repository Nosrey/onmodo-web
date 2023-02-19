import React from 'react'
import Nav from 'react-bootstrap/Nav';
import styles from './Menu.module.css'

function Menu() {

    return (
        <Nav defaultActiveKey="/control-alergenos" className={styles.menu}>
            <Nav.Link href="/control-alergenos">Control de Alérgenos</Nav.Link>
            <Nav.Link eventKey="link-1"  href="/ropa-de-trabajo">Entrega de Ropa de Trabajo y E.P.P</Nav.Link>
            <Nav.Link eventKey="link-2" href="/bidones-de-aceite">Entrega de Bidones de Aceite Usado</Nav.Link>
            <Nav.Link eventKey="link-3" href="/reporte-incidente">Flash Reporte de Incidente</Nav.Link>
            <Nav.Link eventKey="link-4" href="/informe-accidente">Informe Interno de Accidente</Nav.Link>
            <Nav.Link eventKey="link-5" href="/registro-de-capacitacion">Registro de Capacitación</Nav.Link>
            <Nav.Link eventKey="link-6" href="/registro-decomisos-mp">Registros de decomisos de materias primas</Nav.Link>
            <Nav.Link eventKey="link-7" href="/registro-simulacro">Registro de Simulacro</Nav.Link>
            <Nav.Link eventKey="link-8" href="/salud-manipuladores">Salud para Manipuladores</Nav.Link>
            <Nav.Link eventKey="link-9" href="/control-cloro">Control de cloro activo residual</Nav.Link>
            <Nav.Link eventKey="link-10" href="/control-vidrios">Control de Vidrios</Nav.Link>
            <Nav.Link eventKey="link-11" href="/despacho-produccion">Despacho a Producción</Nav.Link>
            <Nav.Link eventKey="link-12" href="/recuperacion-de-producto">Recuperación de Producto</Nav.Link>
            <Nav.Link eventKey="link-13" href="/armado-fraccionamiento">Armado/Fraccionamiento</Nav.Link>
            <Nav.Link eventKey="link-14" href="/equipos-frio">Control de Equipos de Frío</Nav.Link>
            <Nav.Link eventKey="link-15" href="/servicios-en-linea">Servicios en Línea</Nav.Link>
            <Nav.Link eventKey="link-16" href="/distribucion-expedicion">Distribución/Expedición</Nav.Link>
            <Nav.Link eventKey="link-17" href="/verificacion-balanza">Verificación de Instrumentos de Medición Balanzas</Nav.Link>
            <Nav.Link eventKey="link-18" href="/recepcion">Recepción</Nav.Link>
            <Nav.Link eventKey="link-19" href="/descongelamiento">Descongelamiento</Nav.Link>



        </Nav>
    )
 }

 
export default Menu