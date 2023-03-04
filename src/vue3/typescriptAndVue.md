# TS 与组合式 API

**语法限制**

- 一个类型字面量：

  ```js
  defineProps<{ /*... */ }>()
  ```

- 对**同一个文件**中的一个接口或对象类型字面量的引用：

  ```js
  interface Props {/* ... */}

  defineProps<Props>()
  ```

  ```js
  import { Props } from './other-file'

  // 不支持！
  defineProps<Props>()
  ```

```html
<script setup lang="ts">
  // 类型字面量
  const props = defineProps<{
    foo: string
    bar?: number
  }>()

  // 引用
  interface Props {
    foo: string
    bar?: number
  }
  const props = defineProps<Props>()

  // 为 props 声明默认值
  export interface Props {
    msg?: string
    labels?: string[]
  }
  const props = withDefaults(defineProps<Props>(), {
    msg: 'hello',
    labels: () => ['one', 'two']
  })

  // Props 解构默认值
  interface Props {
    name: string
    count?: number
  }
  // 对 defineProps() 的响应性解构
  // 默认值会被编译为等价的运行时选项
  const { name, count = 100 } = defineProps<Props>()

  // 复杂的 prop 类型, proptype工作方式与直接指定 props 选项基本相同：
  import type { PropType } from 'vue'
  interface Book {
    title: string
    author: string
    year: number
  }
  const props = defineProps({
    book: Object as PropType<Book>
  })

  // 为组件的 emits 标注类型
  // 运行时
  const emit = defineEmits(['change', 'update'])

  // 基于类型
  const emit = defineEmits<{
    (e: 'change', id: number): void
    (e: 'update', value: string): void
  }>()

  // ref
  import { ref } from 'vue'
  import type { Ref } from 'vue'

  const year: Ref<string | number> = ref('2020')
  // 没有给出初始值，那么最后得到的就将是一个包含 undefined 的联合类型：
  const year = ref<string | number>('2020')
  // 推导得到的类型：Ref<number | undefined>
  const n = ref<number>()

  year.value = 2020 // 成功！

  // 组件
  import MyModal from './MyModal.vue'
  const modal = ref<InstanceType<typeof MyModal> | null>(null)
  const openModal = () => {
    modal.value?.open()
  }
</script>
```
