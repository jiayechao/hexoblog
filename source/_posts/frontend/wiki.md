---
title: WIKI
categories:
  - wiki
tags:
  - wiki
abbrlink: 145831b2
date: 2018-08-14 20:06:51
---

## Function.prototype.apply.call(Math.floor, undefined, [1.75])

::: tip

`Function.prototype.apply.call(Math.floor, undefined, [1.75])`这段代码乍一看比较难懂，我们将它拆分

`(Function.prototype.apply).call(Math.floor, undefined, [1.75])`这样就很明显了，实质上这段代码就是将`Math.floor.apply`用call重新写了一遍，也就是说，我们可以写成下面的形式

`Math.floor.apply(undefined, [1.75])`

:::

## nestjs的模块划分

::: tip

1. 核心模块（CoreModule）: 注册中间件，过滤器，管道，守卫，装饰器，拦截器等
2. 共享模块（SharedModule）: 注册服务，mongodb，redis等
3. 配置模块（CofigModule）: 系统配置
4. 特征模块（FeatureModule）: 即业务模块，用户，产品等

:::

## 依赖注入

::: tip

一种编程模式，可以让类从外部源中获得他的依赖，而不必亲自创建他们

:::

## nestjs用到的插件

::: tip

ejs-mate(模板引擎)
loader，loader-connect，loader-builder（静态资源）
dotenv (分析环境变量), joi, @types/joi(对象验证器)， cross-env (设置跨平台环境变量)
passport, @nestjs/passport, passport-http-bearer(身份验证)

ioredis, @types/ioredis, @nestjs/mongoose, @nestjs/passport, passport, passport-github, passport-local

:::

## 将script标签放入div

::: tip

很多统计代码会带有文字，如果不想显示，可以将script标签放在一个div中，并对这个div设置`display: none`

:::

## 数据库

1. 选取主键的一个基本原则是：不使用任何业务相关的字段作为主键
2. 通过定义外键约束，关系数据库可以保证无法插入无效的数据。即如果classes表不存在id=99的记录，students表就无法插入class_id=99的记录
3. 多对多关系实际上是通过两个一对多关系实现的，即通过一个中间表，关联两个一对多关系，就形成了多对多关系
4. 一些应用会把一个大表拆成两个一对一的表，目的是把经常读取和不经常读取的字段分开，以获得更高的性能
5. 不带FROM子句的SELECT语句有一个有用的用途，就是用来判断当前到数据库的连接是否有效
6. 使用LIMIT <M> OFFSET <N>分页时，随着N越来越大，查询效率也会越来越低。