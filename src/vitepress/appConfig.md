# 应用配置{#app-configs}

## appearance

- Type: `boolean | 'dark'`
- Default: `true`

是否能够选择暗黑模式

它还注入了内联脚本，该脚本尝试通过 vitebress 主题外观键从本地存储读取用户设置，并恢复用户首选的颜色模式。

## base

网站将部署在的基本 URL。如果您计划在子路径（例如 GitHub 页面）下部署网站，则需要设置此 URL。如果您计划将站点部署到 `https://foo.github.io/bar/`, 然后你需要设置 base 为`/bar/`，因此只需指定一次。

## description

站点说明。这将在页面 HTML 中呈现为＜ meta ＞标记。

## head

- Type: `HeadConfig[]`
- Default: `[]`

```ts
export default {
  head: [
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: ''
      }
    ]
    // would render: <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  ]
}
type HeadConfig =
  | [string, Record<string, string>]
  | [string, Record<string, string>, string]
```

要在页面 HTML 的`<head>`标记中呈现的其他元素。用户添加的标记在结束头标记之前呈现，在 VitePress 标记之后呈现。

## ignoreDeadLinks

- Type: `boolean | 'localhostLinks'`
- Default: `false`

当设置为 true 时，VitePress 不会因死链接而导致构建失败。当设置为 localhostLinks 时，构建将在死链接上失败，但不会检查本地主机链接。

## lang

- Type: `string`
- Default: `en-US`

站点的 lang 属性。这将在页面 html 中呈现为`<html lang=“en-US”>`标记。中文为`<html lang="zh-CN">`

## lastUpdated

使用 gitcommit 获取时间戳。此选项启用默认主题以显示页面的上次更新时间。您可以通过 themeConfig.lastUpdatedText 自定义文本。

## markdown

- Type: `MarkdownOption`

配置 Markdown 解析器选项。VitePress 使用 Markdown-it 作为解析器，Shiki 突出显示语言语法。在该选项中，您可以传递各种与 Markdown 相关的选项以满足您的需求

```ts
export default {
  markdown: {
    theme: 'material-theme-palenight',
    lineNumbers: true
  }
}
interface MarkdownOptions extends MarkdownIt.Options {
  // Custom theme for syntax highlighting.
  // You can use an existing theme.
  // See: https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-themes
  // Or add your own theme.
  // See: https://github.com/shikijs/shiki/blob/main/docs/themes.md#loading-theme
  theme?:
    | Shiki.IThemeRegistration
    | { light: Shiki.IThemeRegistration; dark: Shiki.IThemeRegistration }

  // Enable line numbers in code block.
  lineNumbers?: boolean

  // Add support for your own languages.
  // https://github.com/shikijs/shiki/blob/main/docs/languages.md#supporting-your-own-languages-with-shiki
  languages?: Shiki.ILanguageRegistration

  // markdown-it-anchor plugin options.
  // See: https://github.com/valeriangalliat/markdown-it-anchor#usage
  anchor?: anchorPlugin.AnchorOptions

  // markdown-it-attrs plugin options.
  // See: https://github.com/arve0/markdown-it-attrs
  attrs?: {
    leftDelimiter?: string
    rightDelimiter?: string
    allowedAttributes?: string[]
    disable?: boolean
  }

  // specify default language for syntax highlighter
  defaultHighlightLang?: string

  // @mdit-vue/plugin-frontmatter plugin options.
  // See: https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-frontmatter#options
  frontmatter?: FrontmatterPluginOptions

  // @mdit-vue/plugin-headers plugin options.
  // See: https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-headers#options
  headers?: HeadersPluginOptions

  // @mdit-vue/plugin-sfc plugin options.
  // See: https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-sfc#options
  sfc?: SfcPluginOptions

  // @mdit-vue/plugin-toc plugin options.
  // See: https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc#options
  toc?: TocPluginOptions

  // Configure the Markdown-it instance.
  config?: (md: MarkdownIt) => void
}
```

## outDir

- Type: `string`
- Default: `./.vitepress/dist`

站点的构建输出位置，相对于项目根目录（如果您正在运行 vitepress build docs，则为 docs 文件夹）。

```js
export default {
  outDir: '../public'
}
```



## cacheDir

- Type: `string`
- Default: `./.vitepress/cache`

缓存文件的目录，相对于项目根目录（如果您正在运行 vitebress build docs，则为 docs 文件夹）。cacheDir.

## srcDir

存储 markdown 页面的目录，相对于项目根目录。

## title

站点的标题。这将显示在导航栏中。也用作所有页面标题的后缀，除非定义了 titleTemplate。

## title Template

标题的后缀。例如，如果将 title 设置为 VitePress，并将 titleTemplate 设置为 My Site，则 html 标题将变为 VitePress| My Site。设置为 false 将禁用该功能。如果选项未定义，则将使用 title 选项的值。
要配置除|以外的标题分隔符，可以省略 title 并在 titleTemplate 中使用：title 符号。

## cleanUrls

允许从 URL 中删除尾随的.html。
Warning: 启用此功能可能需要在宿主平台上进行其他配置。要使其工作，服务器必须在请求/foo 时提供/foo.html，而无需重定向。

## rewrites

定义自定义目录<->URL 映射。有关详细信息，请参阅路由：[Routing: Customize the Mappings](https://vitepress.vuejs.org/guide/routing#customize-the-mappings)

```js
export default {
  rewrites: {
    'packages/pkg-a/src/pkg-a-code.md': 'pkg-a/pkg-a-code.md', // packages/pkg-a/src/pkg-a-code.md -> /pkg-a/pkg-a-code.md
    'packages/:pkg/src/:page*': ':pkg/:page*', // packages/pkg-a/src/pkg-a-code.md  -> /pkg-a/pkg-a-code.md
    'source/:page': 'destination/:page'
  }
}
```



## Build Hooks

VitePress 构建挂钩允许您向网站添加新功能和行为.

- Sitemap
- Search Indexing
- PWA
- Teleports

[了解更多](https://vitepress.vuejs.org/config/app-config)