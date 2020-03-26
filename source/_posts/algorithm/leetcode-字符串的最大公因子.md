---
title: 字符串的最大公因子
categories:
  - 算法
tags:
  - leetcode
abbrlink: 41c80e68
date: 2020-03-12 15:24:18
---

## 题目

对于字符串 S 和 T，只有在 S = T + ... + T（T 与自身连接 1 次或多次）时，我们才认定 “T 能除尽 S”。

返回最长字符串 X，要求满足 X 能除尽 str1 且 X 能除尽 str2。

## 示例

输入：str1 = "ABCABC", str2 = "ABC"
输出："ABC"

输入：str1 = "ABABAB", str2 = "ABAB"
输出："AB"

输入：str1 = "LEET", str2 = "CODE"
输出：""

## 解题思路

1. 两个字符串的首字母,尾字母肯定一样,
2. 既然是最大公因子，我们从最短的字符串开始遍历
3. 如果若干次遍历后，等于传入的两个字符串，那就是我们要找的了

## 代码

```js
/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function(str1, str2) {
  let len1 = str1.length
  let len2 = str2.length
  if(str1 === '' || str2 === '' || str1[0] !== str2[0] || str1[len1-1] !== str2[len2-1]) {
    return ''
  }
  
  let result = len1 >= len2 ? str2 : str1
  while(result.length) {
    let len = result.length
    // 首先保证长度能整除
    if(len1%len === 0 && len2%len === 0) {
      // 再去判断拼接若干次能否相等
      if(result.repeat((len1/len)) === str1 && result.repeat((len2/len)) === str2) {
        return result
      }
    }
    result = result.slice(0, len - 1)
  }
  return ''
};
```