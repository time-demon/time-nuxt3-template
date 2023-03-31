<template>
  <Title> {{ $route.meta.title }}</Title>
</template>

<script setup lang="ts">
definePageMeta({
  order: 1,
  title: "用户列表",
  icon: "sg sg-yonghuliebiao",
});
</script>

<style scoped></style>
