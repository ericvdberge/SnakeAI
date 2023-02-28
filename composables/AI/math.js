export const useMath = () => {
    return {
        multiply,
        dot,
        // transpose
    }
}

const multiply = function(a,b) {
	return a.map(function(x,i) {
		return transpose(b).map(function(y,k) {
			return dot(x, y)
		});
	});
}

const dot = (a, b) => a.reduce((sum, ai, i) => sum + ai * b[i], 0)

const transpose = function(a) {
	return a[0].map(function(x,i) {
		return a.map(function(y,k) {
			return y[i];
		})
	});
}