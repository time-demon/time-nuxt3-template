// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    // 代理配置
    devProxy: {
      "/proxy/sohu": {
        target: "https://pv.sohu.com/",
        prependPath: true,
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
          href: "//at.alicdn.com/t/c/font_3778480_5z78tg3p77f.css",
        },
      ],
      noscript: [{ children: "JavaScript is required" }],
    },
  },
  plugins: ["@/plugins/directives"],
  css: ["@/assets/main.scss"],
  modules: [
    "@element-plus/nuxt",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  elementPlus: {
    icon: "ElIcon",
  },
});
