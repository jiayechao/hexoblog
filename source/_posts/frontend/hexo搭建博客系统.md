---
title: hexo搭建博客系统
categories:
- 项目经验
- 工具
tags: 
- hexo
---
## 前言

自从进入前端，一直想有一个自己的个人网站，但我又是一个要求比较纠结的人，我要求这个网站所有的东西都是自己做得，还能运用到各种前端知识，那么就得会服务端的功底，会一点设计，但是自己老是犯懒，拖延，所以这个愿望迟迟不能达成。突然有一天觉得这样不行，就像做项目一样，没有东西是一次性做成的，我可以先建个简单的博客，记录下自己的成长，等网站建成，再迁移过来。 

本静态博客系统通过Hexo建成，托管在github上，方便快捷。主要记录自己的一些学习经验，项目经验，算是对自己的一种督促，也是一种积累。 

网上其实有很多搭建教程，大家可以自行搜索。这章是我在搭建过程中，遇到的坑，每个坑我都会附上自己谷歌的解决方案，方便大家参考。 

## 环境

 * OS: WIN 10,此文章基于windows10系统;
 * node: v4.4.6，node可直接在官网下载安装 [https://nodejs.org/en/][1]
 * npm: 2.15.5,node自带
 * git: [gitbash国内镜像][2] ,git可以学习廖雪峰老师的[教程][3]
 
## 开始搭建
### 安装hexo

安装hexo之前首先要搭建好以上环境，然后进入命令行工具
```
npm install hexo-cli -g
```
我这里安装的时候会有 ` npm WARN optional dep failed, continuing fsevents@1.0.8 `，这个不用管他，这是OSX系统需要的依赖.

### 初始化
进入你的博客目录，我的在`E:/myblog` ，点击右键，选择Git Bash Here
![git初始化][4]
然后在其中运行以下命令`hexo init`，注意myblog文件下最好不要有任何文档
![hexo初始化][5]
接着安装依赖，可能我上一步太完美了，这里没看到安装了什么
![enter description here][6]
然后依次运行`hexo g`
![hexo g][7]
`hexo s`
![hexo s][8]
可以看到，我们已经在本地成功的搭建了博客系统，可以去输入地址localhost:4000查看：
![enter description here][9]  

*这里需要说明的是上面几个命令*
```javascript
hexo init //初始化一个文件夹，它会为这个文件夹配置所有骨架
hexo g //即hexo generate，生成静态文件
hexo s //即hexo server，创建服务
hexo d //即hexo deploy,用于将本地文件发布到github上
hexo n //即hexo new,用于新建一篇文章
```

## 部署到github
目前为止，我们成功的在本地搭建了一个博客系统，现在我们将他部署到github上

### 申请github
我们去官网直接申请[点击进入申请][10]

### 创建新的仓库
恭喜你，连接上了世界。我们开始下一步，创建一个新的仓库
![创建新仓库][11]
点击后进入下页面
![创建新的仓库][12] 
注意，这里我们的仓库名必须是`你的github名.github.io`,例如我在github上的名字是rotate720deg，那么这个仓库名就是rotate720deg.github.io
 
### 将本地文件部署到github
进入你的博客文件夹，找到并打开_config.yml文件，在底部输入下面的代码
```JSON
deploy: 
  type: git
  repository: http://github.com/rotate720deg/rotate720deg.github.io.git
  branch: master
```
这里注意，hexo的配置中冒号（:）后都有一个空格，不能省略掉
配置好后，`hexo g`然后`hexo d`，此时我的出现了问题
![hexo d][13]
通过下面操作解决`npm install hexo-deployer-git --save`

### 文件配置
到了这一步，如果没什么问题，我们访问[rotate720deg.github.io][14],已经能够看到我们的博客了。接下来我们简单认识一下hexo的配置文件
hexo有两个常用的配置文件：博客的配置文件`E:\myblog\_config.yml`和博客主题的配置文件`E:\myblog\themes\landscape\_config.yml`

我们的是初始化的主题，官方提供了很多[漂亮简明的主题][15],你可以下载后，替换整个themes，同时改变博客配置中的主题名，下面介绍一下配置文件
首先是博客配置
```JSON
# Hexo Configuration
## Docs: https://hexo.io/docs/configuration.html
## Source: https://github.com/hexojs/hexo/

# Site
title: Hexo >>博客名
subtitle: >>副标题
description: >>描述
author: John Doe >>作者
language: zh-CN >>语言
timezone: >>时区，此处不填写，hexo会以你目前电脑的时区为默认值

# URL >>暂不配置，用于关联你自己的域名
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: http://yoursite.com
root: /
permalink: :year/:month/:day/:title/
permalink_defaults:

# Directory >>暂不配置
source_dir: source
public_dir: public
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code
i18n_dir: :lang
skip_render:

# Writing >>文章布局等，使用默认值
new_post_name: :title.md # File name of new posts
default_layout: post
titlecase: false # Transform title into titlecase
external_link: true # Open external links in new tab
filename_case: 0
render_drafts: false
post_asset_folder: false
relative_link: false
future: true
highlight:
  enable: true
  line_number: true
  auto_detect: false
  tab_replace:

# Category & Tag >>暂不配置，使用默认值
default_category: uncategorized
category_map:
tag_map:

# Date / Time format >>时间格式，使用默认值
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
date_format: YYYY-MM-DD
time_format: HH:mm:ss

# Pagination
## Set per_page to 0 to disable pagination
per_page: 10 >>每页显示的文章数，0表示不分页
pagination_dir: page

# Extensions >>插件配置，暂不配置
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: landscape

# Deployment  >>用于部署到github，已配置过
## Docs: https://hexo.io/docs/deployment.html
deploy: 
  type: git
  repository: http://github.com/rotate720deg/rotate720deg.github.io.git
  branch: master

```
然后是博客主题配置
```JSON
# Header >>博客的菜单栏
menu: 
  Home: /
  Archives: /archives
rss: /atom.xml

# Content >>文章下的Read more，可以改为'阅读全文'
excerpt_link: Read More
fancybox: true

# Sidebar >>侧边栏配置
sidebar: right
widgets:
- category
- tag
- tagcloud
- archive
- recent_posts

# display widgets at the bottom of index pages (pagination == 2)
index_widgets:
# - category
# - tagcloud
# - archive

>>其他的一些配置

# widget behavior
archive_type: 'monthly'
show_count: false

# Miscellaneous
google_analytics:
favicon: /favicon.png
twitter:
google_plus:
fb_admins:
fb_app_id:

```
每个主题都有自己的说明，更换好主题后，仔细查看说明。
至此，我们的博客系统已经搭建完成，试着写一篇文章看看`hexo new "hexo博客系统搭建"`,
我们的新建博客创建在` E:\myblog\source\_posts\hexo搭建博客系统.md`,md后缀是markdown的文件格式，（what！！！你没听过！！！骚年，你落伍了，赶紧跟上潮流吧！）这里推荐一款markdown编辑器[小书匠][16],你也可以使用[线上编辑器][17]
写完文章后，照例

 * `hexo g` >>创建静态文档
 * `hexo s` >>本地预览
 * `hexo d` >>上传github


> 本文是作者幸苦原创，转载的时候请注明

  [1]: https://nodejs.org/en/
  [2]: http://pan.baidu.com/s/1skFLrMt#path=%252Fpub%252Fgit
  [3]: http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000
  [4]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/gitBash.png "gitBash.png"
  [5]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/hexoinit.png "hexoinit.png"
  [6]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/npminstall.png "npminstall.png"
  [7]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/hexog.png "hexog.png"
  [8]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/hexos.png "hexos.png"
  [9]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/home.png "home.png"
  [10]: https://github.com/
  [11]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/newR1.png "newR1.png"
  [12]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/newR2.png "newR2.png"
  [13]: https://blog-images-1252854786.cos.ap-guangzhou.myqcloud.com/imgs/frontend/hexod.png "hexod.png"
  [14]: jiayechao.github.io
  [15]: http://hexo.io/themes/
  [16]: http://soft.xiaoshujiang.com/
  [17]: http://markdown.xiaoshujiang.com/
