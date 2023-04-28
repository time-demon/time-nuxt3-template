<template>
  <Title>{{ $route.meta.title }}</Title>
  <ul class="box box1" type="none">
    <li v-for="(item, index) in mainData" :key="item.title" class="box1Li">
      <el-card shadow="never">
        <el-statistic :value="item.count">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              {{ item.title }}{{ item.count }}
              <el-tooltip
                v-if="item.tips"
                effect="dark"
                :content="item.tips"
                placement="top"
              >
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </el-card>
    </li>
  </ul>
  <el-card class="box sysBox" shadow="never">
    <div class="chartBox">
      <div ref="sysEchartRef" style="height: 200px"></div>
    </div>
    <div class="dataBox" v-if="isClient">
      <el-descriptions :column="2" size="small">
        <el-descriptions-item label="系统名称">
          {{ sysData.type }} / {{ sysData.platform }}
        </el-descriptions-item>
        <el-descriptions-item label="运行环境">
          {{ sysData.node }}
        </el-descriptions-item>
        <el-descriptions-item label="计算机类型">
          {{ sysData.machine }}
        </el-descriptions-item>
        <el-descriptions-item label="内核版本">
          {{ sysData.version }}
        </el-descriptions-item>
        <el-descriptions-item label="服务器已运行">
          {{ (sysData.time / 60 / 60).toFixed(2) }}小时(约{{
            (sysData.time / 60 / 60 / 24).toFixed(2)
          }}天)
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="2" size="small">
        <el-descriptions-item label="CPU">
          {{ sysData.cpus ? sysData.cpus[0].model : "1" }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="2" size="small">
        <el-descriptions-item label="CPU结构">
          {{ sysData.arch }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-card>

  <el-card class="box" shadow="never">
    <div ref="chart1" style="height: 300px"></div>
  </el-card>
</template>

<script setup lang="ts">
definePageMeta({
  order: -999999,
  title: "数据概况",
  icon: "sg sg-gongzuotai_workbench",
});

useAxios({
  url: "/proxy/weixin/intp/getuserclientip",
});

const isClient = ref<boolean>(false); 
onMounted(() => {
  isClient.value = process.client;
});

// 主要数据
const mainData = ref<any>([]);
useAxios({
  url: "/api/admin/totalDataVolume/get",
})
  .then((r: any) => {
    if (r.code === 200) {
      mainData.value = [
        {
          title: "总用户",
          count: r.data.user,
          tips: "注册用户总数",
        },
        {
          title: "搜题总次数",
          count: r.data.recordTitle,
          tips: "搜题总次数",
        },
        {
          title: "API总数",
          count: r.data.apis,
          tips: "API总数",
        },
      ];
    }
    console.log("mainData", mainData.value);
  })
  .catch((err: any) => {});
// 系统内存图表
const sysEchartRef = ref<HTMLElement>();
// 系统数据
const sysData = reactive<any>({});
const sysData_get = (sysEchart: any) => {
  return new Promise((resolve: any, reject: any) => {
    useAxios({
      url: "/api/os",
    })
      .then(async (r: any) => {
        if (r.code === 200) {
          for (let i in r.data) {
            sysData[i] = r.data[i];
          }

          sysEchart.setOption({
            title: {
              text: `服务器内存(${(
                sysData.totalmem /
                1024 /
                1024 /
                1024
              ).toFixed(2)}G)`,
              subtext: `3秒自动更新一次`,
              left: "center",
              textStyle: {
                fontSize: 14,
              },
            },
            tooltip: {
              trigger: "item",
            },
            series: [
              {
                name: "服务器内存",
                type: "pie",
                radius: "40%",
                label: {
                  show: true,
                  formatter(param: any) {
                    return `${param.name}\n${param.value}G`;
                  },
                },
                data: [
                  {
                    value: (
                      (sysData.totalmem - sysData.freemem) /
                      1024 /
                      1024 /
                      1024
                    ).toFixed(2),
                    name: "已用",
                  },
                  {
                    value: (sysData.freemem / 1024 / 1024 / 1024).toFixed(2),
                    name: "空闲",
                  },
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                  },
                },
              },
            ],
          });
          resolve();
        }
        reject();
      })
      .catch((err: any) => {
        reject();
      });
  });
};
// 频繁更新
let sysEchartRef_render = async (sysEchart: any) => {
  try {
    await sysData_get(sysEchart);
    setTimeout(() => {
      sysEchartRef_render(sysEchart);
    }, 3000);
  } catch {}
};
console.log("asdassdasdsad");

onMounted(async () => {
  const sysEchart = useEcharts().init(sysEchartRef.value!);
  sysEchart.on("finished", () => {
    sysEchart.resize();
  });
  window.addEventListener("resize", function () {
    sysEchart.resize();
  });
  sysEchartRef_render(sysEchart);
});
onBeforeUnmount(() => {
  sysEchartRef_render = null;
});

const chart1 = ref<HTMLElement>();
onMounted(() => {
  const myChart = useEcharts().init(chart1.value!);
  myChart.on("finished", () => {
    myChart.resize();
  });
  window.addEventListener("resize", function () {
    myChart.resize();
  });
  myChart.setOption({
    legend: {
      // Try 'horizontal'
      orient: "vertical",
      right: 10,
      top: "center",
    },
    dataset: {
      source: [
        ["product", "2015", "2016", "2017"],
        ["Matcha Latte", 43.3, 85.8, 93.7],
        ["Milk Tea", 83.1, 73.4, 55.1],
        ["Cheese Cocoa", 86.4, 65.2, 82.5],
        ["Walnut Brownie", 72.4, 53.9, 39.1],
      ],
    },
    xAxis: { type: "category" },
    yAxis: {},
    series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
  });
});
</script>

<style scoped lang="scss">
.box {
  margin-bottom: 10px;
}
.box1 {
  display: flex;
  vertical-align: top;
  flex-wrap: wrap;
  > .box1Li {
    min-width: 200px;
    max-width: 50%;
    margin: 0 10px 10px 0;
  }
}

@media screen and (max-width: 500px) {
  .box1 {
    justify-content: space-between;
    > .box1Li {
      min-width: auto;
      width: 48%;
      margin: 0 5px 10px;
    }
    > .box1Li:nth-of-type(2n + 1) {
      margin-left: 0;
    }
    > .box1Li:nth-of-type(2n + 2) {
      margin-right: 0;
    }
    > .box1Li:nth-last-of-type(1) {
      margin-bottom: 0;
    }
    > .box1Li:nth-last-of-type(2) {
      margin-bottom: 0;
    }
  }
}

.sysBox {
  :deep(.el-card__body) {
    width: 100%;
    display: flex;
    vertical-align: top;
    flex-wrap: wrap;
    > .chartBox {
      width: 300px;
    }
    @media screen and (max-width: 600px) {
      > .chartBox {
        width: 100%;
      }
    }
    > .dataBox {
      flex: auto;
      position: relative;
      padding: 20px 0 20px 20px;
    }
    > .dataBox::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 80%;
      border-left: 0.5px solid #dddddd;
    }
    @media screen and (max-width: 600px) {
      > .dataBox {
        padding: 20px 0 0 0;
      }
      > .dataBox::before {
        width: 80%;
        height: 0;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        border-top: 0.5px solid #dddddd;
        border-left: none;
      }
    }
  }
}
</style>
