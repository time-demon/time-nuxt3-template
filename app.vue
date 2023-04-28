<template>
  <PageLoading />
  <!-- 后台管理系统布局 -->
  <template v-if="$route.name.split('-')[0] === 'admin'">
    <NuxtPage />
  </template>
  <!-- 前台布局 -->
  <template v-else>
    <NuxtLayout>
      <NuxtPage :page-key="$route.fullPath" />
    </NuxtLayout>
  </template>
</template>

<script setup lang="ts">
// 挂载后再加载，避免SSR很多渲染问题
const pageOk = ref<boolean>(false);
onMounted(() => {
  pageOk.value = true;
});
onMounted(() => {
  // 更改主题class
  const body = document.body;
  body.classList.add("light");
});
</script>
