/**
 * 
 * @returns all activation functions related to neural networks
 */
export const useActivationFunction = () => {
    return {
        reluActivation,
        steppingActivation,
        signmoidActivation,
        sofmaxActivation
    }
}

/**
 * 
 * @param {number} x - a number (in form of weight, bias or output value) 
 * @returns 0 or x
 */
const reluActivation = (x: number[]): number[] =>  {
    x.map(number => 
        Math.max(...[0, number] as number[])
    )
    return x; 
}

/**
 * 
 * @param {number} x - a number (in form of weight, bias or output value) 
 * @returns 0 or 1
 */
const steppingActivation = (x: number[]): number[] => {
    x.map(number => 
        number > 0 ? 1 : 0
    )
    return x;
}

/**
 * 
 * @param {number} x - a number (in form of weight, bias or output value) 
 * @Returns an exponentional value
 */
const signmoidActivation = (x: number[]): number[] => {
    x.map(number => 
        1 / (1 + Math.exp(-number))
    )
    return x
}

const sofmaxActivation = (x: number[]): number[] => {
    x = x.map(number => 
        Math.exp(number)
    )
    
    const sumExponential = x.reduce((a, b) => a + b, 0)

    x = x.map(number => 
        number / sumExponential
    )

    return x
}