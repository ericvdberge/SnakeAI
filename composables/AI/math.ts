export const useMath = () => {
    return {
        multiply,
        dot,
		eye
        // transpose
    }
}

const multiply = (a: number[][], b:number[][]) => {
	return a.map((x: number[], i: number) => {
		return transpose(b).map((y: number[], k: number) => {
			return dot(x, y)
		});
	});
}

const dot = (a: number[], b: number[]) => a.reduce((sum: number, ai: number, i: number) => sum + ai * b[i], 0)

const transpose = function(a: number[][]) {
	return a[0].map((x: number,i: number) => {
		return a.map((y: number[],k: number) => {
			return y[i];
		})
	});
}

function eye(size: number) {
	const matrix = [];
  
	for (let i = 0; i < size; i++) {
	  const row = [];
	  for (let j = 0; j < size; j++) {
		row.push(i === j ? 1 : 0);
	  }
	  matrix.push(row);
	}
  
	return matrix;
}
  