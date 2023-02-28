# Vitepress 基本可配置内容简介：

vitepress 有两种主要配置和一种 Frontmatter 配置。两种配置中第一种是 appConfig，包括页面标题，主题，head 配置，构建配置如 markdown、vite、vue；第二种是 themeConfig，包括组件布局，菜单，国际化等配置

### 主题 Theme Configs

使用主题可以自定义自己的页面布局和功能，当然也可以使用自带的 theme。默认在官方的主题配置，在`@vue/theme/config`目录下

可配置项有：
i18nRouting

Vitepress 实现 i18n 的方式是根据选择的语言进行不同语言页面替换的方式实现的

logo

要在导航栏中显示的徽标文件，就在网站标题之前。接受路径字符串或对象以设置不同的亮/暗模式徽标。

siteTitle

您可以自定义此项以替换 nav 中的默认站点标题（app-config 中的标题）。当设置为 false 时，导航中的标题将被禁用。当您的徽标已经包含网站标题文本时，这很有用。

nav

导航菜单项的配置。您可以在 Theme: Nav 中了解更多详细信息。

sidebar

侧边栏菜单项的配置。您可以在 Theme: Sidebar.了解更多。

aside

将此值设置为 false 将阻止渲染备用容器。

outline

要在大纲中显示的标题级别。您可以通过传递数字来指定特定级别，也可以通过传递包含下限和上限的元组来提供级别范围。当传递等于[2，6]的'deep'时，除 h1 外，所有标题级别都显示在大纲中。设置 false 以隐藏轮廓。

outlineBadges

默认情况下，徽章文本显示在大纲中。禁用此选项可从大纲中隐藏徽章文本。

outlineTitle

可用于自定义右侧边栏的标题（在大纲链接的顶部）。这在用另一种语言编写文档时很有用。

socialLinks

您可以定义此选项以在导航中显示带有图标的社交帐户链接。
Vitepress 包涵了一系列默认 Icons。

footer

页脚配置。您可以在页脚上添加消息或版权文本，但是，只有当页面不包含侧边栏时才会显示。这是由于设计问题。

editLink

编辑链接允许您在 GitHub 或 GitLab 等 Git 管理服务上显示编辑页面的链接。有关详细信息，请参见  Theme: Edit Link。

lastUpdatedText

在上次更新时间之前显示的前缀文本。

algolia

支持使用 Algolia DocSearch.搜索文档站点的选项。在 Theme: Search 中了解更多信息。

docFooter

可用于自定义出现在上一个和下一个链接上方的文本。如果不是用英语写文档，会很有用。

darkModeSwitchLabel

可用于自定义暗模式开关标签。此标签仅显示在移动视图中。

sidebarMenuLabel

可用于自定义侧边栏菜单标签。此标签仅显示在移动视图中。

return To TopLabel

可用于自定义 returnToTop 的标签。此标签仅显示在移动视图中。

### App Configs

可配置项有：

appearance

它还注入了内联脚本，该脚本尝试通过 vitebress 主题外观键从本地存储读取用户设置，并恢复用户首选的颜色模式。

base

网站将部署在的基本 URL。如果您计划在子路径（例如 GitHub 页面）下部署网站，则需要设置此 URL。如果您计划将站点部署到 foo.github.io/bar/，则应将基数设… base，因此只需指定一次。

description

站点说明。这将在页面 HTML 中呈现为＜ meta ＞标记。

head

要在页面 HTML 的`<head>`标记中呈现的其他元素。用户添加的标记在结束头标记之前呈现，在 VitePress 标记之后呈现。

ignoreDeadLinks

当设置为 true 时，VitePress 不会因死链接而导致构建失败。当设置为 localhostLinks 时，构建将在死链接上失败，但不会检查本地主机链接。

lang

站点的 lang 属性。这将在页面 html 中呈现为`<html lang=“en-US”>`标记。

lastUpdated

使用 gitcommit 获取时间戳。此选项启用默认主题以显示页面的上次更新时间。您可以通过 themeConfig.lastUpdatedText 自定义文本。

markdown

配置 Markdown 解析器选项。VitePress 使用  Markdown-it 作为解析器，Shiki 突出显示语言语法。在该选项中，您可以传递各种与 Markdown 相关的选项以满足您的需求

outDir

站点的构建输出位置，相对于项目根目录（如果您正在运行 vitepress build docs，则为 docs 文件夹）。

cacheDir

缓存文件的目录，相对于项目根目录（如果您正在运行 vitebress build docs，则为 docs 文件夹）。cacheDir.

srcDir

存储 markdown 页面的目录，相对于项目根目录。

title

站点的标题。这将显示在导航栏中。也用作所有页面标题的后缀，除非定义了 titleTemplate。

title Template

标题的后缀。例如，如果将 title 设置为 VitePress，并将 titleTemplate 设置为 My Site，则 html 标题将变为 VitePress| My Site。设置为 false 将禁用该功能。如果选项未定义，则将使用 title 选项的值。
要配置除|以外的标题分隔符，可以省略 title 并在 titleTemplate 中使用：title 符号。

cleanUrls

允许从 URL 中删除尾随的.html。
Warning: 启用此功能可能需要在宿主平台上进行其他配置。要使其工作，服务器必须在请求/foo 时提供/foo.html，而无需重定向。

rewrites

定义自定义目录<->URL 映射。有关详细信息，请参阅路由：Routing: Customize the Mappings

Build Hooks

VitePress 构建挂钩允许您向网站添加新功能和行为.

### Frontmatter 配置

Frontmatter 支持基于页面的配置。在每次标记时，您可以自由添加任何设置来覆盖任何全局应用程序或主题配置。此外，有些配置只能在 Frontmatter 中定义。
可配置项有：

title

页面标题。它与 config.title 相同，并覆盖应用程序配置。

title Template

标题的后缀。它与 config.titleTemplate 相同，并覆盖应用程序配置。

description

页面的说明。它与 config.description 相同，并覆盖应用程序配置。

head

指定要注入的额外头标记：

lastUpdated

是否在当前页面中显示上次更新的文本。

layout

确定页面的布局。
doc-它将默认文档样式应用于 markdown 内容。
home-“主页”的特殊布局。您可以添加额外的选项，如英雄和功能，以快速创建漂亮的登录页面。
页面-行为类似于文档，但它对内容不应用样式。当您想要创建完全自定义的页面时非常有用。

hero

此选项仅在布局设置为主页时生效。

features

此选项仅在布局设置为主页时生效。

aside

如果希望不显示文档布局中的右侧组件，请将此选项设置为 false。

outline

要为页面显示的大纲中的标题级别。它与 config.themeConfig.outline,相同，并覆盖主题配置。

### Theme - Team Page

Show team members in a page

您可以使用从 vitebress/theme 公开的`<VPTeamMembers>`组件在任何页面上显示团队成员列表。￼html 格式

Create a full Team Page

您可以创建一个完整的团队页面，而不是将团队成员添加到文档页面，这与您创建自定义主页的方式类似。要创建团队页面，首先创建一个新的 md 文件。文件名不重要，但在这里我们将其称为 team.md。在此文件中，设置 frontmatter 选项 layout:page，然后可以使用 TeamPage 组件组成页面结构。
创建完整的团队页面时，请记住使用`<VPTeamPage>`组件包装所有组件。此组件将确保所有嵌套的与团队相关的组件都获得适当的布局结构，如间距`<VPPageTitle>`组件添加页面标题部分。标题为`<h1>`标题。使用#title 和#lead-slot 记录您的团队`<VPMembers>`的工作原理与在文档页面中使用时相同。它将显示成员列表。
添加分区以划分团队成员。
您可以在团队页面中添加“部分”。例如，您可能有不同类型的团队成员，如核心团队成员和社区合作伙伴。您可以将这些成员划分为多个部分，以更好地解释每个组的角色。为此，请将`<VPTeamPageSection>`组件添加到我们之前创建的 team.md 文件中。

`<VPTeamMembers>`

`<VPTeamMembers>`组件显示给定的成员列表。

`<VPTeamPage>`

创建完整团队页面时的根组件。它只接受一个插槽。它将为所有传入的团队相关组件设置样式。

＜ VPTeamPageTitle>`

添加页面的“标题”部分。最好在`<VPTeamPage>`下开始使用。它接受#title 和#lead-slot。

`<VPTeamPageSection>`

在团队页面中创建一个“section”。它接受#title、#lead 和#memberslot。您可以在`<VPTeamPage>`中添加任意数量的分区。

### 左侧侧边栏 sidebar

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

```js
import type { Config as ThemeConfig } from '@vue/theme'
import { defineConfigWithTheme } from 'vitepress'
import baseConfig from '@vue/theme/config'
import testContain from './testContain'

const i18n: ThemeConfig['i18n'] = {
  search: '搜索',
  menu: '菜单',
  toc: '本页目录',
  returnToTop: '返回顶部',
  appearance: '外观',
  previous: '前一篇',
  next: '下一篇',
  pageNotFound: '页面未找到',
  deadLink: {
    before: '你打开了一个不存在的链接：',
    after: '。'
  },
  deadLinkReport: {
    before: '不介意的话请提交到',
    link: '这里',
    after: '，我们会跟进修复。'
  },
  footerLicense: {
    before: '',
    after: ''
  },
  ariaDarkMode: '切换深色模式',
  ariaSkipToContent: '直接跳到内容',
  ariaToC: '当前页面的目录',
  ariaMainNav: '主导航',
  ariaMobileNav: '移动版导航',
  ariaSidebarNav: '侧边栏导航'
}

export default defineConfigWithTheme <
  ThemeConfig >
  {
    extends: baseConfig,
    title: 'VitePress',
    description: 'Just playing around.',
    lang: 'zh-CN',
    srcDir: 'src',
    scrollOffset: 'header',
    themeConfig: {
      nav: [
        {
          text: 'vitepress介绍和使用',
          link: '/vitepress/introduction'
        }
      ],
      i18n,
      sidebar,
      algolia: {
        indexName: 'vuejs_cn2',
        appId: 'UURH1MHAF7',
        apiKey: 'c23eb8e7895f42daeaf2bf6f63eb4bf6',
        searchParameters: {
          facetFilters: ['version:v3']
        }
      }
    },
    markdown: {
      config(md) {
        testContain(md)
      }
    }
  }
```
