---
title: javascript中的label语句
categories:
  - 前端基础
tags:
  - label
  - 双层循环
abbrlink: c5316392
date: 2016-08-24 08:57:50
---
## 前言
一直在用jquery开发，原生js的好多东西一下子下想不起来，故重温《javascript高级程序设计》（下文简称js）一书，发现有个label语句，在该书中，仅仅有几句话，实例都没有，有点羞愧第一次看的时候极其不认真。所以认真google，耐心思考。现奉上拙见。

## 我的理解
先来看看在《js》中关于label语句的原话
> 使用 label 语句可以在代码中添加标签，以便将来使用。以下是 label 语句的语法：
> label: statement
> 下面是一个示例：
> ```
> start: for (var i=0; i < count; i++) {
>   alert(i);
> }
> ```
>这个例子中定义的 start 标签可以在将来由 break 或 continue 语句引用。加标签的语句一般都
>要与 for 语句等循环语句配合使用。

我是这样理解的：相当于将这个`for循环`赋值给了`start`这个变量，等我需要用的时候直接拿过来用，相当于继续执行这个for循环。这里说要配合`break`和`continue`使用，我试写了个简单的实例：
```javascript
start: 
for(var i=0;i<3;i++){
  console.log(i);
  if(i === 1){
    break start;
  }
}
//0，1
```
但是好像没什么用嘛！输出都是0，1，既然这样我试试循环嵌套。
```javascript
start: 
for(var i=0;i<3;i++){
  end:
  for(var j=0;j<3;j++){
    
    if(i === 1 && j === 1){
      break start;
    }
    console.log(i+'-->'+j);
  }
}
```
耶！效果出现了。如果没有start，我们的输出就是：
```javascript
0-->0
0-->1
0-->2
1-->0
2-->0
2-->1
2-->2
```
但是加了start后，我们的输出变成了：
```javascript
0-->0
0-->1
0-->2
1-->0
```
梳理一下，没有start之前，遇到`i === 1 && j === 1 `我们终止了内部循环，但外部循环还在，所以继续输出；但加上start后呢，我们终止内部循环，并且也终止了外部循环，相当于break也作用到了外部循环！
同理，我试了试continue：
```javascript
start: 
for(var i=0;i<3;i++){
  end:
  for(var j=0;j<3;j++){
    
    if(i === 1 && j === 1){
      continue start;
    }
    console.log(i+'-->'+j);
  }
}
```
当`i === 1 && j === 1 `时，循环直接跳转到外部继续循环，到这里我们基本已经理解了label的用法，再来看一个小小的实例，用来打断运行状态：
```javascript
var itemsPassed = 0;
var i, j;
var items = [3,2,1];
var tests = [{'pass':pass},{'pass':pass},{'pass':pass}];
function pass(m){
  return m-2
}
top:
for (i = 0; i < items.length; i++){
 for (j = 0; j < tests.length; j++) {
  if (!tests[j].pass(items[i])) {
     continue top;
  }
 }
 itemsPassed++;
}
console.log(itemsPassed)
```
这里当返回值为0时，我们就从头循环，继续走下去。

## 总结
其实，再接着往下看书，在接下来的章节，会有比较具体的实例，但我看到label语句，看不懂，就停了下来研究。虽然多花费了时间，但也是锻炼了自我学习的能力。
以上就是label语句的基本用法。这个事给了我一个教训，看这种工具书或者教科书，要细细的学习，越细越好，要善于思考，勤于练习！谨记！！！
