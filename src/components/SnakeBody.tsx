import * as React from 'react'
import SnakePart from '../models/SnakePart'

class SnakeBodyCharacter extends React.Component<{}, {}> {
  render() {
    return (
      <div>O</div>
    )
  }
}

export default class SnakeBody extends SnakePart {
  public getUiElement() {
    return <SnakeBodyCharacter />
  }
}
