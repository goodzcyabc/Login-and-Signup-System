import api from "../api"
import { SET_USER, REACT_REDUX_LOCAL } from "../constants"

function setUserObj(user) {
    return {
        type: SET_USER,
        user
    }
}

export function logOut() {
    return dispatch => {
        dispatch(setUserObj({}))
    }
}

export function asyncSetUserObj(data) {
    return dispatch => {
        return api.login(data).then((res) => {
            if (res.data.status === 200) {
                dispatch(setUserObj({
                    token: res.data.token,
                    nick: res.data.nick
                }))
                localStorage.setItem(REACT_REDUX_LOCAL, JSON.stringify({
                    token: res.data.token,
                    nick: res.data.nick
                }))
            }
            return res
        })
    }
}