import {List, Map} from "immutable"

export interface AppState {
    pickers: Map<string, boolean>
    colors: List<string>
}

export const DEFAULT_APP_STATE: AppState = {
    pickers: Map({"default": true, "sketch": false, "chrome": false}),
    colors: List([ "#dfdb3b" ]),
}