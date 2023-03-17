/**
 * Contracts
 */


/**
 * The interface of the Neural Network
 */
export interface INeuralNetwork {
    options: NeuralNetworkOptions 
    layers: ILayer[]
}

/**
 * The interface for the options going into the neural network
 */
export type NeuralNetworkOptions = {
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
export interface ActivationFunction {
    (x: number[]): number[]
}
