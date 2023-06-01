import { combineReducers } from "redux";
import userReducer from "./userReducer";
import reporteIncidentesReducer from "./reporteIncidentesReducer";
import controlComensalesReducer from "./controlComensalesReducer";
import recuperacionProductoReducer from "./recuperacionProductoReducer";
import registroDecomisosReducer from "./registroDecomisosReducer";
import controlCloroReducer from "./controlCloroReducers";
import controlVidriosReducer from "./controlVidriosReducers";
import despachoProduccionReducer from "./despachoProduccionReducers";
import armadoFraccionamientoReducer from "./armadoFraccionamientoReducers";
import serviciosLineaReducer from "./serviciosLineaReducers";
import distribucionExpedicionReducer from "./distribucionExpedicionReducers";
import verificacionBalanzaReducer from "./verificacionBalanzaReducers";
import recepcionReducer from "./recepcionReducers";
import descongelamientoReducer from "./descongelamientoReducers";
import controlProcesosReducer from "./controlProcesosReducer";
import cargaRecepcionReducer from "./cargaRecepcionReducers";
import sanitizacionReducer from "./sanitizacionReducers";
import constanciaEntregaReducer from "./constanciaEntregaReducers";
import reporteRechazoReducer from "./reporteRechazoReducers";
import registroCapacitacionReducer from "./registroCapacitacionReducers";
import equiposFrioReducer from "./equiposFrioReducers";
import informeAccidenteReducer from "./informeAccidenteReducers";
import cambioAceiteReducer from "./cambioAceiteReducers";
import eppReducer from "./eppReducers";
import verificacionTermometrosReducer from "./verificacionTermometrosReducers";

const rootReducer = combineReducers({
    userR: userReducer,
    reporteIncidentesR:reporteIncidentesReducer,
    recuperacionProductoR:recuperacionProductoReducer,
    comensalesR: controlComensalesReducer,   
    registroDecomisosR:registroDecomisosReducer,
    controlCloroR:controlCloroReducer,
    controlVidriosR:controlVidriosReducer,
    despachoProduccionR:despachoProduccionReducer,
    armadoFraccionamientoR:armadoFraccionamientoReducer,
    serviciosLineaR:serviciosLineaReducer,
    distribucionExpedicionR:distribucionExpedicionReducer,
    verificacionBalanzaR:verificacionBalanzaReducer,
    recepcionR:recepcionReducer,
    descongelamientoR:descongelamientoReducer,
    controlProcesosR:controlProcesosReducer,
    cargaRecepcionR:cargaRecepcionReducer,
    sanitizacionR:sanitizacionReducer,
    constanciaEntregaR:constanciaEntregaReducer,
    reporteRechazoR:reporteRechazoReducer,
    registroCapacitacionR:registroCapacitacionReducer,
    equiposFrioR:equiposFrioReducer,
    informeAccidenteR:informeAccidenteReducer,
    cambioAceiteR:cambioAceiteReducer,
    eppR:eppReducer,
    verificacionTermometrosR:verificacionTermometrosReducer
})

export default rootReducer