低代码

https://mp.weixin.qq.com/s/JUXz9TOKbkO1oAzHjVfwnQ

../asset require(@/asset)

DepOps

Development 和 Operations 的组合词

最初大家说到 DEVOPS，都是指的‘开发运维一体化’,现在已经是扩大到需求端到输出端“[端到端](https://www.zhihu.com/search?q=端到端&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A1755254160})”的概念了

[devops](https://www.zhihu.com/question/58702398)

项目管理工具 jira

持续集成 CI（Continuous Integration）

持续交付 CD（Continuous Delivery）

`镜像仓库`：VMware Harbor

`编排`：K8S。

`服务治理`：Consul。

`脚本语言`：Python。

`日志管理`：Cat+Sentry，还有种常用的是 ELK。

`系统监控`：Prometheus。

`负载均衡`：Nginx。

`网关`：Kong，zuul。

`链路追踪`：Zipkin。

`产品和UI图`：蓝湖。

`公司内部文档`：Confluence。

`报警`：推送到工作群。

vue 原生事件处理

```js
/*
div id list
 li id li1
 li
 li
/div
*/
const list = document.getElementById('list')
const li1 = document.getElementById('li1')

function bindEvent(elem, type, selector, cb) {
  if (cb == null) {
    cb = selector
    selector = null
  }
  elem.addEventListener(type, (event) => {
    const target = event.target
    if (selector) {
      if (target.matches(selector)) {
        cb.call(target, event)
      }
    } else {
      cb.call(target, event)
    }
  })
}
bindEvent(li1, 'click', function (e) {
  alert(this.innerHTML)
})
bindEvent(list, 'click', 'li', function (e) {
  alert(this.innerHTML)
})
```

vue 数据持久化

通过 localStorage 和 sessionStorage 存储 state

hash history 具体区别

hash 模式使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载

history 模式充分利用 `history.pushState` API 来完成 URL 跳转而无须重新加载页面。如果用户自己访问 user/id 就会返回 404，所以需要配置找不到资源跳转 index.html

http 和 https

http 是超文本传输协议，信息是明文传输， 80 端口 无状态链接

https 则具安全性的 ssl/tls 加密传输协议。443 端口 SSL/TLS + HTTP 加密传输（使用密钥，对称）和身份认证（使用两把钥匙，非对称）

bable promise

vnode => el

[vnode 渲染过程](https://blog.csdn.net/weixin_43299180/article/details/121292723)

vuex 在什么初始化

[vuex 初始化](https://blog.csdn.net/weixin_42752574/article/details/122633313)

`负载均衡`：Nginx。

`容器`：Docker

yarn https://classic.yarnpkg.com/en/docs/pnp/

([https://www.perforce.com/blog/vcs/what-monorepo](http://link.zhihu.com/?target=https%3A//www.perforce.com/blog/vcs/what-monorepo))以及开源的 monorepo 管理工具`lerna`([https://github.com/lerna/lerna#readme](http://link.zhihu.com/?target=https%3A//github.com/lerna/lerna%23readme))，项目目录结构可以参考一下 `babel 仓库`([https://github.com/babel/babel](http://link.zhihu.com/?target=https%3A//github.com/babel/babel))。

作者：三元同学
链接：https://zhuanlan.zhihu.com/p/352437367
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

puppeteer

为什么要使用多倍图来防止模糊

three.js webGL vuejs3

**React 项目**

小程序生态

Rush

《css 新世界》笔记

《重构 改善既有代码设计》笔记

《你今天真好看》

《观鸟大年》

多模块打包启动

看字节周报

eslint 设置

react 实践和原理

算法题

第一遍的时候切忌纠结每个函数实现的细节，陷入各个函数的深度调用中。

messageChannel

render 阶段的 reconciler 中

**_fiber、update、链表_** 这些结构，lane 模型

## 移动端性能问题 B/S

npm 特点：core-js 作者找工作的信息

yarn1,特点：emoji，步骤很清晰，简洁工整 。

pnpm 特点：简单，重点突出了：重复安装包的复用问题；dependency 的版本

yarn2, berry 特点：error code + 颜色改进

https://weixin.sogou.com/

serverless

微前端

low code

vueuse

uniapp

flutter

next.js
