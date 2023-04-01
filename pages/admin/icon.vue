<template>
  <div v-loading="iconConfig.state" class="iconContainer">
    <ul class="iconUl" type="none">
      <li
        class="iconLi"
        v-for="(item, index) in iconArray"
        :key="item + index"
        :title="item"
        @click="copyIcon(item)"
      >
        <i :class="[iconConfig.qianzhui, item]"></i>
        <!-- <p class="iconName">{{ item.split("-")[1] }}</p> -->
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import axios from "~/server/axios";

definePageMeta({
  order: 1,
  title: "图标Icon",
  icon: "sg sg-xingxing_star",
});

// 图标配置
const iconConfig = reactive({
  url: "//at.alicdn.com/t/c/font_3778480_3karu7hv8bz.css",
  qianzhui: "sg",
  state: true,
});

// 复制icon
const copyIcon = (text: string) => {
  navigator.clipboard.writeText(text).then(
    () => {
      ElMessage(`已复制：${text}`);
    },
    () => {
      ElMessage.error("复制失败");
    }
  );
};

// 图标数据
const iconArray = reactive<any>([]);
const iconGet = () => {
  axios({
    url: iconConfig.url,
  }).then((r: any) => {
    iconArray.length = 0;
    const iconArrayData = [] as any;
    for (let i in r.split("\n\n")) {
      if (r.split("\n\n")[i].match(/(?<=.).*?(?= {)/)) {
        iconArrayData.push(
          r
            .split("\n\n")
            [i].match(/(?<=.).*?(?= {)/)[0]
            .split(":")[0]
        );
      }
    }
    getIcon(iconArrayData);
    iconConfig.state = false;
  });
};
onMounted(() => {
  iconGet();
});

const getIconIndex = ref<number>(0);
// 图标渲染
const getIcon = (data = []) => {
  iconArray[getIconIndex.value] = data[getIconIndex.value];
  getIconIndex.value++;
  if (getIconIndex.value === data.length) {
    return;
  }
  setTimeout(() => {
    getIcon(data);
  }, 100);
};
</script>

<style scoped lang="scss">
.toolsBox {
  padding: 10px 0 10px 10px;
  :deep(.el-form) {
    margin: 0 0 10px 0;
    .el-form-item {
      margin: 0 10px 0 0;
    }
  }
  .el-form-item {
    margin: 0 10px 0 0;
  }
}
.iconContainer {
  min-height: 100%;
}
.iconUl {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  justify-content: center;
  > .iconLi {
    border: 1px solid #eeeeee;
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    vertical-align: top;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    > i {
      font-size: 18px;
    }
    > .iconName {
      font-size: 12px;
      scale: 0.8;
      white-space: nowrap;
    }
  }
  > .iconLi:active {
    background: #ededed;
  }
  @media screen and (min-width: 768px) {
    > .iconLi:hover {
      background: #ededed;
    }
  }
}
</style>
