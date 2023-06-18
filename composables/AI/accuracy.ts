import * as math from 'mathjs';

export const useAccuracy = (y_pred: number[][], y_true: number[]) => {
    const predictions = y_pred.map((row) => {
        return row.indexOf(Math.max(...row));
    });

    const accuracy = predictions.reduce((sum, prediction, index) => {
        return sum + (prediction === y_true[index] ? 1 : 0);
    }, 0) / predictions.length;

    return math.round(accuracy, 2)
}