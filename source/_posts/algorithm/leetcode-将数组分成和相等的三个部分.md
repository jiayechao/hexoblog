---
title: 将数组分成和相等的三个部分
categories:
  - 算法
tags:
  - leetcode
abbrlink: f3ac2a32
date: 2020-03-11 16:40:38
---

## 题目

给你一个整数数组 A，只有可以将其划分为三个和相等的非空部分时才返回 true，否则返回 false。

形式上，如果可以找出索引 i+1 < j 且满足 (A[0] + A[1] + ... + A[i] == A[i+1] + A[i+2] + ... + A[j-1] == A[j] + A[j-1] + ... + A[A.length - 1]) 就可以将数组三等分。

## 示例

输出：[0,2,1,-6,6,-7,9,1,2,0,1]
输出：true
解释：0 + 2 + 1 = -6 + 6 - 7 + 9 + 1 = 2 + 0 + 1

输入：[0,2,1,-6,6,7,9,-1,2,0,1]
输出：false

输入：[3,3,6,5,-2,2,5,1,-9,4]
输出：true
解释：3 + 3 = 6 = 5 - 2 + 2 + 5 + 1 - 9 + 4

3 <= A.length <= 50000
-10^4 <= A[i] <= 10^4

## 解题思路
题目已经给了解题思路， 
i + 1 < j 并且
(A[0] + A[1] + ... + A[i] == A[i+1] + A[i+2] + ... + A[j-1] == A[j] + A[j-1] + ... + A[A.length - 1])

我们先求出总和，如果能分成3部分，那么这个和肯定能被3整除，

我们从第0个元素开始迭代，当和达到1/3时，标记一个i

继续，当达到2/3时，标记一个j，并且j>i+1

此时就可以分成三个和相等的数组

## 代码
```javascript
/**
 * @param {number[]} A
 * @return {boolean}
 */
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
```