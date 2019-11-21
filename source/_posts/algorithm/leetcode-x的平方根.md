---
title: leetcode-x的平方根
categories:
  - 算法
tags:
  - leetcode
abbrlink: c598bce0
date: 2019-11-07 09:53:06
---

## 题目

实现 int sqrt(int x) 函数。
计算并返回 x 的平方根，其中 x 是非负整数。
由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

## 示例

> 输入: 4
> 输出: 2
> 
> 输入: 8
> 输出: 2
> 说明: 8 的平方根是 2.82842..., 
>      由于返回类型是整数，小数部分将被舍去。

## 我的第一次解答

```javascript

/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
  let i = 1
  while(x>=i*i){
    i++
  }
  return i-1
};

```

##  执行结果

> 执行用时 :160 ms, 在所有 javascript 提交中击败了8.81%的用户
> 内存消耗 :35.7 MB, 在所有 javascript 提交中击败了33.73%的用户

## 思路

很暴力的方法了，哈哈哈

## 我的最终解答

```javascript

/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
  let start = 0
  let end = x
  let m = x ? 1: 0
  while (start < end - 1) {
    if (m*m > x)
    {
        end = m;
    }
    else
    {
        start = m; 
    }
    m = Math.floor((start+end)/2)
  }
  return m
};

```
二分法查找