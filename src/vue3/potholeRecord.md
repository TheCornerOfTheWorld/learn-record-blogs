# vue3 + vite + ts 新建项目

## vue3 开启 eslint 之后报错：error Parsing error: ‘＞‘ expected

```js
module.exports = {
  parser: 'vue-eslint--parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
```

## vue3 解决 no-unused-vars 报错

```js
module.export = {
  '@typescript-eslint/no-unused-vars': [
    'error',
    { varsIgnorePattern: '.*', args: 'none' }
  ] //变量声明未使用
}
```

```js
module.export = {
  rules: {
    '@typescripte-eslint/no-unused-vars'： 'off',
    'no-unused-vars': 'off'
  }
}
```

## ReferenceError: defineProps is not defined

```js
// .eslintrc
{
    // eslint-plugin-vue 8.0.0 以上
    env: {
     "vue/setup-compiler-macros": true,
    }
    // eslint-plugin-vue 8.0.0 以下
    globals: {
      defineProps: 'readonly',
      defineEmits: 'readonly',
      defineExpose: 'readonly',
      withDefaults: 'readonly',
    },
}
```

## vue3 Component name "home" should always be multi-word vue/multi-word-component-names

是因为开启了语法检查，写成**驼峰**就可以

```js
rules: {
 'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['home'], //需要忽略的组件名
      },
    ]
  // 或者关闭
 'vue/multi-word-component-names': 'off'
}
```

## error Getting a value from the `props` in root scope of `<script setup>` will cause the value to lose reactivity vue/no-setup-props-destructure(**从’ setup() ‘的根范围的’ props '中获取一个值将导致该值失去反应性**)

修改解构`const { xxx }= props`为`props.xxx`

## Internal server error: Cannot read config file: E:\project\xi-li\.eslintrc.js

require() of ES Module E:\project\xi-li\.eslintrc.js from E:\project\xi-li\node_modules\@eslint\eslintrc\dist\eslintrc.cjs not supported.

.eslintrc.js is treated as an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which declares all .js files in that package scope as ES modules.

1. 修改文件名后缀为.cjs

`.js` 被默认为使用了 ES module 规范，如果自动生成的配置文件使用了 CommonJS，就会出错。`.cjs` 的 js 会告诉 node.js 它使用了 CommonJS 规范，所以就不会出错。

2. 也可去掉后缀改成 json 格式配置

## Error: Failed to resolve entry for package "E:\project\newtab-todo-plugin\packages\newtab\". The package may have incorrect main/module/exports specified in its package.json.

资源文件加载错误，例如`<img src="/">`导致构建失败

## defineOptions undefined

1. 添加 unplugin-vue-macros 插件

   ```js
   // package.json
   "unplugin-vue-macros": "^0.16.0",
   
   // tsconfig.json
   types: ["unplugin-vue-macros/macros-global"]
   
   // vite.config.ts
   import VueMarcos from "unplugin-vue-macros/vite";
   plugins: [VueMarcos()] 
   ```

2. 另外写一个 script

   ```vue
   <script>
       export default {
           name: 'componentName'
       }
   </script>
   <script setup>
       ...
   </script>
   ```

   

## SyntaxError: Cannot use import statement outside a module

这提示一般是 node 下无法使用 import

```js
{
	transform: {
		'^.+\\.(t|j)sx?$': [
          'babel-jest', {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: true,
                  },
                },
              ],
              '@babel/preset-typescript', // ts支持
            ],
          },
        ],
	}
}

```

## [unplugin-vue-define-options] unplugin-vue-define-options TypeError: Cannot read properties of undefined (reading 'scriptSetupAst')

fixed the version at 0.12.1
