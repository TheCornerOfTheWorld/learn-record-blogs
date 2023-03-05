# TS 与组合式 API

## defineProps

一个类型字面量：

```ts
// 类型字面量
const props = defineProps<{
  foo: string
  bar?: number
}>()
```

对**同一个文件**中的一个接口或对象类型字面量的引用：

```ts
interface Props {
  foo: string
  bar?: number
}

const props = defineProps<Props>()
```

```js
import { Props } from './other-file'

// 不支持导入的定义！
defineProps<Props>()
```

为 props 声明默认值

```html
<script setup lang="ts">
  export interface Props {
    msg?: string
    labels?: string[]
  }
  const props = withDefaults(defineProps<Props>(), {
    msg: 'hello',
    labels: () => ['one', 'two']
  })
  <script>
```

Props 解构默认值

```js
interface Props {
  name: string
  count?: number
}
// 对 defineProps() 的响应性解构
// 默认值会被编译为等价的运行时选项
const { name, count = 100 } = defineProps<Props>()
```

复杂的 prop 类型, proptype 工作方式与直接指定 props 选项基本相同

```js
import type { PropType } from 'vue'
interface Book {
  title: string
  author: string
  year: number
}
const props = defineProps({
  book: Object as PropType<Book>
})
</script>
```

## 为组件的 emits 标注类型

```js
  // 运行时
  const emit = defineEmits(['change', 'update'])

  // 基于类型
  const emit = defineEmits<{
    (e: 'change', id: number): void
    (e: 'update', value: string): void
  }>()
```

## ref 类型限定

```js
import { ref } from 'vue'
import type { Ref } from 'vue'

const year: Ref<string | number> = ref('2020')

const year = (ref < string) | (number > '2020')
year.value = 2020 // 成功！
```

如果你指定了一个泛型参数但没有给出初始值，那么最后得到的就将是一个包含 undefined 的联合类型：

```js
  // 推导得到的类型：Ref<number | undefined>
  const n = ref<number>()
```

为了获取 MyModal 的类型，我们首先需要通过 typeof 得到其类型，再使用 TypeScript 内置的 InstanceType 工具类型来获取其实例类型：

```js
  import MyModal from './MyModal.vue'
  const modal = ref<InstanceType<typeof MyModal> | null>(null)
  const openModal = () => {
    modal.value?.open()
  }
```

## 为 provide / inject 标注类型

provide 和 inject 通常会在不同的组件中运行。要正确地为注入的值标记类型，Vue 提供了一个 InjectionKey 接口，它是一个继承自 Symbol 的泛型类型，可以用来在提供者和消费者之间同步注入值的类型：

```js
import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

const key = Symbol() as InjectionKey<string>

provide(key, 'foo') // 若提供的是非字符串值会导致错误

const foo = inject(key) // foo 的类型：string | undefined

```

```js
const foo = inject<string>('foo') // 类型：string | undefined
const foo = inject<string>('foo', 'bar') // 类型：string
const foo = inject('foo') as string // 如果你确定该值将始终被提供，则还可以强制转换该值：
```
