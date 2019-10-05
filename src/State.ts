import {List} from "immutable"

export interface AppState {
    colors: List<string>
}

export const DEFAULT_APP_STATE: AppState = {
    colors: List([ "#dfdb3b" ])
}