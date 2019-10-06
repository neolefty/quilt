export type AppAction = Action & (NullAction | ChangeColorAction | AddColorAction | RemoveColorAction | TogglePickerAction)

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

export interface TogglePickerAction {
    type: "toggle picker"
    name: string
}