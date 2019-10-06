import React, {useReducer} from 'react'
import styles from "./App.module.css"
import {Colors} from "./Colors"
import {PickerToggles} from "./PickerToggles"
import {QuiltSvg} from "./QuiltSvg"
import {AppReducer} from "./Reducer"
import {DEFAULT_APP_STATE} from "./State"
import {border, starGrid} from './Quilt'
import {Point} from './Point'
import {ShapeControl} from './ShapeControl'

const App: React.FC = () => {
    const [ state, dispatch ] = useReducer(AppReducer, DEFAULT_APP_STATE)
    let quilt = starGrid(state.quiltSize.x, state.quiltSize.y)
    if (state.showBorder)
        quilt = border(quilt)

    const changeColor = (index: number, color: string) => dispatch({ type: "change color", index, color })
    const addColor = () => dispatch({ type: "add color" })
    const removeColor = (index: number) => dispatch({ type: "remove color", index })
    const togglePicker = (name: string) => dispatch({ type: "toggle picker", name })
    const toggleShowBorder = () => dispatch({ type: 'show border', value: !state.showBorder })
    const setQuiltSize = (value: Point) => dispatch({ type: 'change quilt size', value })

    return (
        <>
            <h1 className={styles.row}>
                Quilt
            </h1>
            <div className={styles.row}>
                <PickerToggles
                    pickers={state.pickers}
                    toggle={togglePicker}
                />
                <ShapeControl
                    quiltSize={state.quiltSize}
                    showBorder={state.showBorder}
                    toggleShowBorder={toggleShowBorder}
                    setQuiltSize={setQuiltSize}
                />
            </div>
            <Colors
                {...state}
                remove={removeColor}
                add={addColor}
                change={changeColor}
            />
            <QuiltSvg
                colors={state.colors}
                poly={quilt} />
        </>
  )
}

export default App;
