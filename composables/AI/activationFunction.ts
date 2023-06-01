import { IActivationFunction } from '../contracts'
/**
 * 
 * @returns all activation functions related to neural networks
 */
export const useActivationFunction = () => {
    return {
        reluActivation,
        steppingActivation,
        signmoidActivation,
        softmaxActivation
    }
}

/**
 * 
 * @param {number} x - a number (in form of weight, bias or output value) 
 * @returns a vector of 0 or x values
 */
const reluActivation: IActivationFunction = () => {
    const forward = (x: number[]) => {
        x = x.map(number => 
            Math.max(...[0, number] as number[])
        )
        return x
    }
    const backward = (x: number[]) => {
        x = x.map(number => 
            //todo
            number / 2
        )
        return x
    }

    return { forward, backward }
}

/**
 * 
 * @param {number} x - a number (in form of weight, bias or output value) 
 * @returns a vector of 0 or 1 values
 */
const steppingActivation: IActivationFunction = () => {
    const forward = (x: number[]) => {
        x = x.map(number => 
            number > 0 ? 1 : 0
        )
        return x
    }

    const backward = (x: number[]) => {
        x = x.map(number => 
            number > 0 ? 1 : 0
        )
        return x
    }
    
    return { forward, backward }
}

/**
 * 
 * @param {number} x - a number (in form of weight, bias or output value) 
 * @Returns a vector of exponentional values
 */
const signmoidActivation: IActivationFunction = () => {
    const forward = (x: number[]) => {
        x = x.map(number => 
            1 / (1 + Math.exp(-number))
        )
        return x
    }
    
    const backward = (x: number[]) => {
        x = x.map(number => 
            1 / (1 + Math.exp(-number))
        )
        return x;
    }
    
    return  { forward, backward }
}

/**
 * 
 * @param x  - a number (in form of weight, bias or output value)
 * @returns a vector of values between 0 and 1
 */
const softmaxActivation: IActivationFunction = () => {
    const forward = (x: number[]) => {
        x = x.map(number => 
            Math.exp(number)
        )
        
        const sumExponential = x.reduce((a, b) => a + b, 0)

        x = x.map(number => 
            number / sumExponential
        )
        return x
    }

    const backward = (x: number[]) => {
        x = x.map(number => 
            1 / (1 + Math.exp(-number))
        )
        return x;
    }

    return  { forward, backward }
}