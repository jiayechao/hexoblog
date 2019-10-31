
/**
 * @param {string} s
 * @return {number}
 */

 /**
  * 思路： 
  * 1. 从一个不是空格的字母开始数
  * 2. 如果数到第一个空格，或者i为0时
  * 3. 即是最后一个单词的长度
  */

var lengthOfLastWord = function(s) {
  const len = s.length - 1
  let begin = false, sum = 0
  for(let i = len;i > -1; i--) {
    if(begin && s[i] === ' ') {
      return sum
    } else if(!begin && s[i] === ' ') {
      continue
    } else{
      sum++
      begin = true
    }
  }
  return sum
};
console.log(lengthOfLastWord("         "))