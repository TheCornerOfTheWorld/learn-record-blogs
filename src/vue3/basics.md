# 基础

## 响应式基础

###### reactive()

1. 深层响应性， 更改深层次的对象或数组，你的改动也能被检测到。它和原始对象是不相等的

2. `reactive()` API 有两条限制：

   1. 仅对对象类型有效（对象、数组和 `Map`、`Set` 这样的[集合类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects#使用键的集合对象)），而对 `string`、`number` 和 `boolean` 这样的 [原始类型](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive) 无效。

   2. 因为 Vue 的响应式系统是通过**属性访问进行追踪的**，因此我们必须始终保持对该响应式对象的相同引用。这意味着我们不可以随意地“替换”一个响应式对象，因为这将导致对初始引用的响应性连接丢失：

      ```js
      let state = reactive({ count: 0 })

      // 上面的引用 ({ count: 0 }) 将不再被追踪（响应性连接已丢失！）
      state = reactive({ count: 1 })
      ```

3. 将响应式对象的属性赋值或解构至本地变量时，或是将该属性传入一个函数时，我们会失去响应性

###### ref（）

1. 允许我们创建可以使用任何值类型的响应式 **ref**

2. 和响应式对象的属性类似，ref 的 `.value` 属性也是响应式的。同时，当值为对象类型时，会用 `reactive()` 自动转换它的 `.value`。

3. ref 被传递给函数或是从一般对象上被解构时，不会丢失响应性：

   ```js
   const obj = {
     foo: ref(1),
     bar: ref(2)
   }

   // 该函数接收一个 ref
   // 需要通过 .value 取值
   // 但它会保持响应性
   callSomeFunction(obj.foo)

   // 仍然是响应式的
   const { foo, bar } = obj
   ```

4. 在模板中将会被自动”解包“不需要是由`.value`，仅当 ref 是模板渲染上下文的顶层属性时才适用自动“解包”。 例如， foo 是顶层属性，但 object.foo 不是。

   ```js
   const object = { foo: ref(1) }
   // template
   {
     {
       object.foo + 1
     }
   } // [object object]1
   {
     {
       object.foo
     }
   } // 1

   const count = ref(0)
   const state = reactive({
     count // count被解包
   })
   console.log(state.count) // 0
   state.count = 1
   console.log(count.value) // 1
   ```

   只有当嵌套在一个深层响应式对象内时，才会发生 ref 解包。当其作为[浅层响应式对象](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive)的属性被访问时不会解包。

   **数组和集合类型的 ref 解包**

   跟响应式对象不同，当 ref 作为响应式数组或像 `Map` 这种原生集合类型的元素被访问时，不会进行解包

   ```js
   const books = reactive([ref('Vue 3 Guide')])
   // 这里需要 .value
   console.log(books[0].value)

   const map = reactive(new Map([['count', ref(0)]]))
   // 这里需要 .value
   console.log(map.get('count').value)
   ```

## 计算属性

###### computed

```html
<script setup>
  import { ref, computed } from 'vue'

  const firstName = ref('John')
  const lastName = ref('Doe')

  const fullName = computed({
    // getter
    get() {
      return firstName.value + ' ' + lastName.value
    },
    // setter
    set(newValue) {
      // 注意：我们这里使用的是解构赋值语法
      ;[firstName.value, lastName.value] = newValue.split(' ')
    }
  })
</script>
```

**Getter 不应有副作用, 不要在 getter 中做异步请求或者更改 DOM！**

**避免直接修改计算属性值**

## 样式绑定

###### v-bind

```html
<div :class="[{ active: isActive }, errorClass]"></div>

<!-- MyComponent 模板使用 $attrs, 指定绑定的class -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>

<!--
自动前缀, 当你在 :style 中使用了需要浏览器特殊前缀的 CSS 属性时，Vue 会自动为他们加上相应的前缀
数组仅会渲染浏览器支持的最后一个值。在这个示例中，在支持不需要特别前缀的浏览器中都会渲染为 display: flex。 
-->
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

## 列表渲染

###### v-if 和 v-for

当它们同时存在于一个节点上时，`v-if` 比 `v-for` 的优先级更高。这意味着 `v-if` 的条件将无法访问到 `v-for` 作用域内定义的变量别名：

```html
<!--
 这会抛出一个错误，因为属性 todo 此时
 没有在该实例上定义
-->
<li v-for="todo in todos" v-if="!todo.isComplete">{{ todo.name }}</li>
```

渲染的元素 key，默认模式是高效的，但**只适用于列表渲染输出的结果不依赖子组件状态或者临时 DOM 状态 (例如表单输入值) 的情况**。

变更方法

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

## 事件处理

###### v-on

在处理事件时调用 `event.preventDefault()` 或 `event.stopPropagation()` 是很常见的

```html
<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<!-- 例如：事件处理器不来自子元素 -->
<div @click.self="doThat">...</div>

<!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
<!-- 以防其中包含 `event.preventDefault()` -->
<div @scroll.passive="onScroll">...</div>
```

键盘

你可以直接使用 [`KeyboardEvent.key`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key/Key_Values) 暴露的按键名称作为修饰符，但需要转为 kebab-case 形式。

```html
<input @keyup.page-down="onPageDown" />
```

在上面的例子中，仅会在 `$event.key` 为 `'PageDown'` 时调用事件处理。

## 输入绑定

###### v-model

```html
const checkedNames = ref([])

<div>Checked names: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames" />
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
<label for="mike">Mike</label>
```

## 监听器

###### watch

`watch` 的第一个参数可以是不同形式的“数据源”：它可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组：

```js
const x = ref(0)
const y = ref(0)

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})

const obj = reactive({ count: 0 })
// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {
  console.log(`count is: ${count}`)
})
// 提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)

watch(
  source,
  (newValue, oldValue) => {
    // 立即执行，且当 `source` 改变时再次执行
  },
  { immediate: true }
)
```

###### watchEffect()

侦听器的回调使用与源完全相同的响应式状态是很常见的，我们可以用 [`watchEffect` 函数](https://cn.vuejs.org/api/reactivity-core.html#watcheffect) 来简化上面的代码。`watchEffect()` 允许我们自动跟踪回调的响应式依赖。

回调会立即执行，不需要指定 `immediate: true`。在执行期间，它会自动追踪 `todoId.value` 作为依赖（和计算属性类似）

```js
const todoId = ref(1)
const data = ref(null)

watch(
  todoId,
  async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    )
    data.value = await response.json()
  },
  { immediate: true }
)

// 重写
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
```

`watchEffect` 仅会在其**同步**执行期间，才追踪依赖。在使用异步回调时，只有在第一个 `await` 正常工作前访问到的属性才会被追踪。

```js
watchEffect(() => {
  setTimeout(() => {
    // 不会被追踪依赖。count.value变化时，不会被执行
    console.log('watchEffect', count.value)
  }, 1000)
})
```

`watch` 只追踪明确侦听的数据源。`watchEffect`，则会在副作用发生期间追踪依赖。

**回调的触发时机**

用户创建的侦听器回调，都会在 Vue 组件更新**之前**被调用。

如果想在侦听器回调中能访问被 Vue 更新**之后**的 DOM，你需要指明 `flush: 'post'` 选项：

```js
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})

watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
})
```

**停止监听器**

在 `setup()` 或 `<script setup>` 中用同步语句创建的侦听器，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时自动停止。因此，在大多数情况下，你无需关心怎么停止一个侦听器。

一个关键点是，侦听器必须用**同步**语句创建：如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏。如下方这个例子：

```html
<script setup>
  import { watchEffect } from 'vue'

  // 它会自动停止
  watchEffect(() => {})

  // ...这个则不会！
  setTimeout(() => {
    watchEffect(() => {})
  }, 100)
</script>

<script>
  const unwatch = watchEffect(() => {})

  // ...当该侦听器不再需要时
  unwatch()

  // 需要异步请求得到的数据，建议可以使用条件式侦听逻辑
  const data = ref(null)

  watchEffect(() => {
    if (data.value) {
      // 数据加载后执行某些操作...
    }
  })
</script>
```

## 模板引用

###### ref

```vue
<template>
  <input ref="input" />
</template>
<script>
import { ref, onMounted } from 'vue'
// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>
```

如果你需要侦听一个模板引用 ref 的变化，确保考虑到其值为 `null` 的情况：

```js
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // 此时还未挂载，或此元素已经被卸载（例如通过 v-if 控制）
  }
})
```

**函数模板引用**

```html
<input :ref="(el) => { /* 将 el 赋值给一个数据属性或 ref 变量 */ }" />
```

当绑定的元素被卸载时，函数也会被调用一次，此时的 `el` 参数会是 `null`。你当然也可以绑定一个组件方法而不是内联函数。

**组件 ref**

有一个例外的情况，使用了 `<script setup>` 的组件是**默认私有**的：一个**父组件无法访问**到一个使用了 `<script setup>` 的**子组件**中的任何东西，除非子组件在其中通过 `defineExpose` 宏显式暴露：

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

// 像 defineExpose 这样的编译器宏不需要导入
defineExpose({
  a,
  b
})
// ref 都会自动解包，和一般的实例一样
</script>
```

## 组件基础

###### DOM 模板解析

1.字符串模板

字符串模板就是写在 vue 中的 template 中定义的模板，如.vue 的单文件组件模板和定义组件时 template 属性值的模板。字符串模板不会在页面初始化参与页面的渲染，会被 vue 进行解析编译之后再被浏览器渲染，所以不受限于 html 结构和标签的命名。

2.dom 模板(或者称为**Html 模板**)

dom 模板就是写在 html 文件中，一打开就会被浏览器进行解析渲染的，所以要遵循 html 结构和标签的命名，否则浏览器不解析也就不能获取内容了。

```html
<!DOCTYPE >
<html>
  <head>
    <meta charset="utf-8" />
    <title>Vue Component</title>
  </head>
  <body>
    <div id="app">
      Hello Vue
      <my-component></my-component>
      <!--
			大小写区分 闭合标签 元素位置限制
            需要使用连字符，`/>`不被支持
            <MyComponent />
			<table>
              <blog-post-row></blog-post-row> // 不被支持
			<tr is="vue:blog-post-row"></tr> // vue:用于区分原生attr
            </table>
            -->
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
    <script>
      //全局注册
      Vue.component('my-component', {
        template: '<div>组件类容</div>'
      })
      new Vue({
        el: '#app'
      })
    </script>
  </body>
</html>
```

以下不需要顾虑 dom 模板解析限制了

> - 单文件组件
> - 内联模板字符串 (例如 `template: '...'`)
> - `<script type="text/x-template">`

**大小写区分**

PascalCase 帕斯卡命名 MyData

camelCase 骆驼命名法 驼峰式 myData

kebab-case (短横线连字符)
