---
abbrlink: 573969b7
---
let arr = []
var kthSmallest = function(root, k) {
  let current = root
  if(current !== null) {
    kthSmallest(current.left, k)
    // 这里执行
    arr.push(current.val)
    kthSmallest(current.right,k)
  }
};

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
kthSmallest(linked, 3)
// console.log(kthSmallest(linked, 3))