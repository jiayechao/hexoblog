---
title: leetcode-二进制求和
categories:
  - 算法
tags:
  - leetcode
abbrlink: 5e0925db
date: 2019-11-06 15:08:13
---

## 题目

给定两个二进制字符串，返回他们的和（用二进制表示）。
输入为非空字符串且只包含数字 1 和 0。

## 示例

> 输入: a = "11", b = "1"
> 输出: "100"
> 
> 输入: a = "1010", b = "1011"
> 输出: "10101"

## 我的第一次解答

```javascript

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
  let result = []
  let tag = 0
  for(let i = a.length-1,j = b.length-1;i >=0 || j>=0;i--,j--) {
    const ai = a[i] || 0
    const bi = b[j] || 0
    const r = 0 - ai - bi - tag
    if(r < -2) {
      tag = 1
      result.unshift(1)
    } else if(r< -1) {
      tag = 1
      result.unshift(0)
    } else {
      tag = 0
      result.unshift(-r)
    }
  }
  // 是否还有进位
  if(tag === 1) {
    result.unshift(1)
  }
  return result.join('')
};

```

##  执行结果

> 执行用时 :80 ms, 在所有 javascript 提交中击败了74.56%的用户
> 内存消耗 :35.7 MB, 在所有 javascript 提交中击败了48.53%的用户
