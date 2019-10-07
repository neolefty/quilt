import {List} from "immutable"
import {Point} from "./Point"
import {AppState} from "./State"

export const restore = (initial: AppState) => {
    let result = initial
    const log = (e: Error) => {
        console.error(e)
        result = {
            ...result,
            errors: result.errors.push(e.toString())
        }
    }
    try {
        const colorsString = localStorage.getItem("colors")
        if (colorsString)
            result = {
                ...result,
                colors: List(JSON.parse(colorsString) as string[])
            }
    } catch (e) {
        log(e)
    }
    try {
        const sizeString = localStorage.getItem("quiltSize")
        if (sizeString)
            result = {
                ...result,
                quiltSize: Point.fromJson(sizeString)
            }
    } catch (e) {
        log(e)
    }
    result = {
        ...result,
        borderColor: localStorage.getItem("borderColor") || result.borderColor,
    }
    if (localStorage.getItem("showBorder") !== null)
        result = {
            ...result,
            showBorder: localStorage.getItem("showBorder") === "yes",
        }
    return result
}
export const save = (state: AppState) => {
    localStorage.setItem("colors", JSON.stringify(state.colors.toJS()))
    localStorage.setItem("quiltSize", state.quiltSize.toJson())
    localStorage.setItem("borderColor", state.borderColor)
    localStorage.setItem("showBorder", state.showBorder ? "yes" : "")
}