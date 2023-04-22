import { combineReducers } from "redux";
import userReducer from "./userReducer";
import recuperacionProductoReducer from "./recuperacionProductoReducer";
import controlComensalesReducer from "./controlComensalesReducer";

const rootReducer = combineReducers({
    recuperacionProductoR:recuperacionProductoReducer,
    userR: userReducer,
    comensalesR: controlComensalesReducer,   
})

export default rootReducer