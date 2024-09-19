const fs = require('fs');

// Lagrange Interpolation function to find coefficients
function lagrangeInterpolation(points) {
    const n = points.length;
    const coefficients = Array(n).fill(0);

    // Lagrange basis polynomial computation
    for (let i = 0; i < n; i++) {
        const [x_i, y_i] = points[i];
        const basis = Array(n).fill(1); // Initialize basis polynomial coefficients

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                for (let d = n - 1; d > 0; d--) {
                    basis[d] = basis[d] * (x_i - points[j][0]) / (points[i][0] - points[j][0]);
                    if (d > 0) basis[d] += basis[d - 1];
                }
                basis[0] *= y_i; // Multiply by the y-value
            }
        }

        for (let d = 0; d < n; d++) {
            coefficients[d] += basis[d];
        }
    }

    return coefficients;
}

// Function to decode y-value from a given base
function decodeValue(value, base) {
    return parseInt(value, base);
}

// Main function to process the input
function main(input) {
    const points = [];
    for (const [key, value] of Object.entries(input)) {
        const x = parseInt(key);
        const y = decodeValue(value.value, parseInt(value.base));
        points.push([x, y]);
    }

    const coefficients = lagrangeInterpolation(points);
    const constantTerm = coefficients[0];

    return {
        coefficients,
        constantTerm
    };
}

// Example input JSON
const inputJSON = {
    "2": { "base": "2", "value": "111" }, // y = 7 in decimal
    "3": { "base": "2", "value": "101" }, // y = 5 in decimal
    "4": { "base": "2", "value": "110" }  // y = 6 in decimal
};

const result = main(inputJSON);
console.log("Coefficients:", result.coefficients);
console.log("Constant Term (c):", result.constantTerm);
