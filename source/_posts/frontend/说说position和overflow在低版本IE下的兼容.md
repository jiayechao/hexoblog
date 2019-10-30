---
title: 说说position和overflow在低版本IE下的兼容
date: 2016-08-12 09:13:29
categories:
- 前端基础
tags: 
- position
- 兼容
---
## 前言
今天同事问了一个软件显示的小问题，当子元素设置了绝对定位时并超出父元素的范围时，却不显示，就像下面：
![enter description here][1]
最后找到了问题：父元素设置了overflow：hidden，而且文档没有头，是按照怪异模式解析的，再查下去，IE6和怪异模式下，如果父元素设置了overflow：hidden/auto/scroll，那么他会加上一个隐藏的相对定位属性（虽然你看不到），这样的话上面问题中父元素的overflow：hidden就会隐藏掉子元素。
怪异模式平时几乎接触不到，现在大家都是按照w3c标准开发，至于为什么我们的软件要用怪异模式，我也不知道。。。但正好借这个机会分享一下定位属性和overflow在低版本IE浏览器各模式下的解析。

## IE6及怪异模式下，overflow充当了position:relative
正常浏览器下显示：
![正常浏览器][2]
IE6及怪异模式下显示：
![IE6及怪异模式][3]
**解决办法：更换浏览器，添加文档头**
## IE6/7下子元素有相对定位时，父元素的overflow是包不住的
正常解析时，相对定位的元素还占着原来的位置，不会脱离文档流，此时父元素的oveflow对其还是有约束的，但是在IE6/7下，就不行了，他会解析为脱离文档流，这样overflow就失效了。
正常浏览器下显示：
![enter description here][4]
IE6/7下的显示：
![enter description here][5]
**解决办法：给父级元素也加上相对定位；**
## IE6下实时渲染导致绝对定位错误
当我们动态改变父元素的宽高时，设置了绝对定位的子元素应该实时改变，子元素始终位于父元素的right：10px;bottom:10px;比如：
![enter description here][6]
当我点击父元素时，给他加大宽高，
正常浏览器下显示：
![enter description here][7]
但是在IE6中他不会渲染成正常模式，出来的结果是：
![enter description here][8]
**解决办法：无解，请避开这种需求**
## 父级元素宽高的数值为奇数时，子元素的定位会往内偏差1px；
我们的父元素宽高为201px;
正常浏览器下显示：
![enter description here][9]
IE6下的显示：
![enter description here][10]
很明显，有一个小小的空隙
解决办法：尽量不要使用奇数长度；

*此致：低版本IE下有各种奇葩的兼容，令人防不胜防，莫名其妙，所幸近年来份额逐年减少。珍惜生命，远离IE。*
  [1]: /imgs/frontend/overflowbug.png "overflowbug.png"
  [2]: /imgs/frontend/overflow1.png "overflow1.png"
  [3]: /imgs/frontend/overflow2.png "overflow2.png"
  [4]: /imgs/frontend/overflow3.png "overflow3.png"
  [5]: /imgs/frontend/overflow4.png "overflow4.png"
  [6]: /imgs/frontend/overflow5.png "overflow5.png"
  [7]: /imgs/frontend/overflow6.png "overflow6.png"
  [8]: /imgs/frontend/overflow7.png "overflow7.png"
  [9]: /imgs/frontend/overflow8.png "overflow8.png"
  [10]: /imgs/frontend/overflow9.png "overflow9.png"
