import {List} from "immutable"
import {AppAction} from "./Action"
import {assertNever, Dedup} from "./Common"
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
        case "toggle picker":
            return {
                ...state,
                pickers: state.pickers.set(action.name, !state.pickers.get(action.name, false)),
            }
        case "change quilt size":
            return {
                ...state,
                quiltSize: action.value,
            }
        case "show border":
            return {
                ...state,
                showBorder: action.value,
            }
        case "double colors":
            return {
                ...state,
                colors: List<string>().withMutations(result =>
                    state.colors.forEach((color, index) => {
                        result.push(color)
                        if (action.value === index || action.value === undefined)
                            result.push(color)
                    })
                )
            }
        case "move color":
            let dest = action.origin + action.delta
            if (dest < 0) dest = state.colors.size - 1 // wrap to end
            if (dest >= state.colors.size) dest = 0 // wrap to start
            return {
                ...state,
                colors: state.colors.remove(action.origin).insert(dest, state.colors.get(action.origin, "#000"))
            }
        case "border color":
            return {
                ...state,
                borderColor: action.value
            }
        case "reset":
            return DEFAULT_APP_STATE
        case "reset colors":
            return {
                ...state,
                colors: DEFAULT_APP_STATE.colors,
            }
        case "dedup colors":
            return {
            ...state,
            colors: Dedup(state.colors),
        }
        case "just the quilt":
            return {
                ...state,
                justTheQuilt: action.value
            }
        default:
            return assertNever(action)
    }
}
