---
title: leetcode-最长公共前缀
categories:
  - 算法
tags:
  - leetcode
abbrlink: edcce943
date: 2019-10-12 20:06:51
---

## 题目

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

## 示例

> 输入: ["flower","flow","flight"]
> 输出: "fl"
> 
> 输入: ["dog","racecar","car"]
> 输出: ""
> 解释: 输入不存在公共前缀。


## 我的第一次解答

```javascript

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  if(!strs.length ){
    return ''
  }
  let result = ''
  for(let i = 0; i< strs[0].length; i++){
    for(let j = 1; j < strs.length; j++) {
      if(strs[j][i] !== strs[0][i]) {
        return result
      }
    }
    result += strs[0][i]
  }
  return result
};

```

##  执行结果

> 执行用时 :68 ms, 在所有 JavaScript 提交中击败了96.90%的用户
> 内存消耗 :35.1 MB, 在所有 JavaScript 提交中击败了36.71%的用户

## 说明

我们用了双层循环，所以我们的复杂度可能是O(n^2),取决于第一个元素的长度和总体数组的长度，我们能继续优化吗？

## 我的最终解答

```javascript

还没找到。。。

```