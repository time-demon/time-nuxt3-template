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
        <el-button type="info" @click="tabelqueryGo">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button type="info" text @click="tabelqueryReset">重置</el-button>

    <el-button type="primary" @click="tabelqueryGo" :icon="Plus">
      添加
    </el-button>
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
    <el-table-column type="selection" width="40" fixed align="center" />
    <el-table-column
      prop="method"
      label="状态"
      width="70"
      align="center"
      show-overflow-tooltip
    >
      <template #default="scope">
        <el-switch
          v-roleVerify
          @change="setData(scope)"
          v-model="scope.row.state"
          inline-prompt
          active-text="开"
          inactive-text="关"
        />
      </template>
    </el-table-column>
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
    <el-table-column label="Token" width="280" show-overflow-tooltip>
      <template #default="scope">
        <span v-roleVerify>{{ scope.row.data.token }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="data.uid"
      label="UID"
      width="100"
      show-overflow-tooltip
    >
      <template #default="scope">
        <span v-roleVerify>{{ scope.row.data.uid }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="url"
      label="接口URL"
      width="280"
      show-overflow-tooltip
    >
      <template #default="scope">
        <span v-roleVerify>{{ scope.row.data.url }}</span>
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
    <el-table-column fixed="right" label="操作" width="140" align="center">
      <template #default="scope">
        <el-button link type="warning" size="small" @click="setData(scope)">
          修改
        </el-button>
        <el-button
          link
          type="warning"
          size="small"
          @click="testDialogControl(true, scope.row)"
        >
          测试
        </el-button>
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
            <el-button v-roleVerify link type="danger" size="small"
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

  <!-- 测试接口弹出框 -->
  <el-dialog
    align-center
    v-model="testDialog.state"
    :title="`测试：${thisData.name}`"
    draggable
    destroy-on-close
    @close="testDialogControl(false, null)"
  >
    <div v-loading="testDialog.loading">
      <el-input
        v-model="testDialog.question"
        placeholder="请输入题目！"
        clearable
      />
      <p style="margin: 15px 0">
        当前状态：
        <template v-if="testDialog.testT === -1">
          <el-text class="mx-1" type="info">待检测</el-text>
        </template>
        <template v-else-if="testDialog.testT === 1">
          <el-text class="mx-1" type="success">接口可用</el-text>
        </template>
        <template v-else-if="testDialog.testT === 2">
          <el-text class="mx-1" type="warning">检测中</el-text>
        </template>
        <template v-else>
          <el-text class="mx-1" type="danger">接口异常</el-text>
        </template>
      </p>
      <div
        style="
          word-wrap: break-word;
          background: #bbbbbb;
          padding: 15px 20px;
          max-height: 300px;
          overflow-y: scroll;
        "
      >
        <template v-if="testDialog.result">
          <pre>
          {{ JSON.stringify(testDialog.result, null, 2) }}
          </pre>
        </template>
        <template v-else>请输入题目后点击测试！</template>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="testData()"> 测试 </el-button>
        <el-button @click="testDialog.state = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 测试接口弹出框 -->
</template>

<script setup lang="ts">
import { InfoFilled, Plus } from "@element-plus/icons-vue";
definePageMeta({
  order: 4,
  title: "接口管理",
  icon: "sg sg-apis",
  keepAlive: true,
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
    url: "/api/admin/qSInterface/del",
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

// 编辑
const setData = (scope: any) => {
  tableData.loading = true;
  useAxios({
    method: "POST",
    url: "/api/admin/qSInterface/set",
    data: scope.row,
  })
    .then((r: any) => {
      tableData.loading = false;
      getData();
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

const thisData = reactive<any>({});
// 测试接口
const testDialog = reactive<any>({
  loading: false,
  state: false,
  testT: -1, // -1：待检测；0：失败；1：成功；2：检测中
  question: "",
  result: "",
});
// 弹窗开关控制
const testDialogControl = (type: Boolean, data: any) => {
  testDialog.testT = -1;
  // 打开
  if (type) {
    for (let i in data) {
      thisData[i] = data[i];
    }
    testDialog.state = true;
  } else {
    // 关闭
    for (let i in thisData) {
      delete thisData[i];
    }
    testDialog.state = false;
    testDialog.question = "";
    testDialog.result = "";
  }
};
watch(
  () => testDialog.result,
  (newValue, oldValue) => {
    let valueT = JSON.stringify(newValue);
    let okArray = ["输入", "成功", "输入题目", " 200"];
    testDialog.testT = 0;
    for (let i in okArray) {
      if (valueT.includes(okArray[i])) {
        testDialog.testT = 1;
        return;
      }
    }
  }
);
const testData = () => {
  thisData.data.question = testDialog.question;
  testDialog.loading = true;
  testDialog.result = "";
  testDialog.testT = 2;
  useAxios({
    method: "POST",
    url: "/api/admin/qSInterface/test",
    data: thisData,
  })
    .then((r: any) => {
      testDialog.loading = false;
      testDialog.result = r;
    })
    .catch((err: any) => {
      testDialog.testT = 0;
      testDialog.loading = false;
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
const getData = (query = {} as any) => {
  tableData.list = [];
  tableData.loading = true;
  query = Object.assign(query, tableData.paging);
  query.paging = 1;
  query.fuzzy = 1;
  delete query.total;
  delete query.pages;

  useAxios({
    url: "/api/admin/qSInterface/get",
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
