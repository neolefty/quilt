export type AppAction = Action & (NullAction | ChangeColorAction | AddColorAction | RemoveColorAction)

export interface Action {
    type: string
}

export interface ChangeColorAction {
    type: "change color"
    index: number
    color: string
}

export interface AddColorAction {
    type: "add color"
}

export interface RemoveColorAction {
    type: "remove color"
    index: number
}

export interface NullAction {
    type: "null"
}