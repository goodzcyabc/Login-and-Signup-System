import axios from "../utils/request"

const base = {
    baseUrl: "http://localhost:3300",
    register: "/api/register",
    repeatusername: "/api/repeat/username",
    login: "/api/login",
    list: "/api/list"
}

const api = {
    /**
     * 
     * params = {
     *  username: ...
     *  password:
     *  ....
     * }
     */
    register(params) {
        return axios.post(base.baseUrl + base.register, params)
    },
    repeatUsername(params) {
        return axios.get(base.baseUrl + base.repeatusername, {
            params
        })
    },
    login(params) {
        return axios.post(base.baseUrl + base.login, params)
    },
    list() {
        return axios.get(base.baseUrl + base.list)
    }
}


export default api