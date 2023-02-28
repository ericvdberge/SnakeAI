import { transpose, multiply, dot, sum, re } from 'mathjs'

/**
 * research:
 * https://towardsdatascience.com/the-beginners-glossary-of-neural-network-terms-a9617354078
 */

/**
 * Terminology:
 * 
 * Model:
 * Artificial Neural Network (ANN)
 *  a stack of simple learning algorithms (called layers) 
 *  that sequentually process the input, producing an output
 * 
 * Layers (called dense layer):
 * Input layer,
 * Hidden layer
 * Output layer,
 * 
 * Layer components:
 * Neuron
 * Weights
 * Biases
 * 
 * Functions:
 * Activation function
 * ReLU -> simpelest way to make something non-linear
 * Loss function -> calculate loss to adapt the weights and biasses
 * 
 * Weights + Biases = Unique tunable params
 */
let network = {
    weights: [],
    biases: [],
    /**
     * The data will be represented in a matrix, 
     * because we will have multiple rows, called layers
     */
    // matrix: [
    //     [0,0,0,0]
    //     [0,0,0,0]
    //     [0,0,0,0]
    // ]
}

export const useNeuralNetwork = () => {
    return {
        reluActivation,
        createLayer
    }
}

/**
 * 
 * @param {number} x 
 * @returns 0 or x
 */
const reluActivation = (x: number) =>  {
    if(x > 0) return x
    return 0
}

/**
 * 
 * @param {number} x - a number (in form of weight, bias or output value) 
 * @returns 0 or 1 => stepper function
 */
const steppingActivation = (x: number) => {
    if(x > 0) return 1
    else return 0
}

/**
 * 
 * @param x 
 */
const signmoidActivation = (x: number) => {

}

/**
 * 
 * @param {number} nrOfInputs - the number of input values going into this layer
 * @param {number} nrOfNeurons - the number of neurons in the layer
 * @returns the calculated output values of the layer
 */
const createLayer = (nrOfInputs: number, nrOfNeurons: number): number[] => {
    let inputs = [] as number[]
    let weights = [] as number[][]
    let biases = [] as number[]

    //generate inputs
    for(let i = 0; i < nrOfInputs; i++) 
    {
        const randomNumber: number = generateRandomNumber()
        inputs.push(randomNumber)
    }

    //generate weights
    let partialArray : number[] = []
    var nrOfParams: number = nrOfInputs * nrOfNeurons
    for(let i = 0; i < nrOfParams; i++)
    {
        const randomNumber = generateRandomNumber()
        partialArray.push(randomNumber)
        if((i + 1) % nrOfInputs == 0) //generate a vector after the number of inputs
        {
            weights.push(partialArray)
            partialArray = []
        }
    }

    //generate biases
    for(let i = 0; i < nrOfNeurons; i++) 
    {
        const randomNumber = generateRandomNumber()
        biases.push(randomNumber)
    }

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
        // Math.round(
            dot(w, inputs) + biases[i]
        // )
    )

    return outputs.map(
        output => steppingActivation(output)
    )
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