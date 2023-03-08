---
page: true
aside: false
title: 记录学习的点点滴滴
# hero:
#   name: 知识
#   text: 人类进步的阶梯
#   tagline: 学而时习之，不亦说乎~~
#   actions:
#     - theme: brand
#       text: 快速开始
#       link: /vitepress/introduction
#     - theme: alt
#       text: GitHub仓库
#       link: https://github.com/TheCornerOfTheWorld/learn-record-blogs

# features:
# - icon: 🛠️
#   title: LowCode
#   link: /lowcode/index
#   details: 低代码...

# - icon: 🛠️
#   title: 分享
#   link: /resourceSharing/index
#   details: 分享...

# - icon: 🛠️
#   title: 面试题
#   link: /interviewQuestion/index
#   details: 面试经过...

# - icon: 🛠️
#   title: 计算机网络
#   link: /computerNetworks/index
#   details: 计算机网络...

# - icon: 🛠️
#   title: chrome extensions
#   link: /chromeExtensions/index
#   details: chrome插件...

# - icon: 🛠️
#   title: lerna
#   link: /lerna/index
#   details: lerna...

# - icon: 🛠️
#   title: H5Debugger
#   link: /H5Debugger/index
#   details: h5调试...
---

<script setup>
import Home from '@theme/components/Home.vue'
</script>
<Home />

3.  写一个小的 react

4.  沙盒 chrome://new-tab-page-third-party/

5.  低代码解析过程，bable 解析过程

6.  官网 css 动画

7.  网络协议

    1. node nest.js express.js next.js

       复习之前的项目 my-server

       计算机网络实践

8.  类的继承，原型链，class

9.  设计模式书

10. nest start 执行过程

11. cssmodule

12. 快牙，p2p 为什么那么快

13. 热更新 hotReload

14. worksocket workservice webwork

15. 小程序

        1. 消息推送
        2. 项目管理

16. liune 系统操作 docket

17. ```js
    function shuffle(input) {
      for (let i = input.length - 1; i > 0; i--) {
        const k = Math.floor(Math.random() * (i + 1))
        const element = input[k]
        input[k] = input[i]
        input[i] = element
      }

      return input
    }
    // https://juejin.cn/post/7043574180570202148
    ```

18. [Vitest](https://vitest.dev/) [用例指南](https://cn.vuejs.org/guide/scaling-up/testing.html#e2e-testing)

19. [性能优化](https://cn.vuejs.org/guide/best-practices/performance.html)Web 指标

20. [安全](https://cn.vuejs.org/guide/best-practices/security.html)

21. 写一个计划管理系统；项目管理项目需求评估和可行性分析（今天可以考虑下需要什么功能）

    背景：记录平时都在做什么，为什么效率那么低，为什么会怠慢，知行合一？理论比现实先行？

          1. 计划排期
          2. 计划、实施和第二天总结
          3. 项目管理
          4. 缺陷和功能记录

22. 自己写一个网页设置成夜间模式插件

    1. chrome-extension://dmghijelimhndkbmpgbldicpogfkceaj/data/content_script/general/dark_40.css

23. LocaleSpecificConfig<ThemeConfig = any> ts 泛型 https://segmentfault.com/a/1190000038312096

24. vite

25. DepOps

26. three.js

27. p2p node

28. pnpm esbuild

29. 错误收集

30. const defaultRender = md.renderer.rules.fence!

缓慢的服务器启动¶
当冷启动开发服务器时，基于打包器的方式启动必须优先抓取并构建你的整个应用，然后才能提供服务。

Vite 通过在一开始将应用中的模块区分为 依赖 和 源码 两类，改进了开发服务器启动时间。

依赖 大多为在开发时不会变动的纯 JavaScript。一些较大的依赖（例如有上百个模块的组件库）处理的代价也很高。依赖也通常会存在多种模块化格式（例如 ESM 或者 CommonJS）。

Vite 将会使用 esbuild 预构建依赖。esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。

源码 通常包含一些并非直接是 JavaScript 的文件，需要转换（例如 JSX，CSS 或者 Vue/Svelte 组件），时常会被编辑。同时，并不是所有的源码都需要同时被加载（例如基于路由拆分的代码模块）。

Vite 以 原生 ESM 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。

缓慢的更新¶
基于打包器启动时，重建整个包的效率很低。原因显而易见：因为这样更新速度会随着应用体积增长而直线下降。

一些打包器的开发服务器将构建内容存入内存，这样它们只需要在文件更改时使模块图的一部分失活，但它也仍需要整个重新构建并重载页面。这样代价很高，并且重新加载页面会消除应用的当前状态，所以打包器支持了动态模块热替换（HMR）：允许一个模块 “热替换” 它自己，而不会影响页面其余部分。这大大改进了开发体验 —— 然而，在实践中我们发现，即使采用了 HMR 模式，其热更新速度也会随着应用规模的增长而显著下降。

在 Vite 中，HMR 是在原生 ESM 上执行的。当编辑一个文件时，Vite 只需要精确地使已编辑的模块与其最近的 HMR 边界之间的链失活[1]（大多数时候只是模块本身），使得无论应用大小如何，HMR 始终能保持快速更新。

Vite 同时利用 HTTP 头来加速整个页面的重新加载（再次让浏览器为我们做更多事情）：源码模块的请求会根据 304 Not Modified 进行协商缓存，而依赖模块请求则会通过 Cache-Control: max-age=31536000,immutable 进行强缓存，因此一旦被缓存它们将不需要再次请求。
————————————————
版权声明：本文为 CSDN 博主「Kevin 李宏飞」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_35017350/article/details/128872712
