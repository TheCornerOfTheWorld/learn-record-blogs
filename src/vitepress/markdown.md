# markdown 编写语法

## 代码行高亮

高亮第一行和 6-8 的代码

```md
`ts {1,6-8} ...`
```

```ts {1,6-8}
import type { UserConfig } from '@vuepress/cli'
import { defaultTheme } from '@vuepress/theme-default'

export const config: UserConfig = {
  title: '你好， VuePress',

  theme: defaultTheme({
    logo: 'https://vuejs.org/images/logo.png'
  })
}
```

## 在 md 中使用特殊符号

1. JS 代码块，这里 JS 高亮，双括号不会被正确编译

```js
const onePlusTwoPlusThree = {{ 1 + 2 + 3 }}
```

2. 单个组件标签，如`<VPPageTitle>`,则可以使用``代码片段包裹起来，规避编译时的 Internal server error: Element is missing end tag.报错

## 直接编写 dom 便签 (TODO 使用 demo 优化)

```html
<p><span id="very">非常</span>强大!</p>
```

<p><span id="very">非常</span>强大!</p>

## md-it 插件，contain

在 md 文件中的表现形式为，`:::[type] desc  :::`
::: details 点我看代码（自带 contain）

```js
console.log('Hello, VitePress!')
```

:::

## 使用组件

md 文件在构建时会被转换成 vue 文件，支持直接使用组件

<script setup>
import ModalDemo from '@theme/components/Demo.vue'
</script>
<ModalDemo />

::: details 查看代码
<<< .vitepress/theme/components/demo.vue
:::

::: demo 使用 demo 展示组件

```html
<div>这里时源码</div>
<div>源码？</div>
```

:::
