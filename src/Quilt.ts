import {List, Range} from "immutable"
import {Bound, Point} from "./Point"
import {MultiPoly, Poly} from "./Poly"

export const CreateDefaultQuilt = (): MultiPoly =>
    new MultiPoly(List([
        triangleLL,
        triangleLR.shift(right),
        triangleUR.shift(up).shift(right),
        triangleUL.shift(up),
    ]))

const ll = new Point(0, 0)
const lr = new Point(1, 0)
const ul = new Point(0, 1)
const ur = new Point(1, 1)

const right = lr
const right2 = right.scale(2)
const left = new Point(-1, 0)
const up = ul
const up2 = up.scale(2)
const down = new Point(0, -1)

const unit = new Bound(ll, ur)

const triangleLL = new Poly(List([ ul, ll, lr, ul ]), unit)
const triangleLR = new Poly(List([ ll, lr, ur, ll ]), unit)
const triangleUR = new Poly(List([ lr, ur, ul, lr ]), unit)
const triangleUL = new Poly(List([ ur, ul, ll, ur ]), unit)
const square = new Poly(List([ll, lr, ur, ul, ll]), unit)

const toMulti = (poly: Poly) => new MultiPoly(List([poly]))
const multiSquare = toMulti(square)

export const star = new MultiPoly(List([
    square.scale(2),
    triangleLL.shift(up2),
    triangleLR.shift(up2).shift(right),
    triangleUL.shift(up).shift(right2),
    triangleLL.shift(right2),
    triangleUR.shift(down).shift(right),
    triangleUL.shift(down),
    triangleLR.shift(left),
    triangleUR.shift(up).shift(left),
])).shift(up).shift(right)

export const spark = new MultiPoly(List([
    triangleLL.shift(up).shift(right),
    triangleLL.shift(up),
    triangleLL.shift(right),
]))

export const sparkle = spark
    .combine(spark.scaleXY(-1, 1))
    .combine(spark.scaleXY(-1, -1))
    .combine(spark.scaleXY(1, -1))
    .shift(up2).shift(right2)

export const both = star.combine(sparkle.shift(right.scale(4)))

export const quad = both.combine(both.flipX().shift(down.scale(4)))

export const border = (interior: MultiPoly): MultiPoly => {
    const v = multiSquare.scaleXY(2, interior.bound.height + 6) // vertical border
    const h = multiSquare.scaleXY(interior.bound.width + 2, 2) // horizontal border
    const b = interior.bound
    return interior
        .combine(h.shiftXY(b.left - 1, b.bottom - 3)) // bottom
        .combine(h.shiftXY(b.left - 1, b.top + 1)) // top
        .combine(v.shiftXY(b.left - 3, b.bottom - 3)) // left
        .combine(v.shiftXY(b.right + 1, b.bottom - 3)) // right
}

export const starGrid = (x: number, y: number): MultiPoly => {
    let result = MultiPoly.zero
    Range(0, x).forEach(x =>
        Range(0, y).forEach(y => {
            const shape = ((x + y) % 2) === 0 ? star : sparkle
            result = result.combine(shape.shiftXY(x * 4, y * 4))
        })
    )
    return result
}