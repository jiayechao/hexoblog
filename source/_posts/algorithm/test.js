---
abbrlink: 573969b7
---
// var getLeastNumbers = function(arr, k) {
//  arr.sort((a,b) => a-b)
//  return arr.slice(0, k)
// };
var getLeastNumbers = function(arr, k) {
  arr.sort((a,b) => a-b)
  return arr.slice(0, k)
};
let re = getLeastNumbers([3,2,1], 2)
console.log(re)