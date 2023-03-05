import MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'
import type { RenderRule } from 'markdown-it/lib/renderer'

import { Header } from 'vitepress'

type ContainerArgs = [typeof container, string, { render: RenderRule }]

export interface AugmentedHeader extends Header {
  compositionOnly?: boolean
  optionsOnly?: boolean
}

function createContainer(
  klass: string,
  defaultTitle: string,
  md: MarkdownIt
): ContainerArgs {
  return [
    container,
    klass,
    {
      render(tokens, idx) {
        const token = tokens[idx]
        const info = token.info.trim().slice(klass.length).trim()
        if (token.nesting === 1) {
          const title = md.renderInline(info || defaultTitle)
          if (klass === 'demo') {
            return `<DemoBlock class="${klass} custom-block">
            <template #title>${title}</template>\n`
          }
          return `<div class="${klass} custom-block"><p class="custom-block-title">${title}</p>\n`
        } else {
          return klass === 'demo' ? `</DemoBlock>\n` : `</div>\n`
        }
      }
    }
  ]
}

export default (md: MarkdownIt) => {
  md.use(...createContainer('demo', 'Details', md))
  ;((md: MarkdownIt) => {
    const defaultRender = md.renderer.rules.fence!
    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
      const token = tokens[idx]
      // 判断该 fence 是否在 :::demo 内
      const prevToken = tokens[idx - 1]
      const isInDemoContainer =
        prevToken &&
        prevToken.nesting === 1 &&
        prevToken.info.trim().match(/^demo\s*(.*)$/)
      if (token.info === 'html' && isInDemoContainer) {
        return `<template #code>${token.content}</template>
        \n<template #highlight>${defaultRender(
          tokens,
          idx,
          options,
          env,
          self
        )}</template>`
      }
      return defaultRender(tokens, idx, options, env, self)
    }
  })(md)
}
