---
title: leetcode-最小的K个数
categories:
  - 算法
tags:
  - leetcode
abbrlink: 77d8015b
date: 2020-03-09 10:31:57
---
## 题目

输入整数数组 arr ，找出其中最小的 k 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。


## 示例

输入：arr = [3,2,1], k = 2
输出：[1,2] 或者 [2,1]

输入：arr = [0,1,2,1], k = 1
输出：[0]

## 解题思路
比较容易想到的就是将数组排序后，取前K个数


## 代码
```javascript
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function(arr, k) {
  arr.sort((a,b) => a-b)
  return arr.slice(0, k)
};
```