import React, {useReducer} from 'react'
import styles from "./App.module.css"
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
                <button onClick={addColor}>+</button>
            </h1>
            <div className={styles.row}>
            {
                state.colors.map((color: string, index: number) => (
                    <div key={index} className={styles.column}>
                        <input type="color" value={color} onChange={e => changeColor(index, e.target.value)}/>
                        {/*<SketchPicker color={color} onChange={e => changeColor(index,  e.hex)}/>*/}
                        <button onClick={() => remove(index)}>-</button>
                    </div>
                ))
            }
            </div>
        </>
  )
}

export default App;
