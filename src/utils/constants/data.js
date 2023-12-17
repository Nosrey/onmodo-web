
export const FORMS_WEB = ['controlalergenos','entregabidones','flashincidente', 'informeintaccidente',
'registrocapacitacion', 'registrosimulacro',"registrodecomiso","reporterechazo","verificacionbalanza","verificaciontermometros", "entregaropa"]

export const FORMS_TITLES = {
  controlalergenos: "Control de comensales con dietas Especiales",
  entregabidones: "Entrega de bidones de aceite usado",
  flashincidente: "Flash reporte de incidentes",
  informeintaccidente: "Informe interno de accidente",
  registrocapacitacion: "Registro de Capacitación",
  registrosimulacro: "Registro de Simulacro",
  registrodecomiso: "Decomiso de materias primas",
  reporterechazo: "Rechazo - Devolución de mat primas",
  verificacionbalanza: "Verificación Balanzas",
  verificaciontermometros: "Verificación Termómetros",
  entregaropa: "Entrega de ropa de trabajo y EPP",
}

export const FORMS_URLS_ENDPOINTS = ['dietasespeciales','entregabidones','flashincidente', 'informeintaccidente',
'registrocapacitacion', 'registrosimulacro',"registrodecomiso","reporterechazo","verificacionbalanza","verificaciontermometros", "entregaropa"]

const urlMapping = {
    controlalergenos: "controlalergenos",
    entregaBidones: "entregabidones",
    flashIncidente: "flashincidente",
    informeIntAccidente: "informeintaccidente",
    registroCapacitacion: "registrocapacitacion",
    registroDecomiso: "registrodecomiso",
    registrosimulacro: "registrosimulacro",
    reporteRechazo: "reporterechazo",
    verificacionBalanza: "verificacionbalanza",
    verificacionTermometros: "verificaciontermometros",
    entregaropa: "entregaropa",

    carga: "carga",
    chequeoEpp: "chequeoepp",
    controlCloro:"controlcloro",
    controlEquipoFrio: "controlequipofrio",
    controlProcesos: 'controlproceso',
    controlVidrio: "controlvidrio",
    descongelamiento: "descongelamiento",
    despachoProduccion: "despachoproduccion",
    distribucion: "distribucion",
    entregaRopa: "entregaropa",
    planillaArmado: "planillaarmado",
    recepcion:"recepcion",
    recuperacionProducto: "recuperacionproducto",
    saludManipuladores: "saludmanipuladores",
    sanitizacion: "sanitizacion",
    servicioEnLinea: "servicioenlinea",
    usoCambioAceite: "usocambioaceite",
    
  };
export const getUrlForm = (key) => {
    return urlMapping[key];
}