# 默认主题配置 {#theme-configs}

使用主题可以自定义自己的页面布局和功能，当然也可以使用自带的 theme。默认在官方的主题配置，在`@vue/theme/config`目录下

```js
export default {
  lang: 'en-US',
  title: 'VitePress',
  description: 'Vite & Vue powered static site generator.',

  // Theme related configurations.
  themeConfig: {
    logo: '/logo.svg',
    nav: [...],
    sidebar: { ... }
  }
}
```

## logo

要在导航栏中显示的徽标文件，就在网站标题之前。接受路径字符串或对象以设置不同的亮/暗模式徽标。

```ts
type ThemeableImage =
  | string
  | { src: string; alt?: string }
  | { light: string; dark: string; alt?: string }
```

## siteTitle

- Type: string | false

您可以自定义此项以替换 nav 中的默认站点标题（app-config 中的标题）。当设置为 false 时，导航中的标题将被禁用。当您的徽标已经包含网站标题文本时，这很有用。

## sidebar

侧边栏菜单项的配置
不同模块内容，展示不同形式的左侧菜单栏，需要定义 sidebar 为对象形式，key 值和一级路由一致，数组 value 配置不同的侧边栏信息

```js
const sidebar = {
  '/vitepress/': [
    {
      text: '配置',
      items: [{ text: '设置主题', link: '/vitepress/config' }]
    }
  ],
  '/vue3/': [
    {
      text: '组合式语法',
      items: [{ text: 'markdown编写', link: '/vue3/test' }]
    }
  ]
}
```

## aside

- Type: `boolean`
- Default: `true`

将此值设置为 false 将阻止渲染备用容器。

## outline

- Type: `number | [number, number] | 'deep' | false`
- Default: `2`

要在大纲中显示的标题级别。您可以通过传递数字来指定特定级别，也可以通过传递包含下限和上限的元组来提供级别范围。当传递等于[2，6]的'deep'时，除 h1 外，所有标题级别都显示在大纲中。设置 false 以隐藏轮廓。

## outlineBadges

默认情况下，徽章文本显示在大纲中。禁用此选项可从大纲中隐藏徽章文本。

## outlineTitle

可用于自定义右侧边栏的标题（在大纲链接的顶部）。这在用另一种语言编写文档时很有用。

## socialLinks

您可以定义此选项以在导航中显示带有图标的社交帐户链接。
Vitepress 包涵了一系列默认 Icons。

## footer

页脚配置。您可以在页脚上添加消息或版权文本，但是，只有当页面不包含侧边栏时才会显示。这是由于设计问题。

## editLink

编辑链接允许您在 GitHub 或 GitLab 等 Git 管理服务上显示编辑页面的链接。有关详细信息，请参见  Theme: Edit Link。

## lastUpdatedText

在上次更新时间之前显示的前缀文本。

## algolia

支持使用 Algolia DocSearch.搜索文档站点的选项。在 Theme: Search 中了解更多信息。

## docFooter

可用于自定义出现在上一个和下一个链接上方的文本。如果不是用英语写文档，会很有用。

## darkModeSwitchLabel

可用于自定义暗模式开关标签。此标签仅显示在移动视图中。

## sidebarMenuLabel

可用于自定义侧边栏菜单标签。此标签仅显示在移动视图中。

## return To TopLabel

可用于自定义 returnToTop 的标签。此标签仅显示在移动视图中。

[了解更多默认主题配置](https://vitepress.vuejs.org/config/theme-config)
