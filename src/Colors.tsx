import {List, Map} from "immutable"
import React from "react"
import {ChromePicker, ColorResult, SketchPicker} from "react-color"
import styles from "./App.module.css"

interface ColorsProps {
    pickers: Map<string, boolean>
    colors: List<string>
    remove: (index: number) => void
    add: () => void
    change: (index: number, color: string) => void
}

export const Colors = (props: ColorsProps) => {
    const colorProps = (index: number) => ({
        index,
        color: props.colors.get(index, "#000"),
        disableAlpha: true,
        onChange: ((e: ColorResult) => props.change(index, e.hex))
    })
    return (
        <div className={styles.column}>
            <h2 className={styles.row}>
                Colors
                <button onClick={props.add}>+</button>
            </h2>
            {
                props.colors.map((color: string, index: number) => (
                    <div key={index} className={styles.row}>
                        <button onClick={() => props.remove(index)}>-</button>
                        { props.pickers.get("default") &&
                            <input type="color" value={color} onChange={e => props.change(index, e.target.value)}/>
                        }
                        {props.pickers.get("sketch") &&
                            <SketchPicker {...colorProps(index)}/>
                        }
                        {props.pickers.get("chrome") &&
                            <ChromePicker {...colorProps(index)}/>
                        }
                        <button onClick={() => props.remove(index)}>-</button>
                    </div>
                ))
            }
        </div>
    )
}
