import type { Config as ThemeConfig } from '@vue/theme'
import { DefaultTheme } from 'vitepress'

import { defineConfigWithTheme } from 'vitepress'
import baseConfig from '@vue/theme/config'
import testContain from './testContain'

export const sidebar: ThemeConfig['sidebar'] = {
  '/vitepress/': [
    {
      text: '配置',
      items: [
        { text: '介绍', link: '/vitepress/introduction' },
        { text: '默认主题设置', link: '/vitepress/themeConfig' },
        { text: '应用设置', link: '/vitepress/appConfig' },
        {
          text: 'frontmatter设置',
          link: '/vitepress/frontmatter'
        },
        { text: '自带组件', link: '/vitepress/internalComponent' }
      ]
    },
    {
      text: '使用',
      items: [{ text: 'markdown编写', link: '/vitepress/markdown' }]
    }
  ],
  '/vue3/': [
    {
      text: '组合式语法',
      items: [
        { text: '基础', link: '/vue3/basics' },
        { text: '深入组件', link: '/vue3/deepComponent' },
        { text: '逻辑复用', link: '/vue3/logicalReuse' },
        { text: 'TypeScript', link: '/vue3/typescriptAndVue' },
        { text: 'vite+vue3+ts踩坑记录', link: '/vue3/potholeRecord' }
      ]
    }
  ]
}
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

export default defineConfigWithTheme<DefaultTheme.Config | ThemeConfig>({
  extends: baseConfig,
  base: '/learn-record-blogs/',
  title: 'learn-record',
  description: 'learn note, blogs',
  lang: 'zh-CN',
  srcDir: 'src',
  scrollOffset: 'header',
  outDir: './dist',
  themeConfig: {
    nav: [
      {
        text: 'Vitepress',
        link: '/vitepress/introduction'
      },
      {
        text: 'Vue3',
        link: '/vue3/basics'
      }
    ],
    logo: '/icon_learning.png',
    siteTitle: '学习笔记',
    i18n,
    sidebar,
    algolia: {
      indexName: 'learn_blogs',
      appId: 'P000HSKYE8',
      apiKey: '25389a6b6adba4445cafb7d7d93300d2',
      searchParameters: {
        facetFilters: ['version:v3']
      }
    },
    outline: [2, 4],
    outlineTitle: '本页目录',
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/TheCornerOfTheWorld/learn-record-blogs'
      },
      {
        icon: {
          svg: `<svg t="1677943007035" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3610" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">
              <path d="M978.679467 3.164729H48.494933c-24.995271 0-45.328498 20.33152-45.328497 45.321671v930.190222c0 24.990151 20.333796 45.323378 45.328497 45.323378h930.184534c24.989582 0 45.320533-20.333227 45.320533-45.323378V48.4864c0-24.990151-20.330951-45.321671-45.320533-45.321671zM48.494933 39.011556h930.184534c5.223538 0 9.473707 4.251307 9.473706 9.474844v111.235982H39.013262V48.4864c0-5.223538 4.253582-9.474844 9.481671-9.474844z m930.184534 949.141617H48.494933c-5.228089 0-9.481671-4.250738-9.481671-9.476551V195.569209h949.139911V978.676622c0 5.226382-4.250169 9.476551-9.473706 9.476551z" fill="#333333" p-id="3611"></path>
              <path d="M863.959609 654.750151H189.979307c-26.825387 0-48.649671 21.824284-48.649671 48.649671v179.234702c0 26.824249 21.824284 48.649102 48.649671 48.649103h673.979733c26.825387 0 48.65024-21.824284 48.65024-48.649103v-179.234702c0-26.825387-21.824284-48.649671-48.649671-48.649671z m12.802844 227.883805c0 7.055929-5.743502 12.802276-12.802844 12.802275H189.979307c-7.059342 0-12.802276-5.746347-12.802276-12.802275v-179.234703c0-7.061049 5.743502-12.802844 12.802276-12.802844h673.979733c7.059342 0 12.802844 5.741796 12.802844 12.802844v179.234703zM189.979307 519.899591h173.832533c26.824818 0 48.649671-21.825422 48.649671-48.650809V297.416249c0-26.825387-21.824284-48.649102-48.649671-48.649102H189.979307c-26.825387 0-48.649671 21.823716-48.649671 48.649102v173.832533c0.000569 26.825387 21.824284 48.650809 48.649671 48.650809z m-12.802276-222.483342c0-7.058773 5.743502-12.802276 12.802276-12.802276h173.832533c7.058773 0 12.802844 5.743502 12.802844 12.802276v173.832533c0 7.058773-5.744071 12.802844-12.802844 12.802845H189.979307c-7.059342 0-12.802276-5.744071-12.802276-12.802845V297.416249zM894.685298 566.838613H159.253618c-9.899236 0-17.923413 8.025884-17.923414 17.922845 0 9.90208 8.024178 17.923982 17.923414 17.923982h735.43168c9.899236 0 17.923982-8.021902 17.923982-17.923982 0-9.896391-8.024178-17.922844-17.923982-17.922845zM894.685298 473.381547H488.424107c-9.899804 0-17.923982 8.024178-17.923983 17.923982 0 9.899236 8.024178 17.922844 17.923983 17.922844h406.26176c9.899236 0 17.923982-8.023609 17.923982-17.922844-0.000569-9.899236-8.024747-17.923982-17.924551-17.923982zM894.685298 365.841636H488.424107c-9.899804 0-17.923982 8.024178-17.923983 17.923413s8.024178 17.922844 17.923983 17.922844h406.26176c9.899236 0 17.923982-8.023609 17.923982-17.922844-0.000569-9.899236-8.024747-17.923413-17.924551-17.923413zM894.685298 258.300587H488.424107c-9.899804 0-17.923982 8.024178-17.923983 17.923982 0 9.899236 8.024178 17.922844 17.923983 17.922844h406.26176c9.899236 0 17.923982-8.023609 17.923982-17.922844-0.000569-9.899236-8.024747-17.923982-17.924551-17.923982z" fill="#333333" p-id="3612"></path>
              <path d="M116.572729 97.630436m-28.805689 0a28.805689 28.805689 0 1 0 57.611378 0 28.805689 28.805689 0 1 0-57.611378 0Z" fill="#333333" p-id="3613"></path>
              <path d="M207.470364 97.630436m-28.805688 0a28.805689 28.805689 0 1 0 57.611377 0 28.805689 28.805689 0 1 0-57.611377 0Z" fill="#333333" p-id="3614"></path>
              <path d="M298.367431 97.630436m-28.805689 0a28.805689 28.805689 0 1 0 57.611378 0 28.805689 28.805689 0 1 0-57.611378 0Z" fill="#333333" p-id="3615"></path>
            </svg>`
        },
        link: 'https://thecorneroftheworld.github.io/learn-record-blogs/'
      }
    ],
    editLink: {
      pattern:
        'https://github.com/TheCornerOfTheWorld/learn-record-blogs/blob/master/src/:path',
      text: 'Edit this page on GitHub'
    },
    docFooter: {
      prev: '前一页',
      next: '下一页'
    },
    darkModeSwitchLabel: '亮暗模式切换',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Kaseem'
    }
  },
  markdown: {
    config(md) {
      testContain(md)
    }
  },
  vite: {
    resolve: {
      alias: [{ find: /^@theme\//, replacement: './theme/' }]
    }
  }
})
