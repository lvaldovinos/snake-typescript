import Coordinate from './Coordinate'
import * as React from 'react'
import SnakePart from './SnakePart'
import Direction from './directions'

class Mock extends SnakePart {
  public getUiElement(): React.ReactElement<{}> {
    return <div>test</div>
  }
}

describe('SnakePart test sutie', () => {
  let snakePart: SnakePart

  beforeEach(() => {
    snakePart = new Mock(new Coordinate(1, 1), Direction.Up)
  })

  it('get direction', () => {
    expect(snakePart.currentDirection).toBe(Direction.Up)
  })

  it('set direction', () => {
    snakePart.currentDirection = Direction.Down
    expect(snakePart.currentDirection).toBe(Direction.Down)
  })

  it('move snakePart to current direction', () => {
    expect(snakePart.getCoordinateString()).toBe('1-1')
    snakePart.move()
    expect(snakePart.getCoordinateString()).toBe('1-0')
    snakePart.currentDirection = Direction.Down
    snakePart.move()
    expect(snakePart.getCoordinateString()).toBe('1-1')
    snakePart.currentDirection = Direction.Left
    snakePart.move()
    expect(snakePart.getCoordinateString()).toBe('0-1')
    snakePart.currentDirection = Direction.Right
    snakePart.move()
    expect(snakePart.getCoordinateString()).toBe('1-1')
  })
})
