<!-- 搜题接口 -->
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
    <el-table-column type="selection" width="40" fixed align="center" />
    <el-table-column
      prop="name"
      label="题库名称"
      width="100"
      show-overflow-tooltip
    />
    <el-table-column
      prop="method"
      label="Method"
      width="80"
      align="center"
      show-overflow-tooltip
    >
      <template #default="scope">
        {{ scope.row.method }}
      </template>
    </el-table-column>
    <el-table-column
      prop="token"
      label="Token"
      width="280"
      show-overflow-tooltip
    >
      <template #default="scope">
        {{ scope.row.token }}
      </template>
    </el-table-column>
    <el-table-column
      prop="url"
      label="接口URL"
      width="280"
      show-overflow-tooltip
    >
      <template #default="scope">
        {{ scope.row.url }}
      </template>
    </el-table-column>
    <el-table-column
      prop="subname"
      label="描述"
      width="280"
      show-overflow-tooltip
    >
      <template #default="scope">
        {{ scope.row.subname }}
      </template>
    </el-table-column>
    <el-table-column prop="time" label="添加时间" width="160" align="center">
      <template #default="scope">
        {{
          useTimeDate("parse", scope.row.time)
            ? useTimeDate("parse", scope.row.time).fullDateTime
            : useTimeDate("parse", scope.row.time)
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
definePageMeta({
  order: 4,
  title: "接口管理",
  icon: "sg sg-apis",
});

// 表格条件查询
const tabelQuery = reactive<any>({
  typeList: [
    {
      value: "name",
      label: "题库名称",
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
  getData(
    tabelQuery.inputQuery.content
      ? { [tabelQuery.inputQuery.type]: tabelQuery.inputQuery.content }
      : {}
  );
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
  tableData.list = [];
  tableData.loading = true;
  query = Object.assign(query, tableData.paging);
  query.paging = 1;
  query.fuzzy = 1;

  useAxios({
    url: "/api/admin/qSInterfaceGet",
    data: query,
  })
    .then((r: any) => {
      if (r.code === 200) {
        let zIndex = 0;
        let timer = setInterval(() => {
          if (zIndex === r.data.length) {
            clearInterval(timer);
            tableData.loading = false;
            return;
          }
          tableData.list.push(r.data[zIndex]);
          zIndex++;
        }, 10);
        tableData.paging.total = r.total;
        tableData.paging.pages = r.pages;
        tableData.paging.page = r.page;
        tableData.paging.size = r.size;
      } else {
        tableData.loading = false;
        ElMessage({
          message: "异常！请刷新页面重试",
          showClose: true,
          center: true,
        });
      }
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
