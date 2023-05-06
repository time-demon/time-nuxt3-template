<template>
  <client-only>
    <el-drawer
      :z-index="999999999"
      :size="windowWidth <= 768 ? '80%' : '30%'"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :show-close="false"
      v-model="sideDrawerConfig.state"
      :direction="'rtl'"
    >
      <template #header="{ close, titleId, titleClass }">
        <div
          class="flexCenter"
          style="justify-content: flex-start; font-weight: bold"
        >
          <el-icon><Tools /></el-icon>&nbsp;设置
        </div>
        <el-button
          text
          circle
          @click="adminConfig().sideDrawerConfig.state = false"
        >
          <el-icon><Close /></el-icon>
        </el-button>
      </template>
      <template #default>
        <ul type="none" class="setUl">
          <li class="setLi">
            <el-divider> 主题</el-divider>
            <ul type="none" class="themeUl">
              <li
                class="themeLi"
                v-for="(item, index) in adminConfig().sideDrawerConfig.theme
                  .list"
                :key="item.type + index"
              >
                <div class="preview">
                  <div
                    v-if="item.type === sideDrawerConfig.theme.isType"
                    class="active"
                  >
                    <div class="okIcon">
                      <el-icon><CircleCheck /></el-icon>
                    </div>
                  </div>
                  <div
                    class="sideBarBox"
                    :style="{ background: item.secondary }"
                  >
                    <div
                      class="logoBox"
                      :style="{ background: item.main }"
                    ></div>
                    <div class="sidebar"></div>
                  </div>
                  <div class="rigthBox">
                    <div class="headeTopBox"></div>
                    <div class="navbarBox">
                      <div
                        class="button"
                        :style="{ background: item.main }"
                      ></div>
                    </div>
                    <div class="mainBox">
                      <div
                        class="button"
                        :style="{ background: item.main }"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="type">
                  {{ item.type }}
                </div>
              </li>
            </ul>
          </li>
          <li class="setLi">
            <el-divider>路由标签</el-divider>
            <el-text>显隐状态</el-text>&nbsp;
            <el-switch
              v-model="adminConfig().sideDrawerConfig.routingTab.state"
              inline-prompt
              :active-text="'显示'"
              inactive-text="隐藏"
            />
          </li>
        </ul>
      </template>
      <template #footer>
        <div style="flex: auto">
          <!-- <el-button @click="cancelClick">cancel</el-button>
        <el-button type="primary" @click="confirmClick">confirm</el-button> -->
        </div>
      </template>
    </el-drawer>
  </client-only>
</template>

<script setup lang="ts">
import { adminConfig } from "~/stores/adminConfig";

const windowWidth = ref<number>(0);
onMounted(() => {
  windowWidth.value = window.innerWidth;
  window.addEventListener("resize", () => {
    windowWidth.value = window.innerWidth;
  });
});

const sideDrawerConfig = reactive<any>(adminConfig().sideDrawerConfig);
</script>

<style scoped lang="scss">
.setUl {
  .setLi {
    margin-bottom: 20px;
    .el-divider {
      margin-bottom: 15px;
    }
    .themeUl {
      display: flex;
      vertical-align: top;
      align-items: center;
      cursor: pointer;
      > .themeLi {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        > .preview {
          background: #fafafa;
          position: relative;
          width: 60px;
          height: 40px;
          border-radius: 2px;
          display: flex;
          vertical-align: top;
          border: 0.5px solid #e0d0d0;
          > .sideBarBox {
            width: 30%;
            height: 100%;
            display: flex;
            flex-direction: column;
            > .logoBox {
              height: 16%;
            }
            > .sidebar {
              flex: auto;
            }
          }
          > .rigthBox {
            flex: auto;
            display: flex;
            flex-direction: column;
            > .headeTopBox {
              background: #ffffff;
              border-bottom: 0.5px solid #eeeeee;
              height: 16%;
            }
            > .navbarBox {
              height: 8%;
              background: #ffffff;
              border-bottom: 0.5px solid #eeeeee;
              display: flex;
              padding: 0 1%;
              align-items: center;
              > .button {
                width: 12%;
                height: 60%;
                border-radius: 0.5px;
              }
            }
            > .mainBox {
              flex: auto;
              padding: 5%;
              > .button {
                width: 20%;
                height: 12%;
                border-radius: 0.5px;
              }
            }
          }
          > .active {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 1px solid #409eff;
            border-radius: 2px;
            > .okIcon {
              position: absolute;
              right: 0;
              top: 0;
              color: #409eff;
              background: #ffffff;
            }
          }
        }
        > .type {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
