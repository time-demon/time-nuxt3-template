<template>
  <Title> {{ $route.meta.title }}</Title>
  <el-pagination
    style="float: right; margin: 0 0 10px"
    v-model:current-page="tableData.paging.page"
    v-model:page-size="tableData.paging.size"
    :page-sizes="[20, 40, 80, 160]"
    layout="sizes, prev, pager, next"
    :total="tableData.paging.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
  <el-table
    v-loading="tableData.loading"
    :data="tableData.list"
    stripe
    style="width: 100%"
    border
  >
    <el-table-column type="selection" width="40" align="center" />
    <el-table-column
      fixed
      prop="name"
      label="用户名"
      width="100"
      show-overflow-tooltip
    />
    <el-table-column prop="count" label="剩余积分" width="100" align="center">
      <template #default="scope">
        {{ scope.row.count }}
      </template>
    </el-table-column>
    <el-table-column
      prop="openid"
      label="OpenID"
      align="center"
      width="260"
      show-overflow-tooltip
    />
    <el-table-column
      prop="session_key"
      label="SessionKey"
      align="center"
      width="260"
      show-overflow-tooltip
    >
      <template #default="scope">
        {{ scope.row.session_key ? scope.row.session_key : "暂无" }}
      </template>
    </el-table-column>
    <el-table-column prop="time" label="添加时间" width="160" align="center">
      <template #default="scope">
        {{
          timeDate("parse", scope.row.time)
            ? timeDate("parse", scope.row.time).fullDateTime
            : timeDate("parse", scope.row.time)
        }}
      </template>
    </el-table-column>
    <!-- 右边操作 -->
    <el-table-column fixed="right" label="操作" width="100" align="center">
      <template #default>
        <el-button link type="warning" size="small">修改</el-button>
        <el-button link type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
    <!-- 右边操作 -->
  </el-table>
  <el-pagination
    style="float: right; margin: 10px 0 0"
    v-model:current-page="tableData.paging.page"
    v-model:page-size="tableData.paging.size"
    :page-sizes="[20, 40, 80, 160]"
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

// 表格数据配置
const tableData = reactive<any>({
  loading: true,
  list: [],
  paging: {}, // 分页
});
// 获取数据
const getData = (query = {} as any) => {
  tableData.loading = true;
  query = Object.assign(query, tableData.paging);
  axios({
    url: "/api/admin/userGet",
    data: query,
  })
    .then((r: any) => {
      if (r.code === 200) {
        tableData.list = r.data;
        tableData.paging.total = r.total;
        tableData.paging.pages = r.pages;
        tableData.paging.page = r.page;
        tableData.paging.size = r.size;
      } else {
        ElMessage({
          message: "异常！请刷新页面重试",
          showClose: true,
          center: true,
        });
      }
      setTimeout(() => {
        tableData.loading = false;
      }, 300);
    })
    .catch((err: any) => {
      tableData.loading = false;
      ElMessage({
        message: "异常！请刷新页面重试",
        showClose: true,
        center: true,
      });
    });
};
getData({ size: 20 });
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
