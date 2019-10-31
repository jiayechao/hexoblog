---
title: leetcode-报数
date: 2019-10-01 20:06:51
categories:
- 算法
tags:
- leetcode
---

## 题目

报数序列是一个整数序列，按照其中的整数的顺序进行报数，得到下一个数。其前五项如下：

1.     1
2.     11
3.     21
4.     1211
5.     111221

1 被读作  "one 1"  ("一个一") , 即 11。
11 被读作 "two 1s" ("两个一"）, 即 21。
21 被读作 "one 2",  "one 1" （"一个二" ,  "一个一") , 即 1211。
给定一个正整数 n（1 ≤ n ≤ 30），输出报数序列的第 n 项。

注意：整数顺序将表示为一个字符串。

## 示例

> 输入: 1
> 输出: "1"
> 
> 输入: 4
> 输出: "1211"

## 我的第一次解答

```javascript

/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
  let i = 1
  let init = '1'
  let result = ''
  
  while(i < n) { // 从1开始，
    let split = 1
    for(j = 0;j<init.length;j++){ // 循环当前的字符串，使用思路
      if(init[j] === init[j+1]){
        split++
        continue
      } else {
        result = result + split + init[j]
        split = 1
      }
    }
    console.log(result)
    i++
    init = result
    result = ''
    split = 0
    if(i === n) {
      return init
    }
  }
  return init
};

```

##  执行结果

> 执行用时 :72 ms, 在所有 javascript 提交中击败了85.19%的用户
> 内存消耗 :36.1 MB, 在所有 javascript 提交中击败了14.40%的用户
>   
> 我们要做的就是找1->11->21->1211之间的递进规律


## 说明

复杂度差强人意，我们优化一下，去掉一些变量

## 我的最终解答

```javascript

var countAndSay = function(n) {
  let init = '1'
  let result = ''

  if(n === 1) {
    return init
  }
  while(n > 1) { // 从1开始，
    let split = 1
    let len = init.length
    for(j = 0;j<len;j++){ // 循环当前的字符串，使用思路
      if(init[j] === init[j+1]){
        split++
      } else {
        result = result + split + init[j]
        split = 1
      }
    }
    n--
    init = result
    result = ''
  }
  return init
};

```

> 执行用时 :60 ms, 在所有 javascript 提交中击败了98.64%的用户
> 内存消耗 :35.7 MB, 在所有 javascript 提交中击败了30.85%的用户
