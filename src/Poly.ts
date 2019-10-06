import {List} from "immutable"
import {Bound, Point} from "./Point"

export class Poly {
    constructor(
        readonly points: List<Point>,
        readonly bound: Bound,
    ) {}

    static readonly zero = new Poly(List([Point.origin]), Bound.zero)

    shift(delta: Point): Poly {
        return new Poly(
            this.points.map(point => point.plus(delta)),
            this.bound.plus(delta),
        )
    }

    combine(that: Poly): Poly {
        return new Poly(
            this.points.concat(that.points),
            this.bound.combine(that.bound),
        )
    }

    toPolygonPoints() {
        return this.points.map(p => p.toXY()).join(' ')
    }

    toPath() {
        return `M${
            this.points.map(point => point.toXY()).join('L')
        }Z`
    }

    scale(s: number) {
        return new Poly(
            this.points.map(point => point.scale(s)),
            this.bound.scale(s),
        )
    }

    scaleXY(sx: number, sy: number) {
        return new Poly(
            this.points.map(point => point.scaleXY(sx, sy)),
            this.bound.scaleXY(sx, sy),
        )
    }
}

export class MultiPoly {
    readonly bound: Bound

    static readonly zero = new MultiPoly(List([Poly.zero]))

    constructor(
        readonly polys: List<Poly>
    ) {
        this.bound = this.polys.reduce(
            (r, n) => r.combine(n.bound),
            this.polys.get(0, Poly.zero).bound,
        )
    }

    shift(delta: Point): MultiPoly {
        return new MultiPoly(this.polys.map(poly => poly.shift(delta)))
    }

    shiftXY(dx: number, dy: number): MultiPoly {
        return this.shift(new Point(dx, dy))
    }

    combine(that: MultiPoly) {
        return new MultiPoly(this.polys.concat(that.polys))
    }

    toPath() {
        return this.polys.map(poly => poly.toPath()).join(' ')
    }

    scaleXY(sx: number, sy: number) {
        return new MultiPoly(
            this.polys.map(poly => poly.scaleXY(sx, sy))
        )
    }

    flipX() {
        return this.scaleXY(-1, 1).shift(new Point(this.bound.centerX * 2, 0))
    }

    flipY() {
        return this.scaleXY(1, -1).shift(new Point(0, this.bound.centerY * 2))
    }
}