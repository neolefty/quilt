import React from "react"
import styles from "./Toggle.module.css"

interface ToggleProps {
    name: string
    value: boolean
    toggle: () => void
}

export const Toggle = (props: ToggleProps) =>
    <div
        onClick={props.toggle}
        className={props.value ? styles.true : styles.false}
    >
        {props.name}
    </div>