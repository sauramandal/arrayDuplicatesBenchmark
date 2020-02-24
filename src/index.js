const testMethod = (array, method, assertedLength) => {
  let t = Date.now();
  method(array);
  t = Date.now() - t;
  console.log(`${method.name} took: ${t}ms`);
};

const useSet = arr => {
  return [...new Set(arr)];
};

const useReduce = arr => {
  return arr.reduce((x, y) => (x.includes(y) ? x : [...x, y]), []);
};

const useFilter = arr => {
  return arr.filter((elem, pos, array) => {
    return array.indexOf(elem) === pos;
  });
};

// Scenario 1: lots of duplicates
let iterations = 600000;
let strings = [
  "Paris",
  "New York",
  "Paris",
  "Berlin",
  "Mumbai",
  "San Diego",
  "Berlin"
];

let ar = [];
for (let i = 0; i < iterations; i++) ar.push(...strings);

testMethod(ar, useReduce, 5);
testMethod(ar, useFilter, 5);
testMethod(ar, useSet, 5);

// Scenario 2: Hardly any or no duplicates at all
let iter = 500000;
ar = [];

for (let i = 0; i < iter; i++) ar.push(i);

testMethod(ar, useFilter, iter);
testMethod(ar, useSet, iter);
testMethod(ar, useReduce, iter);
