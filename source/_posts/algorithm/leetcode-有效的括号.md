---
title: leetcode-有效的括号
categories:
  - 算法
tags:
  - leetcode
abbrlink: 55127d28
date: 2019-10-09 20:06:51
---

## 题目

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。


## 示例

> 输入: "()"
> 输出: true
> 
> 输入: "()[]{}"
> 输出: true
> 
> 输入: "(]"
> 输出: false
> 
> 输入: "([)]"
> 输出: false
> 
> 输入: "{[]}"
> 输出: true

## 我的第一次解答

```javascript

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const arr = []
  const obj = {
    '(' : ')',
    '{' : '}',
    '[' : ']' 
  }
  // 为空false
  if(!s) {
    return true
  }
  // 判断长度，奇数为false
  if(s.length % 2 !== 0) {
    return false
  }
  // 大体思路就是最新的闭括号一定要有一个左边最近的开括号来匹配
  for(let i = 0; i<s.length; i++) {
    console.log('obj[s[i]]',obj[s[i]])
    if(obj[s[i]]) {
      // 推入数组
      arr.push(s[i])
    } else {
      // 检测最新的能不能匹配
      if(s[i] !== obj[arr[arr.length-1]]){
        return false
      } else {
        // 匹配到后出栈
        arr.pop()
      }
    }
  }
  // arr为空就可以
  return !arr.length
};

```

##  执行结果

> 执行用时 :136 ms, 在所有 JavaScript 提交中击败了5.89%的用户
> 内存消耗 :40.1 MB, 在所有 JavaScript 提交中击败了5.08%的用户

## 说明

大体上的思路就是是否每一个闭括号能否匹配到左边的开括号。我们设置了一个数组，开括号放里面，遇到闭括号就去数组拿最新的开括号，循环完整个字符串，arr是否为空，
但是可以看到很多优化的地方

## 我的最终解答

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const obj = {
    '(' : ')',
    '{' : '}',
    '[' : ']' 
  }
  const arr = []
  for(let i = 0; i<s.length; i++) {
    if(s[i] in obj) {
      // 推入数组
      arr.unshift(s[i])
    } else {
      // 检测最新的能不能匹配
      if(s[i] !== obj[arr[0]]){
        return false
      } else {
        // 匹配到后出栈
        arr.shift()
      }
    }
  }
  // arr为空就可以
  return !arr.length
};

```


> 执行用时 :64 ms, 在所有 JavaScript 提交中击败了95.26%的用户
> 内存消耗 :33.9 MB, 在所有 JavaScript 提交中击败了62.46%的用户
> 
> 这个题以前面试的时候遇到过，没答出来。确切地说，题目都没弄懂！
