# Frontmatter 配置{#frontmatter-config}

Markdown 文件可以包含一个 YAML Frontmatter 。Frontmatter 必须在 Markdown 文件的顶部，并且被包裹在一对三短划线中间。下面是一个基本的示例：

```md
---
lang: zh-CN
title: 页面的标题
description: 页面的描述
---
```

你可以通过 Frontmatter 来覆盖当前页面的 lang, title, description 等属性。因此，你可以把 Frontmatter 当作页面级作用域的配置。

## title

页面标题。它与 config.title 相同，并覆盖应用程序配置。

## title Template

标题的后缀。它与 config.titleTemplate 相同，并覆盖应用程序配置。

## description

页面的说明。它与 config.description 相同，并覆盖应用程序配置。

## head

指定要注入的额外头标记：

## lastUpdated

- Type: `boolean`
- Default: `true`

是否在当前页面中显示上次更新的文本。

## layout

- Type: `doc | home | page`
- Default: `doc`

确定页面的布局。
doc-它将默认文档样式应用于 markdown 内容。
home-“主页”的特殊布局。您可以添加额外的选项，如`hero` and `features`，以快速创建漂亮的登录页面。
page-行为类似于文档，但它对内容不应用样式。当您想要创建完全自定义的页面时非常有用。

## hero

- Type: `Hero`

此选项仅在布局设置为主页时生效。

```yaml
---
layout: home

hero:
  name: VitePress
  text: Vite & Vue powered static site generator.
  tagline: Lorem ipsum...
  actions:
    - theme: brand
      text: Get Started
      link: /guide/what-is-vitepress
    - theme: alt
      text: View on GitHub
      link: https://github.com/vuejs/vitepress
---
```

```ts
interface Hero {
  // The string shown top of `text`. Comes with brand color
  // and expected to be short, such as product name.
  name?: string

  // The main text for the hero section. This will be defined
  // as `h1` tag.
  text: string

  // Tagline displayed below `text`.
  tagline?: string

  // Action buttons to display in home hero section.
  actions?: HeroAction[]
}

interface HeroAction {
  // Color theme of the button. Defaults to `brand`.
  theme?: 'brand' | 'alt'

  // Label of the button.
  text: string

  // Destination link of the button.
  link: string
}
```



## features

- Type: `Feature[]`

此选项仅在布局设置为主页时生效。

```yaml
---
layout: home

features:
  - icon: 🛠️
    title: Simple and minimal, always
    details: Lorem ipsum...
  - icon:
      src: /cool-feature-icon.svg
    title: Another cool feature
    details: Lorem ipsum...
  - icon:
      dark: /dark-feature-icon.svg
      light: /light-feature-icon.svg
    title: Another cool feature
    details: Lorem ipsum...
---
```

```ts
interface Feature {
  // Show icon on each feature box.
  icon?: FeatureIcon

  // Title of the feature.
  title: string

  // Details of the feature.
  details: string

  // Link when clicked on feature component. The link can
  // be both internal or external.
  //
  // e.g. `guide/theme-home-page` or `htttps://example.com`
  link?: string

  // Link text to be shown inside feature component. Best
  // used with `link` option.
  //
  // e.g. `Learn more`, `Visit page`, etc.
  linkText?: string
}

type FeatureIcon =
  | string
  | { src: string; alt?: string; width?: string; height: string }
  | {
      light: string
      dark: string
      alt?: string
      width?: string
      height: string
    }
```

[Theme: Home Page](https://vitepress.vuejs.org/guide/theme-home-page).

## aside

如果希望不显示文档布局中的右侧组件，请将此选项设置为 false。

## outline

要为页面显示的大纲中的标题级别。它与 config.themeConfig.outline,相同，并覆盖主题配置。

[了解更多](https://vitepress.vuejs.org/config/frontmatter-config)