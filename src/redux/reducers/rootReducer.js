import { combineReducers } from "redux";
import userReducer from "./userReducer";
import controlComensalesReducer from "./controlComensalesReducer";

const rootReducer = combineReducers({
    comensalesR: controlComensalesReducer,
    
})

export default rootReducer