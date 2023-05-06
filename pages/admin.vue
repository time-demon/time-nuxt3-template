<template>
  <AdminSideDrawer />
  <!-- 后台登录页 -->
  <template v-if="$route.name === 'admin-login'">
    <NuxtPage :page-key="$route.fullPath" />
  </template>
  <!-- 后台页面 -->
  <template v-else>
    <NuxtLayout name="admin">
      <NuxtPage v-slot="{ Component, route }" v-if="!$route.meta.pageState">
        <keep-alive :include="useKeepAliveRoutes()">
          <component :is="Component" />
        </keep-alive>
      </NuxtPage>
    </NuxtLayout>
  </template>
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

// 获取后台配置
const getConfig = async () => {
  // 开始开发时请删除这个！
  // if (true) {
  //   adminConfig().adminConfigSet({ title: "time-nuxt3-template" });
  //   return;
  // }

  try {
    const configGetReturn = (await useAxios({
      method: "POST",
      url: "/api/app/config/get",
      data: {
        type: "admin",
      },
    })) as any;
    delete configGetReturn.data._id;
    adminConfig().adminConfigSet(configGetReturn.data);
  } catch (err) {
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
  }
};
onMounted(() => {
  getConfig();
});
</script>

<style scoped lang="scss">
.adminContainer {
  width: auto;
}
</style>
