import Coordinate from './Coordinate'
import * as React from 'react'
import Direction from './directions'


export default abstract class SnakePart {
  private coordinate: Coordinate
  private direction: Direction

  constructor(coordinate: Coordinate, direction: Direction) {
    this.coordinate = coordinate
    this.direction = direction
  }

  abstract getUiElement(): React.ReactElement<{}>;

  get currentCoordinate(): Coordinate {
    return this.coordinate
  }

  set currentDirection(direction: Direction) {
    this.direction = direction
  }

  get currentDirection(): Direction {
    return this.direction
  }

  public getCoordinateString(): string {
    return this.coordinate.toString()
  }

  public move (): SnakePart {
    let currentXY: number
    switch (this.direction) {
      case Direction.Up:
        currentXY = this.coordinate.coordinateY
        currentXY -= 1
        this.coordinate.coordinateY = currentXY
        break
      case Direction.Down:
        currentXY = this.coordinate.coordinateY
        currentXY += 1
        this.coordinate.coordinateY = currentXY
        break
      case Direction.Left:
        currentXY = this.coordinate.coordinateX
        currentXY -= 1
        this.coordinate.coordinateX = currentXY
        break
      case Direction.Right:
        currentXY = this.coordinate.coordinateX
        currentXY += 1
        this.coordinate.coordinateX = currentXY
        break
    }
    return this
  }
}
