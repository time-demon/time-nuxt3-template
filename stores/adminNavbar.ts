// 后台路由屑
import { defineStore } from "pinia";
import { adminConfig } from "~/stores/adminConfig";

export const adminNavbar = defineStore("adminNavbar", {
  state: () => {
    return {
      adminNavbar: [] as any,
    };
  },
  actions: {
    adminNavbarSet(data = {} as any) {
      // 如果当前路由已存在路由屑
      if (
        this.adminNavbar.findIndex((item: any) => item.name === data.name) !==
        -1
      )
        return;
      // 如果当前页面是主页
      // 需要排除的路由页面
      const excludeRoute = ["admin-home", "admin-login"];
      for (let i in excludeRoute) {
        if (data.name === excludeRoute[i]) return;
      }
      this.adminNavbar.push(data);
      adminConfig().pageRefresh();
    },
    adminNavbarDel(data = {} as any) {
      this.adminNavbar.splice(
        this.adminNavbar.findIndex((item: any) => item.name === data.name),
        1
      );
    },
  },
});
