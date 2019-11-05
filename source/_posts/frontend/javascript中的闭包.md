---
title: javascript中的闭包
categories:
  - 前端基础
tags:
  - 闭包
  - 递归
abbrlink: af3c92a0
date: 2016-10-26 11:33:34
---

## 前言

最近群里面各种面试题乱飞，总结了一下，大致分为下面几类：

 1. 作用域问题。
 2. 匿名函数和闭包问题
 3. 类型（隐式）转化问题

这三类问题在面试题中出现的频率最高，虽然没人傻逼到在开发中那么写，但为了加（ying）深（fu）理（sha）解（bi）知（mian）识（shi），我们还是要深入理解。

## 递归

在说闭包前我们先看一个小demo，说一下函数递归，有一个很常见的求阶乘的函数：

```javascript
function m(i){
  if(i==1){
    return i
  }else{
    return i*m(i-1)
  }
}
alert(m(5))
```

这其实就是闭包的形式，我们先不管这些，我们对这个函数稍微改造一下：

```javascript
function m(i){
  if(i==1){
    return i
  }else{
    return i*m(i-1)
  }
}
var n = m;
m = null;
alert(n(5))
```

再次运行，就会出错，因为我们将函数赋值给n，但函数里的闭包m变成了null，所以出错。我们知道arguments.callee指向一个正在运行的函数，所以可以改造：

```javascript
function m(i){
  if(i==1){
    return i
  }else{
    return i*arguments.callee(i-1)
  }
}
var n = m;
m = null;
alert(n(5))
```

OK,成功，但是我们的项目变态，要求在严格模式下，怎么办？想一下，既然要求闭包调用，那我就不能改变这个函数，那我就再将这个函数赋值一次：

```javascript
"use strict"
var m = function f(i){
  if(i==1){
    return i
  }else{
    return i*f(i-1)
  }
}
var n = m;
m = null;
alert(n(5))
```

是不是可以啦？

## 闭包

闭包是指有权访问另一个函数作用域中的变量的函数。创建闭包的常见方式，就是在一个函数内部创建另一个函数。

```javascript
function sub(m){
  return function(){
    var o = {name:true}
    if(o.m){
      return true
    }else{
      return false
    }
  }
}
var sup = sub(name);
alert( sup() )
```

可以看到内部匿名函数可以访问到外部函数的参数m，即使这个函数被返回了或者在其他地方调用了。感觉和我们的作用域链差不多的样子，要怎么理解呢？

### 作用域链的细节

> 当某个函数被调用时，会创建一个执行环境（execution context）及相应的作用域链。然后，使用 arguments 和其他命名参数的值来初始化函数的活动对象（activation object） 。但在作用域链中，外部函数的活动对象始终处于第二位，外部函数的外部函数的活动对象处于第三位，……直至作为作用域链终点的全局执行环境。

```javascript
function compare(value1, value2){
  if (value1 < value2){
    return -1;
  } else if (value1 > value2){
    return 1;
  } else {
    return 0;
  }
}
var result = compare(5, 10);
```

比如上面的函数，我们画个图理解一下

![作用域链][1]

在后台，每个执行环境都有一个表示变量的对象--变量对象，在创建函数时，会有一个[[Scope]]属性，里面保存了全局变量对象，当函数被调用时，就会像上面所说，创建一个执行环境，并为这个执行环境添加作用域链：通过复制[[Scope]]的内容，并创建一个活动对象（变量对象），推入作用域链的最前端。所以说到底，所谓作用域链就是指向了变量对象的指针列表。当读取数据时，就通过这个列表来进行。一般来说调用时创建的活动对象在执行完毕后连带着执行环境被销毁，但很明显，闭包不在此一般内。

```javascript
function sub(m){
  return function(){
    var o = {name:true}
    if(o.m){
      return true
    }else{
      return false
    }
  }
}
var sup = sub(name);
alert( sup() )
```

这个闭包根据我们上面的原理分析，调用函数时，sub函数的作用域链就是`全局-局部`，而sub内的匿名函数的作用域链就是`全局-局部（sub）-局部`，当`var sup = sub(name)`完毕，sub的执行环境被销毁，按理他的局部活动对象也会被销毁，但是内部的匿名函数还在引用这这个活动对象，javascript的垃圾回收机制不允许他销毁，那只能存在，虽然有些废话，但原理很清楚，只有这个被返回的匿名函数被销毁，才能释放内存`sup = null`

### 闭包与变量

闭包带来的另一个弊端就是内部函数只能访问外部函数变量的最后一个值

```javascript
function createFunctions(){
  var result = new Array();
  for (var i=0; i < 10; i++){
    result[i] = function(){
      return i;
    };
  }
  return result;
}
var arr = createFunctions();
alert( arr[0]() )
```

表面看来arr里面的每个函数都应该返回相应的索引，但是实际上返回的结果却是10，因为外部函数的变量i只能访问到最后一个值10。但是，我们可以通过创建另一个匿名函数强制让闭包的行为符合预期

```javascript
function createFunctions(){
  var result = new Array();
  for (var i=0; i < 10; i++){
    result[i] = function(m){
    	return function(){
    	  return m;
    	}
    }(i);
  }
  return result;
}
var arr = createFunctions();
alert( arr[0]() )
```

我们创建了一个立即执行的匿名函数，然后将外部的i通过参数传递给内部函数，因为参数是按值传递的，所以m接受的是i的当前值，这样就能返回我们想要的东西了。

### 关于this

我们知道， this 对象是在运行时基于函数的执行环境绑定的：在全局函数中， this 等于 window ，而当函数被作为某个对象的方法调用时，this 等于那个对象。

```javascript
var o = 'window';
function m(){
  return(this.o)
}
var obj = {o:'object',get:m}

alert(m())
alert(obj.get())
```

不过，匿名函数的执行环境具有全局性，因此其 this 对象通常指向 window.

```javascript
var name = "The Window";
var object = {
  name : "My Object",
  getNameFunc : function(){
    return function(){
      return this.name;
    };
  }
};
alert(object.getNameFunc()());
```

可能我们以为返回`My Object`，但实际上却返回了`window`，为什么this没有取到外部函数的this对象呢？

我们说过变量会沿着作用域链来读取，但是不包括this和arguments这两个函数内部属性，当读取这两个属性时，只读取到当前函数的活动对象，而不会沿着作用域链往上找。上面的例子this只能是window。

但是注意，在几种特殊情况下，this值还是会发生变化：

```javascript
var name = "The Window";
var object = {
  name : "My Object",
  getName: function(){
    return this.name;
  }
};
object.getName(); //"My Object"
(object.getName)(); //"My Object"
(object.getName = object.getName)();//"The Window"
```

第一种方式我们很容易理解，函数在对象object上调用，this就是这个对象，第二种类似于引用这个函数，this并不会改变，第三种调用是先赋值，但赋值的只是这个匿名函数本身，所以this值就是window对象了。

## 内存泄漏

闭包在 IE 的低版本（IE9以下）中会导致一些特殊的问题。具体来说，如果闭包的作用域链中保存着一个HTML 元素，那么就意味着该元素将无法被销毁。我们目前应该不是很关心这些，有兴趣的可以自行摸索。


  [1]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/zyyl.png "zyyl.png"
