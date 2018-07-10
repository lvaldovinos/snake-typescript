import Coordinate from './Coordinate'
import Direction from './directions'
import Snake from './Snake' 
import SnakePart from './SnakePart'

describe('Snake test suite', () => {
  let snake: Snake

  it('creates snake poiting to the right', () => {
    snake = new Snake(new Coordinate(5, 5), Direction.Right)
    let fullBody: Map<string, SnakePart> = snake.fullBody
    expect(fullBody.size).toBe(3)
    const expectedFullBody: Map<string, SnakePart> = new Map<string, SnakePart>([
      ['5-5', snake.currentHead],
      ['4-5', snake.currentBody[0]],
      ['3-5', snake.currentTail]
    ])
    expect(fullBody).toEqual(expectedFullBody)
  })

  it('creates snake poiting to the left', () => {
    snake = new Snake(new Coordinate(5, 5), Direction.Left)
    let fullBody: Map<string, SnakePart> = snake.fullBody
    expect(fullBody.size).toBe(3)
    const expectedFullBody: Map<string, SnakePart> = new Map<string, SnakePart>([
      ['5-5', snake.currentHead],
      ['6-5', snake.currentBody[0]],
      ['7-5', snake.currentTail]
    ])
    expect(fullBody).toEqual(expectedFullBody)
  })

  it('creates snake poiting to Up', () => {
    snake = new Snake(new Coordinate(5, 5), Direction.Up)
    let fullBody: Map<string, SnakePart> = snake.fullBody
    expect(fullBody.size).toBe(3)
    const expectedFullBody: Map<string, SnakePart> = new Map<string, SnakePart>([
      ['5-5', snake.currentHead],
      ['5-6', snake.currentBody[0]],
      ['5-7', snake.currentTail]
    ])
    expect(fullBody).toEqual(expectedFullBody)
  })

  it('creates snake poiting to Down', () => {
    snake = new Snake(new Coordinate(5, 5), Direction.Down)
    let fullBody: Map<string, SnakePart> = snake.fullBody
    expect(fullBody.size).toBe(3)
    const expectedFullBody: Map<string, SnakePart> = new Map<string, SnakePart>([
      ['5-5', snake.currentHead],
      ['5-4', snake.currentBody[0]],
      ['5-3', snake.currentTail]
    ])
    expect(fullBody).toEqual(expectedFullBody)
  })

  it('moves whole snake', () => {
    snake = new Snake(new Coordinate(5, 5), Direction.Right)
    let expectedFullBody: Map<string, SnakePart> = new Map<string, SnakePart>([
      ['5-5', snake.currentHead],
      ['4-5', snake.currentBody[0]],
      ['3-5', snake.currentTail]
    ])
    expect(snake.fullBody).toEqual(expectedFullBody)
    // move up
    snake.pushMovement(Direction.Up)
    snake.move()
    expectedFullBody = new Map<string, SnakePart>([
      ['5-4', snake.currentHead],
      ['5-5', snake.currentBody[0]],
      ['4-5', snake.currentTail]
    ])
    // move right
    snake.pushMovement(Direction.Right)
    snake.move()
    expectedFullBody = new Map<string, SnakePart>([
      ['6-4', snake.currentHead],
      ['5-4', snake.currentBody[0]],
      ['5-5', snake.currentTail]
    ])
    // move down
    snake.pushMovement(Direction.Down)
    snake.move()
    expectedFullBody = new Map<string, SnakePart>([
      ['6-5', snake.currentHead],
      ['6-4', snake.currentBody[0]],
      ['5-4', snake.currentTail]
    ])
    // move left
    snake.pushMovement(Direction.Left)
    snake.move()
    expectedFullBody = new Map<string, SnakePart>([
      ['5-5', snake.currentHead],
      ['6-5', snake.currentBody[0]],
      ['6-4', snake.currentTail]
    ])
    expect(snake.fullBody).toEqual(expectedFullBody)
  })

  it('snake grows and moves properly', () => {
    snake = new Snake(new Coordinate(5, 5), Direction.Right)
    let expectedFullBody: Map<string, SnakePart> = new Map<string, SnakePart>([
      ['5-5', snake.currentHead],
      ['4-5', snake.currentBody[0]],
      ['3-5', snake.currentTail]
    ])
    expect(snake.fullBody).toEqual(expectedFullBody)
    snake.grow()
    expectedFullBody = new Map<string, SnakePart>([
      ['5-5', snake.currentHead],
      ['4-5', snake.currentBody[0]],
      ['3-5', snake.currentBody[1]],
      ['2-5', snake.currentTail]
    ])
    // move up
    snake.pushMovement(Direction.Up)
    snake.move()
    snake.move()
    snake.move()
    snake.grow()
    expectedFullBody = new Map<string, SnakePart>([
      ['5-2', snake.currentHead],
      ['5-3', snake.currentBody[0]],
      ['5-4', snake.currentBody[1]],
      ['5-5', snake.currentBody[2]],
      ['4-5', snake.currentTail]
    ])
    snake.move()
    expectedFullBody = new Map<string, SnakePart>([
      ['5-1', snake.currentHead],
      ['5-2', snake.currentBody[0]],
      ['5-3', snake.currentBody[1]],
      ['5-4', snake.currentBody[2]],
      ['5-5', snake.currentTail]
    ])
    expect(snake.fullBody).toEqual(expectedFullBody)
  })

  it('is head in same position as other snake part', () => {
    snake = new Snake(new Coordinate(5, 5), Direction.Right)
    expect(snake.hasHeadCrashed()).toBe(false)
    // move left
    snake.pushMovement(Direction.Left)
    snake.move()
    expect(snake.hasHeadCrashed()).toBe(true)
  })

  it('grows correctly even when tail has movement', () => {
    snake = new Snake(new Coordinate(5, 5), Direction.Down)
    snake.grow()

    snake.pushMovement(Direction.Right)
    snake.move()

    snake.pushMovement(Direction.Down)
    snake
      .move()
      .move()
      .grow()

    let expectedFullBody: Map<string, SnakePart> = new Map<string, SnakePart>([
      ['6-7', snake.currentHead],
      ['6-6', snake.currentBody[0]],
      ['6-5', snake.currentBody[1]],
      ['5-5', snake.currentBody[2]],
      ['5-4', snake.currentTail]
    ])
    expect(snake.fullBody).toEqual(expectedFullBody)
    snake.move()

    expectedFullBody = new Map<string, SnakePart>([
      ['6-8', snake.currentHead],
      ['6-7', snake.currentBody[0]],
      ['6-6', snake.currentBody[1]],
      ['6-5', snake.currentBody[2]],
      ['5-5', snake.currentTail]
    ])
    snake.move()
    expectedFullBody = new Map<string, SnakePart>([
      ['6-9', snake.currentHead],
      ['6-8', snake.currentBody[0]],
      ['6-7', snake.currentBody[1]],
      ['6-6', snake.currentBody[2]],
      ['6-5', snake.currentTail]
    ])
  })
})
