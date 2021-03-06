---
title: leetcode-回文数
categories:
  - 算法
tags:
  - leetcode
abbrlink: 8440ce31
date: 2019-10-02 20:06:51
---

## 题目

判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。


## 示例

> 输入: 121
> 输出: true
> 
> 输入: -121
> 输出: false
> 解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
> 
> 输入: 10
> 输出: false
> 解释: 从右向左读, 为 01 。因此它不是一个回文数。

:::

## 我的第一次解答

```javascript

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  if(x === 0) {
    return true
  }
  if(x < 0 || !(x % 10)) {
    return false
  }
  const a = x
  let rev = 0
  while(x !== 0){
    rev = rev * 10 + x % 10;
    x = Math.floor(x/10)
  }
  return rev === a
};

```

##  执行结果

> 执行用时 :196 ms, 在所有 JavaScript 提交中击败了99.82%的用户
> 内存消耗 :44.7 MB, 在所有 JavaScript 提交中击败了96.69%的用户

## 说明

使用了上一个整数反转的思路，然后比较，需要注意的是要0这个整数，执行结果还算满意，时间复杂度应该是O(log n)？但是这里有个问题，我们需要考虑反转后的溢出。有一个思路，如果我们能反转一半的数字，只要比较剩下的一半是否相等，就可以了。

## 我的最终解答

```javascript
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  if(x === 0) {
    return true
  }
  if(x < 0 || !(x % 10)) {
    return false
  }
  let rev = 0
  // 这个就是已经反转一半的判断
  while(x > rev){
    rev = rev * 10 + x % 10;
    x = Math.floor(x/10)
  }
  // 对于奇数位的做一个/10的判断
  return rev === x || Math.floor(rev/10) === x
};

```