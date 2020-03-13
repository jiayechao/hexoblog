---
title: leetcode-多数元素
categories:
  - 算法
tags:
  - leetcode
abbrlink: 5647d2ec
date: 2020-03-13 10:46:07
---

## 题目

给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

## 示例

输入: [3,2,3]
输出: 3

输入: [2,2,1,1,1,2,2]
输出: 2

## 解题思路

### 思路一
排序后，多数肯定是下标值为n/2的值

### 思路二
哈希结构循环找到出现次数多于n/2的值

## 代码

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  nums = nums.sort()
  return nums[Math.floor(nums.length / 2)]
};

var majorityElement = function(nums) {
  let obj = {}
  let len = nums.length
  for(let i = 0;i<len; i++) {
    if(!obj[nums[i]]) {
      obj[nums[i]] = 1
    } else {
      obj[nums[i]] += 1
    }
    if(obj[nums[i]] > len/2) {
      return nums[i]
    }
  }
};
```