import { adminInfor } from "~/stores/adminInfor";
export default defineNuxtRouteMiddleware((to: any, from: any) => {
 
  // 如果是后台
  if (to.href.split("/")[1] === "admin") {
    if (to.path === "/admin") {
      return navigateTo({
        name: "admin-home",
      });
    }
    // 检测是否登录
    // 如果没有登录
    if (JSON.stringify(adminInfor().adminInfor) === "{}") {
      // 如果是非登录页且没有登录
      if (to.href !== "/admin/login") {
        return navigateTo({
          name: "admin-login",
        });
      }
      return;
    }
    // 如果已登录
    // 如果是登录页
    if (to.href === "/admin/login") {
      return navigateTo({
        name: "admin",
      });
    }
    return;
  }
  // if (to.name.split("-").length === 1) {
  //   // 如果是一级路由
  //   if (to.matched[0].children ? to.matched[0].children.length !== 0 : false) {
  //     // 如果有子组件
  //     return navigateTo(to.path + "/" + to.matched[0].children[0].path);
  //   }
  // }
});
