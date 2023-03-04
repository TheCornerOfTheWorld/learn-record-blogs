#### 问题

1. 调试 npm 本地包 npm link 如何实现

   ```js
   // node中如何实现软链接
   fs.symlinkSync(target,path,type)
   target <string> | <Buffer> | <URL>   // 目标文件
   path <string> | <Buffer> | <URL>  // 创建软链对应的地址
   type <string>
   ```

npm-link-module // 调试本地包

npm-link-example // 开发项目库

在 npm-link-module 中执行`npm link`命令，创建软连接到全局 npm/node_modules 下，然后在 npm-link-example 下链接模块，执行`npm link npm-link-module`同样式创建快捷键到项目库的 node_modules 下，在项目中使用包即可

> 注意: 驼峰会被转成小写

#### 前置知识

##### `lerna`命令

**lerna init**
初始化项目

**lerna bootstrap**

安装所有依赖项，链接相互依赖的库到具体的目录。

**lerna publish**

打 tag，上传 npm，提交 git

**lerna run [script]**
在每一个包含 [script] 脚本的软件包中运行此 npm 脚本。

**lerna ls**
列出当前 Lerna 仓库中的所有公共软件包（public packages）。

**lerna changed**
检查自上次发布以来哪些软件包被修改过。

**lerna diff [package?]**
列出所有或某个软件包自上次发布以来的修改情况。

**lerna link**
项目包建立软链，类似 npm link

**lerna clean**
删除所有包的 node_modules 目录

**lerna add <package>[@version] [--dev] [--exact] [--peer]**
添加本地包或者远程包作为包的依赖
lerna add module-1 --scope=module-2 --dev

##### 工作模式

Fixed/Locked mode (default)

在 publish 时，会在 lerna.json 文件里面"version": "0.1.5",依据这个号，进行增加，只选择一次，其他有改动的包自动更新版本号

Independent mode
lerna init --independent 初始化项目。
lerna.json 文件里面"version": "independent",
每次 publish 时，您都将得到一个提示符，提示每个已更改的包，以指定是补丁、次要更改、主要更改还是自定义更改。

##### 设置只有一个 node_modules

// package.json

"private": true,
"workspaces": [
"packages/*"
],

// lerna.json

"useWorkspaces": true,
"npmClient": "yarn",

##### 开发

**lerna exec**

执行 shell 脚本
它表示在所有的包执行 shell 命令，比如删除所有包的 node_modules:
npx lerna exec -- rm -rf node_modules
如果只想删除某个包下面的东西，可以加上--scope，注意后面带的是包的名称，不是文件夹名。
npx lerna exec --scope=@yijiang-cli-dev/core -- rm -rf node_modules\
