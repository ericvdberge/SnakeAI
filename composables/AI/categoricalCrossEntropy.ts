import { log, exp, sum, mean, subset, index as Index } from 'mathjs'

export const useCategoricalCrossEntropy = () => {
    let dinputs: number[] = []
    let output: number[] = []

    const forward = (y_pred: number[][], y_true: number[]): number => {
        const lowerBound = 1e-7;
        const upperBound = 1 - 1e-7;
    
        const neg_log = y_pred.map((_, index) => {
            //clip value to value a little bit bigger then 0, because -log(0) = infinity
            let x = y_pred[index][y_true[index]]
            if (x < lowerBound) {
                x = lowerBound;
            } else if (x > upperBound) {
                x = upperBound;
            }
            return -log(x)
        })
        const average_loss = mean(neg_log)
        return average_loss
    }

    const backward = (dvalues: number[], y_true: number[] | number[][]) => {
        // Number of samples
        const samples = dvalues.length;

        // Number of labels in every sample
        // We'll use the first sample to count them
        const labels = dvalues[0]

        // If labels are sparse, turn them into one-hot vector
        if (Array.isArray(y_true[0])) {
            y_true.map((index) =>
                Array.from({ length: labels }, (_, i) => (i === index ? 1 : 0))
            );
        }

        dinputs = dvalues.map((value, i) => -y_true[i] / value)
        dinputs = dinputs.map((value) => value / samples)
    }

    return {forward, backward}
    
}