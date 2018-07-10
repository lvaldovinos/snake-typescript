import * as React from 'react'
import MouseCharacter from '../components/MouseCharacter'
import Coordinate from './Coordinate'

class Mouse {
  private coordinate: Coordinate
  constructor(coordinate: Coordinate) {
    this.coordinate = coordinate
  }
  public getUiElement(): React.ReactElement<{}> {
    return <MouseCharacter />
  }
  public getCoordinateString(): string {
    return this.coordinate.toString()
  }
}

export default Mouse
