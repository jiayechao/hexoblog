---
title: leetcode-爬楼梯
categories:
  - 算法
tags:
  - leetcode
abbrlink: bbda7433
date: 2019-11-08 14:50:35
---

## 题目

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
注意：给定 n 是一个正整数。

## 示例

> 输入： 2
> 输出： 2
> 解释： 有两种方法可以爬到楼顶。
> 1.  1 阶 + 1 阶
> 2.  2 阶
> 
> 输入： 3
> 输出： 3
> 解释： 有三种方法可以爬到楼顶。
> 1.  1 阶 + 1 阶 + 1 阶
> 2.  1 阶 + 2 阶
> 3.  2 阶 + 1 阶

## 我的第一次解答

```javascript

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(i, n) {
  if(n<1) {
    return 0
  }
  if(n == 1) {
    return 1
  }
  if(n == 2) {
    return 2
  }
  return climbStairs(n - 2) + climbStairs(n - 1)
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
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(i, n) {
  if(n<1) {
    return 0
  }
  if(n == 1) {
    return 1
  }
  if(n == 2) {
    return 2
  }
  return climbStairs(n - 2) + climbStairs(n - 1)
};

```
二分法查找