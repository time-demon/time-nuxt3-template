// 后台路由中间件
import { adminInfor } from "~/stores/adminInfor";
export default defineNuxtRouteMiddleware((to: any, from: any) => {
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
});
