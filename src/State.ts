import {List, Map, Record} from "immutable"
import {Point} from './Point'

export interface AppState {
    pickers: Map<string, boolean>
    colors: List<string>
    quiltSize: Point
    showBorder: boolean
}

export const DEFAULT_APP_STATE: AppState = {
    pickers: Map({"default": true, "sketch": false, "chrome": false}),
    colors: List([ "#dfdb3b", "#1c506c" ]),
    quiltSize: new Point(5, 4),
    showBorder: true,
}

export const AppStateRecord = Record<AppState>(
    DEFAULT_APP_STATE
)
