# 
## markdown格式化

### 代码行高亮 
```ts {1,6-8}
import type { UserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";

export const config: UserConfig = {
  title: "你好， VuePress",

  theme: defaultTheme({
    logo: "https://vuejs.org/images/logo.png",
  }),
};
```
::: info

Frontmatter 是 VuePress 中很重要的一个概念，如果你不了解它，你需要阅读 [Frontmatter 介绍](https://theme-hope.vuejs.press/zh/cookbook/vuepress/page.html#front-matter)。

:::
------
[原文链接：](https://theme-hope.vuejs.press/zh/cookbook/vuepress/markdown.html#%E4%BB%A3%E7%A0%81%E5%9D%97)

1 + 2 + 3 = {{ 1 + 2 + 3 }}
```js
// 由于 JS 代码高亮，这里不会被正确编译
const onePlusTwoPlusThree = {{ 1 + 2 + 3 }}
```

<h1>VuePress Theme Hope</h1>
<p><span id="very">非常</span>强大!</p>

::: details Click me to view the code
```js
console.log('Hello, VitePress!')
```
:::

::: demo
```html
<div>1111</div>
```
```js
  console.log(123)
```
:::
<ModalDemo />

::: details
<<< @/guide/components/test.vue
:::
<script setup>
import ModalDemo from './components/test.vue'
</script>

::: code-group

```sh [npm]
$ npm init
```

```sh [yarn]
$ yarn init
```

```sh [pnpm]
$ pnpm init
```

:::