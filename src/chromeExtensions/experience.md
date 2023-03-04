#### 问题

1.  获取颜色主题
    @media (prefers-color-scheme: dark)
    @media (prefers-color-scheme: light)

2.  获取当前 chrome 标签页

    ```js
    chrome.bookmarks.getTree((bookmarkArray) => {
      console.log(bookmarkArray)
    })
    ```

    1.  调试
        1. background.js 更新的代码需要在插件哪里重新刷新
        2. content.js 只需要刷新页面

3.  加载 url，展示预览

    1. 如何处理多页面

       1. 开发 // chrome://newtab --watch

    2. 简介

4.  添加搜索

    1.  添加掘金，知乎，bing 等搜索入口

5.  调起本地 typora 添加 md 文件

    1.  如果打开本地.exe 文件 执行命令？

        新建 xx.reg 文件打开添加到电脑的注册表

        ```shell
        Windows Registry Editor Version 5.00

        [HKEY_CLASSES_ROOT\typora]
        "URL Protocol"=""
        @="URL:typora"

        [HKEY_CLASSES_ROOT\typora\shell\open\command]
        @="D:\\Typora\\Typora.exe"
        ```

6.  接口返回，展示 md 文件

7.  使用 lerna

8.  重构书签树遍历

9.  V3 chrome 插件 https://juejin.cn/post/7021072232461893639

10. newtab 开发处理引用路径

    ```json
    "permissions": [
        "storage",
        "http://*/*",
        "https://*/*"
    ]
    "externally_connectable": {
      "matches": [
              "http://localhost:4100/*"
      ]
    },
    ```

    permissions 权限申请

    scripts 中 build 加 --watch

    ```js
    // 复制文件到指定目录
    const copyFiles = [
      {
        from: path.resolve('src/plugins/manifest.json'),
        to: `${path.resolve('dist')}/manifest.json`
      },
      {
        from: path.resolve('src/assets'),
        to: path.resolve('dist/assets')
      },
      {
        from: path.resolve('src/plugins/inject.js'),
        to: path.resolve('dist/js')
      }
    ]
    new CopyWebpackPlugin({
      patterns: copyFiles
    })
    ```

11. 在 newtab 添加 ts

    1. chrome api 本地引用
       1. 解耦

12. google-chrome-extension - "Not allowed to load local resource: chrome://favicon/"

    https://www.coder.work/article/6406485

    http://www.uwenku.com/question/p-knaikjhn-bkb.html
    chrome://favicon2/?size=24&scale_factor=1x&show_fallback_monogram=&page_url=

    ```js
    chrome.tabs.query(
    {
      url: "https://juejin.cn/post/6992018709439053837",
    },
    function (tabs) {
      console.log(tabs);
    }
    );
    // 1. https://www.google.com/s2/favicons?domain=https://stackoverflow.com/
    // 2. manifest.json
    "permissions": [
     "favicon"
    ],
    export const favicon = (pageUrl: string, size: number = 24) => {
    const url = new URL(`chrome-extension://${chrome.runtime.id}/_favicon/`);
    url.searchParams.append("pageUrl", pageUrl);
    url.searchParams.append("size", size.toString());

    return url.href;
    };


    favicon("https://stackoverflow.com/");

    ```

13. [用 Vue 开发自己的 Chrome 扩展程序](https://juejin.cn/post/6844903865758793742)

14. jest

15. 可以删除标签

    1.  [Chrome 插件 - 【API】Chrome.Bookmark](https://blog.csdn.net/qq_42292831/article/details/88805549)

16. 可以切换不同的标签

17. 开发和生产分开，打 tag

    ```powershell
    # 列出已有tag，-l 过滤tag
    $ git tag
    # 新建tag
    $ git tag v1.0
    $ git tag -a tagName -m "my tag"
    # 查看tag详情信息
    $ git show <tagName>
    # 给指定commit加tag
    $ git tag -a <tagName> commitId -m "my tag"
    # 推送远程
    $ git push origin <tagName>
    # 切换tag
    $ git checkout <tagName>
    # 删除
    $ git tag -d <tagName>
    $ git push origin :refs/tags/<tagName>
    ```

#### 前置知识

##### 新增便签地址：chrome://new-tab-page-third-party/

##### background.js、content-script.js、inject-script、popup.js 互发消息

###### popup 和 background 互发消息

popup 访问 background

```js
// background.js
function test() {
  alert('我是background！')
}

// popup.js
var bg = chrome.extension.getBackgroundPage() // bg 时window对象
bg.test() // 访问bg的函数
alert(bg.document.body.innerHTML) // 访问bg的DOM
```

background 访问 popup

```js
var views = chrome.extension.getViews({ type: 'popup' })
if (views.length > 0) {
  console.log(views[0].location.href)
}
```

###### popup/background 向 content-script 主动发送消息

```js
// popup.js background.js
function sendMessageToContentScript(message, callback) {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
        if (callback) callback(response)
      })
    }
  )
}
// 注意： 需要异步触发
sendMessageToContentScript(
  { cmd: 'test', value: '你好，我是popup！' },
  function (response) {
    console.log('来自content的回复：' + response)
  }
)

// content-script.js
chrome.runtime.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
  if (request.cmd == 'test') alert(request.value)
  sendResponse('我收到了你的消息！')
})
```

###### content-script 主动发消息给后台

```js
// content-script.js
chrome.runtime.sendMessage(
  { greeting: '你好，我是content-script呀，我主动发消息给后台！' },
  function (response) {
    console.log('收到来自后台的回复：' + response)
  }
)

// popup.js background.js
// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  console.log('收到来自content-script的消息：')
  console.log(request, sender, sendResponse)
  sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request))
})
```

###### injected-script 和 content-script 互相通信

```js
// injected-script.js
window.postMessage({ test: '你好！' }, '*')

// content-script.js
window.addEventListener(
  'message',
  function (e) {
    console.log(e.data)
  },
  false
)
```
