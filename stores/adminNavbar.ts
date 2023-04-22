// 后台路由屑
import { defineStore } from "pinia";
import { adminConfig } from "~/stores/adminConfig";

export const adminNavbar = defineStore("adminNavbar", {
  state: () => {
    return {
      adminNavbar: [] as any,
      keepAliveRoutes: [] as any,
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
      // 添加路由缓存
      this.keepAliveRoutesAdd(data);

      // 添加路由屑
      this.adminNavbar.push(data);
      adminConfig().pageRefresh();
    },
    adminNavbarDel(data = {} as any, type: any) {
      if (type === "all") {
        this.adminNavbar = [];
        this.keepAliveRoutes = [];
        return;
      }

      // 路由缓存清理
      let keepAliveRoutesIndex = this.keepAliveRoutes.findIndex(
        (item: any) =>
          JSON.stringify(item) ===
          JSON.stringify(
            data.name.split("-").splice(1, data.name.split("-").length)
          )
      );
      this.keepAliveRoutes.splice(keepAliveRoutesIndex, 1);

      // 路由屑清理
      this.adminNavbar.splice(
        this.adminNavbar.findIndex((item: any) => item.name === data.name),
        1
      );
    },
    keepAliveRoutesAdd(data: any) {
      if (data.meta.keepAlive) {
        this.keepAliveRoutes.push(
          data.name.split("-").splice(1, data.name.split("-").length)
        );
      }
    },
  },
});
