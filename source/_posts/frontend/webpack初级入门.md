---
title: webpack初级入门
date: 2016-08-14 20:06:51
categories:
- webpack
tags:
- webpack
---
原文地址：[http://webpack.github.io/docs/tutorials/getting-started/][1]
## 前言
webpack的大名，相信前端界的朋友都听过。但通过在学习群里的聊天得知，大部分人其实并没有用过，也都想去学习，但是网上的教程动不动就各种名词，或者一上来就贴一大段代码，作为一个初出茅庐（可能都算不上）的菜鸟，实在难以看一下。幸好，有朋友推荐，找到一篇相当浅显易懂的菜鸟教程，我这么菜的水平都能入门，所以，分享出来给大家。原文是英文的，为了方便大家，也为加深自己的理解，我就勉强翻译一下，先说好，我四级都没过的。

## 欢迎
这篇浅显易懂的教程将通过一个简单的例子引导你学习webpack
你将学习到：

 - 如何安装webpack
 - 如何使用webpack
 - 如何使用加载器
 - 如何使用开发服务器

## 安装webpack
开始之前，你需要安装node.js，然后执行
`$ npm install webpack -g`

> 这个操作用来安装一个可用的webpack

## 开始编译
首先创建一个空的文件夹
创建下面的文件
*entry.js*
```javascript
document.write('It works');
```
*index.html*
```html
<html>
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <script type="text/javascript" src="bundle.js" charset="utf-8"></script>
    </body>
</html>
```
然后执行下面的命令
`$ webpack ./entry.js bundle.js`
这个命令就会开始编译（entry.js）,并创建一个bundle.js的文件
如果操作成功，你就会看到如下的显示
```
Version: webpack 1.12.11
Time: 51ms
    Asset     Size  Chunks             Chunk Names
bundle.js  1.42 kB       0  [emitted]  main
chunk    {0} bundle.js (main) 28 bytes [rendered]
    [0] ./tutorials/getting-started/setup-compilation/entry.js 28 bytes {0} [built]
```
在浏览器中打开index.html,他应该会显示It works
![enter description here][2]
## 第二个文件
下一步，我们创建另一个文件
*content.js*
```javascript
module.exports = "It works from content.js.";
```
更新`entry.js`为
```javascript
document.write(require("./content.js"));
```
然后重新编译
`$ webpack ./entry.js bundle.js`
刷新浏览器，你就会看到这行文字`It works from content.js`
![enter description here][3]
> webpack会在其他文件中分析（查找）你的入口文件（`entry.js`）的依赖，这些文件（即模块）也包含`bundle.js` 文件。webpack为每个模块分配一个独一无二的id，并且将这些通过id可访问的模块保存在`bundle.js`文件中。只有当入口模块启动的时候，通过调用require函数，一小会时间就能解析出这些依赖。

## 第一个加载器
我们要在实例中加入一个css文件
webpack只能操作原生javascript，所以我们需要一个`css-loader`模块来让webpack支持css文件，并且我们还需要一个`style-loader`模块来提取css文件中的样式。
执行命令`npm install css-loader style-loader`（这里只需要本地安装，不用加-g），这个命令执行成功会创建一个`node_modules`文件夹，里面有我们上面说的两个加载器。
接下来创建文件
*style.css*
```css
body{
  background: yellow;	
}
```
更新`entry.js`
```javascript
require("!style!css!./style.css");
document.write(require("./content.js"));
```
重新编译，然后刷新浏览器，我们会看到你的网页变黄了
![enter description here][4]
>声明一个加前缀的模块请求，模块就会通过一个加载器管道（来解析），这些加载器会用一种特殊的方式来解析文件内容，解析的结果就是一个javascript文件。

## 绑定加载器
我们并不象每次编译都写这么长的代码`require("!style!css!./style.css");`,我们就可以将文件的拓展解释绑定在加载器上，然后只需要这样写`require("./style.css")`
更新文件`entry.js`为
```javascript
require("./style.css");
document.write(require("./content.js"));
```
然后编译
```
webpack ./entry.js bundle.js --module-bind 'css=style!css'
```
>一些情况下可能要用双引号`webpack ./entry.js bundle.js --module-bind "css=style!css"`

刷新页面，你会看到同样的黄色网页
![enter description here][5]
## 配置文件
我们将配置项放进一个配置文件中，创建`webpack.config.js`
```javascript
module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
```
然后执行命令`webpack`来编译
```
Version: webpack 1.12.11
Time: 379ms
    Asset     Size  Chunks             Chunk Names
bundle.js  10.7 kB       0  [emitted]  main
chunk    {0} bundle.js (main) 8.86 kB [rendered]
    [0] ./tutorials/getting-started/config-file/entry.js 65 bytes {0} [built]
    [1] ./tutorials/getting-started/config-file/style.css 943 bytes {0} [built]
    [2] ../~/css-loader!./tutorials/getting-started/config-file/style.css 201 bytes {0} [built]
    [3] ../~/css-loader/lib/css-base.js 1.51 kB {0} [built]
    [4] ../~/style-loader/addStyles.js 6.09 kB {0} [built]
    [5] ./tutorials/getting-started/config-file/content.js 45 bytes {0} [built]
```
>webpack命令行会尝试在当前目录下加载`webpack.config.js`文件

## 一个更完美的输出
一个项目如果很大，那么编译的时间会变长。我们可能需要一个可显示的进度条，并且能有不同的颜色标识（不同文件）……
我们需要这样（执行命令）
`webpack --progress --colors`

## 观察者模式
我们不想每次文件都重新手动编译一次，只需要这样
`webpack --progress --colors --watch`
webpack会缓存没有改变的模块，输出两次编译之间的文件
>当时用观察者模式时，webpack会为所有的文件建立文件观察者，以用在编译进程中。如果检测到任何改变，就会重新编译。如果缓存可用，webpack会在内存中保存每一个模块，当他（模块）没有改变时，就会重复利用。

## 开发服务器
开发服务器可能是一种更好的方式
`npm install webpack-dev-server -g`
这会为你的端口为8080的本地静态服务绑定一个小型的express服务器。当重新编译的时候，他会自动刷新浏览器。打开[ http://localhost:8080/webpack-dev-server/bundle][6]看看吧

>这个程序利用了webpack的观察者模式。他同样阻止webpack向磁盘输出编译的文件，而服务于内存中的编译文件（这段话限于本人功力，没理解透……）

翻译的比较渣，拍砖留情。


  [1]: http://webpack.github.io/docs/tutorials/getting-started/
  [2]: /imgs/frontend/webpack1.png "webpack1.png"
  [3]: /imgs/frontend/webpack2.png "webpack2.png"
  [4]: /imgs/frontend/webpack3.png "webpack3.png"
  [5]: /imgs/frontend/webpack3.png "webpack3.png"
  [6]:  http://localhost:8080/webpack-dev-server/bundle
