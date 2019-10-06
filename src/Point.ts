export class Point {
    static readonly origin = new Point(0, 0)

    constructor(
        readonly x: number,
        readonly y: number,
    ) {}

    min(that: Point): Point { return new Point(Math.min(this.x, that.x), Math.min(this.y, that.y)) }
    max(that: Point): Point { return new Point(Math.max(this.x, that.x), Math.max(this.y, that.y)) }
    plus(that: Point): Point { return new Point(this.x + that.x, this.y + that.y) }
    minus(that: Point): Point { return new Point(this.x - that.x, this.y - that.y) }
    scale(s: number) { return new Point(this.x * s, this.y * s) }
    scaleXY(sx: number, sy: number) { return new Point(this.x * sx, this.y * sy) }

    toXY(sep=',') { return `${this.x}${sep}${this.y}` }
    toJS() { return {x: this.x, y: this.y}}
    toString() { return `(${this.x}, ${this.y})`}
    equals(that: Point) { return that.x === this.x && that.y === this.y }

    toJson() { return JSON.stringify(this.toJS()) }
    static fromJson(json: string) {
        const j = JSON.parse(json)
        if (j.x !== undefined && typeof j.x === 'number' && j.y !== undefined && typeof j.y === 'number')
            return new Point(j.x, j.y)
        else throw new Error(`can't parse "${json}" as Point`)
    }

}

export class Bound {
    static readonly zero = new Bound(Point.origin, Point.origin)

    constructor(
        readonly min: Point,
        readonly max: Point,
    ) {}

    get norm(): Bound {
        return new Bound(
            new Point(Math.min(this.min.x, this.max.x), Math.min(this.min.y, this.max.y)),
            new Point(Math.max(this.min.x, this.max.x), Math.max(this.min.y, this.max.y)),
        )
    }
    get centerX(): number { return 0.5 * (this.min.x + this.max.x) }
    get centerY(): number { return 0.5 * (this.min.y + this.max.y) }

    combine(that: Bound): Bound { return new Bound(this.min.min(that.min), this.max.max(that.max)) }
    get size(): Point { return this.max.minus(this.min) }
    get width(): number { return this.max.x - this.min.x }
    get height(): number { return this.max.y - this.min.y }
    get left() { return this.min.x }
    get right() { return this.max.x }
    get top() { return this.max.y }
    get bottom() { return this.min.y }
    plus(delta: Point): Bound { return new Bound(this.min.plus(delta), this.max.plus(delta)) }
    toViewBox() { return `${this.min.x} ${this.min.y} ${this.width} ${this.height}` }
    scale(s: number) { return new Bound(this.min.scale(s), this.max.scale(s)).norm }
    scaleXY(sx: number, sy: number) {
        return new Bound(this.min.scaleXY(sx, sy), this.max.scaleXY(sx, sy)).norm
    }

    expand(n: number) {
        const nn = new Point(n, n)
        return new Bound(this.min.minus(nn), this.max.plus(nn))
    }

    toString() { return `${this.min.toString()} - ${this.max.toString()}` }
}