---
title: 一个简单实用的小函数-操作transform
date: 2016-10-31 16:42:35
categories:
- 项目经验
- 工具
tags: 
- 工具
---

## 遇到的问题

**情况一：**

在移动端开发中，我们有时需要禁止浏览器的默认行为，比如橡皮筋效果，选中文字效果，我们就需要禁止`touchstart`的默认行为`ev.preventDefault()`,但是这样有一个副作用，那就是页面不滚动了，我们就需要用`transform`属性来模拟;

**情况二：**

我们在开发移动端的滑动，比如banner图，为了性能，也是通过css中的`transform`属性来做的。


以上两种情况，我们需要动态的为元素添加transform属性，同时可能需要读取当前的数值。我们知道，transform的样式是多值的，比如：

```css
body{
  transform:translate(100px) rotate(45deg);
}
```

如果是行内样式，我们读出来后，肯定又要各种正则来提取，添加的时候也不方便，我们可能会想到通过`document.defautview.computedStyle(el)`函数来获取，但是很遗憾，这样读取出来的并不是你想要的，而是通过矩阵展示的：

```javascript
"matrix(1, 0, 0, 1, -640, 0)"
```

## 尝试解决

这时候就尴尬了，我们换种思路，可不可以将要添加的属性转为元素的自定义属性，然后遍历添加，取值的时候直接可以在自定义属性中取到，听起来不错，尝试一下！

```javascript
function cssTransfrom(el,attr,val){
	//三个参数，元素，属性，值
	if(!el.transform){
		el.transform = {}
	}
	if(arguments.length>2){//写入
		el.transform[attr] = val;
		var style = "";
		for(var i in el.transform){
			switch(true){
				//translate,rotate,skew,scale
				case /translate/.test(i):
					style += i+"("+el.transform[i]+"px)";
				break;
				case /rotate/.test(i):
				case /skew/.test(i):
					style += i+"("+el.transform[i]+"deg)";
				break;
				case /scale/.test(i):
					style += i+"("+el.transform[i]+")";
				break;
			}
		}
		el.style.transform = style;
	}else{
		val  = el.transform[attr];
		if(typeof val === undefined){
			if(/scale/.test(attr)){
				val = 1;
			}else{
				val = 0;
			}
		}
		return val;
	}
}
```

我们写了一个函数，这个函数接受三个或两个参数，分别是元素对象，元素属性和属性值。当参数为3时，我们执行写入，当参数为2时，读取属性。

试用一下，不错。但是这有个遗憾就是，只能取得通过这个函数添加的transform属性，另外，没有添加报错的功能，所以如果要使用的话，需要自己注意啦！

## 改进

我们可以将这个函数继续改进，比如现在我们只能一条一条添加属性：

```javascript
cssTransfrom(div,'translate',45);
cssTransfrom(el,'rotate',60);
```

虽然不错，但还是不够简单，我们可以改进一下，将参数设置为一个对象：

```javascript
function cssTransfrom(el,obj){
	//三个参数，元素，属性，值
	if(!el.transform){
		el.transform = {}
	}
	if(arguments.length>2 || (arguments.length==2&&typeof arguments[1] === 'object')){//写入
		arguments[2]?el.transform[arguments[1]] = arguments[2]:el.transform = arguments[1];
		var style = "";
		for(var i in el.transform){
			switch(true){
				//translate,rotate,skew,scale
				case /translate/.test(i):
					style += i+"("+el.transform[i]+"px)";
				break;
				case /rotate/.test(i):
				case /skew/.test(i):
					style += i+"("+el.transform[i]+"deg)";
				break;
				case /scale/.test(i):
					style += i+"("+el.transform[i]+")";
				break;
			}
		}
		el.style.transform = style;
	}else if(arguments.length==2&&typeof arguments[1] === 'string'){
		val  = el.transform[attr];
		if(typeof val === undefined){
			if(/scale/.test(attr)){
				val = 1;
			}else{
				val = 0;
			}
		}
		return val;
	}
}
```

这样我们的函数就可以一次性设置多个参数了。

```javascript
cssTransfrom(div,{'translate':45,'rotate':60});
```
