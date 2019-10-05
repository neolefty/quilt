import React, {useReducer} from 'react'
import styles from "./App.module.css"
import {Colors} from "./Colors"
import {AppReducer} from "./Reducer"
import {DEFAULT_APP_STATE} from "./State"

const App: React.FC = () => {
    const [ state, dispatch ] = useReducer(AppReducer, DEFAULT_APP_STATE)
    const changeColor = (index: number, color: string) =>
        dispatch({ type: "change color", index, color })
    const addColor = () => dispatch({ type: "add color" })
    const remove = (index: number) => dispatch({ type: "remove color", index })
    return (
        <>
            <h1 className={styles.row}>
                Quilt
            </h1>
            <Colors colors={state.colors} remove={remove} add={addColor} change={changeColor}/>
        </>
  )
}

export default App;
