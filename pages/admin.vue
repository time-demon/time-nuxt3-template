<template>
  <div
    class="adminContainer"
    v-loading="pageLoadingConfig.loading"
    :element-loading-text="pageLoadingConfig.loadingT"
  >
    <!-- 后台登录页 -->
    <template v-if="$route.name === 'admin-login'">
      <NuxtPage :page-key="$route.fullPath" />
    </template>
    <!-- 后台页面 -->
    <template v-else>
      <NuxtLayout name="admin">
        <template #main>
          <router-view v-slot="{ Component, route }">
            <keep-alive :include="useKeepAliveRoutes()">
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </template>
      </NuxtLayout>
    </template>
  </div>
</template>

<script setup lang="ts">
import { adminConfig } from "~/stores/adminConfig";
definePageMeta({
  middleware: ["admin"],
});

// 设置SEO
useHead({
  titleTemplate: (productCategory: any) => {
    const baseTitle = "后台管理";
    return `${productCategory ? productCategory + " - " : ""}${baseTitle}`;
  },
});

// 页面loading
const pageLoadingConfig = reactive<any>({
  loading: true,
  loadingT: "加载中",
});

// 获取后台配置
const getConfig = async () => {
  // 对接接口时请删除这个！
  // if (true) {
  //   pageLoadingConfig.loading = false;
  //   adminConfig().adminConfigSet({ title: "time-nuxt3-template" });
  //   return;
  // }

  useAxios({
    url: "/api/admin/config",
    data: {
      type: "admin",
    },
  })
    .then((r: any) => {
      pageLoadingConfig.loading = false;
      delete r.data._id;
      adminConfig().adminConfigSet(r.data);
    })
    .catch((err: any) => {
      pageLoadingConfig.loading = false;
      ElMessageBox.confirm("获取配置失败", "提示", {
        distinguishCancelAndClose: false,
        confirmButtonText: "重试",
        cancelButtonText: "取消",
        draggable: true,
        showClose: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
      })
        .then(() => {
          // 重试
          getConfig();
        })
        .catch((e) => {
          // 取消
        });
    });
};
getConfig();
</script>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
