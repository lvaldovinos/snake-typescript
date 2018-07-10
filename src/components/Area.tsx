import * as React from 'react'
import AreaModel from '../models/Area'
import Mouse from '../models/Mouse'
import css from '../styles/Area.css'
import Cell, { CellSize } from './Cell'
import Direction from '../models/directions'
import SnakePart from '../models/SnakePart'

interface IAreaProps {
  areaModel: AreaModel
}

interface IAreaState {
  cells: Map<string, null | Mouse | SnakePart>
}

interface ICell {
  key: string
  thing: null | Mouse | SnakePart
}

export default class AreaComponent extends React.Component<IAreaProps, IAreaState> {
  private areaModel: AreaModel

  constructor(props) {
    super(props)
    this.areaModel = this.props.areaModel
    this.areaModel.setState = this.setState.bind(this)
    this.state = {
      cells: this.areaModel.getCells()
    }
  }

  private handleKeyDown({ code }) {
    switch (code) {
      case 'ArrowUp':
        this.areaModel.pushMovementToSnake(Direction.Up)
        break
      case 'ArrowDown':
        this.areaModel.pushMovementToSnake(Direction.Down)
        break
      case 'ArrowLeft':
        this.areaModel.pushMovementToSnake(Direction.Left)
        break
      case 'ArrowRight':
        this.areaModel.pushMovementToSnake(Direction.Right)
        break
    }
    // start snake movement
    if (!this.areaModel.areRunnersRunning()) {
      this.areaModel.startRunners()
    }
  }

  private componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  private componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this))
  }

  public render() {
    const cells: ICell[] = []
    for (const [key, value] of this.state.cells.entries()) {
      cells.push({
        key,
        thing: value,
      })
    }
    const widthWithOffset: number = (CellSize.Size * this.props.areaModel.columns) + (CellSize.Offset * this.props.areaModel.columns)
    const width: string = `${widthWithOffset}px`
    const allCells = cells.map(({ key, thing }: ICell) => (
      <Cell key={key}>
        {thing !== null ? thing.getUiElement() : null}
      </Cell>
    ))
    return (
      <section
        className={css.area}
        style={{
          width,
        }}
      >
      {allCells}
      </section>
    )
  }
}
