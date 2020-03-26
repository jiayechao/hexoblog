---
title: leetcode-相交链表
categories:
  - 算法
tags:
  - leetcode
abbrlink: 7f666bdb
date: 2020-03-19 09:51:48
---

## 题目
编写一个程序，找到两个单链表相交的起始节点。

![题目](https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/algorithm/leetcode2.png)

## 示例
![题目](https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/algorithm/leetcode2.png)

输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
输出：Reference of the node with value = 8
输入解释：相交节点的值为 8 （注意，如果两个列表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。

## 解题思路

1. 先遍历第一个链表给上标记，然后遍历第二个链表，如果有标记，就是交点了
2. 双指针法，每个指针向后遍历并且比较，遍历到末尾就指向另一个分支，如果相等就返回,只要循环一圈没有就是null了

## 代码
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
// 哈希求解
var getIntersectionNode = function(headA, headB) {
    while(headA) {
      headA.tag = true
      headA = headA.next
    }
    while(headB) {
      if(headB.tag) {
        return headB
      }
      headB = headB.next
    }
};

var getIntersectionNode = function(headA, headB) {
     let p = headA,q=headB, tag = 0
     while(q !== p && tag < 2) {
       if(!q) {
         q = headA
       } else {
         q = q.next
       }
       if(!p) {
         tag++
         p = headB
       } else {
         p = p.next
       }
     }
     return tag < 2 ? q : null
};
```