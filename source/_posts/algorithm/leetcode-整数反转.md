---
title: leetcode-整数反转
categories:
  - 算法
tags:
  - leetcode
abbrlink: e0ee786e
date: 2019-10-10 20:06:51
---

## 题目

给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

## 示例

> 输入: 123
> 输出: 321
> 
> 输入: -123
> 输出: -321
> 
> 输入: 120
> 输出: 21
> 
> 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−2**31,  2**31 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

## 我的第一次解答

```javascript

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  let y
  const a = x
  let t
  const arr = Math.abs(x).toString().split('')
  for(let i = 0; i< Math.floor(arr.length/2); i++) {
    t = arr[i]
    arr[i] = arr[arr.length - i - 1]
    arr[arr.length - i - 1] = t
  }
  y = a > 0 ? Number(arr.join('')) : Number(-arr.join(''))
  if(y>2**31-1 || y<(-2)**31){
    y = 0
  }
  return y
};

```
## 说明

可以看到上面的解答完全就是在硬怼，没有考虑过什么复杂度。所以当然是不能通过的，刚好卡在“超出输出限制”这条，就是因为双层循环完全是在浪费性能！

我们可以只用一层循环，降低时间复杂度，，求出差值，然后去找剩余元素是否有这个差值就可以了。


##  执行结果

> 执行用时 :84  ms, 在所有 JavaScript 提交中击败了98.54%的用户
> 内存消耗 :35.8 MB, 在所有 JavaScript 提交中击败了44.72%%的用户

整体还好，但是这种转为字符串再转为数值的思维可以转变一下

## 我的最终解答

```javascript
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  let rev = 0
  while(x !== 0){
    rev = rev * 10 + x % 10;
    if(rev > 2**31 - 1 || rev < (-2)**31){
      return 0
    }
    x = Math.trunc(x/10)
  }
  return rev
};
```

> 执行用时 :80  ms, 在所有 JavaScript 提交中击败了99.33%的用户
> 内存消耗 :35.4 MB, 在所有 JavaScript 提交中击败了89.49%的用户
