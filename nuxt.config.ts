// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1.0",
      meta: [
        { name: "description", content: "时光后台管理系统" },
        {
          name: "keywords",
          content: "时光",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "//at.alicdn.com/t/c/font_3778480_90ejg2xc4ur.css",
        },
      ],
      noscript: [{ children: "JavaScript is required" }],
    },
  },
  css: [
    // "element-plus/dist/index.css",
    "@/assets/main.scss",
  ],
  modules: [
    "@element-plus/nuxt",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  elementPlus: {
    /** Options */
    icon: "ElIcon",
  },
});
