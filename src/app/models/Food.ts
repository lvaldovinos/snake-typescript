import Mouse from './Mouse'

export default class Food {
  private mouses: Map<string, Mouse>
  constructor() {
    this.mouses = new Map<string, Mouse>()
  }

  get size(): number {
    return this.mouses.size
  }

  public getAll(): Map<string, Mouse> {
    return this.mouses
  }

  public addMouse(mouse: Mouse): Food {
    this.mouses.set(mouse.getCoordinateString(), mouse)
    return this
  }

  public isMouseInCoordinate(coordinateKey: string): boolean {
    return this.mouses.has(coordinateKey)
  }

  public getMouseInCoordinate(coordinateKey: string): null | Mouse {
    if (!this.isMouseInCoordinate(coordinateKey)) return null
    return this.mouses.get(coordinateKey)
  }

  public removeMouse(coordinateKey: string): Food {
    this.mouses.delete(coordinateKey)

    return this
  }

  public clear(): Food {
    this.mouses = new Map<string, Mouse>()
    return this
  }
}
