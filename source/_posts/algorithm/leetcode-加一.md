---
title: leetcode-加一
categories:
  - 算法
tags:
  - leetcode
abbrlink: ad39b066
date: 2019-11-05 10:36:29
---

## 题目

给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。
最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
你可以假设除了整数 0 之外，这个整数不会以零开头。

## 示例

> 输入: [1,2,3]
> 输出: [1,2,4]
> 解释: 输入数组表示数字 123。
> 
> 输入: [4,3,2,1]
> 输出: [4,3,2,2]
> 解释: 输入数组表示数字 4321。

## 我的第一次解答

```javascript

/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  digits[digits.length - 1]++
  let i = 1
  if(digits[digits.length - 1] > 9) {
    while(i <= digits.length) {
      console.log(digits)
      if(digits[digits.length - i] > 9) {
        if(digits.length === i) {
          digits[i] = digits[digits.length - 1]%10
          digits[0] = 1
        } else {
          digits[digits.length - i - 1]++
          digits[digits.length - i] = digits[digits.length - i]%10
        }
      }
      i++
    }
  }
  return digits
}

```

##  执行结果

> 执行用时 :88 ms, 在所有 javascript 提交中击败了14.47%的用户
> 内存消耗 :36.9 MB, 在所有 javascript 提交中击败了5.14%的用户

## 说明

这复杂度也太。。。继续优化

## 我的最终解答

```javascript

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

```

> 执行用时 :60 ms, 在所有 javascript 提交中击败了94.64%的用户
> 内存消耗 :33.6 MB, 在所有 javascript 提交中击败了63.85%的用户
