import * as React from 'react'
import css from '../styles/Cell.css'

interface IProps {
  children: React.ReactElement<{}>
}

export default class Cell extends React.Component<IProps, {}> {
  public render() {
    const width: string = `${CellSize.Size}px`
    const height: string = `${CellSize.Size}px`
    return (
      <section
        className={css.cell}
        style={{ width, height }}
      >
        {this.props.children}
      </section>
    )
  }
}

export enum CellSize {
  Size = 20,
  Offset = 2,
}
