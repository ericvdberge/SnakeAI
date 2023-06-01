import { log, exp, sum, mean } from 'mathjs'

export const useCategoricalCrossEntropy = (y_pred: number[][], y_true: number[]): number => {
    const lowerBound = 1e-7;
    const upperBound = 1 - 1e-7;

    // console.log(y_pred, y_true)
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