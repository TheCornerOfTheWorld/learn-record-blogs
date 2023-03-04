- ##### JavaScript

  - [前端开发者不得不知的 ES6 十大特性](http://www.alloyteam.com/2016/03/es6-front-end-developers-will-have-to-know-the-top-ten-properties/)

    1. Default Parameters（默认参数） in ES6 函数默认参数
    2. Template Literals （模板文本）in ES6 `${}`
    3. Multi-line Strings （多行字符串）in ES6 ``可以换行
    4. Destructuring Assignment （解构赋值）in ES6
    5. Enhanced Object Literals （增强的对象文本）in ES6 { try（）{}}
    6. Arrow Functions （箭头函数）in ES6
    7. Promises in ES6
    8. Block-Scoped Constructs Let and Const（块作用域构造 Let and Const）
    9. Classes（类） in ES6
    10. Modules（模块） in ES6

    - var 有变量提升，有初始化提升，值可变
    - let 有变量提升，没有初始化提升，值可变
    - const 有变量提升，没有初始化提升，值不可变，但如果是定义对象，则属性可变 Object.freeze() 冻结、Object.seal() 密封、Object.preventExtensions() 防止扩展

  - 防抖节流

    - **在第一次触发事件时，不立即执行函数，而是给出一个期限值比如 200ms**
    - 如果在限定时间段内，不断触发滚动事件，理论上就永远不会输出当前距离顶部的距离。——**让函数执行一次后，在某个时间段内暂时失效，过了这段时间后再重新激活**

  - promise then 原理

    - promise 特性
      - Promise 本身是一个状态机，每一个 Promise 实例只能有三个状态，`pending`、`fulfilled`、`reject`，状态之间的转化只能是`pending->fulfilled`、`pending->reject`，状态变化不可逆。
      - Promise 有一个`then`方法，该方法可以被调用多次，并且返回一个 Promise 对象。
      - 支持链式调用。
      - 内部保存有一个 value 值，用来保存上次执行的结果值，如果报错，则保存的是异常信息。

    ```js
    class MyPromise {
      // 构造方法
      constructor(executor) {
        // 初始化值
        this.initValue()
        // 初始化this指向
        this.initBind()
        // 执行传进来的函数
        executor(this.resolve, this.reject)
      }

      initBind() {
        // 初始化this
        this.resolve = this.resolve.bind(this)
        this.reject = this.reject.bind(this)
      }

      initValue() {
        // 初始化值
        this.PromiseResult = null // 终值
        this.PromiseState = 'pending' // 状态
      }

      resolve(value) {
        // 如果执行resolve，状态变为fulfilled
        this.PromiseState = 'fulfilled'
        // 终值为传进来的值
        this.PromiseResult = value
      }

      reject(reason) {
        // 如果执行reject，状态变为rejected
        this.PromiseState = 'rejected'
        // 终值为传进来的reason
        this.PromiseResult = reason
      }
      then(onFulfilled, onRejected) {
        // 接收两个回调 onFulfilled, onRejected

        // 参数校验，确保一定是函数
        onFulfilled =
          typeof onFulfilled === 'function' ? onFulfilled : (val) => val
        onRejected =
          typeof onRejected === 'function'
            ? onRejected
            : (reason) => {
                throw reason
              }

        var thenPromise = new MyPromise((resolve, reject) => {
          const resolvePromise = (cb) => {
            try {
              const x = cb(this.PromiseResult)
              if (x === thenPromise) {
                // 不能返回自身哦
                throw new Error('不能返回自身。。。')
              }
              if (x instanceof MyPromise) {
                // 如果返回值是Promise
                // 如果返回值是promise对象，返回值为成功，新promise就是成功
                // 如果返回值是promise对象，返回值为失败，新promise就是失败
                // 谁知道返回的promise是失败成功？只有then知道
                x.then(resolve, reject)
              } else {
                // 非Promise就直接成功
                resolve(x)
              }
            } catch (err) {
              // 处理报错
              reject(err)
              throw new Error(err)
            }
          }

          if (this.PromiseState === 'fulfilled') {
            // 如果当前为成功状态，执行第一个回调
            resolvePromise(onFulfilled)
          } else if (this.PromiseState === 'rejected') {
            // 如果当前为失败状态，执行第二个回调
            resolvePromise(onRejected)
          } else if (this.PromiseState === 'pending') {
            // 如果状态为待定状态，暂时保存两个回调
            // 如果状态为待定状态，暂时保存两个回调
            this.onFulfilledCallbacks.push(
              resolvePromise.bind(this, onFulfilled)
            )
            this.onRejectedCallbacks.push(
              resolvePromise.bind(this, onRejected)
            )
          }
        })

        // 返回这个包装的Promise
        return thenPromise
      }
    }
    ```

  - 箭头函数和普通函数的区别

    - **箭头函数不绑定 this，会捕获其所在的上下文的 this 值，作为自己的 this 值**
    - 箭头函数是匿名函数，不能作为构造函数，不可以使用 new 命令，否则会抛出一个错误。
    - 箭头函数没有原型属性 prototype
    - 箭头函数没有 arguments 对象

  - 静态属性和静态方法，使用`static`定义的属性和方法只能 class 自己用，实例用不了

    ```js
    class Person {
      constructor(name) {
        this.name = name
      }

      static age = 22

      static fn() {
        console.log('哈哈')
      }
    }
    console.log(Person.age) // 22
    Person.fn() // 哈哈

    const sunshine_lin = new Person('林三心')
    console.log(sunshine_lin.age) // undefined
    sunshine_lin.fn() // fn is not a function


    // includes
    console.log(arr.indexOf(NaN)) // -1  indexOf找不到NaN
    console.log(arr.includes(NaN)) // true includes能找到NaN

    而??和||最大的区别是，在??这，只有undefined和null才算假值

    ```

  isNaN：除了判断 NaN 为 true，还会把不能转成数字的判断为 true，例如'xxx'
  Number.isNaN：只有判断 NaN 时为 true，其余情况都为 false

  ```js

  Symbol

    使用Symbol来作为对象属性名
    	命名冲突
      const obj = {};
      const sym = Symbol();
      obj[sym] = 'foo';
      obj.bar = 'bar';
      console.log(obj); // { bar: 'bar' }
      console.log(sym in obj); // true
      console.log(obj[sym]); // foo
      console.log(Object.keys(obj)); // ['bar']
    使用Symbol来替代常量

    使用Symbol定义类的私有属性
        symbol不会出现在 Object.keys()的结果中，因此除非你明确地export 一个symbol，或者用 Object.getOwnPropertySymbols() 函数获取，否则其他代码无法访问这个属性。

  - JavaScript变量在内存中具体存储形式？

    - 基本数据类型：存在`栈内存`里
    - 引用数据类型：指针存`栈内存`，指向`堆内存`中一块地址，内容存在堆内存中
  ```

  **原型链**

  ![](https://pic1.zhimg.com/80/v2-76932215c87719f9b4d40ea7110737d0_720w.jpg)

  构造函数的`prototype`和其实例的`__proto__`是指向同一个地方的，这个地方就叫做**原型对象** `{}`

  1. ```js
     // 继承
     class A {}

     class B extends A {}

     B.__proto__ === A // true
     B.prototype.__proto__ === A.prototype // true

     var F = function () {}

     Object.prototype.a = function () {
       console.log('a')
     }

     Function.prototype.b = function () {
       console.log('b')
     }

     var f = new F()

     f.a() // a
     f.b() // f.b is not a function

     F.a() // a
     F.b() // b
     ```

  2. `function B(a) {    this.a = a; } console.log(new B().a); // undefined`

     1. new 的时候 this 会赋值为实例

  3. `123['toString'].length + 123 = ?`的答案是`124`

     `length` 是函数对象的一个属性值，指该函数有多少个必须要传入的参数，即形参的个数。形参的数量不包括剩余**参数个数**，仅包括第一个具有**默认值之前的参数**个数

  **垃圾回收机制**有两种方式，一种是`引用法`，一种是`标记法`

  引用法就是判断一个对象的引用数，引用数`为0`就回收，引用数`大于0`就不回收。

  标记法就是，从初始的`根对象（window或者global）`的指针开始，将`可达`的对象标记起来，`不可达`的对象当成垃圾回收。

  **作用域**

  ```js
  var value = 1

  function foo() {
    console.log(value)
  }

  function bar() {
    var value = 2
    foo()
  }

  bar() // 1
  ```

  要到创建这个函数的那个域”。 作用域中取值,这里强调的是“创建”，而不是“调用”

  JavaScript 采用词法作用域(lexical scoping)，也就是**静态作用域**。函数的作用域在函数**定义**的时候就决定了。

  而与词法作用域相对的是动态作用域，函数的作用域是在函数调用的时候才决定的。

  ##### 执行上下文

  https://juejin.cn/post/6844903479429824526

  当执行到一个函数的时候，就会进行准备工作，这里的“准备工作”，让我们用个更专业一点的说法，就叫做"**执行上下文**(execution contexts)"。每个执行上下文有三个属性变量对象 AO，作用域链，this

  **执行上下文**在运行时确定，随时可能改变；**作用域**在定义时就确定，并且不会改变。

  JavaScript 的执行分为：解释和执行两个阶段，**解释** 词法分析、语法分析、作用域规则确定，**执行** 创建执行上下文、执行函数代码、垃圾回收

  变量对象 AO：

  1. 全局上下文的变量对象初始化是全局对象
  2. 函数上下文的变量对象初始化只包括 Arguments 对象
  3. 在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值
  4. 在代码执行阶段，会再次修改变量对象的属性值

  ```js
  // 1.
  function foo() {
    console.log(a)
    a = 1
  }

  foo() // Uncaught ReferenceError: a is not defined

  function bar() {
    a = 1
    console.log(a)
  }
  bar() // 1

  AO = {
    arguments: {
      length: 0
    }
  }
  // 2.
  console.log(foo) // foo()

  function foo() {
    console.log('foo')
  }

  var foo = 1
  ```

  **作用域链**

  当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

  ```js
  function foo() {
      function bar() {
          ...
      }
  }
  foo.[[scope]] = [
    globalContext.VO
  ];

  bar.[[scope]] = [
      fooContext.AO,
      globalContext.VO
  ];

  // https://juejin.cn/post/6844903473683628046
  var scope = "global scope";
  function checkscope(){
      var scope2 = 'local scope';
      return scope2;
  }
  checkscope();
  checkscopeContext = {
      AO: {
          arguments: {
              length: 0
          },
          scope2: 'local scope'
      },
      Scope: [AO, [[Scope]]]
  }



  ```

  this

  参数按值传递： **按引用传递是传递对象的引用，而按共享传递是传递对象的引用的副本！**参数如果是基本类型是按值传递，如果是引用类型按共享传递。

  ```js
  var obj = {
    value: 1
  }
  function foo(o) {
    o = 2
    console.log(o) //2
  }
  foo(obj)
  console.log(obj.value) // 1
  ```

  #### jwt 鉴权

  `jwt鉴权`是不需要服务端存储的

  - 1、用户登录
  - 2、服务端接收到登录请求，根据用户信息，生成一个`token`给前端
  - 3、前端接收到`token`，存在了`浏览器本地缓存`中（例如`LocalStorage`）
  - 4、接下来每次请求，都需将`token`带在`请求头`里
  - 5、服务端解析前端传来的`token`，有效则接受，无效则返回`401`
  - 6、用户注销时，只需要前端销毁这个`token`

  **介绍一下项目 有哪些是由你主导提出的方案做的事情**

  1. 业务介绍
     1. 查询过程
  2. 实现介绍
     1. 数据流
     2. 组件设计

  html viewport 标签属性 [width](https://so.csdn.net/so/search?q=width&spm=1001.2101.3001.7020)=device-width initial-[scale](https://so.csdn.net/so/search?q=scale&spm=1001.2101.3001.7020)=1 height=device-height

  当初始 HTML 文档已完全加载和解析时，将触发 DOMContentLoaded 事件

  [浏览器是如何解析 html 的？](https://juejin.cn/post/6844903745730396174)

  `渐进式`则指得是浏览器会迫不及待的将解析完成的部分显示出来

  会阻塞`dom`解析的资源主要包括：

  - 内联 css

  - 内联 javascript

  - 外联普通 javascript

  - 外联 defer javascript

  - javascript 标签之前的外联 css

  不阻塞`dom`解析的资源主要包括：

  - javascript 标签之后的外联 css
  - image
  - iframe
  - 外联 async javascript

  外联普通 javascript

  ![外联普通javascript](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/23/167daf9dd89fdd11~tplv-t2oaga2asx-watermark.awebp)

  外联 defer javascript

  ![外联defer javascript](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/23/167dafded7c4716c~tplv-t2oaga2asx-watermark.awebp)

  外联 async javascript

  脚本的`下载`过程不阻塞`html`解析

  ![外联async javascript](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/23/167dafef85637252~tplv-t2oaga2asx-watermark.awebp)

  ```js
  // js为数字添加千位分隔符
  function milliFormat(num) {
    return (
      num &&
      num.toString().replace(/\d+/, function (s) {
        return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
      })
    )
  }
  ```

- ##### CSS

- ##### 框架通识

- ##### Vue React

  - Vue 的还是 React 的，很容易被问到两者区别

  - keep-alive

  - diff 算法

  - computed 和 watch 的区别

    - computed 多对一 watch 一对多

  - 路由三种模式 hash 原理

  - 样式 scoped 原理，data-xxx(hash)属性

  - 按需加载好处：打包 vue 分包。 首屏加载，没有的化会打成一个 js 包

    ```js
    function writeCode(prefix, code, fn) {
      let container = document.querySelector('#code')
      let styleTag = document.querySelector('#styleTag')
      let n = 0
      let id
      id = setTimeout(function run() {
        n += 1
        container.innerHTML = code.substring(0, n)
        styleTag.innerHTML = code.substring(0, n)
        container.scrollTop = container.scrollHeight
        if (n < code.length) {
          id = setTimeout(run, duration)
        } else {
          fn && fn.call()
        }
      }, duration)
    }
    ```

- ##### Webpack

  ```js
  entry: {
      main: './src/main.js',
      console: './src/console.js'
    },
  output: {
      path: path.resolve(__dirname, './dist'),
      // 修改为 contenthash
  修改    filename: 'js/[name].[contenthash].js',
      clean: true
    },
  plugins: [
        new MiniCssExtractPlugin({
        // 修改为 contenthash
  修改      filename: 'styles/[name].[contenthash].css'
      })
  ]
  ```

  - webpack 中的三种`hash`分别是：

    - `hash`：全局 hash **牵一发动全身**，只改了一个`main.css`，会导致打包后所有文件的 hash 值都改变。所以当打包名称设置为`hash`时，整个项目文件是一致的，修改其中一个会导致所有跟着一起改。
    - `chunkhash`：分组 hash 当规则为`chunkhash`时，打包后的 hash 值会**根据入口文件的不用而不一样**，当某个入口文件修改后重新打包，会导致本入口文件关联的所有文件的 hash 值都修改，但是不会影响到其他入口文件的 hash 值
    - `contenthash`：内容 hash 当规则为`contenthash`时，**每个文件的 hash 值都是根据自身内容而生成**，当某个文件内容修改时，打包后只会修改其本身的 hash 值，不会影响其他文件的 hash 值

    说一下对 tree-shaking 的了解,对 CommonJS 和 ESM 都可以用 tree-shaking 吗

    **减少 web 项目中 JavaScript 的无用代码，以达到减少用户打开页面所需的等待时间，来增强用户体验**。

    **遵从的是 ES6 Module 规范**，而不是 CommonJS（由于 CommonJS 规范所致）或者其他，这是因为 ES6 Module 是可以静态分析的，故而可以实现静态时编译进行 tree-shaking

  **CommonJs**

  - CommonJs 可以动态加载语句，代码发生在运行时
  - CommonJs 混合导出，还是一种语法，只不过不用声明前面对象而已，当我导出引用对象时之前的导出就被覆盖了
  - CommonJs 导出值是拷贝，可以修改导出的值，这在代码出错时，不好排查引起变量污染

  **EsModule**

  - Es Module 是静态的，不可以动态加载语句，只能声明在该文件的最顶部，代码发生在编译时
  - Es Module 混合导出，单个导出，默认导出，完全互不影响
  - Es Module 导出是引用值之前都存在映射关系，并且值都是可读的，不能修改

- ##### Typescript

- ##### 浏览器 & 网络

  - 为什么要设计宏任务和微任务两个队列?使用一个任务队列行不行?为什么?

    - 我们不能准确地控制这些事件被添加到任务队列中的位置。但是这个时候突然有高优先级的任务需要尽快执行，那么一种类型的任务就不合适了，所以引入了微任务队列，**插队**

  - onload 和 DOMContentLoaded 的区别

    - 解析 HTML 结构。
    - 加载外部脚本和样式表文件。
    - 解析并执行脚本代码。//js 之类的
    - DOM 树构建完成。//DOMContentLoaded
    - 加载图片等外部文件。
    - 页面加载完毕。//load

    504 超时 503 无服务

    **http 原理**

    https://www.jianshu.com/p/7bfec28236c3

    http1.0 http1.1

    Keep-Alive

    ETag Cache-Control new

    range 头域 允许只请求资源的某个部分

    新的状态码 100（Continue）。客户端事先发送一个只带头域的请求

    Content-Encoding 是对消息进行端到端（end-to-end）

    HTTP1.1 的请求消息和响应消息都应支持 Host 头域

    在 HTTP1.0 中认为每台服务器都绑定一个唯一的 IP 地址

    HTTP/1.1 中引入了 Chunkedtransfer-coding 来解决上面这个问题，发送方将消息分割成若干个任意大小的数据块

    HTTP1.1 支持 chunked transfer，所以可以有 Transfer-Encoding 头部域:
    Transfer-Encoding: chunked

    HTTP1.0 则没有。

    HTTP1.1 增加了 OPTIONS, PUT, DELETE, TRACE, CONNECT

    HTTP1.1 不支持 header 数据的压缩，HTTP2.0 使用 HPACK 算法对 header 的数据进行压缩

    HTTP/2 server push

    HTTP2.0 使用了多路复用的技术，做到同一个连接并发处理多个请求，而且并发请求的数量比

    HTTP1.1 大了好几个数量级。

- ##### 看代码说结果

- ##### 手撕代码 & 算法

  - 排序的原理
    - 快排先定 0 的位置为基准值大的放基准值后面分一次，交互最后到左边都小于基准值，右边都大于基准值的位置，然后左右两边再排序

- ##### 开放题

  - 切片上传

    - ###### [文件切片上传原理解析](https://cloud.tencent.com/developer/article/1481294) 需要前后端配合，前端多了分割，后端多了合并操作

  - 熟悉常见的 Web 安全问题以及防御措施

    xss v-html

    文件上传

    sql 注入

    CSRF

    (2).验证码， 验证机器发送还是人为点击

    URL 跳转

    服务端对传入的跳转 url 变量进行检查和控制

    XSS

    ​ 嵌入恶意脚本代码

![img](https://img-blog.csdn.net/20171211190812796?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbTBfMzc4MTI1MTM=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

```
从Chrome源码看JS Object的实现https://zhuanlan.zhihu.com/p/26169639

前端面试题

详解DNS域名解析全过程
https://blog.csdn.net/yanshuanche3765/article/details/82589210
1、浏览器检查自身缓存，是否有解析过这个域名，定ip。域名被缓存的时间可通过TTL属性设置
2、自身没有缓存，看系统有没有，hosts 文件，优先使用。容易给黑客利用，域名挟持，所以要设置成readonly
3、都没有，找附近的域名服务器（LDNS 网络供应商的）
4、都没有，则到Root Server 域名服务器（你买域名的那些平台）
5、然后Root Server 域名服务器 给 LDNS 所查询域的主域名服务器（gTLD Server，如.com .cn .org等）
6、LDNS 再请求 gTLD Server
7、gTLD Server 会返回 域名对应的Name Server（网站注册的域名服务器）的地址
8、LDNS 再请求 Name Server，Name Server根据映射关系表找到目标ip
9、LDNS缓存这个域名和对应的ip
10、LDNS把解析的结果返回给用户，用户根据TTL值缓存到本地系统缓存中

双向绑定原理
https://blog.csdn.net/lh408684474/article/details/90714409
单向绑定： Model 决定 View的内容，View 发生操作时传递指令给 Controller，Controller再对Model做出修改。Model发生改变，通知View重新渲染
双向绑定： Model 传递给 ViewModel，ViewModel 运算后同步给View。View和ViewModel绑定，View发生操作时反映在ViewModel上，ViewModel变更则通知Model做变更。View和Model不接触
双向绑定实现 http://jsrun.pro/4wfKp/edit


跨域：跨域的原理、和几种实现方式 ？
https://blog.csdn.net/qq_34306360/article/details/80801377
https://www.cnblogs.com/ssen/p/11578946.html

为什么会有跨域这个名词的出现呢?  （ 浏览器对js有同源策略（相同域名,端口相同,协议相同）的限制，a.cn 下不能调用 b.cn 中的js，对象或数据
跨域又是什么呢? （ 当协议、子域名、主域名、端口号中任意一个不相同时，都算作不同域。不同域之间相互请求资源，就算作“跨域”
为何要跨域?
浏览器的同源策略又是什么?怎么解决?

JSONP
是什么? （ JSON with Padding 非官方跨域数据交互协议。信息传递双方约定的方法
跨域的原理又是什么呢? （ 允许用户传递一个callback 参数给服务端

凡是拥有scr这个属性的标签都可以跨域例如<script><img><iframe>
在ajax中 跨域请求是只能是get请求不能使用post请求
基于iframe实现的跨域要求两个域具有aa.xx.com,bb.xx.com 这种特点
JSONP优缺点
JSONP优点是简单兼容性好，可用于解决主流浏览器的跨域数据访问的问题。缺点是仅支持get方法具有局限性,不安全可能会遭受XSS攻击。

JSONP的实现流程
1、声明函数a，放在get请求参数内，格式 callback=a
2、服务器返回字符串 a(xxxx) 的格式
JSONP 的简单封装方法 http://jsrun.pro/YIfKp/edit

CORS
CORS需要浏览器和后端同时支持。IE 8 和 9 需要通过 XDomainRequest 来实现。
服务端设置 Access-Control-Allow-Origin 就可以开启 CORS。 该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源。

postMessage
postMessage是HTML5 XMLHttpRequest Level 2中的API，且是为数不多可以跨域操作的window属性之一，它可用于解决以下方面的问题：
* 页面和其打开的新窗口的数据传递
* 多窗口之间消息传递
* 页面与嵌套的iframe消息传递
* 上面三个场景的跨域数据传递

Node中间件代理(两次跨域)

nginx反向代理
add_header Access-Control-Allow-Origin *



深入理解浏览器的缓存机制
https://www.jianshu.com/p/54cc04190252

Service Worker， 使用 Service Worker的话，传输协议必须为 HTTPS。
Memory Cache，内存中的缓存，一旦我们关闭 Tab 页面，内存中的缓存也就被释放了。
Disk Cache
Push Cache


彻底搞懂JS闭包各种坑
https://www.jianshu.com/p/26c81fde22fb

浏览器解析流程
https://www.cnblogs.com/yifamily/p/10454931.html

Ajax清晰请求步骤与代码
https://blog.csdn.net/Hulu_IT/article/details/89363145

HTTP状态码
https://www.runoob.com/http/http-status-codes.html

JS中typeof的用法
https://www.jianshu.com/p/8107d25f54ac


Bfc 的理解
BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。
https://blog.csdn.net/sinat_36422236/article/details/88763187

HTTP1.0,HTTP1.1和HTTP2.0的区别
https://www.jianshu.com/p/7bfec28236c3

前端首屏优化策略
https://www.cnblogs.com/jingh/p/6531105.html
淘宝首页性能优化实践
https://www.barretlee.com/blog/2016/04/01/optimization-in-taobao-homepage/

React 中组件间通信的几种方式
https://www.jianshu.com/p/e2c5e6f60404

JS: 深拷贝 的实现
https://www.cnblogs.com/guolao/p/10720069.html

function cloneDeep(obj) {
  var newObj;

  if (isArray(obj)) {
    newObj = [];
    var len = obj.length;

    for (var i = 0; i < len; i++) {
      newObj.push(cloneDeep(obj[i]));
    }
  } else if (isPlainObject_1(obj)) {
    newObj = {};

    for (var key in obj) {
      var ret = cloneDeep(obj[key]);
      newObj[key] = ret;
    }
  } else {
    return obj;
  }

  return newObj;
}


typeof和instanceof的区别
https://www.jianshu.com/p/4ff2332228be

https://www.jianshu.com/p/35a027c7e4d9
5，6，7 都需要看看


Webpack面试题
https://zhuanlan.zhihu.com/p/113661886

webpack loader
https://segmentfault.com/a/1190000018450503

Vue 技术内幕
http://caibaojian.com/vue-design/art/7vue-reactive.html

js作用域面试题大全

https://www.cnblogs.com/jinfeixiang/p/10055113.html
```

HTML/H5

CSS/SASS/SCSS

Layout

js 闭包

vue/react

浏览器（缓存、session、localStorage）浏览器扩展

http

web 安全

webpack 或其他编译打包工具

身份验证机制

性能优化

软件工程 单侧 调试工具技巧 git 工作流

软件设计模式 消息与事件机制 单例 工厂

- 考察 js 基本工作机制的理解
  XSS/CSRF 的常见问题
  CORS
  支持多区间选择的日历控件的设计
  检测多个日历区间之间是否有交叉
  前后端通信鉴权的机制/哪些与权限校验相关的错误码，分别用在什么场景技术分享最期望分享什么？现在想分享什么话题？
  推荐的提升工作效率的工具？
  提出了哪些产品上的改进点？
  有哪些自我特点适合做前端？或者前端工作里有哪些事情是让你比较有成就感？
  Vue 中直接给一个数组项赋值为什么不能监听到变更
  单例模式与工厂模式的实现方式
  如何理解事件驱动/单向数据传递的设计模
  大文件分块上传的实现方式
  接下来一年的打算
  Restful 风格接口的理解
  介绍在实际项目中用到的软件设计模式怎么用的
  自己的想法与产品经理发生冲突了的话要怎么办？
  有什么个人项目在做的么，介绍一下？
  表格的分页和排序设计
  代码理解能力及 js 基础认知考核
  在浏览器上输入一个 url 地址后到页面可以看到，中间了解多少说多少
  闭包的理解
  数据与展现分离的应用：使用 json 数据配置表单页面时,如何设计 json 数据结构?
  深拷贝和浅拷贝
  从一个巨大数组中随机获取部分元素
  两个数组，计算交集
  Repaint 和 Reflow 是什么,如何优化
  Promise 构造函数是同步执行,还是异步执行
  Http2 的多路复用
  防抖和节流
  React/Vue 里面，列表组件 Key 的作用
  JS 里，金额数值显示该怎么实现
  都用过哪些浏览器缓存方案
  前端错误收集
  Node BFF 层
  NodeJS 多进程模型

es 模块导入

里面和外面的区别 绑定了 this

https://leetcode-cn.com/problems/binary-tree-inorder-traversal/solution/er-cha-shu-de-zhong-xu-bian-li-by-leetcode-solutio/

1 小时

不要为了面试而学习，是学习了然后才是面试

面经

了解下情况，怎么教社保医保

**刷算法题**

学 vue3

tailwindcss 添加

单测覆盖

gitaction

技术分析会，分析过 key 是 id 和 index 的区别

组件库维护

无状态组件编写

vue3 setup

javaScript 引擎优化中包含了根据代码的词法进行静态分析，提前知道变量和函数的位置，在执行时能更快找到标识符

eval（）: 改变当前词法作用域

```js
function foo(str, a) {
  eval(str)
  console.log(a, b)
}
var b = 2
foo('var b = 3', 1) // 1, 3
```

with（）

```js
function foo(obj) {
  with (obj) {
    a = 2
  }
}
var o1 = {
  a: 3
}
var o2 = {
  b: 3
}
foo(o1)
console.log(o1.a) // 2
foo(o2)
console.log(o2.a) // underfind
console.log(a) // 2 找不到a标识符，因此进行了正常的LHS标识符查找（set）
```
