---
title: css-动画模块属性探讨
categories:
  - 前端基础
tags:
  - css3
  - animation
abbrlink: 5d8946bb
date: 2016-08-18 15:09:56
---
## 前言
css3中有一个过渡模块和动画模块，这两个模块的出现，让网页动画不再依赖于flash这种臃肿的插件，也不用再过多地使用js动画这种低性能的渲染，这对专业于网页动画的实在是一大福音，对普通前端者，想想在你的项目中使用一个炫酷的过渡动画，不仅提高了用户体验，更可能起到画龙点睛的作用！但是过渡和动画的属性列表又长又难理解，其中`animation`的属性更是达到了变态的七个！别急，下面我们就一起慢慢分解，逐步掌握。

## 过渡
`transition`，就是当元素从一种样式变换为另一种样式时为元素添加效果。这种效果不会突然改变，而是会在你规定的时间内平滑过渡，带给你极致的用户体验。

### 兼容性
一个属性，我们使用时首先考虑他的兼容性，请看：
![enter description here][1]
可以看到：目前各版本最新浏览器基本全部支持`transition`属性，需要注意的是

 - IE9及以下不支持
 - Safari6及以下，android4.3及以下，UC9.9仅支持私有前缀`-webkit-transition`
 - firefox和chrome浏览器是自动更新的，全线支持

### 过渡属性

你可以为元素设置`transition`属性,然后一次性设置四个过渡属性。哪四个过渡属性呢？

 1. transition-property:规定应用过渡的 CSS 属性的名称;
 2. transition-duration:定义过渡效果花费的时间。默认是 0。
 3. transition-timing-function:规定过渡效果的时间曲线。默认是 "ease"。
 4. transition-delay:规定过渡效果何时开始。默认是 0。

比如这个例子：
```css
div{
	width: 100px;
	height: 200px;
	background:#58a;
	transition: width 2s linear 1s;
}
div:hover{
	width: 200px;
}
```
当你的鼠标移动到div上时，1s后div的宽度会在2s内以线性速度平滑过渡到200px；戳这个亲自操作看看[一个简单的transition过渡][2]
当然，为了看的清楚明白，你也可以分开逐条写,效果是一样的。
```css
div{
	width: 100px;
	height: 200px;
	background:#58a;
	transition-property: width;
	transition-duration: 2s;
	transition-timing-function: linear;
	transition-delay: 1s;
}
div:hover{
	width: 200px;
}
```
分开写有一个好处就是如果有多个属性设置，或者多个属性有一个过渡属性是相同的，我就可以只写一个，比如：
```css
div{
	width: 100px;
	height: 200px;
	background:#58a;
	transition-property: width,height;
	transition-duration: 2s;
	transition-timing-function: linear;
	transition-delay: 1s,2s;
}
div:hover{
	width: 200px;
}
```
#### transition-property
规定应用过渡的 CSS 属性的名称，可以是`width`,`height`,`opacity`等各种有数值变化的属性，也可以是`background`这种有背景图的属性，但是不支持渐变。如果是多个属性，请用`,`隔开。如果你不确定你要为哪个元素设置过渡，你可以简单粗暴的写作`all`，即为所有属性设置过渡;

#### transition-duration
定义过渡效果花费的时间，默认是 0，也就是没有过渡，样式直接切换。你也可以设置为负值，但和0的表现是一样的。对应多个属性，相应的也要用`,`隔开；

#### transition-timing-function
规定过渡效果的时间曲线，默认是 "ease"。基本语法为`transition-timing-function: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n)`;

 1. linear：规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）；
 2. ease：规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）；
 3. ease-in：规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）；
 4. ease-out：规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）；
 5. ease-in-out：规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）；
 6. cubic-bezier(n,n,n,n)：在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。
`cubic-bezier(n,n,n,n)`即贝塞尔曲线，我们平时几乎不会用到，有兴趣可以自行研究。你可以戳这里，看看前5种运动形式的表现[不同运动曲线的表现][2]

#### transition-delay
指定何时将开始切换效果,单位是秒`s`或毫秒`ms`。你可以为元素单独设置，但需要`,`隔开。当你设置为负值，比如-1s时，相当于在你执行过渡动画之前，他已经在执行1s了，所以会显示过渡1s后的效果。
你可以看这个例子[负值延迟的表现][3]


## 动画
终于到了我们的最终战场——动画。你可以赋予一个元素动画，然后静静的欣赏她曼妙的舞姿。先来看看他的见兼容性：

### 兼容性
![enter description here][4]
各主大浏览器基本支持，意味着我们可以大胆的使用了，要注意的是

 1. IE9及以下不支持动画
 2. chrome42及以下，Safari8及以下，ios safari8.4及以下android4.4.4及以下，UC9.9仅支持带私有前缀的动画属性`-weblit-animation`

巧妇难为无米之炊，调用动画之前我们首先要创建动画，那怎么创建呢？有请`@keyframes`.

### @keyframes（关键帧）
`@keyframes`规则是创建动画。创建动画是通过逐步改变从一个CSS样式设定到另一个。在动画过程中，您可以更改CSS样式的设定多次。
指定的变化时发生时使用％，或关键字"from"和"to"，这是和0％到100％相同。

比如
```css
@keyframes move{
	0 {width: 10px;}
	20% {width: 50px;}
	50% {width: 100px;}
	80% {width: 150px;}
	100% {widht:200px;}
}
```
我们创建了一个名为`move`的动画，他的宽度将从10px分阶段动画到200px；
来看一下他的语法：`@keyframes animationname {keyframes-selector {css-styles;}}`

 - animationname 定义动画的名称，随便你定，比如上面的move
 - keyframes-selector 关键帧，比如上例的0%，20%，50%等等
 - css-styles css样式，你可以定义多个，就跟你写css样式一样。

### animation
创建了动画，我们就来调用它`animation:move 1s`,这是最简单的调用了，只要写出动画名称，动画持续的时间就可以了。那么完整的动画调用语法呢？超级长，请看：

 - animation-name 规定 @keyframes 动画的名称；
 - animation-duration	规定动画完成一个周期所花费的秒或毫秒。默认是 0；
 - animation-timing-function	规定动画的速度曲线。默认是 "ease"；
 - animation-delay	规定动画何时开始。默认是 0；
 - animation-iteration-count	规定动画被播放的次数。默认是 1；
 - animation-direction	规定动画是否在下一周期逆向地播放。默认是 "normal"；
 - animation-play-state	规定动画是否正在运行或暂停。默认是 "running"。
 - animation-fill-mode 规定动画结束时的状态，默认为none

下面我们详细说说这七个属性：
#### animation-name
语法：animation-name: keyframename|none;这里的keyframename就是你在创建动画时的名称。也可以设置为none，表示无动画
#### animation-duration
即规定动画完成一个周期所花费的秒或毫秒。可以参照我们上面说的transition-duration理解，默认值0表示无动画
#### animation-timing-function
规定动画的速度曲线，也可以参照transition-timing-function理解
不同的是，动画的速度曲线有个特殊的函数：**steps()**,他接受两个参数，使动画产生阶跃性（不同于前面参数的连续性），第一个参数是数字，必须是正整数，第二个参数是start|end，比如：`animation-timing-function: steps(3,start)`
 - 3表示将定义的动画的**每两个关键帧之间**等分成3部分
 - start表示每一部分都是以**下一帧的显示效果**来填充间隔动画
 - end表示每一部分都是以**上一帧的显示效果**来填充间隔动画

附图一张，这是W3C标准对steps函数的图解说明：
![enter description here][5]
我们可以看这个实例，会有很详细的说明[steps()函数的实例][6]

#### animation-delay
规定动画何时开始，同样参照transition-delay理解
#### animation-iteration-count
规定动画被播放的次数，默认是1次，你也可以设置为`animation-iteration-count: infinite`让他无休止的跑下去
#### animation-direction
规定动画是否在下一周期逆向地播放,语法：`animation-direction: normal|reverse|alternate|alternate-reverse|initial|inherit;`
 - reverse表示动画反向播放
 - alternate表示动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放。也就是往返动画的过程
 - alternate-reverse表示动画在奇数次（1、3、5...）反向播放，在偶数次（2、4、6...）正向播放。也就是反向往返动画的过程

请看这个例子，体会一下各种`animation-direction`[animation-direction实例][7]
#### animation-play-state
规定动画是否正在运行或暂停,默认是`running`,相反，也有`pause`即停止动画。
#### animation-fill-mode
规定动画在播放之前或之后，其动画效果是否可见。语法`animation-fill-mode: none|forwards|backwards|both`,
	
 - none：动画结束时回到元素未动画时的状态；
 - forwards：当动画完成后，保持最后一个属性值（在最后一个关键帧中定义）。当设置animation-direcdtion为reverse时动画结束后显示为keyframes第一帧
 - backwards：在 animation-delay 所指定的一段时间内，在动画显示之前，应用开始属性值（在第一个关键帧中定义）。
 - both：设置对象状态为动画结束或开始的状态，结束时状态优先
点这里查看实例[animation-fill-mode实例][8]


## 结束语
过渡和动画的属性就说到这了，当然，这只是个简单的讲解，后面会有这方面的实例，再慢慢深入理解。

  [1]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/transtionuse.png "transtionuse.png"
  [2]: http://htmlpreview.github.io/?https://github.com/rotate720deg/demos/blob/master/transitionDemo1.html
  [3]: http://htmlpreview.github.io/?https://github.com/rotate720deg/demos/blob/master/transition-delay.html
  [4]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/animationuse.png "animationuse.png"
  [5]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/step.png "step.png"
  [6]: http://htmlpreview.github.io/?https://github.com/rotate720deg/demos/blob/master/step.html
  [7]: http://htmlpreview.github.io/?https://github.com/rotate720deg/demos/blob/master/animation-direction.html
  [8]: http://htmlpreview.github.io/?https://github.com/rotate720deg/demos/blob/master/animation-fill-mode.html
