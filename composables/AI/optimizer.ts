import { ILayer } from '../contracts'

export const useSGDOptimizer = (learningRate: number) => {
    if(!learningRate) learningRate = 0.001
    const updateParams = (inputs: number[][], weights: number[][], biases: number[], dweights: number[][], dbiases: number[]) => {
        const {createLayer} = useNeuralNetwork({
            structure: []
        }, []); 

        const updatedWeights = weights.map((row, i) =>
            row.map((value, j) => value - learningRate * dweights[j][i])
        );

        const updatedBiases = biases.map((value, i) =>
            value - learningRate * dbiases[i]
        );

        return createLayer(inputs, updatedWeights, updatedBiases, 3);
    }
    return {updateParams}
}