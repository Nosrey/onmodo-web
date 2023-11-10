export const FORMS_DE_VARIAS_ETAPAS = ['controlalergenos','entregabidones','flashincidente', 'informeintaccidente',
'registrocapacitacion', 'registrosimulacro']

export const FORMS_WEB = ['controlalergenos','entregabidones','flashincidente', 'informeintaccidente',
'registrocapacitacion', 'registrosimulacro',"registrodecomiso","reporterechazo","verificacionbalanza","verificaciontermometros", "entregaropa"]


export const FORMS_URLS_ENDPOINTS = ['controlalergenos','entregabidones','flashincidente', 'informeintaccidente',
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
    console.log(key)
    console.log(urlMapping[key])
    return urlMapping[key];
}