import clsx from "clsx"
import {List} from "immutable"
import React from "react"
import {Bound} from "./Point"
import {MultiPoly} from "./Poly"
import {border} from "./Quilt"
import styles from "./QuiltSvg.module.css"

interface QuiltProps {
    colors: List<string>
    poly: MultiPoly
    extraBorderColor?: string
    showOutline?: boolean
    fullScreen: boolean
}

export const QuiltSvg = (props: QuiltProps) => {
    const borderPoly = props.extraBorderColor ? border(props.poly, false) : undefined
    const outer = borderPoly || props.poly

    return (
        <svg
            className={clsx(props.fullScreen ? styles.fullScreen : styles.fitSquare)}
            viewBox={outer.bound.expand(props.showOutline ? 0.04 : 0).toViewBox()}
        >
            <defs>
                <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    {
                        props.colors.map((color, index) =>
                            <stop
                                key={index}
                                offset={`${100 * index / (props.colors.size - 1)}%`}
                                stopColor={color}
                                stopOpacity={1}
                            />
                        )
                    }
                </linearGradient>
            </defs>
            { props.showOutline &&
            <BoundSvg bound={props.poly.bound}/>
            }
            { borderPoly &&
                <path d={borderPoly.toPath()} fill={props.extraBorderColor} />
            }
            <path d={props.poly.toPath()} fill="url(#bg)"/>
        </svg>
    )
}

type BoundSvgProps = { bound: Bound }

export const BoundSvg = ({bound}: BoundSvgProps) => {
    const bex = bound.expand(0.02)
    return (
        <rect x={bex.min.x} y={bex.min.y} width={bex.width} height={bex.height} strokeWidth="0.01" stroke="#ccc" fill="none"/>
    )
}
