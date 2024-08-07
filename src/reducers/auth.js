import { SET_USER } from "../constants";

const uesrState = {
    user: {}
}

const auth = (state = uesrState, action) => {
    switch(action.type) {
        case SET_USER:
            return {
                user: action.user
            }
        default:
            return state;
    }
}

export default auth