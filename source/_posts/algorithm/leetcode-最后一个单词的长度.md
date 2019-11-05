---
title: leetcode-最后一个单词的长度
categories:
  - 算法
tags:
  - leetcode
abbrlink: 7f062647
date: 2019-10-31 10:06:51
---

## 题目

给定一个仅包含大小写字母和空格 ' ' 的字符串，返回其最后一个单词的长度。

如果不存在最后一个单词，请返回 0 

## 示例

> 输入: "Hello World"
> 输出: 5

## 我的第一次解答

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
  const arr = s.match(/\b(\w+)\b/g)
  const len = arr ? arr[arr.length - 1].length : 0
  return len
};
```

##  执行结果

> 执行用时 :64 ms, 在所有 javascript 提交中击败了84.86%的用户
> 内存消耗 :33.7 MB, 在所有 javascript 提交中击败了47.35%的用户

## 说明

先用正则试一下，结果还不错

## 我的最终解答

```javascript
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

```
> 执行用时 :60 ms, 在所有 javascript 提交中击败了92.62%的用户
> 内存消耗 :33.7 MB, 在所有 javascript 提交中击败了37.79%的用户