---
title: leetcode-股票买卖的最佳时机.md
categories:
  - 算法
tags:
  - leetcode
abbrlink: 77d8015b
date: 2020-03-09 10:31:57
---
## 题目

给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。

注意你不能在买入股票前卖出股票。


## 示例

输入: [7,1,5,3,6,4]
输出: 5
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。

输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。


## 解题思路
这是一个求差的问题，要求后一个数字比前一个大

首先设置一个初始值，我们取首位记为min，循环数组
如果找出最小值，记为min
如果找出比min大的，和min计算出差值。
然后以这个差值比较

## 代码
```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let min = prices[0]
  let result = 0
  for(let i = 0;i<prices.length;i++) {
    if(prices[i] < min) {
      min = prices[i]
    }
    if(prices[i] > min) {
      let max = prices[i]
      let minus = max - min
      result  = result > minus ? result : minus
    }
  }
  return result
};
```