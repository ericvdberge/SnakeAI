/**
 * The interface of the Neural Network
 */
export interface INeuralNetwork {
    options: INeuralNetworkOptions 
    layerStates: ILayerState[],
    layers: ILayer[]
}

/**
 * The interface for the options going into the neural network
 */
export interface INeuralNetworkOptions {
    structure : number[]
}

/**
 * The interface for a Neural Network layer
 */
export interface ILayer  {
    weights: number[][]
    biases: number[]

    forward(): ILayerState
    backward(dvalues: number[]): void
}

export interface ILayerState {
    inputs: number[]
    weights: number[][];
    biases: number[]
    outputs: number[][]
}

/**
 * The interface for an activation function
 */
export interface IActivationFunction {
    (): { 
        forward: (x: number[][]) => number[][]  //forward for creating a neural network
        backward: (x: any) => void; //backward for doing backpropagation
    }
}

/**
 * The interface for the apple state
 */
export interface IApple {
    size: number,
    position: {
        x: number,
        y: number
    }
}

/**
 * The interface for the game state
 */
export interface IGame {
    gridSize: number,
    framesPerSecond: number,
    isGameOver: boolean,
}

/**
 * The interface for the snake state
 */
export interface ISnake {
    size: number,
    speed: IPos
    head: IPos,
    body: Array<IPos>
}

/**
 * The interface for a position, used by multiple interfaces
 */
export interface IPos {
    x: number,
    y: number
}

/**
 * The interface for the playground (drawing point)
 */
export interface IPlayGround extends CanvasRenderingContext2D {}

/**
 * The interface for the controls
 */
export interface IKeys {
    left: string,
    right: string,
    down: string,
    up: string
}
