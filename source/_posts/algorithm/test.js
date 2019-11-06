---
abbrlink: 573969b7
---
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
  let result = ''
  let tag = 0
  for(let i = a.length-1,j = b.length-1;i >=0 || j>=0;i--,j--) {
    const ai = a[i] || 0
    const bi = b[j] || 0
    const r = 0 - ai - bi - tag
    if(r < -2) {
      tag = 1
      result+=1
    } else if(r< -1) {
      tag = 1
      result+=0
    } else {
      tag = 0
      result+=(-r)
    }
  }
  if(tag === 1) {
    result+=1
  }
  let re = ''
  for(let i = 0;i<result.length;i++){
    re+=(result[i] === '1' ? '0' : '1')
  }
  
  return re
};

console.log(addBinary('100','10'))