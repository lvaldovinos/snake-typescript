import Coordinate from './Coordinate'

describe('Coordinate test suite', () => {
  let coordinate

  beforeEach(() => {
    coordinate = new Coordinate(0, 1)
  })

  it('toString', () => {
    const coordinateString: string = coordinate.toString()
    expect(coordinateString).toBe('0-1')
  })

  it('set X', () => {
    coordinate.coordinateX = 3
    expect(coordinate.toString()).toBe('3-1')
  })

  it('set Y', () => {
    coordinate.coordinateY = 3
    expect(coordinate.toString()).toBe('0-3')
  })
})
