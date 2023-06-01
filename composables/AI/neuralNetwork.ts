import { dot } from 'mathjs'
import { IActivationFunction, INeuralNetworkOptions, INeuralNetwork, ILayer, ILayerState } from '../contracts'
import { useActivationFunction } from '../AI/activationFunction'

let neuralNetwork: INeuralNetwork = {
    options: {} as INeuralNetworkOptions,
    layerStates: [] as ILayerState[],
    layers: [] as ILayer[]
}

/**
 * 
 * @param options - options to the neural network
 * @returns 
 */
export const useNeuralNetwork = (options: INeuralNetworkOptions) => {
    neuralNetwork.options = options
    init()

    return {
        ...neuralNetwork,
    }
}

/**
 * 
 * @returns the layers of the model
 */
const init = (): void => {
    //create model
    const { reluActivation, softmaxActivation } = useActivationFunction();
    const { structure } = neuralNetwork.options as INeuralNetworkOptions;

    let inputs = generateInputValues() as number[];
    let layerStates: ILayerState[] = [] //information for view
    let layers: ILayer[] = [] //full information

    for(let i = 0; i < structure.length; i++)
    {
        const activation = i != structure.length - 1 
            ? reluActivation as IActivationFunction 
            : softmaxActivation as IActivationFunction

        let layer: ILayer = createLayer()
        let layerState: ILayerState = layer.forward(inputs, structure[i], activation)
        // layerState.outputs = layerState.outputs.map(n => +parseFloat(n.toString()).toFixed(2)) // round of output values to make it readable
        
        layerStates.push(layerState)
        layers.push(layer)

        inputs = layerState.outputs
    }

    neuralNetwork.layerStates = layerStates
    neuralNetwork.layers = layers
}

/**
 * 
 * @param {number} inputs - the numbers of input values of the layer
 * @param {number} nrOfNeurons - the number of neurons in the layer
 * @returns the calculated output values of the layer
 */
const createLayer = (): ILayer => { 
    let weights: number[][] = []
    let biases: number[] = [] 

    const forward = (inputs: number[], nrOfNeurons: number, activationFunction: IActivationFunction) => {
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

        return {
            inputs: inputs,
            weights: weights,
            biases: biases,
            outputs: activationFunction().forward(outputs)
        }
    }

    const backward = () => {
        return;
    }

    return { forward, backward }
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

/**
 * 
 * @returns 
 */
const generateInputValues = () => {
    const { structure } = neuralNetwork.options;
    let inputs = [] as number[]
    for(let i = 0; i < structure[0]; i++) {
        const value = Math.random() * 2 - 1
        inputs.push(value)
    }
    return inputs
}