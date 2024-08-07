import { combineReducers } from "redux";
import flash from "./flash";
import auth from "./auth"

const rootReducer = combineReducers({
    flash,
    auth
})

export default rootReducer