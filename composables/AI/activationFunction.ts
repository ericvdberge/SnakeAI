export const useActivationFunction = () => {
    return {
        reluActivation,
        steppingActivation,
        signmoidActivation,
    }
}

/**
 * 
 * @param {number} x - a number (in form of weight, bias or output value) 
 * @returns 0 or x
 */
const reluActivation = (x: number): number =>  {
    return Math.max(...[0, x] as number[])
}

/**
 * 
 * @param {number} x - a number (in form of weight, bias or output value) 
 * @returns 0 or 1
 */
const steppingActivation = (x: number): number => {
    if(x > 0) return 1
    else return 0
}

/**
 * 
 * @param {number} x - a number (in form of weight, bias or output value) 
 * @Returns an exponentional value
 */
const signmoidActivation = (x: number): number => {
    return 1 / (1 + Math.exp(-x))
}