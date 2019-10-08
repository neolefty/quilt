import React from 'react'
import styles from "./IntInput.module.css"

interface IntInputProps {
    name: string
    value: number
    set: (value: number) => void
}

export const IntInput = (props: IntInputProps) =>
    <label className={styles.label}>
        {props.name}:
        <input
            className={styles.input}
            type="number"
            step="1"
            min="1"
            max="100"
            value={props.value}
            onChange={(e) => props.set(parseInt(e.target.value))}
            onKeyPress={(e) => {
                console.log(e.key)
                if (e.key === 'up')
                    props.set(props.value + 1)
                if (e.key === 'down')
                    props.set(props.value - 1)
            }}
        />
    </label>