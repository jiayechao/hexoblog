---
title: 写给vuer的react项目搭建指南
categories:
  - 前端框架
tags:
  - react
abbrlink: d36bc790
date: 2019-09-02 10:32:30
---

## 为什么

我为什么要写这个简单教程？

我所在公司一直是vue技术栈，最近在做市场调研的时候发现，很多公司都要求react技术栈。众所周知，react的上手难度还是比较高，但是，它的难度并不在业务代码本身，而在于项目搭建过程中的各种插件配置。

vue是一个渐进式框架，意味着他是随着你的项目逐渐丰富的，很多时候可能只需要用到很少的功能就可以完成项目。但是react不一样，如果你想搭建一个react项目，很多东西需要你自己动手，装包，装插件，想想路由鉴权，状态管理，环境变量等等各种操作，在vue-cli我们只需要跟着良好的文档做，几乎不会出错。但是react的糟糕的英文文档和排版很难让人快速找到需要的功能。

我写这个简单教程的目的就在此，你可以快速以此搭建自己的项目，达到快速入门，不用再纠缠于各种散乱的文档。

ps: 假定你已经能熟练使用vue-cli

## 环境变量

项目中我们常常需要在不同环境设置不同的变量，在vue-cli和create-react-app中有默认三个模式`.env, .env.development, .env.test, .env.production`
,可以直接创建文件后使用。

如果需要另外的自定义模式，在vue-cli中，我们直接创建`.env.[mode]`文件，设置键值对，然后配置script启动项`--mode [mode]`即可将键值对挂在到`process.env`上，很方便的功能。

但是在react中我们需要自己动手。

  1. 我们创建一个`.env.[mode]`文件，写入所需要的环境变量
  2. 安装`npm install env-cmd --save`
  3. 配置启动项，`build:[mode]": "env-cmd -f .env.[mode] npm run build`

这样我们就会将环境变量挂在到`process.env`

需要注意的是，除了关键的一些键值，其他自定义的需要以REACT_APP_开头。

react的环境变量文件`.env`还可以对项目进行一些高级配置，比如是否启用自定义eslint，图片压缩的大小等等，具体请查看[文档](https://create-react-app.dev/docs/advanced-configuration)

## 代码分割

最新的react已经内置了[懒加载方案](https://zh-hans.reactjs.org/docs/code-splitting.html#reactlazy)，但目前不支持服务端渲染。如果需要服务端渲染，可以查看[loadable-components](https://github.com/smooth-code/loadable-components)这个库

## ant-design按需加载

为了使用ant-design的按需加载，我们按照[官网教程](https://ant.design/docs/react/use-with-create-react-app-cn)改造项目

## 代理

create-react-app的代理,只需要在`package.json`中新增一个属性：`"proxy": "http://localhost:4000"`，即可代理到`http://localhost:4000`

你也可以手动配置自己的代理，分以下步骤：

  1. `yarn add http-proxy-middleware`
  2. 创建`src/setupProxy.js`,并写入
      ```javascript
      const proxy = require('http-proxy-middleware');

      module.exports = function(app) {
        app.use(proxy('/api', { target: 'http://localhost:5000/' }));
      };
      ```
  3. 具体配置可参考[http-proxy-middleware](http://npm.taobao.org/package/http-proxy-middleware)

## 路由守卫和编程式导航

从reac-router4.0版本开始去掉了守卫功能，但这个功能我们是需要的，那么如何做呢？这里我们通过`react-router-config`来实现一个简单的路由守卫鉴权。

  #### withRouter

  首先了解一下withRouter，它的作用就是把不通过路由切换过来的组件中，将reac-router的history，location, match三个对象传入props对象上，这样就可以使用history下的方法和属性来编程式导航，具体参考[history](https://reacttraining.com/react-router/web/api/history)。

  使用方法也很简单，只需要将组件用`withRouter()`执行一下就可以了

  ```javascript
  class App extends Component{
    //此时才能获取this.props,包含（history, match, location）三个对象
    console.log(this.props);  //输出{match: {…}, location: {…}, history: {…}, 等}
    render(){return (<div className='app'>
            <NavLink to='/one/users'>用户列表</NavLink>
            <NavLink to='/one/companies'>公司列表</NavLink>
            <Switch>
                <Route path='/one/:type?' component={One} />
                <Redirect from='/' to='/one' exact />
                <Route component={NotFound} />
            </Switch>
        </div>)
    }
  }
  export default withRouter(App);
  ```

  #### 路由守卫

  解决了编程式导航,那也就好解决路由守卫了。react-router的作者觉得组件化比较灵活`路由即组件`，崇尚去中心化，但我们的项目确实需要一个中心化的路由表便于维护。我们用到了[`react-router-config`](https://www.npmjs.com/package/react-router-config)这个库，你可以像vue那样中心化配置路由。
  
  同时，作者觉得路由守卫对于jsx语法有点多余，但我们确实需要一个守卫，所以我们需要包装一下组件，达到路由守卫的功能。

  以下是一段很简单代码，你可以参考
  ```javascript
  // route.js
  const routes = [
      {
        path: '/customer-list',
        component: CustomerList
      },
      {
        path: '/customer-detail/:id',
        component: CustomerDetail,
        auth: true
      },
  ]
  // App.js
  function App() {
    // 匹配路由
    const branch = matchRoutes(routes, props.location.pathname);
    // 判断是否需要权限
    const router = 
    // 这里可以多点判断的
      branch[branch.length - 1].route.auth ? 
      <Redirect to="/login"></Redirect> :
      renderRoutes(routes)
    return (
      <div className="App">
        {router}
      </div>
    )
  }
  ```

  总之，你只要将鉴权放在render-return之前即可

  #### 编程式导航

  props.history定义了很多方法，我们可以在此基础上进行编程式导航
