---
title: leetcode-最大子序和
date: 2019-10-11 20:06:51
categories:
- 算法
tags:
- leetcode
---

## 题目

给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。


## 示例

> 输入: [-2,1,-3,4,-1,2,1,-5,4],
> 输出: 6
> 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。

## 我的第一次解答

```javascript

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let ans = nums[0]
    let sum = 0
    for(const num of nums) {
      if(sum > 0){
        sum += num
      } else {
        sum = num
      }
      console.log(ans, sum)
      ans = Math.max(ans, sum)
    }
    return ans
};

```

##  执行结果

> 执行用时 :68 ms, 在所有 javascript 提交中击败了92.96%的用户
> 内存消耗 :35.8 MB, 在所有 javascript 提交中击败了10.94%的用户

## 说明
动态规划的是首先对数组进行遍历，当前最大连续子序列和为 sum，结果为 ans
如果 sum > 0，则说明 sum 对结果有增益效果，则 sum 保留并加上当前遍历数字
如果 sum <= 0，则说明 sum 对结果无增益效果，需要舍弃，则 sum 直接更新为当前遍历数字
每次比较 sum 和 ans的大小，将最大值置为ans，遍历结束返回结果
时间复杂度：O(n)O(n)
