---
abbrlink: 573969b7
---
var canThreePartsEqualSum = function(A) {
  let len = A.length
  if(len < 3) {
    return false
  }
  let sum = A.reduce((m,n) => m+n)
  if(sum%3) {
    return false
  }
  let split = sum/3
  let sum1 = 0
  let i = 0
  while(i < len - 2 ) {
    sum1 += A[i]
    // 如果第一层循环到了，我们继续知道j并且让A0+...Aj = split*2 && j > i+1
    if(sum1 === split) {
      break
    }
    i++
  }
  let j = i+1
  while (j < len - 1) {
    sum1 += A[j]
    if(sum1 === split*2) {
      return true
    }
    j++
  }
  return false
};

console.log(canThreePartsEqualSum([14,6,-10,2,18,-7,-4,11]))