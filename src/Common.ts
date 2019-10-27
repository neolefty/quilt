import {List} from "immutable"

export const assertNever = (x: never): never => {
    throw new Error(`Unexpected value: ${JSON.stringify(x)}`)
}

export const Dedup = <T>(a: List<T>): List<T> => {
    if (a.size > 0) {
        let last: T = a.get(0) as T
        return a.filter((t, index) => {
            const result = (index === 0 || t !== last)
            last = t
            return result
        })
    }
    else
        return a
}
