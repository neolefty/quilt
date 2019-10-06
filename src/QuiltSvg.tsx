import {List} from "immutable"
import React from "react"
import {Bound} from "./Point"
import {MultiPoly} from "./Poly"
import styles from "./Quilt.module.css"

interface QuiltProps {
    colors: List<string>
    poly: MultiPoly
    showBorder?: boolean
}

export const QuiltSvg = (props: QuiltProps) =>
    <svg
        className={styles.quiltSvg}
        viewBox={props.poly.bound.expand(props.showBorder ? 0.04 : 0).toViewBox()}
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
        { props.showBorder &&
            <BoundSvg bound={props.poly.bound}/>
        }
        <path d={props.poly.toPath()} fill="url(#bg)"/>
    </svg>

type BoundSvgProps = { bound: Bound }

export const BoundSvg = ({bound}: BoundSvgProps) => {
    const bex = bound.expand(0.02)
    return (
        <rect x={bex.min.x} y={bex.min.y} width={bex.width} height={bex.height} strokeWidth="0.01" stroke="#ccc" fill="none"/>
    )
}
