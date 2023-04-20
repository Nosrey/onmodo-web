import { combineReducers } from "redux";
import userReducer from "./userReducer";
import reporteIncidentesReducer from "./reporteIncidentesReducer";

const rootReducer = combineReducers({
    userR: userReducer,
    reporteIncidentesR:reporteIncidentesReducer,
    
})

export default rootReducer