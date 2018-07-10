import * as React from 'react'
import MouseCharacter from '../components/MouseCharacter'
import Coordinate from './Coordinate'
import Mouse from './Mouse'

describe('Mouse test suite', () => {
  let mouse

  beforeEach(() => {
    const coordinate = new Coordinate(0, 0)
    mouse = new Mouse(coordinate)
  })

  it('getUiElement', () => {
    const ui: React.ReactElement<{}> = mouse.getUiElement()
    expect(<MouseCharacter />).toEqual(<MouseCharacter />)
  })

  it('getCoordinateString', () => {
    expect(mouse.getCoordinateString()).toBe('0-0')
  })
})
