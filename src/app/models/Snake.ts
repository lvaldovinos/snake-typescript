import Coordinate from './Coordinate'
import Direction from './directions'
import SnakeHead from '../components/SnakeHead'
import SnakeTail from '../components/SnakeTail'
import SnakeBody from '../components/SnakeBody'
import SnakePart from './SnakePart'

type EachBodyPartCallback = (snakePart: SnakePart) => void

interface HistoryPoint {
  coordinateString: string,
  direction: Direction
}

export default class Snake {
  private lastTail: null | SnakeTail
  private lastMovement: null | HistoryPoint
  private movements: Map<string, Direction>
  private head: SnakeHead
  private body: Array<SnakeBody>
  private tail: SnakeTail
  private defaultCoordinate: Coordinate
  private defaultDirection: Direction

  constructor(defaultCoordinate: Coordinate, defaultDirection: Direction) {
    this.lastTail = null
    this.lastMovement = null
    this.movements = new Map<string, Direction>()
    this.defaultCoordinate = defaultCoordinate
    this.defaultDirection = defaultDirection
    this.createDefaultBody()
  }

  private cloneDefaultCoordinate(): Coordinate {
    return new Coordinate(this.defaultCoordinate.coordinateX, this.defaultCoordinate.coordinateY)
  }

  private pointDefaultBody(): Snake {
    const direction: Direction = this.defaultDirection * -1

    this.tail = new SnakeTail(this.cloneDefaultCoordinate(), direction)
    const body = new SnakeBody(this.cloneDefaultCoordinate(), direction)
    this.tail.move()
    this.tail.move()
    body.move()
    this.body.push(body)
    this.tail.currentDirection = this.defaultDirection
    body.currentDirection = this.defaultDirection

    return this
  }
  
  private createDefaultBody(): Snake {
    this.head = new SnakeHead(this.cloneDefaultCoordinate(), this.defaultDirection)
    this.body = []
    this.pointDefaultBody()

    return this
  }

  private eachBodyPart(callback: EachBodyPartCallback): Snake {
    for (let index = 0; index < this.body.length; index += 1) {
      callback(this.body[index])
    }

    return this
  }

  private movePart (part: SnakePart, changeDirectionCallback = () => {}): Snake {
    const coordinateString: string = part.getCoordinateString()
    if (this.movements.has(coordinateString)) {
      const newDirection = this.movements.get(coordinateString)
      part.currentDirection = newDirection
      changeDirectionCallback()
    } else if (this.lastMovement && this.lastMovement.coordinateString === coordinateString) {
      const newDirection = this.lastMovement.direction
      part.currentDirection = newDirection
      changeDirectionCallback()
    }

    part.move()

    return this
  }

  public pushMovement(direction: Direction): Snake {
    const headCoordinate: string = this.head.getCoordinateString()
    this.movements.set(headCoordinate, direction)

    return this
  }

  public move(): Snake {
    const lastTailCoordinate: Coordinate = new Coordinate(this.tail.currentCoordinate.coordinateX, this.tail.currentCoordinate.coordinateY)
    this.lastTail = new SnakeTail(lastTailCoordinate, this.tail.currentDirection)

    this.movePart(this.head)
    this.eachBodyPart(bodyPart => this.movePart(bodyPart)) 
    this.movePart(this.tail, () => {
      this.lastMovement = {
        coordinateString: this.tail.getCoordinateString(),
        direction: this.movements.get(this.tail.getCoordinateString())
      }
      this.movements.delete(this.tail.getCoordinateString())
    })

    return this
  }

  public get fullBody(): Map<string, SnakePart> {
    const fullBody = new Map<string, SnakePart>()
    fullBody.set(this.head.getCoordinateString(), this.head)
    fullBody.set(this.tail.getCoordinateString(), this.tail)

    this.eachBodyPart(bodyPart => fullBody.set(bodyPart.getCoordinateString(), bodyPart))

    return fullBody
  }

  public get currentHead(): SnakeHead {
    return this.head
  }

  public get currentBody(): Array<SnakeBody> {
    return this.body
  }

  public get currentTail(): SnakeTail {
    return this.tail
  }

  public grow(): Snake {
    // get tail direction
    const tailDirection: Direction = this.tail.currentDirection
    // get tail coordinate
    const tailCoordinate: Coordinate = new Coordinate(this.tail.currentCoordinate.coordinateX, this.tail.currentCoordinate.coordinateY)
    // create new body part
    const newBodyPart = new SnakeBody(tailCoordinate, tailDirection)
    
    this.body.push(newBodyPart)
    
    const currentTailDirection = this.tail.currentDirection

    if (this.lastTail === null) {
      this.tail.currentDirection = this.tail.currentDirection * -1
      this.tail.move()
      this.tail.currentDirection = currentTailDirection
    } else {
      this.tail = this.lastTail
    }


    return this
  }

  public hasHeadCrashed(): boolean {
    const headCoordinateString: string = this.head.getCoordinateString()
    // check if head and tail are in same Coordinate
    if (this.tail.getCoordinateString() === headCoordinateString) return true
    // check if head and body are in same Coordinate
    return !this.body.every(bodyPart => bodyPart.getCoordinateString() !== headCoordinateString)
  }

  public isCoordinateAvailable(coordinateString: string): boolean {
    if (this.head.getCoordinateString() === coordinateString) return false
    if (this.tail.getCoordinateString() === coordinateString) return false
    return this.body.every(bodyPart => bodyPart.getCoordinateString() !== coordinateString)
  }
}
