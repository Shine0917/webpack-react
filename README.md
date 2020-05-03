### 项目描述

这个脚手架用 webpack 和 babel 搭建
支持 react、less、ts 写法
引入 antd 库

有两种写法：

1. 用 mobx 的 hooks 写法，主要是 useContext 这个 API，对应其中的 ts 文件，路由是 `/hooks-todo`，`/hooks-result`
2. 用 class component 的写法,对应其中的 js 文件，路由是 `/todo`，`/result`

### TODO:

- [ ] react-router-dom
- [ ] axios
- [x] git commit 规范
- [x] eslint
- [ ] redux

### 目录结构

```
.
├── public
│   └── index.html                           // 模板文件入口
├── src
│   ├── app.tsx
│   ├── components                           // 业务组件
│   ├── index.tsx                            // 项目入口文件
│   ├── pages                                // 业务页面
│   └── stores                               // mobx store 仓库
└── webpack
│   ├── config                               // 公共配置
│   ├── tools                                // 工具配置
│   ├── webpack.base.config.js               // webpack 基础配置
│   ├── webpack.dev.config.js                // 开发环境配置
│   ├── webpack.dll.config.js
│   └── webpack.prod.config.js               // 生产环境配置
├── dll
│   ├── react.todo.dll.js
│   ├── react.todo.manifest.json
│   ├── reactDOM.todo.dll.js
│   └── reactDOM.todo.manifest.json
├── tsconfig.json                            // ts 配置文件
├── package-lock.json
├── package.json
├── postcss.config.js
├── dist
└── README.md
```

### git commit

#### 命令

```
git add .
git cz
```

#### type

```
# 主要type
feat:     增加新功能
fix:      修复bug

# 特殊type
docs:     只改动了文档相关的内容
style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
build:    构造工具的或者外部依赖的改动，例如webpack，npm
refactor: 代码重构时使用
revert:   执行git revert打印的message

# 暂不使用type
test:     添加测试或者修改现有测试
perf:     提高性能的改动
ci:       与CI（持续集成服务）有关的改动
chore:    不修改src或者test的其余修改，例如构建过程或辅助工具的变动
```

#### 参考资料

[git commit message 规范](https://juejin.im/post/5d0b3f8c6fb9a07ec07fc5d0)
