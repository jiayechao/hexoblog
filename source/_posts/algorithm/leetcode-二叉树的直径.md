---
title: 二叉树的直径
categories:
  - 算法
tags:
  - leetcode
abbrlink: 46778f77
date: 2020-03-10 11:11:48
---

## 题目

给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过根结点。

## 示例

```
1-2-4
| |
3 5
```

返回 3, 它的长度是路径 [4,2,1,3] 或者 [5,2,1,3]。

## 解题思路

明确的思想就是深度遍历。直径就是节点左右遍历深度的节点数在减去1
我们假设left为节点左边的节点数，right为节点右边的节点数，

## 代码

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
  let sum = 0 // 初始化
  deep(root)
  return sum
  // 首先找到递归的退出条件
  function deep(root) {
    if(root === null) {
      return 0
    }
    let left = deep(root.left)
    let right = deep(root.right)
    // 替换最大的
    sum = Math.max(sum, left+right)
    // 这里我们也要给递归一个返回，作为上面left，right的值
    return Math.max(left, right) + 1
  }
};
```