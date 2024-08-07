import { ADD_FLASH, DEL_FLASH } from "../constants"

export function addFlashMessage(message) {
    return {
        type: ADD_FLASH,
        message
    }
}

export function delFlashMessage(id) {
    return {
        type: DEL_FLASH,
        id
    }
}