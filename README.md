![](/show1.png)

# time-nuxt3-template
版本：1.2.0

作者：时光 博客：https://timebk.cn/

# 简介

一个简单的具有前后端能力的 Nuxt3 后台 + 前台模板，最大限度让你专注于页面开发。

# 预览地址

http://souti.timebk.cn/admin (账号和密码都：1)

# 使用文档

http://souti.timebk.cn/doc

# 主要技术

Nuxt3 + Element Plus + Axios + Vue3 + Pinia + MongoDB

# 亮点

## 前端

- 双端自适应，适配 Element Plus 组件移动端效果

- 路由自定义缓存,可根据需求配置每个路由是否需要缓存

- 按钮权限，路由权限，元素权限

- 基本完善的后台登录流程和 Token 验证

- 完美的 SEO，但是你得在需要的页面里加 `语义化` 标签（例：`<Title>关于我们</Title>`）

- 自动注册 Element Plus Iocns

- Pinia 持久化，在相关 `store` 文件里配置 `persist: true,`

- 三级侧边菜单、路由屑、路由缓存

## 后端

- 采用 MongoDB
- 提供通用式数据库操作方法：分页查询、全量查询、数据删除、数据添加、数据修改
- token验证与生成
- 图片上传保存功能其实是能做的，但是由于 Nuxt3 打包上线后无论图片保存到哪里前台都无法访问，因为在打包的时候就已经把静态文件编译好了，所以这个只能靠第三方接口或者自己重新用 Express 框架写一个图片上传接口

# 开发

## 安装依赖

```
npm i
```

## 开发运行

```
npm run dev
```

## 打包

```
npm run build
```

# 公共方法

## 前端

- useTimeDate() 获取时间日期，提供多种格式；若需解析时间，使用示例：useTimeDate('parse',time)，提供多种格式！
- useAxios() 使用集成的 axios，支持异步和同步！
- isMobile() 检测是否是手机端，通过 navigator.userAgent 进行检测
- useEcharts() 使用 echarts，使用示例：useEcharts().init()

## 后端

- useAxios() 使用集成的 axios，支持异步和同步！
- useToken() token 生成与验证
- useSaveError() 保存错误到数据库，默认保存为字符串(会检测传入的错误信息是否为字符串)
- useMongodb() 使用 Mongodb 数据库配置
- useDbAdd() 通用添加数据，使用示例：useDbAdd({ data: [ { }, ], table : " "})
- useDbDel() 通用删除数据，使用示例；useDbDel({ data: { }, table : " "})
- useDbSet() 通用修改数据，使用示例：useDbSet({ where: { }, set:{ $set: { } }, table: '' })
- useDbQuery() 通用查询数据，使示例：useDbQuery({ query: { }, table: '' })

![](/show2.png)

![](/show3.png)

![](/show4.png)

![](/show5.png)
