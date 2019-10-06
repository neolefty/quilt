import React, {useReducer} from 'react'
import styles from "./App.module.css"
import {Colors} from "./Colors"
import {PickerToggles} from "./PickerToggles"
import {QuiltSvg} from "./QuiltSvg"
import {AppReducer} from "./Reducer"
import {DEFAULT_APP_STATE} from "./State"

const App: React.FC = () => {
    const [ state, dispatch ] = useReducer(AppReducer, DEFAULT_APP_STATE)

    const changeColor = (index: number, color: string) => dispatch({ type: "change color", index, color })
    const addColor = () => dispatch({ type: "add color" })
    const removeColor = (index: number) => dispatch({ type: "remove color", index })
    const togglePicker = (name: string) => dispatch({type: "toggle picker", name})

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
            </div>
            <Colors
                {...state}
                remove={removeColor}
                add={addColor}
                change={changeColor}
            />
            <QuiltSvg
                colors={state.colors}
                poly={state.quilt} />
        </>
  )
}

export default App;
