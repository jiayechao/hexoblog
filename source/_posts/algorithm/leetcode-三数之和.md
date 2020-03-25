---
title: leetcode-三数之和
abbrlink: 3d2c6700
date: 2020-03-25 15:48:51
categories:
  - 算法
tags:
  - leetcode
---

## 题目
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

## 示例
给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]

## 解题思路
我们先排序

然后选定一个nums[i]

从这个值右端选出两个指针，求和

如果达到目标值，那么将结果推入数组返回值

如果大于目标值，那么右指针左移

如果小于目标值，那么左指针右移

这个过程中还要去掉重复值

如果左指针和下一个相等，那么跳过

如果右指针和下一个相等，那么跳过

## 代码
```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  let res = []
  const len = nums.length
  // 先排序
  nums = nums.sort((a, b) => a - b)
  // 然后从第一个数开始数
  for(let i = 0; i < nums.length; i++) {
    // 如果大于0，直接开始下一个循环
    if(nums[i] > 0 ) {
      break
    }
    if(i > 0 && nums[i] == nums[i-1]) continue; // 去重
    let L = i + 1
    let R = len - 1
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R];
      if(sum === 0) {
        res.push([nums[i], nums[L], nums[R]])
        while (L<R && nums[L] == nums[L+1]) L++; // 去重
        while (L<R && nums[R] == nums[R-1]) R--; // 去重
        L++
        R--
      } else if(sum < 0) {
        L++
      } else if(sum > 0) {
        R--
      }
      
    }
  }
  return res
}
```