import { combineReducers } from "redux";
import userReducer from "./userReducer";
import reporteIncidentesReducer from "./reporteIncidentesReducer";
import controlComensalesReducer from "./controlComensalesReducer";
import recuperacionProductoReducer from "./recuperacionProductoReducer";

const rootReducer = combineReducers({
    userR: userReducer,
    reporteIncidentesR:reporteIncidentesReducer,
    recuperacionProductoR:recuperacionProductoReducer,
    comensalesR: controlComensalesReducer,   
})

export default rootReducer