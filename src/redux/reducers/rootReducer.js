import { combineReducers } from "redux";
import userReducer from "./userReducer";
import recuperacionProductoReducer from "./recuperacionProductoReducer";

const rootReducer = combineReducers({
    recuperacionProductoR:recuperacionProductoReducer,
    userR: userReducer,
    
})

export default rootReducer