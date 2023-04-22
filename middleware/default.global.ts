export default defineNuxtRouteMiddleware((to: any, from: any) => {
  // if (to.name.split("-").length === 1) {
  //   // 如果是一级路由
  //   if (to.matched[0].children ? to.matched[0].children.length !== 0 : false) {
  //     // 如果有子组件
  //     return navigateTo(to.path + "/" + to.matched[0].children[0].path);
  //   }
  // }
});
