<template>
  <Title> {{ $route.meta.title }}</Title>
  <el-table :data="tableData.list" stripe style="width: 100%" border>
    <el-table-column
      prop="name"
      label="用户名"
      width="120"
      show-overflow-tooltip
    />
    <el-table-column prop="count" label="剩余积分" width="100" align="center" />
    <el-table-column prop="time" label="添加时间" align="center" />
  </el-table>
  <el-pagination
    style="float: right; margin: 10px 0 0"
    v-model:current-page="tableData.paging.page"
    v-model:page-size="tableData.paging.size"
    :page-sizes="[10, 20, 50, 100]"
    layout="sizes, prev, pager, next"
    :total="tableData.paging.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
import axios from "~/server/axios";
definePageMeta({
  order: 1,
  title: "用户列表",
  icon: "sg sg-yonghuliebiao",
});

const tableData = reactive<any>({
  list: [],
  paging: {},
});
// 获取数据
const getData = (query = {} as any) => {
  query = Object.assign(query, tableData.paging);
  axios({
    url: "/api/admin/userGet",
    data: query,
  }).then((r: any) => {
    if (r.code === 200) {
      tableData.list = r.data;
      tableData.paging.total = r.total;
      tableData.paging.pages = r.pages;
      tableData.paging.page = r.page;
      tableData.paging.size = r.size;
    }
  });
};
onMounted(() => {
  getData();
});
const handleSizeChange = (val: number) => {
  tableData.size = val;
  getData();
};
const handleCurrentChange = (val: number) => {
  tableData.page = val;
  getData();
};
</script>

<style scoped></style>
