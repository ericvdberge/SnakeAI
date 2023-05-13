/**
 * The interface of the Neural Network
 */
export interface INeuralNetwork {
    options: INeuralNetworkOptions 
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
    inputs: number[]
    weights: number[][];
    biases: number[]
    outputs: number[]
}

/**
 * The interface for an activation function
 */
export interface IActivationFunction {
    (x: number[]): number[]
}

/**
 * Types for the game entities
 */
export interface IApple {
    size: number,
    position: {
        x: number,
        y: number
    }
}

export interface IGame {
    gridSize: number,
    framesPerSecond: number,
    isGameOver: boolean,
}

export interface IPos {
    x: number,
    y: number
}

export interface ISnake {
    size: number,
    speed: IPos
    head: IPos,
    body: Array<IPos>
}

export interface IPlayGround extends CanvasRenderingContext2D {}

export interface Ikeys {
    left: string,
    right: string,
    down: string,
    up: string
}
