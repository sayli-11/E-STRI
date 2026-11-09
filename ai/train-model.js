const MLR = require('ml-regression-multivariate-linear');
const trainingData = require('./training-data');

// Input columns:
// 1. Number of clothes
// 2. Service code
// 3. Urgency code

const X = trainingData.map(row => [
    row[0],
    row[1],
    row[2]
]);

// Output:
// Price

const Y = trainingData.map(row => [
    row[3]
]);

// Create and train the model
const model = new MLR(X, Y);

// Test prediction
const testInput = [
    [3, 1, 1]
];

const prediction = model.predict(testInput);

console.log("AI MODEL TRAINED SUCCESSFULLY!");
console.log("--------------------------------");
console.log("Test Input:");
console.log("Number of clothes: 3");
console.log("Service: Ironing");
console.log("Urgency: Urgent");

console.log("--------------------------------");
console.log("Predicted Price: ₹" + prediction[0][0].toFixed(2));