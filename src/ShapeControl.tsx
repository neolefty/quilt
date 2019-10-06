import React from 'react'
import {Point} from './Point'
import {Toggle} from './Toggle'
import {IntInput} from './IntInput'

interface ShapeControlProps {
    quiltSize: Point
    showBorder: boolean
    setQuiltSize: (value: Point) => void
    toggleShowBorder: () => void
}

export const ShapeControl = (props: ShapeControlProps) =>
    <>
        <Toggle name="Border" toggle={props.toggleShowBorder} value={props.showBorder}/>
        <IntInput
            name="Width"
            value={props.quiltSize.x}
            set={(value: number) => props.setQuiltSize(props.quiltSize.setX(value))}
        />
        <IntInput
            name="Height"
            value={props.quiltSize.y}
            set={(value: number) => props.setQuiltSize(props.quiltSize.setY(value))}
        />
    </>

