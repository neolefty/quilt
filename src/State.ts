import {List, Map} from "immutable"
import {MultiPoly} from "./Poly"
import {border, starGrid} from "./Quilt"

export interface AppState {
    pickers: Map<string, boolean>
    colors: List<string>
    quilt: MultiPoly
}

export const DEFAULT_APP_STATE: AppState = {
    pickers: Map({"default": true, "sketch": false, "chrome": false}),
    colors: List([ "#dfdb3b", "#1c506c" ]),
    quilt: border(starGrid(7, 7)).flipY(),
}