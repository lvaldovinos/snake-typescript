import * as React from 'react'
import Area from './components/Area'
import AreaModel from './models/Area'
import Coordinate from './models/Coordinate'
import Direction from './models/directions'

export default class App extends React.Component<{}, {}> {
  private areaModel: AreaModel

  constructor(props) {
    super(props)
    this.areaModel = new AreaModel({
      columns: 20,
      rows: 20,
      initialSnakeCoordinate: new Coordinate(9, 10),
      direction: Direction.Right
    })
  }
  public render () {
    return (
      <Area areaModel={this.areaModel} />
    )
  }
}
