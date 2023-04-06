import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default defineNuxtPlugin((NuxtApp) => {
  // ElementPlus Icon引入
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    NuxtApp.vueApp.component(key, component);
  }

  if (process.client) {
    NuxtApp.vueApp.$nuxt.$router.beforeEach(async (to, from) => {
      NProgress.start(); // 开启网页加载进度条
    });
    NuxtApp.vueApp.$nuxt.$router.afterEach(async (to, from) => {
      NProgress.done(); // 结束网页加载进度条
    });
  }
});
