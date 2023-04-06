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
        <!-- <NuxtPage /> -->
        <router-view
          v-slot="{ Component, route }"
          v-if="adminConfig().pageState"
        >
          <keep-alive>
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </router-view>
      </NuxtLayout>
    </template>
  </div>
</template>

<script setup lang="ts">
import { adminConfig } from "~/stores/adminConfig";
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
  if (true) {
    pageLoadingConfig.loading = false;
    adminConfig().adminConfigSet({ title: "time-nuxt3-template" });
    return;
  }

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

<style lang="scss" scoped></style>
