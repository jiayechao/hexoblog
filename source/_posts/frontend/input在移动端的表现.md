---
title: input在移动端的表现
date: 2017-12-07 21:26:15
categories:
- 项目经验
tags: 
- input兼容
- input遮挡
---

## 前言
最近在移动端项目中碰到了几个比较棘手的问题，但是input问题尤为棘手，现整理如下：

## 布局结构
基本就是上中下固定定位，中间部分滑动,不要问我为什么不用flex。。。
```css
.header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
}
.content{
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 60px;
    overflow: auto;
}
.footer{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60;
    input{
        width: 100%;
    }
}
```

## 底部input被软键盘遮挡

具体表现就是这样
![enter description here][1]
底部固定定位（fixed）的输入框被弹出的软键盘遮挡

**问题描述：** 此问题主要发生在IOS即苹果手机的各浏览器。但是经过测试，在较高版本以上safiri浏览器中并不会出现遮挡，而在 *微信* 中会出现

**产生原因** 当软键盘弹出时，整个视口会向上缩起，但是缩起的距离不足以显示出底部的固定定位。注意：很多文章说到这个缩起的行为会被resize监听到，但经过测试 ***并不会***，另外，现在的手机更新换代很快，如果不是国民级别的应用，那些低版本的系统完全没必要兼容。

**解决办法** 以前解决这个bug有一个方法是scollIntoView(),即将目标元素滚动到视口内，但不知为什么，我用这个方法并不能达到效果，而且在那些表现好的浏览器下，反而会弄巧成拙。仔细一想，软键盘弹出后，既然视口缩小使底部不足以显示，那么可以让整个body再向上滚动一点不就可以显示出来了么？
```javascript
//这里不要用setInterval，因为在某些浏览器下底部会不断跳动
setTimeout(function(){
    document.body.scrollTop = document.body.scrollHeight;
},300)
```
![enter description here][2]
请看，完美实现！
**一点点小问题** 上面的方法完美解决了我们的bug，但有个小小的问题，请看
![enter description here][3]
底部和软键盘之间有一个空白的部分，这是在safiri下的表现，但其实并不影响我们的结果。

## 软键盘弹出页面“错位”
请看下图，输入框只是普通文档流中的普通输入框。
![enter description here][4]
这个兼容问题折腾了我许久，但一直没去认真解决，一个自己经验稍欠，另一个是因为它只发生在红米手机原生浏览器上。一直到快临近下班时，仔细看了一下，这个红线中框是什么鬼？我原来以为是点击后误触的下拉选择，后来细看不对啊，这个应该是原来输入过的记忆的数据。
不知道大家有没有遇到过，如果点击输入框时出现了记忆列，同时滑动屏幕（pc也一样），这个记忆列不会跟着文档流滚动，看起来像固定住一样。
立马搜索相关api，`autocomplete="off"`添加，完美解决！

## 遗留的问题和建议
 1. 固定定位的弹层里面，input的可视：软键盘弹出时，还是会遮挡input框，必须手动滑动。解决思路还是通过滑动或者重新定位弹层的bottom；
 1. 尽量不要让input落在屏幕的50%以下部分。

[1]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/input1.png "input1.png"
[2]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/input2.png "input2.png"
[3]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/input3.png "input3.png"
[4]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/input4.png "input4.png"