"use strict";

// 1.
function summution(x, y) {
  return x + y;
}

const sum = summution(3, 5);
console.log("Summation :", sum);

// 2.
function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

const isPrimeNum = isPrime(7);
console.log(" prime number?", isPrimeNum);

// 3.
function reverseString(x) {
  let text = x.split("").reverse().join("");
  console.log("Reversed string (method 1):", text);
}

reverseString("hello");

// 4.
function getMax(arr) {
  let max = arr[0];

  for (let i = 0; i < arr.length; i++) {
    arr[i] > max ? (max = arr[i]) : max;
  }
  console.log("Maximum number in array:", max);
}

getMax([1, 2, 3, 9]);

// 5.
function filterArray(arr) {
  let evenNums = arr.filter((ele) => ele % 2 === 0);
  console.log("Even numbers in array:", evenNums);
}

let arr = [1, 2, 3, 4, 5, 6, 7];
filterArray(arr);

// 6.
function reverseString1(x) {
  let text = "";

  for (let i = x.length - 1; i >= 0; i--) {
    text += x[i];
  }
  console.log("Reversed string (method 2):", text);
}
reverseString1("route");

// 7.
function average(arr) {
  return arr.reduce((ele, acc) => acc + ele, 0) / arr.length;
}

const avg = average([1, 2, 6]);
console.log("Average of numbers in array:", avg);

// 8.
function checkWeekDay(day) {
  return day == 7 || day == 6 ? "weekend" : "weekday";
}

const checkDay = checkWeekDay(5);
console.log("Weekday or weekend: ", checkDay);

// 9.
function divisibleBy2or3(arr) {
  let divisables = arr.filter((ele) => ele % 2 == 0 || ele % 3 == 0);
  console.log("Numbers divisible by 2 or 3:", divisables);
}
divisibleBy2or3([1, 2, 3, 4, 5, 6, 7, 8, 9]);

// 10.
function findEleIndex(arr, ele) {
  return arr.findIndex((item) => item === ele);
}

const index = findEleIndex([12, 3, 45], 1);
console.log("Index of element 1 in array:", index);

// 11.
function factorial(n) {
  if (n < 0) return "Enter positive number";

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

const fact = factorial(5);
console.log("Factorial of 5:", fact);

// 12.
function returnKeys(obj) {
  return Object.keys(obj);
}

const keys = returnKeys({ name: "sarah", age: 21 });
console.log("Keys of the object:", keys);

// 13.
function returnUniqueNum(arr) {
  console.log("Unique numbers in array:", [...new Set(arr)]);
}

returnUniqueNum([1, 2, 3, 4, 3, 4, 56, 7]);

// 14.

function countOccurrences(str) {
  const occurrences = {};

  for (let char of str) {
    occurrences[char] = (occurrences[char] || 0) + 1;
  }

  return occurrences;
}

const result = countOccurrences("hello");
console.log("occurrence :", result);

// 15.
function sortNums(arr) {
  return arr.sort((a, b) => a - b);
}

console.log("Sorted numbers (ascending):", sortNums([1, 3, 5, 4]));

// 16.
function areAnagrams(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  const sortedStr1 = str1.split("").sort().join("");
  const sortedStr2 = str2.split("").sort().join("");

  return sortedStr1 === sortedStr2;
}

console.log("Are anagrams?", areAnagrams("listen", "silent"));

// 17. Car
function Car(year, model) {
  this.year = year;
  this.model = model;

  this.getDetails = function () {
    console.log(`Model: ${this.model}, Year: ${this.year}`);
  };
}

const car1 = new Car("2024", "Avio");
car1.getDetails();

// 19. C
function hasProperty(obj, prop) {
  return obj.hasOwnProperty(prop) ? true : false;
}

const hasProp = hasProperty({ name: "sarah", age: 21 }, "name");
console.log("Object has property:", hasProp);

// 20.
function calculate(num1, num2, operator) {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      if (num2 === 0) return "Cannot divide by zero";
      return num1 / num2;
    default:
      return "Invalid operator";
  }
}

console.log("Calculation (5 + 3):", calculate(5, 3, "+"));
console.log("Calculation (5 - 3):", calculate(5, 3, "-"));
