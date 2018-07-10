import Area from './Area'
import Food from './Food' 
import Mouse from './Mouse'
import Coordinate from './Coordinate'
import Direction from './directions'
import Snake from './Snake'

describe('Area test sutie', () => {
  let area

  beforeEach(() => {
    area = new Area({
      columns: 2,
      rows: 2,
      initialSnakeCoordinate: new Coordinate(0, 0),
      direction: Direction.Right,
      foodCreationRate: 1000
    })
  })

  it('get valid random coordinate', () => {
    const coordinate: Coordinate = area.getRandomCoordinate()
    expect(coordinate.coordinateX).toBeGreaterThanOrEqual(0)
    expect(coordinate.coordinateX).toBeLessThan(2)
    expect(coordinate.coordinateY).toBeGreaterThanOrEqual(0)
    expect(coordinate.coordinateY).toBeLessThan(2)
  })

  it('getRandomCoordinate returns null if area is crowded', () => {
    const food: Food = area.areaFood
    // create 4 mice
    food.addMouse(new Mouse(new Coordinate(0, 0)))
    food.addMouse(new Mouse(new Coordinate(0, 1)))
    food.addMouse(new Mouse(new Coordinate(1, 0)))
    food.addMouse(new Mouse(new Coordinate(1, 1)))
    expect(area.getRandomCoordinate()).toBe(null)
  })

  it(`create default mice per tick`, () => {
    const food: Food = area.areaFood
    expect(food.size).toBe(0)
    area.createFoodTick()
    expect(food.size).toBe(area.areaMicePerTick)
  })

  it('initiate snake', () => {
    let snake: Snake = area.areaSnake
    expect(snake.fullBody.size).toBe(3)
  })

  it('check if snake is out of boundaries', () => {
    let snake: Snake = area.areaSnake

    expect(area.isSnakeOutOfBoundaries()).toBe(false)

    for (let index = 0; index < 10; index += 1) {
      snake.move()
    }

    expect(area.isSnakeOutOfBoundaries()).toBe(true)
  })

  it('check if snake should grow', () => {
    const food: Food = area.areaFood
    let snake: Snake = area.areaSnake

    const mouseCoordinate: Coordinate = new Coordinate(snake.currentHead.currentCoordinate.coordinateX, snake.currentHead.currentCoordinate.coordinateY)
    expect(area.shouldSnakeGrow()).toBe(false)

    food.addMouse(new Mouse(mouseCoordinate))
    expect(area.shouldSnakeGrow()).toBe(true)
  })

  it('remove mouse when head is in same container', () => {
    const food: Food = area.areaFood
    let snake: Snake = area.areaSnake

    const mouseCoordinate: Coordinate = new Coordinate(snake.currentHead.currentCoordinate.coordinateX, snake.currentHead.currentCoordinate.coordinateY)

    food.addMouse(new Mouse(mouseCoordinate))
    expect(food.size).toBe(1)
    area.removeMouse()
    expect(food.size).toBe(0)
  })

  it('call isSnakeOutOfBoundaries & shouldSnakeGrow on snake tick', () => {
    spyOn(area, 'isSnakeOutOfBoundaries')
    spyOn(area, 'shouldSnakeGrow')
    area.createSnakeMoveTick()
    expect(area.isSnakeOutOfBoundaries).toHaveBeenCalled()
    expect(area.shouldSnakeGrow).toHaveBeenCalled()
  })
})
