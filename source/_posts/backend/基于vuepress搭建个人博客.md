---
title: 基于vuepress搭建个人博客
date: 2019-08-15 20:06:51
categories:
- 前端框架
tags:
- vue
- vuepress
---

## vuepress介绍

相信大家在学习vue的时候也看到了，官方文档逻辑清晰，设计合理，对我们的学习有很大的帮助。是不是也想有这么一个风格的网站，用来记录自己平时的一些积累。

vuepress就是为此而生，通过vuepress你可以搭建一个和vue官方文档一摸一样的网站，天然的友好seo，你可以不用关注任何设置，开箱即用，当然你也可以尽情折腾，创造属于自己style的网站。

实际上，vuepress网站就是一个类似vue全家桶的单页应用。如果你的vue比较熟练，你甚至可以随意开发，自定义主题。vuepress在构建时，会创造一个服务端渲染的版本，这样就类似于nuxt。

## 开始搭建

> 完整的搭建指南可以到[vuepress官网](https://vuepress.vuejs.org/zh/)查看，本篇只提供一个基础的示例

新建目录`blog`作为博客项目的主体, 依次执行以下代码

```javascript
yarn init // 初始化
yarn add -D vuepress // 安装vuepress
```

安装好vuepress后，就可以写文章了。新建docs作为文章的存放目录，在docs下新建一个`README.md`，写入[yaml](https://ansible-tran.readthedocs.io/en/latest/docs/YAMLSyntax.html)数据

```yaml
---
home: true
heroImage: /hero.png
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```

还差一步我们就能看到我们的成果了，在`package.json`的`script`中添加指令

```javascript
"docs:dev": "vuepress dev docs",
"docs:build": "vuepress build docs",
```

执行指令,访问本地地址即可看到熟悉的页面。

```javascript
yarn docs:dev
```

## 部署

>各个平台的部署指南可以到[vuepress官网](https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages)查看，本篇只提供一个github page的部署示例

1. 在 docs/.vuepress/config.js 中设置正确的 base。

   如果你打算发布到 `https://<USERNAME>.github.io/`，（需要首先创建`<USERNAME>.github.io`远程仓库）则可以省略这一步，因为 base 默认即是 "/"。

   如果你打算发布到 `https://<USERNAME>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 base 设置为 `/<REPO>/`
2. 在你的项目中，创建一个如下的 `deploy.sh` 文件（请自行判断去掉高亮行的注释）:
    ```bash
    #!/usr/bin/env sh

    # 确保脚本抛出遇到的错误
    set -e

    # 生成静态文件
    npm run docs:build

    # 进入生成的文件夹
    cd docs/.vuepress/dist

    # 如果是发布到自定义域名
    # echo 'www.example.com' > CNAME

    git init
    git add -A
    git commit -m 'deploy'

    # 如果发布到 https://<USERNAME>.github.io
    # git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

    # 如果发布到 https://<USERNAME>.github.io/<REPO>
    # git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

    cd -
    ```

    双击执行`deploy.sh`，如果没有意外，博客就会自动部署到你想要发布的仓库。

## 使用自己的域名

vuepress也支持部署到自定义域名下，但是需要将自己的域名解析。如下图添加解析后即可

![](/imgs/backend/domain.png)

## 持续集成

整个blog项目提交github后，手动触发`deploy.sh`部署，也比较麻烦，有没有方法在push之后就自动触发呢。可以，我们通过`travis-ci`来达到目的。

1. 登录[https://www.travis-ci.org](https://www.travis-ci.org), 关联自己的github

2. 在头像处选择`setting`，打开博客仓库的设置，进入设置后，我们需要填入github的令牌`{access_token: token}`
    ![](/imgs/backend/token.png)

3. 打开自己的[github](https://github.com/settings/tokens),点击`Generate new token`,选择所有的选项，生成令牌，复制后填入步骤2

4. 修改`deploy.sh`

  ```bash
    # 如果使用 travis 持续集成
    git push -f https://${access_token}@github.com/<USERNAME>/<USERNAME>.github.io.git master
  # git push -f https://${access_token}@github.com/<USERNAME>/<REPO>.git master:gh-pages
  ```

5. 在blog项目根目录创建`.travis.yml`，填入内容

  ```yaml
  language: node_js
  sudo: required
  node_js:
    - 8.11.2
  branch: master
  cache:
    directories:
      - node_modules
  script:
    - ./deploy.sh
  ```

6. 最后一步，将 `deploy.sh` 变成可执行文件

  ```bash
  git update-index --add --chmod=+x build.sh
  ```

试试`push`一下，看[https://www.travis-ci.org/dashboard](https://www.travis-ci.org/dashboard)有没有自动部署

## 图片查看

vuepress部署的网站图片是没办法点击的，需要自己来增强。说到底，vuepress也是一个vue应用，我们可以进行应用级别的配置

***下面是个坑***

> 创建 `.vuepress/enhanceApp.js`文件，这里我们引入[`img-vuer`](https://www.npmjs.com/package/img-vuer)。

```javascript
import gallery from 'img-vuer'

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  // ...做一些其他的应用级别的优化
  Vue.use(gallery)
}
```

在md文档中，我们只需要给img标签添加`v-gallery`即可

```md
<img v-gallery src="../.vuepress/public/imgs/backend/token.png" />
```

上面的操作在开发环境中是可以的，但是在build时就会报错`document is not define`

***正确做法***

vuepress是一个ssr，我们要习惯[编写通用代码](https://ssr.vuejs.org/zh/universal.html)。这一步走不通，但我们有一个取巧的办法

```md
[<img src="../.vuepress/public/imgs/backend/token.png" />](/imgs/backend/token.png)
```

将图片展示成一个链接，点击后单独访问，是不是就可以了！
