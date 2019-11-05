---
title: css-3D那点事
categories:
  - 前端基础
tags:
  - css3
abbrlink: 2e992ba2
date: 2016-08-16 17:20:26
---

## 前言
css3中的有一个3D转换模块，一直以来做的是PC端的项目，由于3D转换的兼容性，对于这个模块不甚精通，有需求也是随便照猫画虎。但知识是慢慢积累的，万一哪天用上，不得焦头烂额了。就像现在……吾辈谨记！

## 先来回顾一下坐标系
平面坐标系，我们初中学几何的时候就接触到了，一直到我们高中的立体几何，接触到了空间坐标系。

![enter description here][1]
我们最熟悉的就是上面这种了，但如果你对css定位有所了解的话，你会知道，css中的x，y方向有所不同。很多时候（比如定位）我们都是以元素的**左上角**为原点的，以上下左右区分区分，这时候很直观。但在变换中，引入了坐标系的概念，我们需要用x,y,z来区分了，下图是css中的坐标系，可以看出x，y，z的方向与我们原来认识的并不同，而且坐标原点默认都是**元素中心点**。

![enter description here][2]
如果你对坐标系还没有完整认识的话，下面的图可能更容易点

![enter description here][3]
你的电脑想右手边就是x的正方向，向下就是y的正方向，屏幕正对你往屏幕外就是z的正方向。怎么样？理解了吧!

## 结合属性说说
下面我们结合3D变换中的一些属性来深入的理解一下坐标系
### translate
这个是最容易理解的，translateX(),translateY()正值就往右，下方移动，translateZ()正值就像着你的身体的方向移动，如果加了景深（就是让你看这个元素更像像是在现实中，一会详细解释），就会逐渐变大。你可以在这里自己操作看看。
[http://htmlpreview.github.io/?https://github.com/rotate720deg/demos/blob/master/transform.html][4]

### rotate
转动，也是比较好理解的，ratateX()就是以元素的x轴转动，ratateY()就是以元素的y轴转动，ratateZ()就是以元素的z轴转动，前面说过，坐标的原点是在元素的中心点哦。你可以在这里自己操作看看。
[http://htmlpreview.github.io/?https://github.com/rotate720deg/demos/blob/master/transform.html][5]

## 再来说说景深（perspective）

![enter description here][6]
近大远小是我们在生活中常见的现象，景深就是类似的概念，因此在平面上就可以模拟出3D效果。
说到这里，可能是我的理解方式不对，虽然网上的说明是，css中透视点是在屏幕的前方，也就是眼睛的方位。但是元素的3D转换到底是如何转化的，眼睛虽然在屏幕外，但是在屏幕上，元素的3D是怎样表现的？网上的教程总让我无法理解。像你上面看到的例子，按我刚开始的理解，z轴是朝垂直屏幕外的，但当我在Z轴移动时，元素却是向着左边的方向变大。这是怎么回事呢？请看图！

![enter description here][7]
图中红色的方块表示元素处于父元素的中心，即左右居中，垂直居中。蓝色方块表示元素的实际位置，亮点的连线时其中心点的连线。结合上面的实例，你会发现，当你改变translateZ()的值时，元素在平面上移动的轨迹实际上是中心点的连线！很明显，我将视点与Z轴的理解混淆了。元素实际上是沿着Z轴移动的，只是我的视点偏离了元素所处的Z轴！就像有个圆在你左前方走来，在你的视点看过去也许是个椭圆，甚至是条线！

![enter description here][8]
困扰我的问题解决了。这样我们就可以来看rotateX()了，当绕X轴转动时，元素的下半部分距离我的视点近了，坐半部分远离视点，所以他变得看起来大了，向右倾斜了。

![enter description here][9]
以上我们的视点都是在元素的父元素上，css3D转化还可以将视点设置在转换元素`transform:perspective(200px) translateZ(100px)`上，这样就相当于元素始终位于我们的正前方

## perspective-origin

如果你能理解上面说的，那这个就太容易理解了！他的作用就是改变你的视点位置，这个属性有一个默认值，即`perspective-origin:50% 50%`;就是3D场景的中心点，你也可以设置方位`perspective-origin:left`,你也可以设置百分比或具体数值。结合上面的例子，很容易理解。
唯一我不理解的就是w3school上对于`perspective-origin`的解释
>perspective-origin 属性定义 3D 元素所基于的 X 轴和 Y 轴。该属性允许您改变 3D 元素的底部位置。

这个**底部位置**是个什么意思？(我语文理解能力差，看到这篇文章的朋友如果有懂得，谢谢指导一下我)。

本文是从一个菜鸟的角度出发，如果有错误，谢谢指正！


  [1]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/zuobiaoxi1.png "zuobiaoxi1.png"
  [2]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/zuobiao2.png "zuobiao2.png"
  [3]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/zuobiao3.png "zuobiao3.png"
  [4]: http://htmlpreview.github.io/?https://github.com/rotate720deg/demos/blob/master/transform.html
  [5]: http://htmlpreview.github.io/?https://github.com/rotate720deg/demos/blob/master/transform.html
  [6]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/toushi.png "toushi.png"
  [7]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/translateZ.png "translateZ.png"
  [8]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/shidian.png "shidian.png"
  [9]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/rotateX.png "rotateX.png"
