// 后台相关配置
import { defineStore } from "pinia";
import { ElMessage } from "element-plus";

export const adminConfig = defineStore("adminConfig", {
  state: () => {
    return {
      adminConfig: {},
      pageState: true,
    };
  },
  actions: {
    // 后台配置获取
    adminConfigSet(data = {}) {
      this.adminConfig = data;
    },
    // 刷新main盒
    pageRefresh(data = {}) {
      this.pageState = false;
      nextTick(() => {
        this.pageState = true;
        ElMessage({
          message: "刷新成功",
          center: true,
          duration: 1000,
          type: "success",
        });
      });
    },
  },
});
