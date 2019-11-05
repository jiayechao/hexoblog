---
title: nestjs+graphQL的初步尝试及指南
categories:
  - 前端框架
tags:
  - node
  - nestjs
  - grapgql
abbrlink: d800e352
date: 2019-08-15 20:06:51
---

## nestjs学习

#### 介绍

> Nest 是一个用于构建高效，可扩展的 Node.js 服务器端应用程序的框架。它使用渐进式 JavaScript，内置并完全支持 TypeScript（但仍然允许开发人员使用纯 JavaScript 编写代码）并结合了 OOP（面向对象编程），FP（功能编程）和 FRP（功能反应编程）的元素。
在底层，Nest使用强大的 HTTP Server 框架，如 Express（默认）和 Fastify。Nest 在这些框架之上提供了一定程度的抽象，但也可以将其 API 直接暴露给开发人员

#### 前置知识

nestjs使用typescript编写，所以需要对typescript有一定的了解，关键词：声明，接口，泛型，装饰器

#### 几个概念
1. 依赖，就是当类需要执行其功能时，所需要的服务或对象
2. 依赖注入（DI）： 控制反转（IoC）是一种设计思想，意味着将你创建好的对象交给容器控制，而不是你直接控制
    * 谁控制谁，控制什么
      > 我们直接在对象内部通过new进行创建对象，是程序主动去创建依赖对象；而IoC是有专门一个容器来创建这些对象，即由Ioc容器来控制对 象的创建；
    * 为何是反转，哪些反转了
      > 我们自己在对象中主动控制去直接获取依赖对象，就是正转；而反转则是由容器来帮忙创建及注入依赖对象
    * [更好的理解](https://angular.cn/guide/dependency-injection)
3. AOP(面向切面编程)，针对业务处理过程中的切面进行提取。
      ```javascript
      function voice(){
        alert("救命啊！");
      }
      Aspects = function(){};
      Aspects.prototype={
        before:function(target,method,advice){
          var original  = target[method];
          target[method] = function(){
            (advice)();
            original.apply(target, arguments);
          }
          return target
        },
        after:function(target,method,advice){
          var original  = target[method];
          target[method] = function(){
            original.apply(target, arguments);
            (advice)();
          }
          return target
        },
        around:function(target,method,advice){
          var original  = target[method];
          target[method] = function(){
            (advice)();
            original.apply(target, arguments);
            (advice)();
          }
          return target
        }
      }
      window.onload = function(){
        var bn = document.getElementById("bn");
        var a = new Aspects;
        a.after(bn,"onclick",function(){alert("HELP！HELP！")});
      }
      ```
      
#### 上手

按照官网快速创建一个项目

```javascript
$ npm i -g @nestjs/cli
$ nest new project-name
```

创建的目录结构如下，一个典型的mvc模式
```tree
  src
  ├─app.controller.ts
  ├─app.module.ts
  └─main.ts
```

```javascript
// app.controller.ts
import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'hello world'
  }

  @Get()
  async getHello(): Promise<any> {
    return await this.appService.getHello()
  }
}

```

```javascript
// app.module.ts
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'

@Module({
  controllers: [AppController],
})
export class AppModule {}
```

```javascript
// main.ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(34264)
}
bootstrap()
```

基本按照官网的[概述](https://docs.nestjs.com/first-steps)就可以搭建一个基本的服务了

## graphQL

#### 介绍

> GraphQL 是一个用于 API 的查询语言，是一个使用基于类型系统来执行查询的服务端运行时（类型系统由你的数据定义）。
> 一个 GraphQL 服务是通过定义类型和类型上的字段来创建的，然后给每个类型上的每个字段提供解析函数
> schema + resolver => result
#### nestjs中的graphql

nestjs使用[graphql](http://graphql.cn/)有两种方式，一种是常规的schema优先，一种是code优先。我们采用的是code优先。
nestjs封装[apollo](https://www.apollographql.com/docs/intro/platform),并使用[typegraphql](https://typegraphql.ml/docs/introduction.html)来实现整个graphql服务。

#### 使用

首先安装需要的包
```javascript
npm i --save @nestjs/graphql apollo-server-express graphql-tools graphql
```
接下来我们改造一下之前的代码
```javascript
// 我们需要在app.module中引入
  import { Module } from '@nestjs/common'
  import { AppController } from './app.controller'
+ import { GraphQLModule } from '@nestjs/graphql'

@Module({
  +imports: [
  +  GraphQLModule.forRootAsync({
  +    // 这里的参数将传递给底层的apollo实例
  +    // 异步传递模块
  +    useFactory: () => ({
  +      autoSchemaFile: 'schema.gql',
  +      nstallSubscriptionHandlers: true,
  +      context: ({req}) => {
  +        return {
  +          headers: {
  +            'accessToken': req.headers.accesstoken,
  +            'x-sec-profile': req.headers['x-sec-profile'],
  +          },
  +        }
  +      },
  +    }),
  +  }),
  controllers: [AppController],
})
export class AppModule {}
```
 前端的gql请求，实质上都是通过`/graphgq`的，apollo已经封装过，我们要做的就是为这个请求处理一下查询.

 我们首先创建一个schema
 ```javascript
 // hello.ts
  import { ObjectType, Field } from 'type-graphql'

  @ObjectType()
  export class Hello {
    @Field()
    id: number
  }
 ```

 ```javascript
  // app.resolver.ts
  import { Injectable } from '@nestjs/common'
  import { Query } from '@nestjs/graphql'
  import { Hello } from './hello'

  @Injectable()
  export class AppResolver {
    @Query(returns => Hello)
    getHello() {
      return {
        id: 12314,
      }
    }
  }
 ```

 我们要使用graphql，就要引入这个服务
 ```javascript
// 我们需要在app.module中引入
  import { Module } from '@nestjs/common'
  import { AppController } from './app.controller'
  import { GraphQLModule } from '@nestjs/graphql'
+ import { AppResolver } from './app.resolver'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      // 这里的参数将传递给底层的apollo实例
      // 异步传递模块
      useFactory: () => ({
        autoSchemaFile: 'schema.gql',
        nstallSubscriptionHandlers: true,
        context: ({req}) => {
          return {
            headers: {
              'accessToken': req.headers.accesstoken,
              'x-sec-profile': req.headers['x-sec-profile'],
            },
          }
        },
      }),
    }),
  ]
  controllers: [AppController],
+ providers: [AppResolver]
})
export class AppModule {}
```

## 总结

总的来说，这套东西学习成本很高，不同于我们熟悉的前端知识。这篇文章只是一个简单的开始，很多东西需要在实践中摸索，文档的熟悉很重要。

## 学习资料
[typescript学习](https://ts.xcatliu.com/?tdsourcetag=s_pctim_aiomsg)

[nestjs官网](https://docs.nestjs.com/)

[nestjs中文](https://docs.nestjs.cn/6/introduction)

[graphql官网](http://graphql.cn/)

[apollo官网](https://www.apollographql.com/)

[typegraphql官网](https://typegraphql.ml/)

[vueapollo官网](https://vue-apollo.netlify.com/zh-cn/)
