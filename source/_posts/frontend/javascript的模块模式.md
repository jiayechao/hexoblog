---
title: javascript的模块模式
categories:
  - 前端基础
tags:
  - 模块
abbrlink: 7d564a78
date: 2016-10-27 14:33:29
---

## 模仿块级作用域

javascript中没有块级作用域的概念，看下例：

```javascript
function al(count){
  for(var i=0;i<count;i++){
    alert(i)
  }
  alert(i)
}
```

上面代码中，我们在块级中定义了i，循环结束时并不会被销毁，我们在循环外调用依然可用。但是很明显，我们最后调用的i被循环中的i污染了，除非你故意这么做。

我们知道，函数中的活动对象在函数运行结束后会被销毁，我们可以利用这个知识点来模仿块级作用域。

```javascript
function al(count){
  (function(){
    for(var i=0;i<count;i++){
      alert(i)
    }
  })();
  alert(i)//这里就会出错
}
```

我们实质上是定义了一个立即执行的匿名函数，将匿名函数放在括号内，实际上是表示这是一个函数表达式。函数表达式在执行完毕后，销毁内部活动对象，自然不会污染到外部的i。这个方法经常被用到模块化的开发中。

## 私有变量

简而言之，函数中定义的变量就可以当作私有变量，因为外部环境是访问不到的。那如果我们需要访问呢？还记得我们之前提到过的稳妥构造函数吗？

```javascript
function Sum(name){
  var o = new Object();
  var name = name ;//定义的私有变量
  o.getName = function(){
    return name
  }
  return o
}

var p = Sum('yeye')
```

这样的构造函数创建的实例`p`，只有`p.getName()`才可以访问到`name`这个私有变量，其他任何方式都不行。这也算一种私有变量的例子。

```javascript
function Sum(){
  
  var name = 10 ;//定义的私有变量
  function pravite(){//定义的私有函数
    return 666;
  }
  this.set = function(){
    name++;
    return pravite();
  }
}

var p = new Sum()
```

一样的模式，我们也只能通过set方法来访问内部的私有变量。两个例子之所以能访问到，原理就是闭包--内部函数可以访问到外部函数的活动对象。

但还是有个问题，我们是通过构造函数的模式来创建私有变量，但知道构造函数有个缺陷就是属性方法的重复性，那怎么才能避免呢？这就是静态私有变量了。

### 静态私有变量

我们解决构造函数的方法重复是怎样解决的，对了，定义在原型上，我们试试

```javascript
(function(){
  var name = '' ;//定义的私有变量
  function pravite(){//定义的私有函数
    return 666;
  }
  Method = function(value){name = value};
  Method.prototype.set = function(val){
    name = val;
    console.log(name);
    return pravite();
  }
})();

var p = new Method().set('yeye');
var m = new Method().set('jia');
```

这样我们就创建好了一个具有静态的，共享的私有变量name,所谓静态就是在一个实例上调用set()方法，也会影响其他实例的name。

到底是使用实例变量，还是静态私有变量，最终还是要视你的具体需求定。

## 模块模式

这里所说的模块模式是指为单例创建私有变量的模式。所谓单例就是只有一个实例，不用说，在javascript中常用的就是字面量了。

```javascript
var single = {
  name:'yeye',
  age:26
}
```

这就是一个单例了，通过上面所学的方法，我们为他添加私有变量：

```javscript
var single = function(){
  var name = 'yeye';
  var age = 26;
  return {
    setName: function(val){
      name = val;
      age++;
      return [name,age]
      }
    };
}();


single.setName();

```

我们创建一个立即执行的匿名函数，返回一个字面量对象，可以访问到私有变量。从本质上来讲，这个对象字面量定义的是单例的公共接口。这种模式在需要对单例进行某些初始化，同时又需要维护其私有变量时是非常有用的。

简言之，如果必须创建一个对象并以某些数据对其进行初始化，同时还要公开一些能够访问这些私有数据的方法，那么就可以使用模块模式。

## 增强的模块模式

如果我们需要特定的类型对象，并且想为其添加某些方法和属性以增强，那我们在返回对象前，对其增强：

```javscript
var single = function(){
  var name = 'yeye';
  var age = 26;
  var app = new Array();
  app.name = name;
  app.setName = function(val){
      name = val;
      age++;
      return [name,age]
      }
  return app
 }()

single instanceof Array
```

在对象返回前，我们创建了一个数组实例,并为这个实力添加了属性和方法。这就是增强的模块模式了。

总之：JavaScript 中的函数表达式和闭包都是极其有用的特性，利用它们可以实现很多功能。大家在以后的开发中，多多实践，共勉！

