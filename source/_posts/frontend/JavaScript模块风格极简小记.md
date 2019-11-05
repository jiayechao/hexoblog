---
title: JavaScript模块风格极简小记
categories:
  - 前端基础
tags:
  - 模块
abbrlink: 18e4f619
date: 2018-05-15 23:10:46
---

### 闲扯几句
1. 很长时间以来，因为node的大力发展，其采用的commenJs规范也被熟知，而我对规范的认识大多在于commenJs，而后了解到的CMD,AMD，再加上ES6采用的import-export模块规范，对知其然，不知其所以然的我来说很是头疼。

2. 有一个在网上的教程叫《手摸手教你撸后台-vue》，其中有个路由优化是这样写的
    ```javascript
    module.exports = file => require('@/pages/' + file + '.vue');  //development.js
    module.exports = file => () => import('@/pages/' + file + '.vue'); // production.js
    ```
    刚开始没去研究，觉得这么做的目的是：*开发环境下动态编译，加载快，生产环境下静态加载，打包快*  现在回过头来真的羞愧，搞技术不严谨，欺骗自己。上面的教程对不对先不说，先了解一下上面提到的各种规范。

### commenJs

commenJs是较早出现的规范，现在nodejs也采用此规范。commenJs规范是 **同步** 加载，适用于服务端，因为服务端文件都是在本地磁盘，加载很快。
```javascript
var clock = require('clock');
clock.start();
```
正因为是同步加载，require会阻塞进程，这种规范在浏览器端是不被建议的，所以AMD规范被提了出来。

### AMD
从规范名就可以看出,Asynchronous Module Definition是一个异步模块加载的规范,先加载模块，然后再回调中调用模块,这就符合浏览器端的场景，不会阻塞进程。
```javascript
define(['clock'],function(clock){
  clock.start();
});
```
这方面的代表就是require.js,AMD规范允许将commenJs结合，可以在使用时加载模块,用法和下面说的CMD基本类似

### CMD
CMD规范的典型代表就是seaJs，推崇 *就近依赖* 使用时再加载，不同于AMD的一开始就加载好。
```javascript
define(function(require, exports, module) {
   var clock = require('clock');
   clock.start();
   var clock1 = require('clock1'); // 就近依赖
   clock1.start();
});
```

### ES6模块风格
上面说的几种规范都是“野鸡规范”，因为js没有模块化加载的概念，社区为了开发上的便利，发展处这些规范。直到ES6的出现，才带来了import-export的模块风格。具体请参考[阮一峰老师的教程](http://es6.ruanyifeng.com/#docs/module);

### 重点区别
在如今mvvm框架工程化环境下，我们用的最多的就是ES6风格和commenJs，那在用的时候，你有没有注意到，有没有去了解一下两种的异同的。
1. 两者的输出都可以看做是具备多个属性和方法的对象；
2. require可以动态引入，import现阶段不行。不过import的动态引入已经进入提议草案。所以import是在编译阶段引入，而require在执行到时才会引入。
    ```javascript
    const a = 'js';

    require('../'+ a + '/jquery.js');
    import $ from ('../'+ a + '/jquery.js'); //报错
    ```
3. import必须在组件的顶部引入，中间不能有别的代码。require可以随时使用
    ```javascript
    const path = 'src';
    import Vue from 'vue'; // 报错
    ```
4. ES6 Module 中导入模块的属性或者方法是强绑定的，包括基础类型；而 CommonJS 则是普    通的值传递或者引用传递。什么意思呢，请看举例
    ```javascript
    // counter.js
    export.count = 0;
    setTimeout(function(){
      console.log('counter.js is '+export.count++) // 0
    },500)

    //commenjs
    const {count} = require('counter.js');
    setTimeout(function(){
      console.log('ccommen.js is '+count) //0
    },1000)

    // importjs
    import {count} from 'counter.js';
    setTimeout(function(){
      console.log('import.js is '+count) // 1
    },1000)
    ```
### 多说两句
import语法目前在生产环境很少用，那我们在vue开发中很多使用案例啊。那是因为使用了babel，将inport语法转成了require语法，所以，实际上你使用的还是require；

回到我们一开始的问题，既然都是require，那么是不是没有用呢。也不对，因为路由使用的import是webpack中的[代码分割功能](https://router.vuejs.org/zh-cn/advanced/lazy-loading.html);即路由的懒加载。