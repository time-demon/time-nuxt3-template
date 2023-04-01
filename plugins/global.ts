import * as ElementPlusIconsVue from "@element-plus/icons-vue";

export default defineNuxtPlugin(async (NuxtApp) => {
  // ElementPlus Icon引入
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    NuxtApp.vueApp.component(key, component);
  }
});
