---
title: hexo博客实用功能
categories:
  - 项目经验
  - 工具
tags:
  - hexo
abbrlink: 32b5d447
date: 2016-08-14 15:50:45
---
## 前言
一个完整的博客系统，不仅有文章，还应该有评论，订阅，分享等实用功能，我们开始在博客中加入这些功能。很多主题有自带的第三方服务，只需要你简单开启就行。这篇文章基于nexT主题，其实进入他的官网，各种功能一目了然[http://theme-next.iissnan.com/][1]

## 评论系统
这里我们添加的是多说评论，一款比较优秀的国内第三方评论系统。
首先，进入多说官网[http://duoshuo.com/][2]，点击我要安装，就会进入一个注册站点的页面
![enter description here][3]
根据你的需求注册，创建后，出现
![enter description here][4]
若果是nexT主题，我们只需要在博客的配置文件下加一句` duoshuo_shortname: rotate720deg`然后`hexo g`并同步就行了；
别的主题如果没有集成多说，就需要你进入主题模板，一般是在
`你的博客文件夹/theme/主题文件夹/layout/_partial/comments.ejs`或`你的博客文件夹/theme/主题文件夹/layout/_partial/article.ejs`
hexo默认的主题是第二种情况，这个文件下有段这样的代码
![enter description here][5]
看到`disqus_thread`了吗？将这个元素替换成你从多说获取的通用代码，然后去博客的主题配置文件下添加` duoshuo_shortname: rotate720deg`

## 分享
nexT自带多说分享功能，你只需要在站点配置文件中添加字段`duoshuo_share: true`

## 百度统计
注册[百度统计][6],成功后，定位到`网站中心/代码获取`
![enter description here][7]
复制hm.js?后面的id，然后再站点配置文件中添加字段`baidu_analytics: 你获取的id`

## 搜索服务
nexT集成三种站内搜索，我选择了本地搜索
在你的博客根目录下安装模块
`npm install hexo-generator-search --save`
然后再站点配置文件下添加
```
search:
  path: search.xml
  field: post
```

## 总结
每个主题都有自己的一些插件功能，安装方法也各有差别，只要你静下心搜索研究，就一定可以成功。话说回来，博客只是让我们能更好的写文章，精力还是用在研究技术本身上比较好。

  [1]: http://theme-next.iissnan.com/
  [2]: http://duoshuo.com/
  [3]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/duoshuo1.png "duoshuo1.png"
  [4]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/duoshuo2.png "duoshuo2.png"
  [5]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/discuss.png "discuss.png"
  [6]: http://tongji.baidu.com/
  [7]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/tongji.png "tongji.png"
