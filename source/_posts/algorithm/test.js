---
abbrlink: 573969b7
---
/**
 * @param {number[]} digits
 * @return {number[]}
 */
// var plusOne = function(digits) {
//   let len = digits.length
//   digits[len - 1]++
//   for(let i = 1; i <= len;i++){
//     if(digits[len - i] === 10) {
//       if(len === i) {
//         digits[i] = 0
//         digits[0] = 1
//       } else {
//         digits[len - i - 1]++
//         digits[len - i] = 0
//       }
//     } else {
//       break;
//     }
//   }
//   return digits
// }
var plusOne = function(digits) {
  let len = digits.length
  for(let i = len-1; i >=0; i--){
    if(digits[i] === 9) {
      digits[i] = 0
    } else {
      digits[i]++
      break
    }
  }
  if(digits[0] === 0) {
    digits[len] = 0
    digits[0] = 1
  }
  return digits
}
console.log(plusOne([9,9,9]))