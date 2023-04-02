<!-- 搜题记录 -->
<template>
  <Title> {{ $route.meta.title }}</Title>
  <div class="tabelQueryBox">
    <el-form
      :inline="true"
      :model="tabelQuery.inputQuery"
      class="demo-form-inline"
    >
      <el-form-item>
        <el-select
          style="width: 100px"
          v-model="tabelQuery.inputQuery.type"
          placeholder="请选择"
        >
          <el-option
            v-for="item in tabelQuery.typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input
          style="width: 140px"
          v-model="tabelQuery.inputQuery.content"
          :placeholder="`请输入${tabelQuery.typeList.find(
              (item:any) => item.value === tabelQuery.inputQuery.type
            ).label}...`"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="tabelqueryGo">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" text @click="tabelqueryReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-table
    v-loading="tableData.loading"
    :data="tableData.list"
    stripe
    style="width: 100%"
    border
  >
    <el-table-column type="selection" width="40" align="center" />
    <el-table-column
      prop="name"
      label="用户名"
      width="100"
      show-overflow-tooltip
    />
    <el-table-column
      prop="title"
      label="题目"
      width="300"
      align="center"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
      prop="openid"
      label="OpenID"
      align="center"
      width="260"
      show-overflow-tooltip
    />
    <el-table-column prop="time" label="添加时间" width="160" align="center">
      <template #default="scope">
        {{ parseFloat(scope.row.time) }}
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
  title: "搜题记录",
  icon: "sg sg-yonghuliebiao",
});

// 表格条件查询
const tabelQuery = reactive<any>({
  typeList: [
    {
      value: "name",
      label: "用户名",
    },
  ],
  inputQuery: {
    type: "name",
    content: "",
    reset: () => {
      tabelQuery.inputQuery.type = "name";
      tabelQuery.inputQuery.content = "";
    },
  },
});
// 开始查询
const tabelqueryGo = () => {
  getData({ [tabelQuery.inputQuery.type]: tabelQuery.inputQuery.content });
};
// 重置
const tabelqueryReset = () => {
  tabelQuery.inputQuery.reset();
  getData({ size: 20 });
};

// 表格数据配置
const tableData = reactive<any>({
  loading: true,
  list: [],
  paging: {}, // 分页
});
// 获取表格数据
const getData = (query = {} as any) => {
  tableData.loading = true;
  query = Object.assign(query, tableData.paging);
  axios({
    url: "/api/admin/titlesGet",
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
// 更改每天条数
const handleSizeChange = (val: number) => {
  tableData.size = val;
  getData();
};
// 更改页数
const handleCurrentChange = (val: number) => {
  tableData.page = val;
  getData();
};
</script>

<style scoped lang="scss">
.tabelQueryBox {
  :deep(.el-form--inline .el-form-item) {
    margin-right: 10px;
  }
}
</style>
