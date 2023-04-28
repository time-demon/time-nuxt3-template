// 后台相关配置
import { defineStore } from "pinia";
import { ElMessage } from "element-plus";

export const adminConfig = defineStore("adminConfig", {
  state: () => {
    return {
      adminConfig: {}, // 后台配置
      pageState: true, // main盒状态
    };
  },
  actions: {
    // 后台配置获取
    adminConfigSet(data = {}) {
      this.adminConfig = data;
    },
    // 刷新main盒
    pageRefresh(message = "") {
      this.pageState = false;

      if (process.client) {
        useRoute().meta.pageState = true;
        nextTick(() => {
          useRoute().meta.pageState = false;
          if (message) {
            ElMessage({
              message: message,
              center: true,
              duration: 1000,
              type: "success",
            });
          }
        });
      }
    },
  },
});
