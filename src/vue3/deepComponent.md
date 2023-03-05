# 深入组件

## 属性

##### Props

```html
<script setup>
  const props = defineProps(['foo'])

  console.log(props.foo)

  // Vue 会通过 instanceof Person 来校验 author prop 的值是否是 Person 类的一个实例。
  class Person {
    constructor(firstName, lastName) {
      this.firstName = firstName
      this.lastName = lastName
    }
  }
  defineProps({
    author: Person
  })
</script>
<!-- 等同于传入 :disabled="true" -->
<MyComponent disabled />

<!-- 等同于传入 :disabled="false" -->
<MyComponent />
```

##### 事件 emit

```html
<script setup>
  const emit = defineEmits(['inFocus', 'submit'])

  function buttonClick() {
    emit('submit')
  }
</script>
<script>
  export default {
    emits: ['inFocus', 'submit'],
    setup(props, ctx) {
      ctx.emit('submit')
    }
  }
</script>
```

###### 校验 Emit

```js
const emit = defineEmits({
  // 没有校验
  click: null,

  // 校验 submit 事件
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
```

## 组件 v-model

```html
<!-- CustomInput.vue -->
<script setup>
  defineProps(['modelValue'])
  defineEmits(['update:modelValue'])
</script>
<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<!-- Form.vue -->
<CustomInput v-model="searchText" />
```

通过 computed()实现

```html
<!-- CustomInput.vue -->
<script setup>
  import { computed } from 'vue'

  const props = defineProps(['modelValue'])
  const emit = defineEmits(['update:modelValue'])
  const value = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  })
</script>

<!-- Form.vue -->
<template>
  <input v-model="value" />
</template>
```

### **v-model 实现多值双向绑定**

```html
<script setup>
  defineProps(['title'])
  defineEmits(['update:title'])
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
<MyComponent v-model:title="bookTitle" />
```

### 处理 `v-model` 修饰符

```html
<script setup>
  const props = defineProps({
    modelValue: String,
    modelModifiers: { default: () => ({}) }
  })
  defineEmits(['update:modelValue'])
  console.log(props.modelModifiers) // { capitalize: true }
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<MyComponent v-model.capitalize="myText" />
```

同时存在修饰器和绑定时

```html
<MyComponent v-model:title.capitalize="myText"></MyComponent>

<script>
  const props = defineProps(['title', 'titleModifiers'])
  defineEmits(['update:title'])
  console.log(props.titleModifiers) // { capitalize: true }
</script>
```

## 透传 attributtes

###### [禁用 Attributes 继承](https://cn.vuejs.org/guide/components/attrs.html#disabling-attribute-inheritance)

如果你**不想要**一个组件自动地继承 attribute，你可以在组件选项中设置 `inheritAttrs: false`。

```html
<script>
  // 使用普通的 <script> 来声明选项
  export default {
    inheritAttrs: false
  }
</script>

<script setup>
  // ...setup 部分逻辑
  import { useAttrs } from 'vue'

  const attrs = useAttrs()
</script>
<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">click me</button>
</div>

<!--多节点模板-->
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```

## 插槽

```html
// FancyList
<slot name="item" :item="item"></slot>

<FancyList :api-url="url" :per-page="10">
  <template #item="{ body, username, likes }">
    <div class="item">
      <p>{{ body }}</p>
      <p>by {{ username }} | {{ likes }} likes</p>
    </div>
  </template>
</FancyList>
```

###### **无渲染组件**

一些组件可能只包括了逻辑而不需要自己渲染内容，视图输出通过作用域插槽全权交给了消费者组件。我们将这种类型的组件称为**无渲染组件**。

作用域插槽在需要**同时封装逻辑、组合视图界面**时还是很有用，就像上面的 `<FancyList>` 组件那样。

## 依赖注入

```js
// 提供方
import { ref, provide } from 'vue'
const count = ref(0)
provide('key', count)

// 注入方
import { inject } from 'vue'
const message = inject('key')
// 如果没有祖先组件提供 "message"
// `value` 会是 "这是默认值"
const value = inject('message', '这是默认值')
```

### 和响应数据配合

```html
<!-- 在供给方组件内 -->
<script setup>
  import { provide, ref } from 'vue'
  const location = ref('North Pole')
  function updateLocation() {
    location.value = 'South Pole'
  }
  provide('location', {
    location,
    updateLocation
  })
</script>

<!-- 在注入方组件 -->
<script setup>
  import { inject } from 'vue'
  const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```

### 使用 symbol 注入

```js
// keys.js
export const myInjectionKey = Symbol()
```

```js
// 在供给方组件中
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'

provide(myInjectionKey, {
  /*
  要提供的数据
*/
})
// 注入方组件
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'

const injected = inject(myInjectionKey)
```

## 异步组件

### defineAsyncComponent（）

```js
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})
```
