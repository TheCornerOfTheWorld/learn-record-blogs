前言
很多时候我们都对源码展现出了一定的渴求，但当被问到究竟为什么想看源码时，答案无非也就那么几种：

为了面试
为了在简历上写自己会源码
了解底层原理 学习高手思路
通过源码来学习一些小技巧(骚操作)
对框架如何实现的各种功能感到好奇
内卷严重 不看不行 逆水行舟 不进则退
自己也想造轮子 先看看别人都是怎么做的
各种公众号和卖课的都在贩卖焦虑 被洗脑洗的

但其实很少人会真正的看明白源码，一方面是由于代码量实在是太多了，另一方面则是当我们阅读别人代码的时候就是容易搞得一头雾水。因为每个人的编码方式以及编码习惯都大相径庭，在看一个编码习惯与自己不同的人的代码时是很累的。
况且不仅是由于每个人的编码风格相差甚远，人与人之间各自擅长的技术方向以及技术水平也都是横看成岭侧成峰，远近高低各不同。刨除掉以上的种种原因之后，更重要的一个原因是很多人框架用的都不够精通呢、用过的 API 也就那么几个常见的，其他不常用但很高阶的 API 都没怎么用过，连用都没用明白呢，这样的人看源码的时候当然会被绕晕啦！

那肯定有人会说：尤雨溪他框架就一定用的很 6 吗？我每天都在用他的框架写代码，他还不一定有我熟练呢！

这么说确实有一定的道理，但如果论底层，他比谁都了解。之所以我们啃不动源码的很重要的一个原因就是：细枝末节的东西实在是太多了，很容易令大家找不到重点。这些细枝末节的东西自然有它们存在的道理，但它们确成为了我们行走在钻研源码这条路上的绊脚石。
题外话
怎样学习源码才是最科学的方式呢？我们来看一个例子：有一些听起来非常高大上的高科技产品，如电磁轨道炮。各个军事强国都在争相探索这一领域，假设有一天，我们一觉醒来成为了国家电磁轨道炮首席研究员，是专门负责研究电磁轨道炮底层技术的。那么当我们拆解一个电磁轨道炮的时候，大概率你是看不懂它的内部构造的。因为里面会包含许多非常复杂的高强度材料、控制磁力的电极、蜿蜒曲折的电线、提高精准度的装置以及一些利于使用者操控的封装等等…
那么此时的你可能就不太容易搞明白电磁轨道炮的真正原理，直到有一次在网上偶然间看到一个视频，视频中的人用了一些磁铁、若干钢珠、以及几个我们日常生活中能够搞到的材料来制作了一个简易版的电磁轨道炮。这样我们一下子就能够搞懂电磁轨道炮的真正原理，虽然这样的轨道炮并不能真正的用于实战，但只要我们明白了最基础的那部分，我们就可以在此基础上一步步进行扩展，慢慢弄懂整个能够用于实战的复杂轨道炮。

源码也是同理，我们按照电磁轨道炮的思路一步步来，先搞清楚最核心的基础部分，慢慢的再一步步去进阶。这样的学习方法比我们肯定一上来就去拆解一个完整版的电磁轨道炮要强得多

既然我们有这样的需求，那么作为一个流行框架的作者就必然会有所回应：在一次培训的过程中，尤雨溪带领大家写了一个非常微型的 Vue3。不过可惜这是他在国外办过的为期一天的培训，我们国内的观众并没有福气能够享受到被框架作者培训的这么一次教学。但好在尤雨溪已经把代码全部上传到了 codepen 上，大家可以点击这个链接来阅读尤雨溪亲手写的代码，或者也可以选择留在本篇文章内，看我来用中文为大家讲解尤雨溪的亲笔代码！
响应式篇
尤雨溪在某次直播时曾表示过：Vue3 的源码要比 Vue2 的源码要好学很多。Vue3 在架构以及模块的耦合关系设计方面比 Vue2 更好，可以一个模块一个模块看，这样比较容易理解。如果是刚上手，可以从 Reactivity 看起。因为 Reactivity 是整个 Vue3 中跟外部没有任何耦合的一个模块。
Reactivity 就是我们常说的响应式，大名鼎鼎的 React 也是这个意思，不信仔细对比一下前五个字母。那么什么是响应式呢？想想看 React 是什么框架？MVVM 对吧？MVVM 的主打口号是：

数据驱动视图！

也就是说当数据发生改变时我们会重新渲染一下组件，这样就能够达到一修改数据，页面上用到这个数据的地方就会实时发生变化的效果。不过在数据发生变化时也不仅仅只是能够更新视图，还可以做些别的呢！尤雨溪在创建@vue/reactivity 这个模块的时候，借鉴的是@nx-js/observer-util 这个库。我们来看一眼它在 GitHub 上 README.md 里展示的一段示例代码：
import { observable, observe } from '@nx-js/observer-util';

const counter = observable({ num: 0 });
const countLogger = observe(() => console.log(counter.num));

// 这行代码将会调用 countLogger 这个函数并打印出：1
counter.num++;
复制代码
是不是很像 Vue3 的 reactive 和 watchEffect 啊？其实就是我们提前定义好一个函数，当函数里面依赖的数据项发生变化时就会自动执行这段函数，这就是响应式！
数据驱动视图那就更容易理解了，既然当数据发生变化时可以执行一段函数，那么这段函数为什么不可以执行一段更新视图的操作呢：
import { store, view } from 'react-easy-state';

const counter = store({
num: 0,
up() {
this.num++;
}
});

// 这是一个响应式的组件, 当 counter.num 发生变化时会自动重新渲染组件
const UserComp = view(() => <div onClick={counter.up}>{counter.num}</div>);
复制代码
react-easy-state 是他们(尤雨溪借鉴的那个库)专门针对 React 来进行封装的，不难看出 view 这个函数就是 observe 函数的一个变形，observe 是要你传一个函数进去，你函数里面想执行啥就执行啥。而 view 是要你传一个组件进去，当数据变化时会去执行他们提前写好的一段更新逻辑，那不就跟你自己在 observe 里写一段更新操作是一样的嘛！用了这个库写出来的 React 就像是在写 Vue 一样。
源码
理解了什么是响应式之后就可以方便我们来查看源码了，来看看尤雨溪是怎么仅用十几行代码就实现的响应式：
let activeEffect

class Dep {
subscribers = new Set()
depend() {
if (activeEffect) {
this.subscribers.add(activeEffect)
}
}
notify() {
this.subscribers.forEach(effect => effect())
}
}

function watchEffect(effect) {
activeEffect = effect
effect()
}
复制代码
实现完了，再来看看该怎么用：
const dep = new Dep()

let actualCount = 0
const state = {
get count() {
dep.depend()
return actualCount
},
set count(newCount) {
actualCount = newCount
dep.notify()
}
}

watchEffect(() => {
console.log(state.count)
}) // 0

state.count++ // 1
复制代码
如果在观看这十几二十来行代码时都会觉得绕的话，那就说明你的基础属实不怎么样。因为明眼人一眼就可以看出来，这是一个非常经典的设计模式：发布-订阅模式
发布-订阅模式
如果不太了解发布-订阅模式的话，我们可以简单的来讲一下。但如果你对这些设计模式早已了如指掌，并且能够轻松读懂刚才那段代码的话，建议暂且先跳过这一段。
在《JavaScript 设计模式与开发实践》一书中，作者曾探为发布-订阅模式举了一个十分生动形象的例子：

小明最近看上了一套房子，到了售楼处之后才被告知，该楼盘的房子早已售罄。好在售楼 MM 告诉小明，不久之后还有一些尾盘推出，开发商正在办理相关手续，手续办好后便可以购买。但到底是什么时候，目前还没有人能够知道。

于是小明记下了售楼处的电话，以后每天都会打电话过去询问是不是已经到了购买时间。除了小明，还有小红、小强、小龙也会每天向售楼处咨询这个问题。一个星期过后，售楼 MM 决定辞职，因为厌倦了每天回答 1000 个相同内容的电话。

当然现实中没有这么笨的销售公司，实际上故事是这样的：小明离开之前，把电话号留在了售楼处。售楼 MM 答应他，新楼盘一推出就马上发信息通知小明。小红、小强和小龙也是一样，他们的电话号码都被记载售楼处的花名册上，新楼盘推出的时候，售楼 MM 会翻开花名册，遍历上面的电话号码，依次发送一条短信来通知他们。

在刚刚的例子中，发送短信通知就是一个典型的发布-订阅模式，小明、小红等购买者都是订阅者，他们订阅了房子开售的消息。售楼处作为发布者，会在合适的时候遍历花名册上的电话号码，依次给购房者发布消息。

如果你曾经用过 xxx.addEventListener 这个函数为 DOM 添加过事件的话，那么实际上就已经算是用过发布-订阅模式啦！想一想是不是和售楼处的这个例子很相似：

我们需要在一定条件下干一些事情
但我们不知道的是这个条件会在什么时间点成立
所以我们留下我们的函数
当条件成立时自动执行

那么我们就来简单的模拟一下 addEventListener 发生的事情以便于大家理解发布-订阅模式：
class DOM {
#eventObj = {
click: [],
mouseover: [],
mouseout: [],
mousemove: [],
keydown: [],
keyup: []
// 还有很多事件类型就不一一写啦
}
addEventListener (event, fn) {
this.#eventObj[event].push(fn)
}
removeEventListener (event, fn) {
const arr = this.#eventObj[event]
const index = arr.indexOf(fn)
arr.splice(index, 1)
}
click () {
this.#eventObj.click.forEach(fn => fn.apply(this))
}
mouseover () {
this.#eventObj.mouseover.forEach(fn => fn.apply(this))
}
// 还有很多事件方法就不一一写啦
}
复制代码
我们来用一下试试：
const dom = new DOM()

dom.addEventListener('click', () => console.log('点击啦！'))
dom.addEventListener('click', function () { console.log(this) })

dom.addEventListener('mouseover', () => console.log('鼠标进入啦！'))
dom.addEventListener('mouseover', function () { console.log(this) })

// 模拟点击事件
dom.click() // 依次打印出：'点击啦！' 和相应的 this 对象

// 模拟鼠标事件
dom.mouseover() // 依次打印出：'鼠标进入啦！' 和相应的 this 对象

const fn = () => {}
dom.addEventListener('click', fn)
// 还可以移除监听
dom.removeEventListener('click', fn)
复制代码
通过这个简单的案例应该就能够明白发布-订阅模式了吧？
我们来引用一下《JavaScript 设计模式与开发实践》为发布-订阅模式总结出来的三个要点：

首先要指定好谁充当发布者（比如售楼处）在本例中是 dom 这个对象
然后给发布者添加一个缓存列表，用于存放回调函数以便通知订阅者（售楼处的花名册）在本例中是 dom.#eventObj
最后发布消息的时候，发布者会遍历这个缓存列表，依次触发里面存放的订阅者回调函数（遍历花名册，挨个发短信）

记住这三个要点后，再来看一眼尤大的代码，看是不是符合这仨要点：

发布者：dep 对象
缓存列表：dep.subscribers
发布消息：dep.notify()

所以这是一个典型的发布-订阅模式
增强版
尤雨溪的第一版代码实现的还是有些过于简陋了，首先用起来就很不方便，因为我们每次定义数据时都需要这么手写一遍 getter 和 setter、手动的去执行一下依赖收集函数以及触发的函数。这个部分显然是可以继续进行封装的，那么再来看一眼尤雨溪实现的第二版：
let activeEffect

class Dep {
subscribers = new Set()
depend() {
if (activeEffect) {
this.subscribers.add(activeEffect)
}
}
notify() {
this.subscribers.forEach(effect => effect())
}
}

function watchEffect(effect) {
activeEffect = effect
effect()
activeEffect = null
}

function reactive(raw) {
// 使用 Object.defineProperty
// 1. 遍历对象上存在的 key
Object.keys(raw).forEach(key => {
// 2. 为每个 key 都创建一个依赖对象
const dep = new Dep()

    // 3. 用 getter 和 setter 重写原对象的属性
    let realValue = raw[key]
    Object.defineProperty(raw, key, {
      get() {
        // 4. 在 getter 和 setter 里调用依赖对象的对应方法
        dep.depend()
        return realValue
      },
      set(newValue) {
        realValue = newValue
        dep.notify()
      }
    })

})
return raw
}
复制代码
可以看到这一版实现的就比上一版好多了，而且感觉尤雨溪在写这一版代码时比上一版更加认真。因为这版代码里有着详细的注释，所以肯定是认真讲解的一段代码。只不过原来的注释都是用英文写的，我给它翻译成了中文。

不过各位看官请放心，除了注释被我翻译成了中文以外，其他的地方我一个字母都没有动过，就连空格都是保持的原汁原味的缩进，为的就是能够让大家看到的是尤雨溪的一手代码 😋

不难看出，这版代码在实现上用到了两种设计模式，它们分别是代理模式以及我们刚刚讲过的发布-订阅模式。所以说学好设计模式是多么重要的一件事情。
代理模式
代理模式相对比较简单，都不用上代码，借用《JavaScript 设计模式核⼼原理与应⽤实践》的作者修言举的一个非常有趣的例子就能让大家明白：

我有个同事，技术很强，发型也很强。多年来因为沉迷 coding，耽误了人生大事。迫于寻找另一半的愿望比较急切，该同事同时是多个优质高端婚恋网站的注册 VIP。工作之余，他常常给我们分享近期的相亲情感生活进展。

“你们看，这个妹子头像是不是超可爱！”同事哥这天发掘了一个新的婚介所，他举起手机，朝身边几位疯狂挥舞。

“哥，那是新垣结衣。。。”同事哥的同桌无奈地摇摇头，没有停下 coding 的手。

同事哥恢复了冷静，叹了口气：“这种婚恋平台的机制就是这么严格，一进来只能看到其它会员的姓名、年龄和自我介绍。要想看到本人的照片或者取得对方的联系方式，得先向平台付费成为 VIP 才行。哎，我又要买个 VIP 了。”

我一听，哇，这婚恋平台把代理模式玩挺 6 啊！大家想想，主体是同事 A，目标对象是新垣结衣头像的未知妹子。同事 A 不能直接与未知妹子进行沟通，只能通过第三方（婚介所）间接获取对方的一些信息，他能够获取到的信息和权限，取决于第三方愿意给他什么——这不就是典型的代理模式吗？

用法
这一版的响应式在使用起来就要舒服的多：
const state = reactive({
count: 0
})

watchEffect(() => {
console.log(state.count)
}) // 0

state.count++ // 1
复制代码
使用方式基本上就和 Vue3 的用法一模一样了！可以看到响应式最核心的原理其实就是发布-订阅+代理模式。不过这还不是最终版，因为他用的是 ES5 的 Object.defineProperty 来做的代理模式，如果在不考虑兼容 IE 的情况下还是 ES6 的 Proxy 更适合做代理，因为 Proxy 翻译过来就是代理权、代理人的意思。所以 Vue3 采用了 Proxy 来重构整个响应式代码，我们来看一下尤雨溪写出来的最终版(Proxy 版)
Proxy 版
let activeEffect

class Dep {
subscribers = new Set()

constructor(value) {
this.\_value = value
}

get value() {
this.depend()
return this.\_value
}

set value(value) {
this.\_value = value
this.notify()
}

depend() {
if (activeEffect) {
this.subscribers.add(activeEffect)
}
}

notify() {
this.subscribers.forEach((effect) => {
effect()
})
}
}

function watchEffect(effect) {
activeEffect = effect
effect()
activeEffect = null
}

// proxy version
const reactiveHandlers = {
get(target, key) {
const value = getDep(target, key).value
if (value && typeof value === 'object') {
return reactive(value)
} else {
return value
}
},
set(target, key, value) {
getDep(target, key).value = value
}
}

const targetToHashMap = new WeakMap()

function getDep(target, key) {
let depMap = targetToHashMap.get(target)
if (!depMap) {
depMap = new Map()
targetToHashMap.set(target, depMap)
}

let dep = depMap.get(key)
if (!dep) {
dep = new Dep(target[key])
depMap.set(key, dep)
}

return dep
}

function reactive(obj) {
return new Proxy(obj, reactiveHandlers)
}
复制代码
可以看到这一版的代码又比上一版更加复杂了点，但在用法上还是和上一版一模一样：
const state = reactive({
count: 0
})

watchEffect(() => {
console.log(state.count)
}) // 0

state.count++ // 1
复制代码
我们来重点讲解一下最终版的代码，这一版代码才是最优秀的。麻雀虽小，五脏俱全，不仅做了最基本的发布-订阅模式+代理模式，而且还用到了许多小技巧来做了性能方面的优化。
详解
首先尤大定义了一个名为 activeEffect 的空变量，用于存放 watchEffect 传进来的函数：
// 定义一个暂时存放 watchEffect 传进来的参数的变量
let activeEffect
复制代码
接下来定义了一个名为 Dep 的类，这个 Dep 应该是 Dependence 的缩写，意为依赖。实际上就相当于发布-订阅模式中的发布者类：
// 定义一个 Dep 类，该类将会为每一个响应式对象的每一个键生成一个发布者实例
class Dep {
// 用 Set 做缓存列表以防止列表中添加多个完全相同的函数
subscribers = new Set()

// 构造函数接受一个初始化的值放在私有变量内
constructor(value) {
this.\_value = value
}

// 当使用 xxx.value 获取对象上的 value 值时
get value() {
// 代理模式 当获取对象上的 value 属性的值时将会触发 depend 方法
this.depend()

    // 然后返回私有变量内的值
    return this._value

}

// 当使用 xxx.value = xxx 修改对象上的 value 值时
set value(value) {
// 代理模式 当修改对象上的 value 属性的值时将会触发 notify 方法
this.\_value = value
// 先改值再触发 这样保证触发的时候用到的都是已经修改后的新值
this.notify()
}

// 这就是我们常说的依赖收集方法
depend() {
// 如果 activeEffect 这个变量为空 就证明不是在 watchEffect 这个函数里面触发的 get 操作
if (activeEffect) {
// 但如果 activeEffect 不为空就证明是在 watchEffect 里触发的 get 操作
// 那就把 activeEffect 这个存着 watchEffect 参数的变量添加进缓存列表中
this.subscribers.add(activeEffect)
}
}

// 更新操作 通常会在值被修改后调用
notify() {
// 遍历缓存列表里存放的函数 并依次触发执行
this.subscribers.forEach((effect) => {
effect()
})
}
}
复制代码
之前两版尤大都是在外头定义了一个变量用于保存响应式对象每一个键所对应的值，而这次是直接把值放进了 Dep 类的定义里，定义成了 getter 和 setter，在获取值时会进行依赖收集操作，而在修改值时会进行更新操作。
接下来又定义了一个跟 Vue3 的 watchEffect 名称一样的函数：
// 模仿 Vue3 的 watchEffect 函数
function watchEffect(effect) {
// 先把传进来的函数放入到 activeEffect 这个变量中
activeEffect = effect

// 然后执行 watchEffect 里面的函数
effect()

// 最后把 activeEffect 置为空值
activeEffect = null
}
复制代码
我们在使用时不是会在这个函数里面再传进一个函数么：
watchEffect(() => state.xxx)
复制代码
这个函数就被赋值给了 activeEffect 这个变量上面去，然后立刻执行这个函数，一般来说这个函数里面都会有一些响应式对象的对吧？既然有，那就会触发 getter 去进行依赖收集操作，而依赖收集则是判断了 activeEffect 这个变量有没有值，如果有，那就把它添加进缓存列表里。等到执行完这个函数后，就立即将 activeEffect 这个变量置为空值，防止不在 watchEffect 这个函数中触发 getter 的时候也执行依赖收集操作。
接下来就是定义了一个 Proxy 代理的处理对象：
const reactiveHandlers = {
// 当触发 get 操作时
get(target, key) {
// 先调用 getDep 函数取到里面存放的 value 值
const value = getDep(target, key).value

    // 如果 value 是对象的话
    if (value && typeof value === 'object') {
      // 那就把 value 也变成一个响应式对象
      return reactive(value)
    } else {
      // 如果 value 只是基本数据类型的话就直接将值返回
      return value
    }

},
// 当触发 set 操作时
set(target, key, value) {
// 调用 getDep 函数并将里面存放的 value 值重新赋值成 set 操作的值
getDep(target, key).value = value
}
}
复制代码
如果对 Proxy 不是很了解的话，建议看看阮一峰的《ES6 入门教程》，写的还是不错的。
刚刚那个对象在 get 和 set 操作中都用到了 getDep 这个函数，这个函数时在后面定义的，他会用到一个叫 targetToHashMap 的 WeakMap 数据结构来存储数据：
// 定义一个 WeakMap 数据类型 用于存放 reactive 定义的对象以及他们的发布者对象集
const targetToHashMap = new WeakMap()
复制代码
接下来就是定义 getDep 函数啦：
// 定义 getDep 函数 用于获取 reactive 定义的对象所对应的发布者对象集里的某一个键对应的发布者对象
function getDep(target, key) {
// 获取 reactive 定义的对象所对应的发布者对象集
let depMap = targetToHashMap.get(target)

// 如果没获取到的话
if (!depMap) {
// 就新建一个空的发布者对象集
depMap = new Map()
// 然后再把这个发布者对象集存进 WeakMap 里
targetToHashMap.set(target, depMap)
}

// 再获取到这个发布者对象集里的某一个键所对应的发布者对象
let dep = depMap.get(key)

// 如果没获取到的话
if (!dep) {
// 就新建一个发布者对象并初始化赋值
dep = new Dep(target[key])
// 然后将这个发布者对象放入到发布者对象集里
depMap.set(key, dep)
}

// 最后返回这个发布者对象
return dep
}
复制代码
这个地方就稍微有点绕了，我们来上图：

每一个传进 reactive 里去的对象，都会被存在 WeakMap 里的键上。而每一个键所对应的值，就是一个 Map：
// targetToHashMap: {
const obj1 = reactive({ num: 1 }) // { num: 1 }: new Map(),
const obj2 = reactive({ num: 2 }) // { num: 2 }: new Map(),
const obj3 = reactive({ num: 3 }) // { num: 3 }: new Map()
// }
复制代码
那值(Map)里存的又是什么呢？存的是：

假设我们 reactive 了一个对象{ a: 0, b: 1, c: 2 }，那么 Map 里面存的就是：
{
'a': new Dep(0),
'b': new Dep(1),
'c': new Dep(2)
}
复制代码
就是把对象的键放到 Map 的键上，然后在用 new Dep 创建一个发布者对象，再把值传给 Dep。Vue3 之所以性能比 Vue2 强很多的其中一个非常重要的优化点就是这个 Proxy。并不是说 Proxy 的性能就比 Object.defineProperty 高多少，而是说在 Proxy 里的处理方式比 Vue2 时期的好很多：Vue2 的响应式是一上来就一顿遍历+递归把你定义的所有数据全都变成响应式的，这就会导致如果页面上有很多很复杂的数据结构时，用 Vue2 写的页面就会白屏一小段时间。毕竟遍历+递归还是相对很慢的一个操作嘛！
而 React 就没有这个毛病，当然 Vue3 也不会有这个毛病。从代码中可以看出，当我们获取对象上的某个键对应的值时，会先判断这个值到底有没有对应的发布者对象，没有的话再创建发布者对象。而且当获取到的值是引用类型时再把这个值变成响应式对象，等你用到了响应式对象里的值时再去新建发布者对象。

总结成一句话就是：Vue3 是用到哪部分的数据的时候，再把数据变成响应式的。而 Vue2 则是不管三七二十一，刚开局就全都给你变成响应式数据。

最后一步就是定义 reactive 函数啦：
// 模仿 Vue3 的 reactive 函数
function reactive(obj) {
// 返回一个传进来的参数对象的代理对象 以便使用代理模式拦截对象上的操作并应用发布-订阅模式
return new Proxy(obj, reactiveHandlers)
}
复制代码
流程图
为了便于大家理解，我们使用一遍 reactive 和 watchEffect 函数，然后顺便看看到底发生了什么：

首先我们用 reactive 函数定义了一个对象{ num: 0 }，这个对象会传给 Proxy 的第一个参数，此时还并没有发生什么事情，那么接下来我们就在 watchEffect 里打印一下这个对象的 num 属性：

此时传给 watchEffect 的这个函数会赋值给 actibveEffect 这个变量上去，然后立即执行这个函数：

在执行的过程中发现有 get 操作，于是被 Proxy 所拦截，走到了 get 这一步：

由于在 get 操作中需要用 getDep 函数，于是又把{ num: 0 }传给了 getDep，key 是 num，所以相当于 getDep({ num: 0 }, 'num')。进入到 getDep 函数体内，需要用 targetToHashMap 来获取{ num: 0 }这个键所对应的值，但目前 targetToHashMap 是空的，所以根本获取不到任何内容。于是进入判断，新建一个 Map 赋值给 targetToHashMap，相当于：targetToHashMap.set({ num: 0 }, new Map())，紧接着就是获取这个 Map 的 key 所对应的值：

由于 Map 也是空的，所以还是获取不到值，于是进入判断，新建一个 Dep 对象：

由于是用 getDep(...xxx).value 来获取到这个对象的 value 属性，所以就会触发 getter：

顺着 getter 我们又来到了 depend 方法中，由于 activeEffect 有值，所以进入判断，把 activeEffect 加入到 subscribes 这个 Set 结构中。此时依赖收集部分就暂且告一段落了，接下来我们来改变 obj.num 的值，看看都会发生些什么：

首先会被 Proxy 拦截住 set 操作，然后调用 getDep 函数：

获取到 dep 对象后，就会修改它的 value 属性，从而触发 setter 操作：

最后我们来到了通知(notify)阶段，在通知阶段会找到我们的缓存列表(subscribers)，然后依次触发里面的函数：

那么此时就会运行() => console.log(obj.num)这个函数，你以为这就完了吗？当然没有！由于运行了 obj.num 这个操作，所以又会触发 get 操作被 Proxy 拦截：

获取到我们之前创建过的发布者对象后，又会触发发布者对象的 getter 操作：

一顿绕，绕到 depend 方法时，我们需要检测一下 activeEffect 这个变量：

由于不会进入到判断里面去，所以执行了个寂寞(啥也没执行)，那么接下来的代码便是：

最终打印出了 10。
结语
没想到短短这么七十来行代码这么绕吧？所以说抽丝剥茧的学习方法有多重要。如果直接看源码的话，这里面肯定还会有各种各样的判断。比如 watchEffect 现在没做任何的判断对吧？那么当我们给 watchEffect 传了一个不是函数的参数时会怎样？当我们给 reactive 对象传数组时又会怎样？当传 Map、Set 时呢？传基本数据类型时呢？而且即使现在我们不考虑这些情况，就传一个对象，里面不要有数组等什么其他的东西，watchEffect 也只传函数。那么其实在使用体验上还是有一点与 Vue3 的 watchEffect 不同的地方，那就是不能在 watchEffect 里面改变响应式对象的值：

而写成这样就没有问题：

可是在 Vue3 的 watchEffect 里就不会出现这样的状况。这是因为如果在 watchEffect 里对响应式对象进行赋值操作的话就又会触发 set 操作，从而被 Proxy 拦截，然后又绕到 notify 的方法上面去了，notify 又会把 watchEffect 里的函数运行一遍，结果又发现里面有 set 操作(因为是同一段代码嘛)，然后又会去运行 notify 方法，继续触发 set 操作造成死循环。
所以我们还需要考虑到这种死循环的情况，但如果真的考虑的这么全面的话，那相信代码量也相当大了，我们会被进一步绕晕。所以先吃透这段代码，然后慢慢的我们再来看真正的源码都是怎么处理这些情况的。或者也可以先不看源码，自己思考一下这些问题该如何去处理，然后写出自己的逻辑来，测试没有问题后再去跟 Vue3 的源码进行对比，看看自己实现的和尤雨溪实现的方式有何异同。

本篇文章到这里就要告一段落了，但还没完，这只是响应式部分。之后还有虚拟 DOM、diff 算法、组件化、根组件挂载等部分。

如果等不及看下一篇解析文章的话，也可以直接点击这个链接进入到 codepen 里自行钻研尤雨溪写的代码。代码量很少，是我们学习 Vue3 原理的绝佳资料！学会了原理之后哪怕不去看真正的源码，在面试的时候都可以跟面试官吹两句。因为毕竟不会有哪个面试官考察源码时会问：你来说一下 Vue3 的某某文件的第 996 行代码写的是什么？考察肯定也重点考察的是原理，很少会去考察各种判断参数的边界情况处理。所以点赞+关注，跟着尤雨溪学源码不迷路！

[尤雨溪国外教程：亲手带你写个简易版的 Vue！](https://juejin.cn/post/6992018709439053837)
