<template>
  <!-- 后台管理系统布局 -->
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

<script setup lang="ts">
const route = useRoute() as any;
</script>
