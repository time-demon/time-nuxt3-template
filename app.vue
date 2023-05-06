<template>
  <PageLoading />
  <!-- 后台管理系统布局 -->
  <template v-if="($route as any).name.split('-')[0] === 'admin'">
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
onMounted(() => {
  // 更改主题class
  const body = document.body;
  body.classList.add("light");
});
</script>
