---
abbrlink: 45622
---
<<<<<<< HEAD
var numRookCaptures = function(board) {
    let result = 0
    let R = []
    let width = board[0].length
    let height = board.length
    for(let i = 0; i < height; i++) {
        for(let j = 0; j< width; j++){
            if(board[i][j] === 'R') {
                R = [i, j] 
            }
        }
    }
    console.log(R)
    // 然后向四个方向走
    for(let j = R[1]; j< width; j++){
        if(board[R[0]][j] === 'B') {
            break
        }
        if(board[R[0]][j] === 'p') {
            console.log([R[0],j])
            result += 1
            break
        }
    }
    for(let j = R[1]; j> -1; j--){
        if(board[R[0]][j] === 'B') {
            break
        }
        if(board[R[0]][j] === 'p') {
            console.log([R[0],j])
            result += 1
            break
        }
    }
    for(let j = R[0]; j< height; j++){
        if(board[j][R[1]] === 'B') {
            break
        }
        if(board[j][R[1]] === 'p') {
            console.log([j, R[1]])
            result += 1
            break
        }
    }
    for(let j = R[0]; j> -1; j--){
        if(board[j][R[1]] === 'B') {
            break
        }
        if(board[j][R[1]] === 'p') {
            console.log([j, R[1]])
            result += 1
            break
        }
    }
    return result
};

var r = numRookCaptures([[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".","R",".",".",".","p"],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."]])

console.log(r)
=======
/**
 * @param {number[]} nums
 * @return {number[][]}
 * [
  [-1, 0, 1],
  [-1, -1, 2]
]
 * 思路就是，两数之和肯定会有 与第三个数之和为0

  首先对数组进行排序，排序后固定一个数 nums[i]，再使用左右指针指向 nums[i]后面的两端，
  数字分别为 nums[L] 和 nums[R]，计算三个数的和 sumsum 判断是否满足为 0，满足则添加进结果集

  如果 nums[i]大于 0，则三数之和必然无法等于 0，结束循环

  如果 nums[i] == nums[i-1]，则说明该数字重复，会导致结果重复，所以应该跳过

  当 summ == 0 时，nums[L] == nums[L+1] 则会导致结果重复，应该跳过，L++

  当 sum == 0 时，nums[R] == nums[R-1] 则会导致结果重复，应该跳过，R--

  时间复杂度：O(n^2)，n 为数组长度
 */
var threeSum = function(nums) {
  let res = []
  let obj = {}
  for(let i = 0; i<nums.length -1; i++) {
    for(let j = i+1; j<nums.length; j++) {
      const tar = 0 - nums[i] - nums[j]
      if(obj[tar] != undefined) {
        obj[tar].push(tar)
        res.push(obj[tar])
        obj[tar] = undefined
      } else {
        // 这里要去重
        if(obj[nums[j]] || obj[nums[i]]) {continue}
        obj[tar] = [nums[i], nums[j]]
      }
    }
  }
  console.log(obj)
  return res
}

console.log( threeSum([-1, 0, 1, 2]))

// [-4, -1, -1, 0, 1, 1, 2]
>>>>>>> 9839f18e023f4bf51ae9d6a3fefbd25a2c9841df
