<!-- 个人中心 -->
<template>
  <div class="personalBox">
    <div class="personal box">
      Hello~{{ store_adminInfor.adminInfor.account }}
      22
    </div>
  </div>
</template>

<script setup lang="ts">
import { adminInfor } from "~/stores/adminInfor";
const store_adminInfor = reactive<any>(adminInfor());

definePageMeta({
  order: 999999,
  title: "个人中心",
  icon: "sg sg-user",
});
</script>

<style scoped lang="scss">
.personalBox {
  display: flex;
  vertical-align: top;
  flex-wrap: wrap;
  > .personal {
    width: 300px;
    max-width: 100%;
  }
}
</style>
