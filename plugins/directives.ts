import directives from "~/directives";
export default defineNuxtPlugin((nuxtApp) => {
  // 通过循环注册所有指令
    console.log("directives", directives);

    for (let key in directives) {
      nuxtApp.vueApp.directive(key, directives[key]);
    }
});
