/**
 * Contracts
 */
export type NeuralNetworkOptions = {
    structure : number[]
}

export type ActivationFunction = {
    (s: number[]): number[];
}