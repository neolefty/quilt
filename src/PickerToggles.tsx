import {Map} from "immutable"
import React from "react"
import {Toggle} from "./Toggle"

interface PickersProps {
    pickers: Map<string, boolean>
    toggle: (name: string) => void
}

export const PickerToggles = (props: PickersProps) =>
    <>{
        props.pickers.entrySeq().map(([name, value], index) =>
            <Toggle
                key={index}
                name={name}
                value={value}
                toggle={() => props.toggle(name)}
            />
        )
    }</>