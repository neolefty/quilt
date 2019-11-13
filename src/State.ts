import {List, Map, Record} from "immutable"
import {Point} from './Point'

export interface AppState {
    justTheQuilt: boolean
    pickers: Map<string, boolean>
    colors: List<string>
    quiltSize: Point
    showBorder: boolean
    borderColor: string
    errors: List<string>
}

export const DEFAULT_APP_STATE: AppState = {
    justTheQuilt: false,
    pickers: Map({"web": false, "default": true, "sketch": false, "chrome": false}),
    colors: List([
       "#fff0a3", "#fff0a3", "#fff0a3", "#fae783", "#f7df5e", "#f7df5e", "#f7df5e", "#f7df5e", "#f7d65e", "#f7d65e", "#ffc11f", "#ffc11f", "#ffa91f", "#ffa91f", "#6f71c0", "#3b3edf", "#3b3edf", "#185b21", "#226e19", "#66ac5d",
    ]),
    quiltSize: new Point(4, 5),
    showBorder: true,
    borderColor: "#1b3272",
    errors: List(), //["error", "another, longer error"])
}

export const AppStateRecord = Record<AppState>(
    DEFAULT_APP_STATE
)
