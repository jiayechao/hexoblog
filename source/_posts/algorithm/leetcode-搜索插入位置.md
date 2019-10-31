---
title: leetcode-搜索插入位置
date: 2019-10-07 20:06:51
categories:
- 算法
tags:
- leetcode
---

## 题目

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
你可以假设数组中无重复元素。

## 示例

> 输入: [1,3,5,6], 5
> 输出: 2
> 
> 输入: [1,3,5,6], 2
> 输出: 1
> 
> 输入: [1,3,5,6], 7
> 输出: 4
> 
> 输入: [1,3,5,6], 0
> 输出: 0

## 我的第一次解答

```javascript

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    for(var i =0; i<nums.length; i++) {
      if(nums[i] >= target) {
        return i
      }
    }
    return i
};

```

##  执行结果

> 执行用时 :68 ms, 在所有 javascript 提交中击败了84.80%的用户
> 内存消耗 :34.4 MB, 在所有 javascript 提交中击败了23.30%的用户

## 说明

直觉上很简单的一道题，果然很顺利，但是运行结果貌似有点不理想，优化

## 我的最终解答

```javascript

var searchInsert = function(nums, target) {
    let i = 0, j = nums.length -1,m
    while (i<=j) {
      m = Math.floor((i+j)/2)
      if(target === nums[m]){
        return m
      }else if(target > nums[m]) {
        if(target < nums[m+1] || nums[m+1] === undefined) {
          return m + 1
        }
        i = m+1
      } else if(target < nums[m]) {
        if(target > nums[m-1] || nums[m-1] === undefined) {
          return m
        }
        j = m - 1
      }
    }
};

```

> 执行用时 :56 ms, 在所有 javascript 提交中击败了98.43%的用户
> 内存消耗 :33.7 MB, 在所有 javascript 提交中击败了65.94%的用户

