# time-nuxt3-template

版本：1.0.0

作者：时光 博客：https://timebk.cn

# 简介

一个简单的具有前后端能力的 Nuxt3 后台 + 前台模板，最大限度让你专注于页面开发。

# 使用文档

制作中...

# 技术选用

Nuxt3 + Element Plus + Axios + Vue3 + Pinia + MongoDB

# 亮点

## 前端

- 完美的 SEO，但是你得在需要的页面里加 `语义化` 标签（例：`<Title>关于我们</Title>`）

- 自动注册 Element Plus Iocns

- 基本完善的后台登录流程和登录状态验证

- Pinia 持久化，在相关 `store` 文件里配置 `persist: true,`

- 三级侧边菜单、路由屑、路由缓存

## 后端

- 采用 MongoDB
- 分页查询、全量查询
- 图片上传保存功能其实是能做的，但是由于 Nuxt3 打包上线后无论图片保存到哪里前台都无法访问，因为在打包的时候就已经把静态文件编译好了，所以这个只能靠第三方接口或者自己重新用 Express 框架写一个图片上传接口

![](/show1.png)

![](/show2.png)

# 开发

## 安装

```
npm i
```

## 运行

```
npm run dev
```

## 打包

```
npm run build
```

# 公共方法

- usetimeDate() 获取时间日期，有多种格式；如需解析时间，格式：usetimeDate('parse',time)
