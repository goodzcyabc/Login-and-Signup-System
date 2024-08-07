import findIndex from "lodash/findIndex"
import { ADD_FLASH, DEL_FLASH } from "../constants"

const flashState = []

const flash = (state = flashState, action) => {
    switch(action.type) {
        case ADD_FLASH:
            return [
                ...state,
                action.message
            ]
        case DEL_FLASH:
        let currentIndex = findIndex(state, (item) => item.id === action.id)

            return [
                ...state.slice(0, currentIndex),
                ...state.slice(currentIndex + 1)
            ]
        default:
            return state
    }
}

export default flash