import Coordinate from './Coordinate'
import Direction from './directions'
import Mouse from './Mouse'
import Food from './Food'
import Snake from './Snake'
import SnakePart from './SnakePart'
import SnakeHead from '../components/SnakeHead'

interface AreaConstructorArguments {
  initialSnakeCoordinate: Coordinate,
  columns: number,
  rows: number,
  direction: Direction,
  foodCreationRate?: number,
  micePerTick?: number
}

interface AreaState {
  cells: Map<string, null | Mouse | SnakePart>
}

export default class Area {
  private columns: number
  private rows: number
  private food: Food
  private snake: Snake
  private foodRunner: number | null
  private snakeRunner: number | null
  private foodCreationRate: number
  private micePerTick: number
  private defaultDirection: Direction
  private initialSnakeCoordinate: Coordinate
  private _setState: (state?: AreaState) => void

  constructor({
    initialSnakeCoordinate,
    columns = 10,
    rows = 10,
    direction = Direction.Right,
    foodCreationRate = 3000,
    micePerTick = 3,
  }: AreaConstructorArguments) {
    this.defaultDirection = direction
    this.initialSnakeCoordinate = initialSnakeCoordinate
    this.snake = new Snake(initialSnakeCoordinate, direction)
    this.columns = columns
    this.rows = rows
    this.foodCreationRate = foodCreationRate
    this.micePerTick = micePerTick
    this.food = new Food()
    this.foodRunner = null
    this.snakeRunner = null
    this._setState = () => {}
  }

  set setState(setState: () => void) {
    this._setState = setState
  }

  get areaFood(): Food {
    return this.food
  }

  get areaMicePerTick(): number {
    return this.micePerTick
  }

  public render(): Area {
    this._setState({
      cells: this.getCells(),
    })

    return this
  }

  public getCells(): Map<string, null | Mouse | SnakePart> {
    const limit = this.columns * this.rows
    let rowIndex = 0
    let columnIndex = 0
    const cells: Map<string, null | Mouse | SnakePart> = new Map<string, null | Mouse | SnakePart>()
    const snakeFullBody = this.snake.fullBody

    // let's avoid n^n
    for (let index: number = 0; index < limit; index += 1) {
      const key = `${columnIndex}-${rowIndex}`

      // render food & snake
      let child: null | Mouse | SnakePart

      if (this.food.isMouseInCoordinate(key)) {
        child = this.food.getMouseInCoordinate(key)
      } else if (snakeFullBody.has(key)) {
        child = snakeFullBody.get(key)
      } else {
        child = null
      }

      cells.set(key, child)

      if (columnIndex === this.columns - 1) {
        rowIndex += 1
        columnIndex = 0
      } else {
        columnIndex += 1
      }
    }

    return cells
  }

  public getRandomCoordinate(): null | Coordinate {
    const randomX: number = Math.floor(Math.random() * this.columns)
    const randomY: number = Math.floor(Math.random() * this.rows)
    if (this.food.isMouseInCoordinate(`${randomX}-${randomY}`)) return null
    if (!this.snake.isCoordinateAvailable(`${randomX}-${randomY}`)) return null
    return new Coordinate(randomX, randomY)
  }

  private restartGame(msg: string): Area {
    // destroy current runners
    this.destroyRunners()
    // move snake to initial position
    this.snake = new Snake(this.initialSnakeCoordinate, this.defaultDirection)
    // clear food
    this.food.clear()
    alert(msg)
    
    return this
  }

  public createSnakeMoveTick(): Area {
    this.snake.move()

    if (this.isSnakeOutOfBoundaries() || this.snake.hasHeadCrashed()) {
      this.restartGame('you lost, sorry!! please click ok to keep playing')
    }

    if (this.shouldSnakeGrow()) {
      this.snake.grow()
      this.removeMouse()
    }

    // render area
    this.render() 

    return this
  }

  public createFoodTick(): Area {
    while (this.food.size < this.micePerTick) {
      // get random coordinate
      const randomCoordinate: Coordinate = this.getRandomCoordinate()
      if (randomCoordinate !== null) {
        this.food.addMouse(new Mouse(randomCoordinate))
      }
    }

    // render area
    this.render()

    return this
  }

  public get areaSnake(): Snake {
    return this.snake
  }

  public startRunners(): Area {
    this.foodRunner = window.setInterval(() => this.createFoodTick(), this.foodCreationRate)
    this.snakeRunner = window.setInterval(() => this.createSnakeMoveTick(), 200)
    return this
  }

  public areRunnersRunning(): boolean {
    return this.snakeRunner !== null && this.foodRunner !== null
  }

  public destroyRunners(): Area {
    window.clearInterval(this.foodRunner)
    window.clearInterval(this.snakeRunner)
    this.foodRunner = null
    this.snakeRunner = null
    return this
  }

  public pushMovementToSnake(direction: Direction): Area {
    this.snake.pushMovement(direction)
    return this
  }

  public isSnakeOutOfBoundaries(): boolean {
    const headCoordinate: Coordinate = this.snake.currentHead.currentCoordinate
    if (headCoordinate.coordinateX < 0 || headCoordinate.coordinateY < 0) return true
    if (headCoordinate.coordinateX >= this.columns || headCoordinate.coordinateY >= this.rows) return true
    return false
  }

  public shouldSnakeGrow(): boolean {
    const snakeHead: SnakeHead = this.snake.currentHead

    return this.food.isMouseInCoordinate(snakeHead.currentCoordinate.toString())
  }

  public removeMouse(): Area {
    const snakeHead: SnakeHead = this.snake.currentHead

    this.food.removeMouse(snakeHead.currentCoordinate.toString())

    return this
  }
}
