import clsx from "clsx"
import React, {useEffect, useReducer} from 'react'
import styles from "./App.module.css"
import {Colors} from "./Colors"
import {PickerToggles} from "./PickerToggles"
import {Point} from './Point'
import {starGrid} from './Quilt'
import {QuiltSvg} from "./QuiltSvg"
import {AppReducer} from "./Reducer"
import {restore, save} from "./Save"
import {ShapeControl} from './ShapeControl'
import {DEFAULT_APP_STATE} from "./State"

const App: React.FC = () => {
    const [ state, dispatch ] = useReducer(AppReducer, restore(DEFAULT_APP_STATE))
    useEffect(() => save(state))
    const quilt = starGrid(state.quiltSize.x, state.quiltSize.y)

    const changeColor = (index: number, color: string) => dispatch({ type: "change color", index, color })
    const setBorderColor = (value: string) => dispatch({type: "border color", value})
    const addColor = () => dispatch({ type: "add color" })
    const doubleColors = (value?: number) => dispatch({ type: "double colors", value })
    const removeColor = (index: number) => dispatch({ type: "remove color", index })
    const togglePicker = (name: string) => dispatch({ type: "toggle picker", name })
    const toggleShowBorder = () => dispatch({ type: 'show border', value: !state.showBorder })
    const setQuiltSize = (value: Point) => dispatch({ type: 'change quilt size', value })
    const reset = () => dispatch({ type: 'reset' })

    return (
        <>
            <h1 className={clsx(styles.row, styles.noPrint)}>
                Quilt Color Doodle
            </h1>
            <div className={clsx(styles.row, styles.noPrint)}>
                <PickerToggles
                    pickers={state.pickers}
                    toggle={togglePicker}
                />
                <ShapeControl
                    quiltSize={state.quiltSize}
                    showBorder={state.showBorder}
                    borderColor={state.borderColor}
                    setBorderColor={setBorderColor}
                    toggleShowBorder={toggleShowBorder}
                    setQuiltSize={setQuiltSize}
                />
                <button onClick={reset} className={styles.reset}>Reset</button>
                <a href="https://github.com/neolefty/quilt" target="_blank" className={styles.source}>source code</a>
            </div>
            <div className={styles.noPrint}>
                <Colors
                    {...state}
                    remove={removeColor}
                    add={addColor}
                    double={doubleColors}
                    change={changeColor}
                />
            </div>
            <QuiltSvg
                colors={state.colors}
                poly={quilt}
                extraBorderColor={state.showBorder ? state.borderColor : undefined}
            />
            {
                state.errors.map(e =>
                    <div className={clsx(styles.error, styles.noPrint)}>{e}</div>
                )
            }
        </>
    )
}

export default App;
