<template>
  <div
    class="sidebarContainer"
    :style="[{ width: sidebarConfig.state ? '210px' : '0px' }]"
  >
    <div class="sidebarBox">
      <div class="logoBox">
        <div>
          {{ store.adminConfig.title }}
          · 后台
        </div>
        <div class="author">
          <nuxt-link to="http://timebk.cn/" target="_blank">
            Powered by 时光
            <span
              style="
                display: inline-block;
                background: #606266;
                letter-spacing: 1px;
                scale: 0.9;
                padding: 3px 6px;
                border-radius: 5px;
                margin: 0 2px;
              "
            >
              原创
            </span>
          </nuxt-link>
        </div>
      </div>

      <div class="sidebar">
        <el-menu
          style="
            --el-menu-text-color: var(--siderbar-color);
            --el-menu-item-height: var(--siderbar-menu-item-height);
          "
          :default-active="sidebarConfig.active"
          :collapse="sidebarConfig.collapse"
          background-color="transparent"
        >
          <!-- 一级菜单 -->
          <template
            v-for="(item, index) in sidebarConfig.routes"
            :key="item.name"
          >
            <!-- 一级菜单、无二级菜单的 -->
            <template v-if="!item.children">
              <el-menu-item
                v-if="item.path !== 'login'"
                :index="`${index}`"
                @click="goPath(item)"
                :style="[{ order: item.meta.order }]"
              >
                <i :class="item.meta.icon"></i>&nbsp;
                <span>{{ item.meta.title }}</span>
                <span>{{ item.meta.routingChip }}</span>
              </el-menu-item>
            </template>
            <!-- 一级菜单、有二级菜单的 -->
            <template v-else>
              <el-sub-menu
                :index="`${index}`"
                :style="[{ order: item.meta.order }]"
              >
                <template #title>
                  <i :class="item.meta.icon"></i>&nbsp;
                  <span>{{ item.name }}</span>
                </template>
                <!-- 二级菜单 -->
                <template
                  v-for="(itemb, indexb) in item.children"
                  :key="itemb.name"
                >
                  <!-- 二级菜单、无三级菜单的 -->
                  <template v-if="!itemb.children">
                    <el-menu-item
                      :index="`${index}-${indexb}`"
                      @click="goPath(itemb)"
                      :style="[{ order: itemb.meta.order }]"
                    >
                      <i :class="itemb.meta.icon"></i>&nbsp;
                      <span>{{ itemb.name }}</span>
                    </el-menu-item>
                  </template>
                  <!-- 二级菜单、有三级菜单的 -->
                  <template v-else>
                    <el-sub-menu
                      :index="`${index}-${indexb}`"
                      :style="[{ order: itemb.meta.order }]"
                    >
                      <template #title>
                        <i :class="itemb.meta.icon"></i>&nbsp;
                        <span>{{ itemb.name }}</span>
                      </template>
                      <!-- 三级菜单 -->
                      <template
                        v-for="(itemc, indexc) in itemb.children"
                        :key="itemc.name"
                      >
                        <el-menu-item
                          :index="`${index}-${indexb}-${indexc}`"
                          @click="goPath(itemc)"
                          :style="[{ order: itemc.meta.order }]"
                        >
                          <i :class="itemc.meta.icon"></i>&nbsp;
                          <span>{{ itemc.name }}</span>
                        </el-menu-item>
                      </template>
                    </el-sub-menu></template
                  >
                </template>
              </el-sub-menu>
            </template>
          </template>
        </el-menu>
      </div>
      <div class="copyright flexCenter">
        {{ new Date().getFullYear() }} &nbsp;&copy;
        {{ store.adminConfig.title ? store.adminConfig.title : 2 }}
      </div>
    </div>
  </div>
  <div
    class="rightContainer"
    :style="[{ width: `calc(100% - ${sidebarConfig.state ? '210' : '0'}px)` }]"
  >
    <div class="rightBox">
      <div class="headeTopBox">
        <ul type="none" class="leftArea">
          <li
            @click="sidebarConfig.state = !sidebarConfig.state"
            :title="sidebarConfig.state ? '折叠' : '展开'"
          >
            <i
              class="sg"
              :class="[
                sidebarConfig.state
                  ? 'sg-shouqicaidan_menu-fold'
                  : 'sg-zhankaicaidan_menu-unfold',
              ]"
            ></i>
          </li>
          <li @click="refreshMain" title="刷新">
            <i class="sg sg-shuaxin"></i>
          </li>
        </ul>
        <ul type="none" class="rightArea">
          <li title="CSDN">
            <NuxtLink to="https://blog.csdn.net/qq_19322833" target="_blank">
              <i class="sg sg-csdn" style="font-size: 30px"></i>
            </NuxtLink>
          </li>
          <li title="Github">
            <NuxtLink
              to="https://github.com/time-demon/time-nuxt3-template"
              target="_blank"
            >
              <i class="sg sg-socialgithuboutline"></i>
            </NuxtLink>
          </li>
          <li title="设置" @click="adminConfig().sideDrawerConfig.state = true">
            <el-icon>
              <Setting />
            </el-icon>
          </li>
          <li class="adminInfor">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                Hello！
                {{
                  store_adminInfor.adminInfor.name
                    ? store_adminInfor.adminInfor.name
                    : store_adminInfor.adminInfor.account
                }}
                <el-icon class="el-icon--right"><arrow-down /> </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="$router.push('personal')">
                    <div style="font-size: 12px">个人中心</div>
                  </el-dropdown-item>
                  <el-dropdown-item @click="logOut">
                    <div style="font-size: 12px">注销</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>
        </ul>
      </div>
      <!-- 路由屑 -->
      <RoutingChip v-if="adminConfig().sideDrawerConfig.routingTab.state" />
      <main class="mainBox">
        <slot />
      </main>
    </div>
  </div>

  <el-backtop
    target=".mainBox"
    :visibility-height="100"
    :right="30"
    :bottom="40"
    style="opacity: 0.8"
  >
    <i class="sg sg-qudingbu_to-top"></i>
  </el-backtop>
</template>

<script setup lang="ts">
import { adminNavbar } from "~/stores/adminNavbar";
import { adminInfor } from "~/stores/adminInfor";
import { adminConfig } from "~/stores/adminConfig";
const store = reactive<any>(adminConfig());
const store_adminInfor = reactive<any>(adminInfor());
const router = useRouter() as any;

adminConfig().sideDrawerConfig.state = false;

// 侧边导航
const sidebarConfig = reactive<any>({
  active: "",
  state: false,
  collapse: false,
  routes: router.options.routes.find((item: any) => item.name === "admin")
    .children,
});
// 检测当前页面路由所在位置
const thisPageIndex = () => {
  const route = useRoute() as any;
  for (let i in sidebarConfig.routes) {
    if (route.name.split("-").length === 2) {
      sidebarConfig.active = `${sidebarConfig.routes.findIndex(
        (item: any) => item.name === `${route.name}`
      )}`;
    } else if (route.name.split("-").length === 3) {
      if (
        sidebarConfig.routes[i].name.split("-")[1] === route.name.split("-")[1]
      ) {
        sidebarConfig.active = `${i}-${sidebarConfig.routes[
          i
        ].children.findIndex((item: any) => item.name === route.name)}`;
        break;
      }
    } else if (route.name.split("-").length === 4) {
      if (
        sidebarConfig.routes[i].name.split("-")[1] === route.name.split("-")[1]
      ) {
        for (let j in sidebarConfig.routes[i].children) {
          if (
            sidebarConfig.routes[i].children[j].name ===
            route.name.split("-").slice(0, 3).join("-")
          ) {
            sidebarConfig.active = `${i}-${j}-${sidebarConfig.routes[
              i
            ].children[j].children.findIndex(
              (item: any) => item.name === route.name
            )}`;
            break;
          }
        }
        break;
      }
    }
  }
};

// 监听路由跳转
watch(
  () => useRoute(),
  (value, oldValue) => {
    thisPageIndex();
    adminNavbar().adminNavbarSet({
      name: value.name,
      path: value.path,
      meta: value.meta,
    });
  },
  { immediate: true, deep: true }
);

// 跳转路由页
const goPath = async (data: any) => {
  if (data.name === useRoute().name) return;
  await useRouter().push({ name: data.name });
};

// 侧边是否展开
const sidebarStateChange = () => {
  sidebarConfig.state = windowWidth.value < 768 ? false : true;
};

const windowWidth = ref<number>(0);
onMounted(() => {
  windowWidth.value = window.innerWidth;
  watch(
    () => windowWidth.value,
    (value, oldValue) => {
      sidebarStateChange();
    },
    { immediate: true }
  );
  window.addEventListener("resize", (e) => {
    windowWidth.value = window.innerWidth;
  });
});

// 刷新main盒
const refreshMain = () => {
  adminConfig().pageRefresh("刷新成功");
};

// 退出登录
const logOut = async () => {
  adminInfor().logOut();
};
</script>

<style scoped lang="scss">
.sidebarContainer {
  width: auto;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  z-index: 999999;
  background: #ffffff;
  > .sidebarBox {
    width: 210px;
    height: 100%;
    display: flex;
    vertical-align: top;
    flex-direction: column;
    background: var(--siderbar-bg);
    > .logoBox {
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
      position: relative;
      height: 50px;
      display: flex;
      vertical-align: top;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-weight: 300;
      background-color: var(--siderbar-head-bg);
      color: var(--siderbar-head-color);
      > .author {
        font-size: 12px;
        scale: 0.8;
        font-weight: 300;
      }
    }
    > .logoBox::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0;
    }
    > .sidebar {
      padding: 10px 0;
      flex: auto;
      overflow: auto;
      :deep(.el-menu) {
        border-right: none;
        display: flex;
        flex-direction: column;
      }
    }
    > .copyright {
      height: 50px;
      position: relative;
      font-size: 12px;
      color: var(--siderbar-color);
    }
    > .copyright::before {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
      width: 80%;
      height: 0;
      border-top: var(--siderbar-border);
    }
  }
}
.sidebarContainer::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 100%;
  border-right: 1px solid #eeeeee;
}
.rightContainer {
  float: right;
  height: 100vh;
  background: transparent;
  position: relative;
  overflow: hidden;
  > .rightBox {
    width: auto;
    > .headeTopBox {
      width: 100%;
      height: 50px;
      background: #ffffff;
      position: relative;
      display: flex;
      vertical-align: top;
      justify-content: space-between;
      align-items: center;
      > ul {
        height: 100%;
        display: flex;
        vertical-align: top;
        align-items: center;
        > li {
          padding: 6px;
          color: #837e7e;
          width: auto;
          height: 100%;
          min-width: 50px;
          display: flex;
          vertical-align: top;
          justify-content: center;
          align-items: center;
          position: relative;
          cursor: pointer;
          > a {
            text-decoration: none;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        > li:active {
          color: #333333;
          background: #fff8f8;
        }
        @media screen and (min-width: 768px) {
          > li:hover {
            color: #333333;
            background: #fff8f8;
          }
        }
        > li:hover::before {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 0;
          // border-bottom: 2px solid #333333;
        }
        > li:nth-last-of-type(1)::after {
          content: "";
          position: absolute;
          right: 0;
          top: 0;
          width: 0;
          height: 100%;
          // border-right: 1px solid #eeeeee;
        }
      }
      > .leftArea {
        > li:nth-of-type(1)::before {
          border-right: none;
        }
      }
      > .rightArea {
        position: relative;
        > .adminInfor {
          :deep(.el-dropdown) {
            height: 100%;
            .el-dropdown-link {
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 12px;
            }
          }
        }
      }
      > .rightArea::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 40%;
        border-left: 1px solid #eeeeee;
      }
    }
    > .headeTopBox::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0;
      border-bottom: 1px solid #eeeeee;
    }
    > .navbarBox {
      position: relative;
      background: #ffffff;
      height: 36px;
      font-size: 12px;
      display: flex;
      vertical-align: top;
      align-items: center;
      padding: 5px 5px;
      > .navbar {
        white-space: nowrap;
        width: auto;
        height: 100%;
        position: relative;
        display: flex;
        vertical-align: top;
        justify-content: center;
        align-items: center;
        padding: 0 6px 0 10px;
        margin-right: 10px;
        border-radius: 2px;
        cursor: pointer;
        > .title {
          z-index: 1;
        }
        > .close {
          z-index: 1;
          margin: 0 0 0 5px;
          height: 100%;
          display: flex;
          align-items: center;
          > i {
            font-size: 12px;
            display: inline-block;
            scale: 0.6;
          }
        }
      }
      > .navbar:nth-last-of-type(1) {
        margin-right: 0;
      }
      > .navbar::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: -webkit-fill-available;
        height: -webkit-fill-available;
        border: 1px solid #d8dce5;
        border-radius: 2px;
      }
      > .this_navbar {
        background: #409eff;
        color: #ffffff;
        i {
          color: #ffffff;
        }
      }
    }
    > .navbarBox::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0;
      border-bottom: 1px solid #eeeeee;
    }
    > .mainBox {
      height: calc(100vh - 50px - 36px);
      overflow: auto;
    }
  }
  @media screen and (max-width: 768px) {
    > .rightBox {
      width: 100vw;
    }
  }
}
</style>
