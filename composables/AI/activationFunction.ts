import { IActivationFunction } from '../contracts'
import { subtract, diag, dot, matrix, map, sum, transpose, multiply, round, dotMultiply, reshape, subset} from 'mathjs'
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
    let dinputs: number[] = [] 

    const forward = (x: number[][]) => {
        x.map(number_array => 
            number_array.map(number => 
                Math.max(...[0, number] as number[])
            )
        )
        
        return x
    }
    const backward = (x: number[]) => {
        //derivative of the relu function
        dinputs = [...x]
        dinputs = x.map(number => 
            //todo
            number <= 0  ? 0 : number
        )
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
    let dinputs: number[][] = [];
    let output: number[][] = [];
  
    const forward = (x: number[][]) => {
      output = x.map((a) => {
        const expValues = a.map((number) => Math.exp(number))
        const sumExponential = expValues.reduce((a, b) => a + b, 0);
        if (sumExponential <= 0)
            return expValues.map(_ => 1 / expValues.length);
        else
            return expValues.map(number => number / sumExponential);
      });
  
      return output;
    };
  
    const backward = (dvalues: number[][]) => {
        const numClasses = output[0].length;

        // Calculate Jacobian matrix of softmax
        const jacobian: number[][] = [];
        for (let i = 0; i < numClasses; i++) {
            const row: number[] = [];
            for (let j = 0; j < numClasses; j++) {
            if (i === j) {
                const softmax = output[i][j];
                row.push(softmax * (1 - softmax));
            } else {
                const softmax_i = output[i][j];
                const softmax_j = output[j][j];
                row.push(-softmax_i * softmax_j);
            }
            }
            jacobian.push(row);
        }

        // Multiply Jacobian matrix by dvalues
        const dinputs: number[][] = [];
        for (let i = 0; i < dvalues.length; i++) {
            const dinput: number[] = [];
            for (let j = 0; j < numClasses; j++) {
            let sum: number = 0;
            for (let k = 0; k < numClasses; k++) {
                sum += jacobian[k][j] * dvalues[i][k];
            }
            dinput.push(sum);
            }
            dinputs.push(dinput);
        }

        return dinputs;
        // dinputs = [];
        // for (let i = 0; i < output.length; i++) {
        //   const singleOutput = output[i];
        //   const singleDvalues = dvalues[i];
        //   const dweights = multiply(
        //     transpose([singleOutput]),
        //     [singleDvalues]
        //   );
    
        //   const dinput = multiply([singleDvalues], transpose(dweights));
        //   const dinputArray: number[] = [];
        //   for (let j = 0; j < dinput[0].length; j++) {
        //     dinputArray.push(dinput[0][j]);
        //   }
    
        //   dinputs.push(dinputArray);
        // }
        // return dinputs
    };
  
    return { forward, backward };
};

const useActivationSoftmaxLossCategoryCrossEntropy = () => {
    const softmax = softmaxActivation()
    const categoricalCrossEntropy = useCategoricalCrossEntropy()
    let output: number[] = []
    
    
    const forward = (inputs: any, y_true: any) => {
        output = softmax.forward(inputs)
        // return categoricalCrossEntropy.forward(output, y_true)
    }

    const backward = (dvalues: any, y_true: any) => {

    }
}