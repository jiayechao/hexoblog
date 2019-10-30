---
title: 公司面试题-初版
date: 2018-12-07 21:26:15
categories:
- 面试
tags: 
- 面试
---

## 此模板主要的是考察前端解决问题的能力，限于本人水平能力有限，面试模板仅供参考！

    1. 自我介绍
    
    > 快速了解面试者，主要看面试者谈吐是否清楚，是否自信，专业，特长，经历，求职岗位

    2. 项目经验

    > 让面试者挑选近期或印象中最深刻的项目，谈谈项目中遇到了什么困难，怎么解决的，学到了什么，有没有转化成博客类沉淀出来。
      注意听面试者的回答，从中了解面试者逻辑是否清楚，解决问题的能力（途径，效率），学习能力及知识累积

    > 项目中是否有组件沉淀，常用组件(loading, toast, dialog, tab, upload, tree...)，不分vue组件还是js组件，主要考察面试者是否有模块划分的基本思想，面试者的思维逻辑是否清楚，平时的积累。面试官可以择其一考察。


## html、css知识

1. 盒子模型

    > 盒子的组成、盒模型的种类、如何设置、js如何取、边距重叠、BFC。这六个知识点难度基本是逐级递增，面试官自行了解提问

2. 未知宽高的垂直居中

    > 各种实现方法的优缺点，面试者至少要回答出flex

3. 移动端布局

    [为什么很多web项目还是使用px](https://www.zhihu.com/question/313971223/answer/628236155)

    > rem，vw，em，px的使用及区别

4. cookie, session, localStrorage, sessionStorage 区别, 具体怎么用代码去操作

    > 前端缓存。面试官自行选择考察深度

## js知识

1. 变量提升，let,const,var, 块级作用域，暂时性死区

    ```javascript
    var tmp = 123;

    if (true) {
        tmp = 'abc';
        let tmp;
    }
    ```

2. 闭包，如何实现一个闭包，使用场景，原理

    ```jsvascript
    function count() {
        var arr = [];
        for (var i=1; i<=3; i++) {
            arr.push(function () {
                return i * i;
            });
        }
        return arr;
    }

    var results = count();
    var f1 = results[0];
    var f2 = results[1];
    var f3 = results[2];
    ```

3. this的考察，apply,call,bind使用场景，区别

    ```javascript
    var name = 'jim'

    var obj = {
        name: 'jack',
        getName: function() {
            return function() {
                return  this.name
            }
        }
    }
    obj.getName()() // 返回什么，如果想返回另一个如何做（多种做法更优）
     
     // 如果能写出箭头函数，可以考察箭头函数和普通函数的this，rest参数等
    --- 

    function getAge() {
        var y = new Date().getFullYear();
        return y - this.birth;
    }

    var xiaoming = {
        name: '小明',
        birth: 1990,
        age: getAge
    };

    var age = xiaoming.age;
    age() // 如何返回正确的年龄 

    // 如果面试者写出xiaoming.age()，可以考察this的作用于为什么在xiaoming上（this是在运行时判断）
    ```

4. 数组去重，至少回答出一次循环即可去重的方法，多种方法更优

    ```javascript
    var arr = [1,2,3,5,2,1]
    function getNewArr(arr) {

    }

    // 能写出[...new Set(arr)], 可以继续考察Set，Map类型
    ```
5. Promise的使用，async的使用

    > 面试官自行决定面试题

6. 原型，原型链，继承，instanceof

    > 面试官自行决定面试题

7. ES6知识

    > 解构赋值，默认参数，箭头函数，拓展运算符， Set和Map，class等

8. 设计模式

    > js常用的设计模式，订阅模式，策略模式，单例模式

## vue知识

1. 每个生命周期可以做什么，ajax放在哪个周期，为什么？有没有特殊情况？怎么处理？

2. vue数组对象变化检测，原理，处理方法

3. 组件传值，prop/$emit，$attr/$listeners，provide/inject，vuex，订阅模式

4. 自定义事件，作用域插槽，mixin， 自定义指令

5. 路由(vue-router):实现原理，守卫的使用

6. 状态管理(vuex): 需求场景，原理，需要使用的必要性

## web开发

1. 从输入url到页面加载完成发生了什么？
    [从输入url到页面加载完成发生了什么？](http://www.cnblogs.com/daijinxue/p/6640153.html)

2. 跨域

3. HTTP 协议.

## 20190516思考

最近面试了很多前端，发现了普遍一个问题，会说不会用。一个很简单的举例，apply/call的使用
我们都知道，函数的arguments是一个类数组，那我怎么能像数组一样去使用它，很多人可以闭着眼睛写出阿来
```javascript
[].slice.call(arguments)
```
但是为什么这么写就可以呢？一大半人不知道，或者说的自己都不知道说什么，其中不乏一些3年经验的前端。

重新提问，call/apply的使用及区别

很标准的答案：改变对象的this指向，apply的传参是数组，call的是单个的参数。

但是一大部分人不会把这两个题目联系起来

活学活用很重要！
