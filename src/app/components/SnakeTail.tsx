import * as React from 'react'
import SnakePart from '../models/SnakePart'

class SnakeTailCharacter extends React.Component<{}, {}> {
  render() {
    return (
      <div>/</div>
    )
  }
}

export default class SnakeTail extends SnakePart {
  public getUiElement() {
    return <SnakeTailCharacter />
  }
}
