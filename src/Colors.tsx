import {List, Map} from "immutable"
import React from "react"
import {ChromePicker, ColorResult, SketchPicker} from "react-color"
import appStyles from "./App.module.css"
import styles from "./Colors.module.css"

interface ColorsProps {
    pickers: Map<string, boolean>
    colors: List<string>
    remove: (index: number) => void
    add: () => void
    double: (index?: number) => void
    change: (index: number, color: string) => void
    reset: () => void
    dedup: () => void
    move: (origin: number, delta: number) => void
}

export const Colors = (props: ColorsProps) => {
    const colorProps = (index: number) => ({
        index,
        color: props.colors.get(index, "#000"),
        disableAlpha: true,
        onChange: ((e: ColorResult) => props.change(index, e.hex))
    })
    return (
        <div className={appStyles.column}>
            <h2 className={appStyles.row}>
                Colors&nbsp;
                <button onClick={props.add}>+</button>
                <button onClick={() => props.double()} disabled={props.colors.size >= 100}>2x</button>
                <button onClick={props.dedup}>De-duplicate</button>
                &nbsp;
                <button onClick={props.reset}>Reset</button>
                &nbsp;
                {props.colors.size}
            </h2>
            {
                props.colors.map((color: string, index: number) => (
                    <div className={appStyles.row} key={index} style={{/*background: color*/}}>
                        <button onClick={() => props.remove(index)}>-</button>
                        { props.pickers.get("web") &&
                            <div className={styles.web} style={{background: color}}>
                                <span className={styles.black}>{color}</span>
                                <span className={styles.white}>{color}</span>
                            </div>
                        }
                        { props.pickers.get("default") &&
                            <input type="color" value={color} onChange={e => props.change(index, e.target.value)}/>
                        }
                        { props.pickers.get("sketch") &&
                            <SketchPicker {...colorProps(index)}/>
                        }
                        { props.pickers.get("chrome") &&
                            <ChromePicker {...colorProps(index)}/>
                        }
                        <button onClick={() => props.double(index)}>+</button>
                        <button onClick={() => props.remove(index)}>-</button>
                        <button onClick={() => props.move(index, -1)}>^</button>
                        <button onClick={() => props.move(index, 1)}>v</button>
                    </div>
                ))
            }
        </div>
    )
}
