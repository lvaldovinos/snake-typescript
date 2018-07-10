import Coordinate from './Coordinate'
import Food from './Food'
import Mouse from './Mouse'

describe('Food test suite', () => {
  let food: Food

  beforeEach(() => {
    food = new Food()
  })

  it('add mouse', () => {
    const coordinate = new Coordinate(0, 0)
    const mouse = new Mouse(coordinate)
    let allFood: Map<string, Mouse> = food.getAll()
    expect(allFood.size).toBe(0)
    food.addMouse(mouse)
    allFood = food.getAll()
    expect(allFood.size).toBe(1)
    const expectedFood: Map<string, Mouse> = new Map<string, Mouse>([
      ['0-0', mouse],
    ])
    expect(allFood).toEqual(expectedFood)
  })

  it('isMouseInCoordinate', () => {
    const coordinate = new Coordinate(0, 0)
    const mouse = new Mouse(coordinate)
    food.addMouse(mouse)
    expect(food.isMouseInCoordinate('1-1')).toBe(false)
    expect(food.isMouseInCoordinate('0-0')).toBe(true)
  })

  it('getMouseInCoordinate', () => {
    const coordinate = new Coordinate(0, 0)
    const mouse = new Mouse(coordinate)
    food.addMouse(mouse)
    expect(food.getMouseInCoordinate('1-1')).toBe(null)
    expect(food.getMouseInCoordinate('0-0')).toBe(mouse)
  })
})
