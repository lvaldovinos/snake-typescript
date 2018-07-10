import * as React from 'react'
import SnakePart from '../models/SnakePart'

class SnakeHeadCharacter extends React.Component<{}, {}> {
  render() {
    return (
      <div>@</div>
    )
  }
}

export default class SnakeHead extends SnakePart {
  public getUiElement() {
    return <SnakeHeadCharacter />
  }
}
