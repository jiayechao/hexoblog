---
abbrlink: 573969b7
---
/**
 * @param {number} n
 * @return {number}
 */

/**
 * 就是将一个整数分解成1和2组成的和，然后求出这些因数的排序 
 */
var climbStairs = function(i, n) {
  if(n<1) {
    return 0
  }
  if(n == 1) {
    return 1
  }
  if(n == 2) {
    return 2
  }
  return climbStairs(n - 2) + climbStairs(n - 1)
};

console.log(climbStairs(45))