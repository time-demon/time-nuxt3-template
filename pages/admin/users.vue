<template>
  <Title> {{ $route.meta.title }}</Title>
</template>

<script setup lang="ts">
import axios from "~/server/axios";
definePageMeta({
  order: 1,
  title: "用户列表",
  icon: "sg sg-yonghuliebiao",
});
// 获取数据
const getData = () => {
  axios({
    url:'/api/admin/userGet'
  })
};
onMounted(() => {
  getData();
});
</script>

<style scoped></style>
