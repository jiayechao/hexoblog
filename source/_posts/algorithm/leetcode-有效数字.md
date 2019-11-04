---
title: leetcode-有效数字
date: 2019-11-04 14:36:51
categories:
- 算法
tags:
- leetcode
---

## 题目

验证给定的字符串是否可以解释为十进制数字。

"0" => true
" 0.1 " => true
"abc" => false
"1 a" => false
"2e10" => true
" -90e3   " => true
" 1e" => false
"e3" => false
" 6e-1" => true
" 99e2.5 " => false
"53.5e93" => true
" --6 " => false
"-+3" => false
"95a54e53" => false

说明: 我们有意将问题陈述地比较模糊。在实现代码之前，你应当事先思考所有可能的情况。这里给出一份可能存在于有效十进制数字中的字符列表：

数字 0-9
指数 - "e"
正/负号 - "+"/"-"
小数点 - "."
当然，在输入中，这些字符的上下文也很重要。

## 示例

> "95a54e53" => false

## 我的第一次解答

```javascript

/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function(s) {
  return /^\s*[\+\-]?(\d+|\d+\.\d+|\.\d+|\d+\.)(e[\+\-]?\d+)?\s*$/.test(s)
};

```

##  执行结果

> 执行用时 :96 ms, 在所有 javascript 提交中击败了91.30%的用户
> 内存消耗 :36.2 MB, 在所有 javascript 提交中击败了97.22%的用户
>   
> 我们要做的就是找1->11->21->1211之间的递进规律


## 说明

直接用正则匹配
-13.14e-520

前面的符号 [\+\-]?
e前面的数字 (\d+|\d+\.|\.\d+|\d+\.\d+)
e后面的数字 (e[\+\-]?\d+)?
最后加上前后的空格 \s*

可以看到空间复杂度很不错，但是时间复杂度上一般

## 我的最终解答

看到题解中有状态机的解法，涉及到编译原理，不懂。照抄别人的,
能稍微看懂一点，但具体还是不知所云

![状态机][1]

```javascript
function isNumber(s) {
    let state = 0; 
    s = s.trim();//去除头尾的空格
    //遍历所有字符，当做输入
    for (let i = 0; i < s.length; i++) {
        switch (s.charAt(i)) {
             //输入正负号
            case '+':
            case '-':
                if (state == 0) {
                    state = 1;
                } else if (state == 4) {
                    state = 6;
                } else {
                    return false;
                }
                break;
            //输入数字
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                //根据当前状态去跳转
                switch (state) {
                    case 0:
                    case 1:
                    case 2:
                        state = 2;
                        break;
                    case 3:
                        state = 3;
                        break;
                    case 4:
                    case 5:
                    case 6:
                        state = 5;
                        break;
                    case 7:
                        state = 8;
                        break;
                    case 8:
                        state = 8;
                        break;
                    default:
                        return false;
                }
                break;
            //小数点
            case '.':
                switch (state) {
                    case 0:
                    case 1:
                        state = 7;
                        break;
                    case 2:
                        state = 3;
                        break;
                    default:
                        return false;
                }
                break;
            //e
            case 'e':
                switch (state) {
                    case 2:
                    case 3:
                    case 8:
                        state = 4;
                        break;
                    default:
                        return false;
                }
                break;
            default:
                return false;

        }
    }
    //橙色部分的状态代表合法数字
    return state == 2 || state == 3 || state == 5 || state == 8;
}
```

[1]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/algorithm/leetcode1.jpg