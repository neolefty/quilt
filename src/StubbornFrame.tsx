import clsx from "clsx"
import React, {ReactNode, useEffect, useRef} from "react"
import styles from "./StubbornFrame.module.css"

interface StubbornFrameProps {
    children?: ReactNode
    onAnything?: () => void // if defined, side effect is to grab focus
}

export const StubbornFrame = (props: StubbornFrameProps) => {
    const divEl = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (props.onAnything && divEl.current)
            divEl.current.focus()
    })
    return (
        <div
            className={clsx(styles.useItAll, styles.below)}
            onClick={props.onAnything}
            onKeyPress={props.onAnything}
            tabIndex={props.onAnything ? -1 : undefined}
            ref={divEl}
        >
            {props.children}
        </div>
    )
}
