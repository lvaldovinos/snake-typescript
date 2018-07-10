class Coordinate {
  private x: number
  private y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  get coordinateX(): number {
    return this.x
  }

  set coordinateX(newX: number) {
    this.x = newX
  }

  get coordinateY(): number {
    return this.y
  }

  set coordinateY(newY: number) {
    this.y = newY
  }

  toString () {
    return `${this.x}-${this.y}`
  }
}

export default Coordinate
