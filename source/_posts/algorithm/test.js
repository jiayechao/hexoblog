---
abbrlink: 45622
---
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