// .vitepress/theme/index.js
import { h } from 'vue'
import { VPTheme } from '@vue/theme'

export default Object.assign({}, VPTheme, {
  Layout: () => {
    // @ts-ignore
    return h(VPTheme.Layout, null, {
      // banner: () => h(Banner),
      // 'sidebar-top': () => h(PreferenceSwitch),
      // 'aside-mid': () => h(SponsorsAside),
      // 'aside-bottom': () => h(WwAds)
    })
  }
})
