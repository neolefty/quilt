import {AppAction} from "./Action"
import {assertNever} from "./Common"
import {AppState, DEFAULT_APP_STATE} from "./State"

export type AppReducerType = (state: AppState, action: AppAction) => AppState
export const AppReducer: AppReducerType = (state: AppState, action: AppAction) => {
    switch (action.type) {
        case "null":
            return state
        case "change color":
            return {
                ...state,
                colors: state.colors.set(action.index, action.color)
            }
        case "add color":
            return {
                ...state,
                colors: state.colors.push(DEFAULT_APP_STATE.colors.get(0, "#000")),
            }
        case "remove color":
            return {
                ...state,
                colors: state.colors.remove(action.index),
            }
        default:
            return assertNever(action)
    }
}