// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    // 代理配置
    devProxy: {
      "/proxy/weixin": {
        target: "https://mp.weixin.qq.com/",
        changeOrigin: true,
      },
    },
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1.0",
      meta: [
        { name: "description", content: "时光后台管理系统" },
        {
          name: "keywords",
          content: "时光,时光小灶,timebk.cn",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "//at.alicdn.com/t/c/font_3778480_dpcrzrftslp.css",
        },
      ],
      noscript: [{ children: "JavaScript is required" }],
    },
  },
  css: ["@/assets/main.scss"],
  plugins: ["@/plugins/directives"],
  modules: [
    "@element-plus/nuxt",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  elementPlus: {
    icon: "ElIcon",
  },
  vite: {
    // 打包后清除console和debugger，注意：server下文件的不会删除
    esbuild: {
      // drop: ["console", "debugger"],
    },
  },
  postcss: {
    plugins: {
      "postcss-preset-env": {
        stage: 1,
        // 自动补全CSS前缀
        autoprefixer: {
          overrideBrowserslist: [
            "> 0%", // 表示支持市面上多少比例的浏览器
            // "Android > 4.1",
            // "iOS > 7.1",
            // "Chrome > 31",
            // "ff > 31",
            // "ie >= 10",
            //'last 2 versions', // 所有主流浏览器最近2个版本
          ],
          grid: true,
        },
      },
    },
  },
});
