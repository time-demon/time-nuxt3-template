<template>
  <PageLoading v-if="PageLoadingConfig.state" />
  <!-- 后台管理系统布局 -->
  <template v-else>
    <template v-if="route.name.split('-')[0] === 'admin'">
      <NuxtPage />
    </template>
    <!-- 前台布局 -->
    <template v-else>
      <NuxtLayout>
        <NuxtPage :page-key="$route.fullPath" />
      </NuxtLayout>
    </template>
  </template>
</template>

<script setup lang="ts">
const route = useRoute() as any;
const PageLoadingConfig = reactive<any>({
  state: true,
});
onMounted(() => {
  setTimeout(() => {
    PageLoadingConfig.state = false;
  }, 1500);
  let body = document.body;
  body.className = " dark";
});
</script>
