import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 1000, // 递增进度条的速度
  showSpinner: true, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 更改启动时使用的最小百分比
  parent: "html", //指定进度条的父容器
});

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
