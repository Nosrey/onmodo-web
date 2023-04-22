import { combineReducers } from "redux";
import userReducer from "./userReducer";
import reporteIncidentesReducer from "./reporteIncidentesReducer";
import controlComensalesReducer from "./controlComensalesReducer";

const rootReducer = combineReducers({
    userR: userReducer,
    reporteIncidentesR:reporteIncidentesReducer,
    comensalesR: controlComensalesReducer,   
})

export default rootReducer