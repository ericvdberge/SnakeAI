import { dot, multiply, sum, matrix, transpose, flatten } from 'mathjs'
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
export const useNeuralNetwork = (options: INeuralNetworkOptions, input: number[][]) => {
    neuralNetwork.options = options
    init(input)

    return {
        ...neuralNetwork,
        createLayer
    }
}

/**
 * 
 * @returns the layers of the model
 */
const init = (input: number[][]): void => {
    //create model
    const { reluActivation, softmaxActivation } = useActivationFunction();
    const { structure } = neuralNetwork.options as INeuralNetworkOptions;

    let inputs: number[][] = input
    let layerStates: ILayerState[] = [] //information for view
    let layers: ILayer[] = [] //full information

    for(let i = 0; i < structure.length; i++)
    {
        const activation = i != structure.length - 1 
            ? reluActivation as IActivationFunction 
            : softmaxActivation as IActivationFunction

        let layer: ILayer = createLayer(inputs, undefined, undefined, structure[i])
        let layerState: ILayerState = layer.forward()
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
const createLayer = (inputs: number[][], weights: number[][], biases: number[], nrOfNeurons: number): ILayer => { 
    if(weights == undefined)
        weights = generateWeights(inputs[0].length, nrOfNeurons)
    
    if(biases == undefined)
        biases = generateBiases(nrOfNeurons)

    let dweights: number[][] = []
    let dbiases: number[] = []
    let dinputs: number[][] = [] 

    const forward = () => {
        /**
         * validate
        */
        if(weights.length != biases.length) {
            throw new Error("The neural network does not have as much biases as the number of neurons")
        }

        if(weights[0].length != inputs[0].length) {
            throw new Error("The neural network does not have as weight connection as inputs")
        }
        
        /**
         * calculate the outputs
         */
        
        const outputs = inputs.map(input => 
            weights.map((w, i) => {
                return dot(w, input) + biases[i]
            })
        )

        return {
            inputs: inputs,
            weights: weights,
            biases: biases,
            outputs: outputs,
        }
    }

    const backward = (dprev: number[][]) => {
        const dinputs: number[][] = [];
        let dweights: number[][] = [];
        let dbiases: number[] = [];

        const numSamples = inputs.length;

        // Calculate dinputs
        for (let i = 0; i < numSamples; i++) {
            const dinput: number[] = [];
            for (let j = 0; j < weights[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < dprev[i].length; k++) {
                sum += dprev[i][k] * weights[k][j];
            }
            dinput.push(sum);
            }
            dinputs.push(dinput);
        }

        dweights = [];
        for (let i = 0; i < inputs[0].length; i++) {
            const weightsRow = [];
            for (let j = 0; j < dprev[0].length; j++) {
                const sum = dprev.reduce((acc, row) => acc + row[j], 0);
                weightsRow.push(sum);
            }
            dweights.push(weightsRow);
        }
        dweights = dweights.slice(0, weights.length); // Trim the extra row if present

        for (let i = 0; i < biases.length; i++) {
            let sum = 0;
            for (let j = 0; j < numSamples; j++) {
            sum += dprev[j][i];
            }
            dbiases.push(sum);
        }

        return {
            dinputs,
            dweights,
            dbiases
        };

        // // Gradients on parameters
        // dweights = [];
        // for (let i = 0; i < inputs[0].length; i++) {
        //     const weightsRow = [];
        //     for (let j = 0; j < dvalues[0].length; j++) {
        //     const sum = dvalues.reduce((acc, row) => acc + row[j], 0);
        //     weightsRow.push(sum);
        //     }
        //     dweights.push(weightsRow);
        // }

        // // Calculate sum along the first axis (column-wise sum)
        // dbiases = dvalues.reduce((acc, row) => {
        //     return acc.map((sum, i) => sum + row[i]);
        // }, new Array(dvalues[0].length).fill(0));

        // // Gradient on values
        // dinputs = [];
        // for (let i = 0; i < dvalues.length; i++) {
        //     const inputsRow = [];
        //     for (let j = 0; j < weights[0].length; j++) {
        //         let sum = 0;
        //         for (let k = 0; k < weights.length; k++) {
        //             sum += dvalues[i][k] * weights[k][j];
        //         }
        //         inputsRow.push(sum);
        //     }
        //     dinputs.push(inputsRow);
        // }

        // return {
        //     dinputs: dinputs, 
        //     dweights: dweights, 
        //     dbiases: dbiases
        // }
        
    };

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
const generateWeights = (inputs: number, nrOfNeurons: number): number[][] => {
    let weights = [] as number[][]

    //generate weights
    for(let i = 0; i < nrOfNeurons; i++)
    {
        let weightsForOneNeuron : number[] = []
        for(let j = 0; j < inputs; j++)
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