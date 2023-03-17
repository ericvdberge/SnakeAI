import { transpose, multiply, dot, sum, re } from 'mathjs'
import { ActivationFunction, NeuralNetworkOptions } from '../contracts'

/**
 * 
 * @param options - options to the neural network
 * @returns 
 */
export const useNeuralNetwork = (options: NeuralNetworkOptions) => {
    return {
        options,
        createLayer,
    }
}

/**
 * 
 * @param {number} inputs - the numbers of input values of the layer
 * @param {number} nrOfNeurons - the number of neurons in the layer
 * @returns the calculated output values of the layer
 */
const createLayer = (inputs: number[], nrOfNeurons: number, activationFunction: ActivationFunction): number[] => { 
    let weights = [] as number[][]
    let biases = [] as number[]

    weights = generateWeights(inputs, nrOfNeurons)
    biases = generateBiases(nrOfNeurons)
    
    /**
     * validate
     */
    if(weights.length != biases.length) {
        throw new Error("The neural network does not have as much biases as the number of neurons")
    }

    if(weights[0].length != inputs.length) {
        throw new Error("The neural network does not have as weight connection as inputs")
    }
    
    /**
     * calculate the outputs
     */
    const outputs = weights.map((w, i) => 
        dot(w, inputs) + biases[i]
    )

    return activationFunction(outputs)
}

/**
 * generateRandomNumber - a util function that generates a random number to initialize the model
 * @returns a value between -1 and 1
 */
const generateRandomNumber = (): number => {
    /**
     * math.random creates a value between 0 and 1
     * value times 2 gets a range between 0 and 2
     * and subtracting 1 to get a range between -1 and 1
     */
    return Math.random() * 2 - 1;
}

/**
 * 
 * @param inputs 
 * @param nrOfNeurons 
 * @returns 
 */
const generateWeights = (inputs: number[], nrOfNeurons: number): number[][] => {
    let weights = [] as number[][]

    //generate weights
    for(let i = 0; i < nrOfNeurons; i++)
    {
        let weightsForOneNeuron : number[] = []
        for(let j = 0; j < inputs.length; j++)
        {
            const randomNumber: number = generateRandomNumber()
            weightsForOneNeuron.push(randomNumber)
        }
        weights.push(weightsForOneNeuron)
    }

    return weights
}

/**
 * 
 * @param nrOfNeurons 
 * @returns 
 */
const generateBiases = (nrOfNeurons: number): number[] => {
    let biases = [] as number[]

    //generate biases
    for(let i = 0; i < nrOfNeurons; i++) 
    {
        const randomNumber: number = generateRandomNumber()
        biases.push(randomNumber)
    }

    return biases;
}