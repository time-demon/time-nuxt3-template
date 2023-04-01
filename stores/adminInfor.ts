// 后台管理员
import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import { adminNavbar } from "~/stores/adminNavbar";

export const adminInfor = defineStore("adminInfor", {
  state: () => {
    return {
      adminInfor: {} as any,
    };
  },
  actions: {
    // 登录存储管理员信息
    loginIn(data = {} as any) {
      this.adminInfor = data;
      ElMessage({
        message: `欢迎您！${data.name ? data.name : data.account}`,
        type: "success",
        showClose: true,
        center: true,
        duration: 1000,
      });
      useRouter().push({ name: "admin" });
    },
    // 退出登录
    logOut() {
      adminInfor().$reset();
      adminNavbar().$reset();
      localStorage.clear();
      sessionStorage.clear();
      ElMessage({
        message: "已退出登录",
        showClose: true,
        center: true,
        duration: 1000,
      });
      useRouter().push({ name: "admin-login" });
    },
  },
  // 持久化
  persist: true,
});
