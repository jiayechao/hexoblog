---
abbrlink: 573969b7
---
var fog = function(n) {
  // 跳出递归的条件
  if(n <= 2) {
    return n
  }
  // 函数等价式
  return fog(n - 1) + fog(n-2)
}

console.log(fog(4))

/**
 * 1->2->3->4
 * @param {*} root 
 */
var reverseList = function(root) {
  if(!root || !root.next) {
    return root
  }
  // 我们假设到这里时已经是 1->2<-3<-4
  let newLinkedList = reverseList(root.next)
  // 我们就需要将1和2的指向变一下
  let t1 = root.next // 2
  t1.next = root // 2->1
  root.next = null // 1-> null
  return newLinkedList // 返回新的
}

const linked = {
  val: 5,
  right: {
    val: 6,
    left: null,
    right: null
  },
  left: {
    right: {
      val: 4,
      left: null,
      right: null
    },
    val: 3,
    left: {
      right: null,
      val: 2,
      left: {
        right: null,
        val: 1,
        left: null
      }
    }
  },
}
// console.log(diameterOfBinaryTree(linked))
// console.log(kthSmallest(linked, 3))