import * as enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as React from 'react'
import Area from './Area'
import AreaModel from '../models/Area'
import Coordinate from '../models/Coordinate'
import Direction from '../models/directions'
import Snake from './Snake'

enzyme.configure({
  adapter: new Adapter(),
})

describe('Area element test suite', () => {
  let wrapper: enzyme.ReactWrapper
  let area: AreaModel

  beforeEach(() => {
    area = new AreaModel({
      columns: 3,
      rows: 3,
      initialSnakeCoordinate: new Coordinate(2, 2),
      direction: Direction.Right
    })
    wrapper = enzyme.mount(<Area areaModel={area} />)
  })

  it('display mice in area', () => {
    area.destroyRunners()
    expect(wrapper.find('MouseCharacter').length).toBe(0)
    area.createFoodTick()
    wrapper.setState({
      cells: area.getCells()
    })
    wrapper.update()
    expect(wrapper.find('MouseCharacter').length).toBe(3)
  })

  it('display mice in area', () => {
    area.destroyRunners()
    expect(wrapper.find('MouseCharacter').length).toBe(0)
    area.createFoodTick()
    wrapper.setState({
      cells: area.getCells()
    })
    wrapper.update()
    expect(wrapper.find('MouseCharacter').length).toBe(3)
  })

  it('display snake in area', () => {
    area.destroyRunners()
    expect(wrapper.find('SnakeHeadCharacter').length).toBe(1)
    expect(wrapper.find('SnakeBodyCharacter').length).toBe(1)
    expect(wrapper.find('SnakeTailCharacter').length).toBe(1)
  })

  it('call runners on key down (only first time)', () => {
    spyOn(area, 'startRunners').and.callThrough()
    area.destroyRunners()
    document.events.keydown({ code: 'ArrowUp' })
    document.events.keydown({ code: 'ArrowUp' })
    expect(area.startRunners).toHaveBeenCalledTimes(1)
  })

  it('call snake.pushMovement on key down event', () => {
    const snake: Snake = area.areaSnake
    spyOn(snake, 'pushMovement')
    document.events.keydown({ code: 'ArrowUp' })
    expect(snake.pushMovement).toHaveBeenCalledWith(Direction.Up)
    document.events.keydown({ code: 'ArrowDown' })
    expect(snake.pushMovement).toHaveBeenCalledWith(Direction.Down)
    document.events.keydown({ code: 'ArrowLeft' })
    expect(snake.pushMovement).toHaveBeenCalledWith(Direction.Left)
    document.events.keydown({ code: 'ArrowRight' })
    expect(snake.pushMovement).toHaveBeenCalledWith(Direction.Right)
  })

  it('call snake.move when calling createSnakeMoveTick', () => {
    const snake: Snake = area.areaSnake
    spyOn(snake, 'move')
    area.createSnakeMoveTick()
    expect(snake.move).toHaveBeenCalled()
  })

  afterEach(() => area.destroyRunners())
})
