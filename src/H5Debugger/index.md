### **预期收获**

1. 了解远程调试的发展历程
2. 掌握远程调试的基本原理
3. 掌握不同场景的调试决策

### **分享思路**

1. 介绍调试与远程调试的概念
2. 介绍 hybrid 远程调试的发展历程以及相关技术
3. 对调试方案进行对比，并提供最佳实践
4. 对远程调试未来的一个畅想





##### 收获基本原理

使用chrome内部api

##### 不同场景有什么用途

1. browserAction(浏览器右上角) 

2.  pageAction(地址栏右侧) 指的是只有当某些特定页面打开才显示的图标

3. contextMenus右键菜单

4. override(覆盖特定页面) 书签，历史记录，新标签页等

5. devtools(开发者工具) F12窗口关闭，页面也随着关闭

   ```json
   {
   	// 只能指向一个HTML文件，不能是JS文件
   	"devtools_page": "devtools.html"
   }
   ```

   ![img](https://images2015.cnblogs.com/blog/352797/201707/352797-20170711101847493-273760238.png)

   6. option(选项页) 一个是右键图标有一个“选项”菜单，还有一个在插件管理页面

   7. `omnibox`是向用户提供搜索建议的一种方式

      ```json
      {
      	// 向地址栏注册一个关键字以提供搜索建议，只能设置一个关键字
      	"omnibox": { "keyword" : "go" },
      }
      ```

   8. 桌面通知

      ```js
      chrome.notifications.create(null, {
      	type: 'basic',
      	iconUrl: 'img/icon.png',
      	title: '这是标题',
      	message: '您刚才点击了自定义右键菜单！'
      });
      ```

      

##### 相关技术

1. manifest.json 项目描述

   ```json
   {
   	// 清单文件的版本，这个必须写，而且必须是2
   	"manifest_version": 2,
   	// 插件的名称
   	"name": "demo",
   	// 插件的版本
   	"version": "1.0.0",
   	// 插件描述
   	"description": "简单的Chrome扩展demo",
   	// 图标，一般偷懒全部用一个尺寸的也没问题
   	"icons":
   	{
   		"16": "img/icon.png",
   		"48": "img/icon.png",
   		"128": "img/icon.png"
   	},
   }
   ```

2. content-scripts 脚本注入 广告屏蔽、页面CSS定制 只能使用部分chromeApi  它可以操作DOM，无法访问页面中的JS，

   ```json
   {
   	// 需要直接注入页面的JS
   	"content_scripts": 
   	[
   		{
   			//"matches": ["http://*/*", "https://*/*"],
   			// "<all_urls>" 表示匹配所有地址
   			"matches": ["<all_urls>"],
   			// 多个JS按顺序注入
   			"js": ["js/jquery-1.8.3.js", "js/content-script.js"],
   			// JS的注入可以随便一点，但是CSS的注意就要千万小心了，因为一不小心就可能影响全局样式
   			"css": ["css/custom.css"],
   			// 代码注入的时间，可选值： "document_start", "document_end", or "document_idle"，最后一个表示页面空闲时，默认document_idle
   			"run_at": "document_start"
   		}
   	],
   }
   ```

3. background 管理后台 指点渲染的page 生命周期跟sessionStorage一样

   ```json
   {
   	// 会一直常驻的后台JS或后台页面
   	"background":
   	{
   		// 2种指定方式，如果指定JS，那么会自动生成一个背景页
   		"page": "background.html"
   		//"scripts": ["js/background.js"]
           // 在被需要时加载 第一次安装、插件更新、有content-script向它发送消息，等等
           "persistent": false
   	},
   }
   ```

4. `popup`是点击`browser_action`或者`page_action`图标时打开的一个小窗口网页

   ```json
   {
   	"browser_action":
   	{
   		"default_icon": "img/icon.png",
   		// 图标悬停时的标题，可选
   		"default_title": "这是一个示例Chrome插件",
   		"default_popup": "popup.html"
   	}
   }
   ```

   焦点离开又立即关闭，所以popup页面的生命周期一般很短

   在权限上，它和background非常类似，它们之间最大的不同是生命周期的不同，popup中可以直接通过`chrome.extension.getBackgroundPage()`获取background的window对象

5. injected-script

​	在`content-script`中通过DOM方式向页面注入`inject-script`代码示例：

```
// 向页面注入JS
function injectCustomJs(jsPath)
{
	jsPath = jsPath || 'js/inject.js';
	var temp = document.createElement('script');
	temp.setAttribute('type', 'text/javascript');
	// 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
	temp.src = chrome.extension.getURL(jsPath);
	temp.onload = function()
	{
		// 放在页面不好看，执行完后移除掉
		this.parentNode.removeChild(this);
	};
	document.head.appendChild(temp);
}
```

```json
{
	// 普通页面能够直接访问的插件资源列表，如果不设置是无法直接访问的
	"web_accessible_resources": ["js/inject.js"],
}
```

`injected script`、`content-script`、`popup js`、`background js`和`devtools js`

##### dome

omnibox