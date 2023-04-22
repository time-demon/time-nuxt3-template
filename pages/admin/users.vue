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
        <el-button type="info" @click="tabelqueryGo">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button type="info" text @click="tabelqueryReset">重置</el-button>
    <el-popconfirm
      width="120"
      confirm-button-text="删除"
      cancel-button-text="取消"
      :icon="InfoFilled"
      icon-color="#626AEF"
      title="是否确定删除?"
      @confirm="delData({ type: 'more' })"
    >
      <template #reference>
        <el-button v-roleVerify>批量删除</el-button>
      </template>
    </el-popconfirm>
  </div>
  <el-table
    v-loading="tableData.loading"
    :data="tableData.list"
    stripe
    style="width: 100%"
    border
    @selection-change="selectionChange"
  >
    <el-table-column fixed type="selection" width="40" align="center" />
    <el-table-column
      prop="name"
      label="用户名"
      width="100"
      show-overflow-tooltip
    />
    <el-table-column prop="count" label="剩余积分" width="100" align="center">
      <template #default="scope">
        <div v-roleVerify>{{ scope.row.count }}</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="openid"
      label="OpenID"
      align="center"
      width="260"
      show-overflow-tooltip
    >
      <template #default="scope">
        <span v-roleVerify>{{ scope.row.openid }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="session_key"
      label="SessionKey"
      align="center"
      width="260"
      show-overflow-tooltip
    >
      <template #default="scope">
        <span v-roleVerify>
          {{ scope.row.session_key ? scope.row.session_key : "暂无" }}
        </span>
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
      <template #default="scope">
        <el-button link type="warning" size="small">修改</el-button>
        <el-popconfirm
          width="120"
          confirm-button-text="删除"
          cancel-button-text="取消"
          :icon="InfoFilled"
          icon-color="#626AEF"
          title="是否确定删除?"
          @confirm="delData({ scope })"
        >
          <template #reference>
            <el-button link type="danger" size="small" v-roleVerify
              >删除</el-button
            >
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
    <!-- 右边操作 -->
  </el-table>

  <!-- 分页 -->
  <el-pagination
    style="float: right; margin: 10px 0"
    v-model:current-page="tableData.paging.page"
    v-model:page-size="tableData.paging.size"
    :page-sizes="[20, 40, 80, 160]"
    layout="sizes, prev, pager, next"
    :total="tableData.paging.total"
    @size-change="pagingSizeChange"
    @current-change="pagingCurrentChange"
  />
  <!-- 分页 -->
</template>

<script setup lang="ts">
import { InfoFilled } from "@element-plus/icons-vue";
definePageMeta({
  order: 2,
  title: "用户列表",
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
  console.log(3);

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

// 表格多选
const selectionData = reactive<any>([]);
const selectionChange = (e: any) => {
  selectionData.length = 0;
  for (let i = 0; i < e.length; i++) {
    selectionData.push(e[i]._id);
  }
};

// 删除
const delData = ({ scope, type }: any) => {
  tableData.loading = true;
  useAxios({
    method: "delete",
    url: "/api/admin/users/del",
    data: {
      type: "_id",
      _id: type === "more" ? selectionData : scope.row._id,
    },
  })
    .then((r: any) => {
      tableData.loading = false;
      if (r.code === 200) {
        ElMessage({
          message: "删除成功",
          center: true,
          duration: 1000,
          type: "success",
        });
        getData();
      } else {
        ElMessage({
          message: r.msg,
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

// 表格数据配置
const tableData = reactive<any>({
  loading: true,
  list: [], // 数据
  paging: {}, // 分页
});
// 获取表格数据
const getData = async (query = {} as any) => {
  tableData.list = [];
  tableData.loading = true;
  query = Object.assign(query, tableData.paging);
  query.paging = 1;
  query.fuzzy = 1;
  delete query.total;
  delete query.pages;

  const { data: dateDate, refresh } = useFetch(
    () => `/proxy/sohu/cityjson?ie=utf-8`
  );

  useAxios({
    url: "/api/admin/users/get",
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
onMounted(() => {
  getData({ size: 20 });
});

// ---- 分页控制 ---- //
// 更改每页条数
const pagingSizeChange = (val: number) => {
  tableData.size = val;
  getData();
};
// 更改页数
const pagingCurrentChange = (val: number) => {
  tableData.page = val;
  getData();
};
// ---- 分页控制 ---- //
</script>

<style scoped lang="scss">
.tabelQueryBox {
  :deep(.el-form--inline .el-form-item) {
    margin-right: 10px;
  }
}
</style>
