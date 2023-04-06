<template>
  <Title>{{ $route.meta.title }}</Title>
  <div>Home</div>
</template>

<script setup lang="ts">
definePageMeta({
  order: -999999,
  title: "数据概况",
  icon: "sg sg-gongzuotai_workbench",
});
</script>

<style scoped></style>
