import axios from "axios"
import qs from "querystring"
import store from "../store"


/**
 * Methods to process failures
 */
const errorHandle = (status, info) => {
    switch (status) {
        case 400:
            console.log("Semantic error, the current request cannot be understood by the server, and the client should not respond unless modified")
            break;
        case 401:
            console.log("Server authentication failed")
            break;
        case 403:
            console.log("The server understands the request, but refuses to execute it");
            break;
        case 404:
            console.log("Please check the network request address")
            break;
        case 500:
            console.log("The server encountered an unexpected situation that prevented it from completing the processing of the request")
            break;
        case 502:
            console.log("The server is unresponsive")
            break;
        default:
            console.log(info)
            break;
    }
}



/**
 * erect Axios instance object
 */

const instance = axios.create({
    timeout: 5000
})

/**
 * Intercept requests
 */

instance.interceptors.request.use(
    config => {
        if (config.method === "post") {
            config.data = qs.stringify(config.data)
        }
    
        if (store.getState().auth.user.token) {
            config.headers.Authorization = store.getState().auth.user.token
        }
        return config
    },
    error => Promise.reject(error)
)

/**
 * response to interceptors
 */
instance.interceptors.response.use(
    response => response.status === 200 ? Promise.resolve(response) : Promise.reject(response),
    error => {
        const { response } = error;
        errorHandle(response.status, response.info);
    }
)


export default instance