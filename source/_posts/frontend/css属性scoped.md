---
title: css属性scoped 
date: 2017-05-17 15:26:05 
tags: 
 - css3
 - scoped
 - 饿了么
---

## 重启博客 
很久没有更新了，主要是自己太懒散,所幸每次有所感悟都会在笔记本上记录一些，所以当自己间歇性奋发图强时，可以将之整理出来。

## scoped属性
使用vue自带的脚手架时，在组件的样式中会有这么一个注释
```html
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .prevView{
        width: calc(100% - 10px);
        margin-left: 5px;
        min-height: 600px;
        border: 1px solid #ccc;
    }
</style>
```
`scoped`,我们先看一下这个属性：
```txt
scoped:   
Specifies that the styles only apply to this element's parent element and that element's child elements.
```
来看MDN上的例子
```html
<div>
  <style scoped>
    h3 { color:red; }
    p { color:blue; }
  </style>
  <h3>This is a heading.</h1>
  <p>This is a paragraph.</p>
</div>
```
运行结果：h3红色，p蓝色，style应用到了div（父元素）及其子元素（h3,p），我们稍微改一下代码：
```html
<div>
  <style scoped>
    h3 { color:red; }
    p { color:blue; }
  </style>
</div>
  <h3>This is a heading.</h1>
  <p>This is a paragraph.</p>
```
可以发现，样式并没有作用到h3，p元素上。

注意，scoped属性是一个非标准属性，目前测试只有在firefox有效！

## vue中的scoped
既然scoped有先天残缺，我们并不能在生产环境中使用，那vue中的scoped是如何实现的呢？
其实原理也比较简单：通过PostCSS转译实现，请看
```html
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">hi</div>
</template>
```
通过转译后：
```html
<style>
.example[_v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" _v-f3f3eg9>hi</div>
</template>
```
可以看出来，PostCSS通过给每个组件元素加上自定义属性后来处理。并不是通过原生scoped来实现，是不是豁然开朗？

## 一个小坑
在结合饿了么的UI使用时，比如input组件，并没有为input元素添加自定义属性，所以我们需要在组件中自定义样式！就是这个坑才导致了这篇博文。


