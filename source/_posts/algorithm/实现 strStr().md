---
title: 实现 strStr()
date: 2019-10-06 20:06:51
categories:
- 算法
tags:
- leetcode
---

## 题目

给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。

## 示例

> 输入: haystack = "hello", needle = "ll"
> 输出: 2
> 
> 输入: haystack = "aaaaa", needle = "bba"
> 输出: -1
> 
> 当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。
> 对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与C语言的 strstr() 以及 Java的 indexOf() 定义相符。


## 我的第一次解答

```javascript

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
  return haystack.indexOf(needle)
};

```

##  执行结果

> 执行用时 :56ms, 在所有 JavaScript 提交中击败了99.333%的用户
> 内存消耗 :33.6 MB, 在所有 JavaScript 提交中击败了69.64%的用户

## 说明
哈哈哈哈，js中有现成的可用，我们应该自己实现一个

## 第二次解答

```
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
  if(needle === '') {
    return 0
  }
  if(needle.length > haystack.length) {
    return -1
  }
  let tag = -1
  aaa:
  for(let i = 0;i < haystack.length; i++) {
    // 循环到第一个时，循环needle来匹配，匹配不到就从i+1重新开始
    if(haystack[i] === needle[0]) {
      tag = i
      bbb:
      for(let j = 0;j<needle.length;j++) {
        if(haystack[i+j] === needle[j]) {
          // 如果j是最后一个，那么直接返回tag
          if(j === needle.length - 1) {
            return tag
          }
        }else {
          // 如果有一个不相等，那么重新循环，并且充值
          tag = -1
          continue aaa
        }
      }
    }
  }
  return tag
};
```

哈哈，没管复杂度，实现的一个，继续优化

## 我的最终解答

```javascript

var strStr = function(haystack, needle) {
  if(needle === '') {
    return 0
  }
  if(needle.length > haystack.length) {
    return -1
  }
  let tag = -1,
      j = 0,
      i = 0,
      len1 = haystack.length,
      len2 = needle.length
      len3 = len1 - len2,
      len4 = len2 -1
  while(len3 >= i) {
    // 循环到第一个时，循环needle来匹配，匹配不到就从i+1重新开始
    if(haystack[i+j] === needle[j]) {
      // 第一次匹配，记录i
      if(j === 0) {
        tag = i
      }
      if(j === len4) {
        return tag
      }
      j++
    } else {
      // 有不匹配的，重置
      if(j === 0) {
        i++
        continue
      }
      j = 0
      i = tag !== -1 ? tag+1 : i+1
      tag = -1
    }
  }
  return tag
};

```

> 执行用时 :64 ms, 在所有 javascript 提交中击败了94.40%的用户
> 内存消耗 :34.6 MB, 在所有 javascript 提交中击败了35.30%的用户

