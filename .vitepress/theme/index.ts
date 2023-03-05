import { h } from 'vue'
// import { VPTheme } from '@vue/theme'
// export default Object.assign({}, VPTheme, {
//   Layout: () => {
//     // @ts-ignore
//     return h(VPTheme.Layout, null, {})
//   }
// })

import './styles/custom.css'
import DefaultTheme from 'vitepress/theme'
// import MyComponent from './components/MyComponent.vue'
import DemoBlock from './components/DemoBlock.vue'
import { EnhanceAppContext } from 'vitepress'

export default Object.assign({}, DefaultTheme, {
  // Layout,
  // NotFound: () => 'custom 404',
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 'aside-outline-before': () => h(MyComponent)
    })
  },
  enhanceApp(ctx: EnhanceAppContext) {
    // extend default theme custom behaviour.
    DefaultTheme.enhanceApp(ctx)

    // register your custom global components
    ctx.app.component('DemoBlock', DemoBlock)
  },

  setup() {
    // this function will be executed inside VitePressApp's
    // setup hook. all composition APIs are available here.
  }
})
