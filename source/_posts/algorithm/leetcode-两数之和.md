---
title: leetcode-两数之和
date: 2019-10-03 20:06:51
categories:
- 算法
tags:
- leetcode
---

## 题目

给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。


## 示例

> 给定 nums = [2, 7, 11, 15], target = 9
> 因为 nums[0] + nums[1] = 2 + 7 = 9
> 所以返回 [0, 1]

## 我的第一次解答

```javascript

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  for(let i = 0; i < nums.length-1; i++ ) {
    for(let j = i+1; j < nums.length; j++ ) {
      if(nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
};

```
## 说明

可以看到上面的解答完全就是在硬怼，没有考虑过什么复杂度。所以当然是不能通过的，刚好卡在“超出输出限制”这条，就是因为双层循环完全是在浪费性能！

我们可以只用一层循环，降低时间复杂度，，求出差值，然后去找剩余元素是否有这个差值就可以了。


## 我的第二次解答

```javascript

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  for(let i = 0; i < nums.length-1; i++ ) {
    const a = target - nums[i]
    const tag = nums.indexOf(a, i+1)
    if(tag > -1) {
      return [i, tag]
    }
  }
};

```

##  执行结果

> 执行用时 :144 ms, 在所有 JavaScript 提交中击败了59.13%的用户
> 内存消耗 :33.6 MB, 在所有 JavaScript 提交中击败了94.86%的用户

说明执行还是有点问题的，问题出在indexof这个方法上，indexof实质上也是一个循环，看来我们需要实现一个hash表，js中object的本质就是一个hash表。

## 我的最终解答

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  const obj = {}
  for(let i = 0; i < nums.length; i++ ) {
    const a = target - nums[i]
    const tag = obj[a]
    if(tag !== undefined) {
      return [tag, i]
    }
    obj[nums[i]] = i
  }
};
```

> 执行用时 :68  ms, 在所有 JavaScript 提交中击败了98.24%的用户
> 内存消耗 :35.4 MB, 在所有 JavaScript 提交中击败了17.09%的用户

执行用时明显提升